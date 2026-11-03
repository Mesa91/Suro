"""Websocket commands used by the card (all ``taponbon/...``)."""

from __future__ import annotations

import base64
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from . import ai, core, labels
from .const import (
    CONF_ALERT_DAYS,
    CONF_AUTO_LABELS,
    DEFAULT_ALERT_DAYS,
    DEFAULT_AUTO_LABELS,
    EVENT_UPDATED,
    REMOVAL_REASONS,
    WINE_TYPES,
)


def async_register(hass: HomeAssistant) -> None:
    for handler in (
        ws_subscribe, ws_get_data, ws_add_bottles, ws_update_bottle, ws_move_bottle,
        ws_remove_bottle, ws_get_history, ws_restore, ws_save_rack, ws_delete_rack,
        ws_get_label, ws_request_label, ws_take_code, ws_update_settings, ws_get_alerts,
        ws_ai_recognize, ws_ai_fill, ws_pair,
    ):
        websocket_api.async_register_command(hass, handler)


def _store(hass: HomeAssistant, connection, msg) -> Any:
    store = core.get_store(hass)
    if store is None:
        connection.send_error(msg["id"], "not_ready", "TaponBon non è configurato")
    return store


def _snapshot(hass: HomeAssistant) -> dict[str, Any]:
    store = core.get_store(hass)
    alerts = core.current_alerts(hass)
    flagged = {
        bid: status for status, items in alerts.items() for e in items for bid in e["bottle_ids"]
    }
    return {
        "racks": sorted(store.racks, key=lambda r: r.get("order", 0)),
        "bottles": [{**b, "alert": flagged.get(b["id"])} for b in store.bottles],
        "settings": {
            "label_format": core.label_format(store),
            CONF_AUTO_LABELS: bool(store.settings.get(CONF_AUTO_LABELS, DEFAULT_AUTO_LABELS)),
            CONF_ALERT_DAYS: int(store.settings.get(CONF_ALERT_DAYS, DEFAULT_ALERT_DAYS)),
        },
        "types": {k: {"label": v[0], "color": v[1]} for k, v in WINE_TYPES.items()},
        "reasons": REMOVAL_REASONS,
        "history_count": len(store.history),
        "ai": bool(_gemini(hass)[0]),
        "climate": core.climate_config(hass),
        "printer": bool(core._options(hass).get("printer_device")),
    }


def _gemini(hass: HomeAssistant) -> tuple[str, str]:
    from .const import CONF_GEMINI_KEY, CONF_GEMINI_MODEL, DOMAIN

    entries = hass.config_entries.async_entries(DOMAIN)
    options = entries[0].options if entries else {}
    return (options.get(CONF_GEMINI_KEY) or "").strip(), (options.get(CONF_GEMINI_MODEL) or ai.DEFAULT_MODEL).strip()


async def _ai_call(hass, connection, msg, prompt: str, images: list[str]) -> None:
    from homeassistant.helpers.aiohttp_client import async_get_clientsession

    key, model = _gemini(hass)
    if not key:
        connection.send_error(msg["id"], "no_ai", "Aggiungi la chiave Gemini nelle opzioni di TaponBon "
                              "(Impostazioni → Dispositivi e servizi → TaponBon → Configura).")
        return
    try:
        wine = await ai.async_generate(async_get_clientsession(hass), key, model, prompt, images)
    except ai.AIError as err:
        connection.send_error(msg["id"], "ai_error", str(err))
        return
    connection.send_result(msg["id"], {"wine": wine})


@websocket_api.websocket_command({
    vol.Required("type"): "taponbon/ai_recognize",
    vol.Required("image"): str,
    vol.Optional("back_image"): str,
})
@websocket_api.async_response
async def ws_ai_recognize(hass, connection, msg) -> None:
    """Read a label photo (and optionally the back label)."""
    images = [msg["image"]] + ([msg["back_image"]] if msg.get("back_image") else [])
    await _ai_call(hass, connection, msg, ai.label_prompt(), images)


@websocket_api.websocket_command({
    vol.Required("type"): "taponbon/ai_fill",
    vol.Required("wine"): dict,
})
@websocket_api.async_response
async def ws_ai_fill(hass, connection, msg) -> None:
    """Complete a wine from what is already known (name, producer, vintage…)."""
    if not str(msg["wine"].get("name") or "").strip():
        connection.send_error(msg["id"], "no_name", "Scrivi almeno il nome del vino")
        return
    await _ai_call(hass, connection, msg, ai.fill_prompt(msg["wine"]), [])


