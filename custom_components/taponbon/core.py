"""Behaviour wired to Home Assistant: scans, labels, drinking-window alerts."""

from __future__ import annotations

import logging
import time
from datetime import date, datetime
from typing import Any

from homeassistant.components import persistent_notification
from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.helpers.event import async_track_time_change

from . import labels
from .const import (
    ALERT_HOUR,
    CONF_ALERT_DAYS,
    CONF_AUTO_LABELS,
    CONF_LABEL_FORMAT,
    CONF_NOTIFIED,
    DEFAULT_ALERT_DAYS,
    DEFAULT_AUTO_LABELS,
    DOMAIN,
    EVENT_BOTTLE_TAKEN,
    EVENT_DRINK_ALERT,
    EVENT_LABEL_REQUESTED,
    EVENT_SCAN_UNMATCHED,
    EVENT_UPDATED,
    SCAN_DEBOUNCE_SECONDS,
    WINE_TYPES,
)
from .logic import (
    STATUS_CLOSING,
    STATUS_PAST,
    drink_alerts,
    label_lines,
    location_text,
    parse_scanned,
    qr_payload_for,
    tag_id_for,
    wine_key,
)
from .store import TaponBonStore

_LOGGER = logging.getLogger(__name__)


def get_store(hass: HomeAssistant) -> TaponBonStore | None:
    return hass.data.get(DOMAIN, {}).get("store")


def wine_title(item: dict[str, Any]) -> str:
    vintage = item.get("vintage")
    return f"{item.get('name') or 'Vino'}{f' {vintage}' if vintage else ''}"


def type_label(key: str | None) -> str:
    return WINE_TYPES.get(key or "", ("", ""))[0]


async def async_changed(hass: HomeAssistant) -> None:
    """Persist and tell the card and sensors."""
    store = get_store(hass)
    if store:
        await store.async_save()
    hass.bus.async_fire(EVENT_UPDATED)


def _notify(hass: HomeAssistant, message: str, title: str, notification_id: str) -> None:
    persistent_notification.async_create(hass, message, title=title, notification_id=notification_id)


# ── Scanning ──────────────────────────────────────────────────────────────────

async def async_take_scanned(hass: HomeAssistant, raw: str, source: str) -> dict[str, Any]:
    """Take out the bottle a scanned QR/NFC code refers to."""
    store = get_store(hass)
    scanned = parse_scanned(raw)
    if store is None or scanned is None:
        return {"result": "not_ours"}

    if scanned.kind == "slot":
        bottle = store.bottle_at(scanned.rack_id, scanned.row, scanned.col)
        if bottle is None:
            return _unmatched(hass, raw, "slot_empty", "Quella posizione dello scaffale risulta già vuota.")
    else:
        bottle = store.get_by_code(scanned.code)
        if bottle is None:
            past = store.history_by_code(scanned.code)
            if past:
                when = _local_date(past.get("removed_at"))
                return _unmatched(
                    hass, raw, "already_taken",
                    f"**{wine_title(past)}** era già stata prelevata{f' il {when}' if when else ''}. "
                    "Non ho tolto nulla.",
                )
            return _unmatched(hass, raw, "not_found", "Questo QR non corrisponde a nessuna bottiglia in cantina.")

    location = location_text(bottle, store.racks)
    entry = store.remove_bottle(bottle["id"], reason="drank")
    key = wine_key(bottle)
    remaining = sum(1 for b in store.bottles if wine_key(b) == key)
    await async_changed(hass)

    hass.bus.async_fire(EVENT_BOTTLE_TAKEN, {
        "bottle_id": bottle["id"], "code": bottle.get("code"), "name": bottle.get("name"),
        "producer": bottle.get("producer"), "vintage": bottle.get("vintage"),
        "type": bottle.get("type"), "type_label": type_label(bottle.get("type")),
        "location": location, "history_id": entry["history_id"] if entry else None,
        "remaining": remaining, "source": source,
    })
    _notify(
        hass,
        f"Prelevata **{wine_title(bottle)}** ({location}). Ne restano {remaining}. "
        "Se è stato un errore, la ritrovi nello storico e puoi rimetterla a posto.",
        "TaponBon: bottiglia prelevata", f"{DOMAIN}_scan",
    )
    return {"result": "taken", "bottle": bottle, "location": location, "remaining": remaining}


def _unmatched(hass: HomeAssistant, raw: str, reason: str, message: str) -> dict[str, Any]:
    hass.bus.async_fire(EVENT_SCAN_UNMATCHED, {"code": raw, "reason": reason})
    _notify(hass, message, "TaponBon: scansione", f"{DOMAIN}_scan")
    return {"result": reason}


def _local_date(iso: str | None) -> str:
    try:
        return datetime.fromisoformat(iso).astimezone().strftime("%d/%m/%Y") if iso else ""
    except ValueError:
        return ""