@websocket_api.websocket_command({
    vol.Required("type"): "taponbon/pair",
    vol.Required("dish"): vol.All(str, vol.Length(max=300)),
})
@websocket_api.async_response
async def ws_pair(hass, connection, msg) -> None:
    """Suggest which wines of the cellar go with a dish."""
    from datetime import date

    from homeassistant.helpers.aiohttp_client import async_get_clientsession

    from .logic import cellar_wines, local_pairing

    store = _store(hass, connection, msg)
    if store is None:
        return
    dish = msg["dish"].strip()
    if not dish:
        connection.send_error(msg["id"], "no_dish", "Scrivi cosa mangi")
        return
    lead = int(store.settings.get(CONF_ALERT_DAYS, DEFAULT_ALERT_DAYS))
    wines = cellar_wines(store.bottles, store.racks, date.today(), lead)
    if not wines:
        connection.send_error(msg["id"], "empty", "La cantina è vuota: non ho niente da consigliarti")
        return

    def pick(index: int, reason: str) -> dict[str, Any]:
        return {**wines[index], "reason": reason}

    key, model = _gemini(hass)
    note = ""
    if key:
        try:
            result = await ai.async_generate(
                async_get_clientsession(hass), key, model, ai.pairing_prompt(dish, wines),
                parse=lambda payload: ai.parse_pairing(payload, len(wines)),
            )
            connection.send_result(msg["id"], {
                "source": "ai", "advice": result["advice"],
                "picks": [pick(p["index"], p["reason"]) for p in result["picks"]],
            })
            return
        except ai.AIError as err:
            note = f"Gemini non disponibile ({err}); ecco un consiglio semplificato."
    else:
        note = "Consiglio semplificato: aggiungi la chiave Gemini nelle opzioni per uno più preciso."
    index = {w["key"]: i for i, w in enumerate(wines)}
    picks = [pick(index[p["key"]], p["reason"]) for p in local_pairing(dish, wines)]
    connection.send_result(msg["id"], {"source": "local", "advice": note, "picks": picks})


@websocket_api.websocket_command({vol.Required("type"): "taponbon/subscribe"})
@callback
def ws_subscribe(hass, connection, msg) -> None:
    """Push a fresh snapshot to the card whenever the data changes."""
    if core.get_store(hass) is None:
        connection.send_error(msg["id"], "not_ready", "TaponBon non è configurato")
        return

    @callback
    def _forward(_event) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], _snapshot(hass)))

    connection.subscriptions[msg["id"]] = hass.bus.async_listen(EVENT_UPDATED, _forward)
    connection.send_result(msg["id"])
    connection.send_message(websocket_api.event_message(msg["id"], _snapshot(hass)))


@websocket_api.websocket_command({vol.Required("type"): "taponbon/get_data"})
@callback
def ws_get_data(hass, connection, msg) -> None:
    if _store(hass, connection, msg):
        connection.send_result(msg["id"], _snapshot(hass))


@websocket_api.websocket_command({
    vol.Required("type"): "taponbon/add_bottles",
    vol.Required("wine"): dict,
    vol.Optional("quantity", default=1): vol.All(int, vol.Range(min=1, max=100)),
    vol.Optional("rack_id"): vol.Any(str, None),
    vol.Optional("row"): vol.Any(int, None),
    vol.Optional("col"): vol.Any(int, None),
})
@websocket_api.async_response
async def ws_add_bottles(hass, connection, msg) -> None:
    store = _store(hass, connection, msg)
    if not store:
        return
    added = store.add_bottles(msg["wine"], msg["quantity"], msg.get("rack_id"), msg.get("row"), msg.get("col"))
    await core.async_changed(hass)
    connection.send_result(msg["id"], {"bottles": added})
    hass.async_create_task(core.async_on_added(hass, added))


@websocket_api.websocket_command({
    vol.Required("type"): "taponbon/update_bottle",
    vol.Required("bottle_id"): str,
    vol.Required("changes"): dict,
    vol.Optional("same_wine", default=False): bool,
})
@websocket_api.async_response
async def ws_update_bottle(hass, connection, msg) -> None:
    store = _store(hass, connection, msg)
    if not store:
        return
    updated = store.update_bottle(msg["bottle_id"], msg["changes"], msg["same_wine"])
    if not updated:
        connection.send_error(msg["id"], "not_found", "Bottiglia non trovata")
        return
    await core.async_changed(hass)
    connection.send_result(msg["id"], {"updated": len(updated)})


@websocket_api.websocket_command({
    vol.Required("type"): "taponbon/move_bottle",
    vol.Required("bottle_id"): str,
    vol.Required("rack_id"): vol.Any(str, None),
    vol.Optional("row"): vol.Any(int, None),
    vol.Optional("col"): vol.Any(int, None),
})
@websocket_api.async_response
async def ws_move_bottle(hass, connection, msg) -> None:
    store = _store(hass, connection, msg)
    if not store:
        return
    if not store.move_bottle(msg["bottle_id"], msg["rack_id"], msg.get("row"), msg.get("col")):
        connection.send_error(msg["id"], "invalid", "Spostamento non valido")
        return
    await core.async_changed(hass)
    connection.send_result(msg["id"])


@websocket_api.websocket_command({
    vol.Required("type"): "taponbon/remove_bottle",
    vol.Required("bottle_id"): str,
    vol.Optional("reason", default="drank"): vol.In(list(REMOVAL_REASONS)),
})
@websocket_api.async_response
async def ws_remove_bottle(hass, connection, msg) -> None:
    store = _store(hass, connection, msg)
    if not store:
        return
    entry = store.remove_bottle(msg["bottle_id"], msg["reason"])
    if entry is None:
        connection.send_error(msg["id"], "not_found", "Bottiglia non trovata")
        return
    await core.async_changed(hass)
    connection.send_result(msg["id"], {"history_id": entry["history_id"]})


@websocket_api.websocket_command({vol.Required("type"): "taponbon/get_history"})
@callback
def ws_get_history(hass, connection, msg) -> None:
    store = _store(hass, connection, msg)
    if store:
        connection.send_result(msg["id"], {"history": list(reversed(store.history))[:500]})


@websocket_api.websocket_command({
    vol.Required("type"): "taponbon/restore",
    vol.Required("history_id"): str,
})
@websocket_api.async_response
async def ws_restore(hass, connection, msg) -> None:
    store = _store(hass, connection, msg)
    if not store:
        return
    bottle = store.restore(msg["history_id"])
    if bottle is None:
        connection.send_error(msg["id"], "not_found", "Voce non trovata nello storico")
        return
    await core.async_changed(hass)
    connection.send_result(msg["id"], {"bottle": bottle})


@websocket_api.websocket_command({
    vol.Required("type"): "taponbon/save_rack",
    vol.Required("rack"): dict,
})
@websocket_api.async_response
async def ws_save_rack(hass, connection, msg) -> None:
    store = _store(hass, connection, msg)
    if not store:
        return
    rack, displaced = store.save_rack(msg["rack"])
    await core.async_changed(hass)
    connection.send_result(msg["id"], {"rack": rack, "displaced": displaced})


@websocket_api.websocket_command({
    vol.Required("type"): "taponbon/delete_rack",
    vol.Required("rack_id"): str,
})
@websocket_api.async_response
async def ws_delete_rack(hass, connection, msg) -> None:
    store = _store(hass, connection, msg)
    if not store:
        return
    moved = store.delete_rack(msg["rack_id"])
    await core.async_changed(hass)
    connection.send_result(msg["id"], {"displaced": moved})


@websocket_api.websocket_command({
    vol.Required("type"): "taponbon/get_label",
    vol.Required("bottle_id"): str,
})
@websocket_api.async_response
async def ws_get_label(hass, connection, msg) -> None:
    store = _store(hass, connection, msg)
    if not store:
        return
    bottle = store.get_bottle(msg["bottle_id"])
    if bottle is None:
        connection.send_error(msg["id"], "not_found", "Bottiglia non trovata")
        return
    info = core.label_info(store, bottle)
    png = await hass.async_add_executor_job(labels.render, bottle["code"], info["lines"], info["label_format"])
    connection.send_result(msg["id"], {**info, "png_base64": base64.b64encode(png).decode("ascii")})


@websocket_api.websocket_command({
    vol.Required("type"): "taponbon/request_label",
    vol.Required("bottle_id"): str,
})
@websocket_api.async_response
async def ws_request_label(hass, connection, msg) -> None:
    store = _store(hass, connection, msg)
    if not store:
        return
    bottle = store.get_bottle(msg["bottle_id"])
    if bottle is None:
        connection.send_error(msg["id"], "not_found", "Bottiglia non trovata")
        return
    info = await core.async_request_label(hass, bottle, reason="manual")
    connection.send_result(msg["id"], info)


@websocket_api.websocket_command({
    vol.Required("type"): "taponbon/take_code",
    vol.Required("code"): str,
})
@websocket_api.async_response
async def ws_take_code(hass, connection, msg) -> None:
    result = await core.async_take_scanned(hass, msg["code"], source="card")
    connection.send_result(msg["id"], {k: v for k, v in result.items() if k != "bottle"})


@websocket_api.websocket_command({
    vol.Required("type"): "taponbon/update_settings",
    vol.Optional(CONF_AUTO_LABELS): bool,
    vol.Optional(CONF_ALERT_DAYS): vol.All(int, vol.Range(min=0, max=730)),
    vol.Optional("label_format"): vol.In(list(labels.FORMATS)),  # "qr", "qr30", "full"
})
@websocket_api.async_response
async def ws_update_settings(hass, connection, msg) -> None:
    store = _store(hass, connection, msg)
    if not store:
        return
    for key in (CONF_AUTO_LABELS, CONF_ALERT_DAYS, "label_format"):
        if key in msg:
            store.settings[key] = msg[key]
    await core.async_changed(hass)
    connection.send_result(msg["id"])


@websocket_api.websocket_command({vol.Required("type"): "taponbon/get_alerts"})
@callback
def ws_get_alerts(hass, connection, msg) -> None:
    if _store(hass, connection, msg):
        connection.send_result(msg["id"], core.current_alerts(hass))