@callback
def async_setup_tag_listener(hass: HomeAssistant):
    """Turn ``tag_scanned`` with one of our ids into a bottle taken out."""
    recent: dict[str, float] = {}

    async def _on_tag(event: Event) -> None:
        tag_id = event.data.get("tag_id") or ""
        if parse_scanned(tag_id) is None:
            return
        now = time.monotonic()
        if now - recent.get(tag_id, -1e9) < SCAN_DEBOUNCE_SECONDS:
            return  # the app sometimes delivers one scan twice
        recent[tag_id] = now
        await async_take_scanned(hass, tag_id, source="tag")

    return hass.bus.async_listen("tag_scanned", _on_tag)


# ── Labels ────────────────────────────────────────────────────────────────────

def label_format(store: TaponBonStore | None) -> str:
    fmt = (store.settings.get(CONF_LABEL_FORMAT) if store else None) or labels.DEFAULT_FORMAT
    return fmt if fmt in labels.FORMATS else labels.DEFAULT_FORMAT


def label_info(store: TaponBonStore, bottle: dict[str, Any]) -> dict[str, Any]:
    location = location_text(bottle, store.racks)
    tlabel = type_label(bottle.get("type"))
    fmt = label_format(store)
    width_mm, height_mm = labels.FORMATS[fmt]
    return {
        "label_format": fmt,
        "width_mm": width_mm,
        "height_mm": height_mm,
        "bottle_id": bottle["id"],
        "code": bottle["code"],
        "tag_id": tag_id_for(bottle["code"]),
        "qr_payload": qr_payload_for(bottle["code"]),
        "name": bottle.get("name") or "",
        "producer": bottle.get("producer") or "",
        "vintage": bottle.get("vintage") or "",
        "type": bottle.get("type") or "",
        "type_label": tlabel,
        "location": location,
        "lines": label_lines(bottle, tlabel, location),
    }


async def async_request_label(hass: HomeAssistant, bottle: dict[str, Any], reason: str) -> dict[str, Any]:
    """Fire the event a printer automation listens to (with a ready PNG)."""
    store = get_store(hass)
    info = label_info(store, bottle)
    info["label_path"] = await hass.async_add_executor_job(
        labels.write_png, hass.config.config_dir, bottle["code"], info["lines"], info["label_format"]
    )
    hass.bus.async_fire(EVENT_LABEL_REQUESTED, {**info, "reason": reason})
    return info


async def async_on_added(hass: HomeAssistant, bottles: list[dict[str, Any]]) -> None:
    store = get_store(hass)
    if store is None or not store.settings.get(CONF_AUTO_LABELS, DEFAULT_AUTO_LABELS):
        return
    for bottle in bottles:
        try:
            await async_request_label(hass, bottle, reason="new")
        except Exception as err:  # a label must never break adding a bottle
            _LOGGER.warning("Etichetta non generata per %s: %s", bottle.get("name"), err)


# ── Drinking-window alerts ────────────────────────────────────────────────────

def current_alerts(hass: HomeAssistant, today: date | None = None) -> dict[str, list[dict[str, Any]]]:
    store = get_store(hass)
    if store is None:
        return {STATUS_CLOSING: [], STATUS_PAST: []}
    lead = int(store.settings.get(CONF_ALERT_DAYS, DEFAULT_ALERT_DAYS))
    return drink_alerts(store.bottles, today or date.today(), lead)


async def async_check_alerts(hass: HomeAssistant, force: bool = False) -> dict[str, list[dict[str, Any]]]:
    """Notify wines newly closing or past their window (each once per status)."""
    store = get_store(hass)
    if store is None:
        return {}
    groups = current_alerts(hass)
    notified = set(store.settings.get(CONF_NOTIFIED, []))
    fresh = {s: [e for e in items if force or e["key"] not in notified] for s, items in groups.items()}

    if fresh[STATUS_CLOSING] or fresh[STATUS_PAST]:
        lines: list[str] = []
        if fresh[STATUS_CLOSING]:
            lines.append("**Da bere presto:**")
            lines += [
                f"- {wine_title(e)}: {e['bottles']} bott., finestra fino al {e['drink_until']} "
                f"(ancora {e['days_left']} giorni)"
                for e in fresh[STATUS_CLOSING]
            ]
        if fresh[STATUS_PAST]:
            lines.append("**Oltre la finestra di beva:**")
            lines += [f"- {wine_title(e)}: {e['bottles']} bott., finestra chiusa nel {e['drink_until']}"
                      for e in fresh[STATUS_PAST]]
        message = "\n".join(lines)
        _notify(hass, message, "TaponBon: vini da bere", f"{DOMAIN}_alerts")
        hass.bus.async_fire(EVENT_DRINK_ALERT, {
            "closing": fresh[STATUS_CLOSING], "past": fresh[STATUS_PAST], "message": message,
        })

    # Remember what is currently announced; a wine that leaves the list (drunk,
    # restocked with a new window) will be announced again if it comes back.
    store.settings[CONF_NOTIFIED] = sorted(e["key"] for items in groups.values() for e in items)
    await store.async_save()
    return fresh


@callback
def async_setup_daily_alerts(hass: HomeAssistant):
    async def _daily(_now: Any) -> None:
        try:
            await async_check_alerts(hass)
        except Exception as err:
            _LOGGER.warning("Controllo finestre di beva non riuscito: %s", err)

    return async_track_time_change(hass, _daily, hour=ALERT_HOUR, minute=0, second=0)
