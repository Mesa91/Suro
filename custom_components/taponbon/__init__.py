"""TaponBon: la cantina dei vini in Home Assistant."""

from __future__ import annotations

from pathlib import Path

import voluptuous as vol

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall, ServiceResponse, SupportsResponse
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import config_validation as cv

from . import core, websocket
from .const import CARD_URL, CARD_VERSION, DOMAIN
from .store import TaponBonStore

PLATFORMS = ["sensor"]
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Serve the card and load it on every dashboard (once per HA start)."""
    card = Path(__file__).parent / "frontend" / "taponbon-card.js"
    await hass.http.async_register_static_paths([StaticPathConfig(CARD_URL, str(card), False)])
    add_extra_js_url(hass, f"{CARD_URL}?v={CARD_VERSION}")
    websocket.async_register(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    store = TaponBonStore(hass)
    await store.async_load()
    hass.data.setdefault(DOMAIN, {})["store"] = store

    _register_services(hass)
    entry.async_on_unload(core.async_setup_tag_listener(hass))
    entry.async_on_unload(core.async_setup_daily_alerts(hass))
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if ok:
        hass.data.get(DOMAIN, {}).pop("store", None)
        for service in ("take_bottle", "print_label", "check_drink_alerts"):
            hass.services.async_remove(DOMAIN, service)
    return ok


def _register_services(hass: HomeAssistant) -> None:
    def _require_store():
        store = core.get_store(hass)
        if store is None:
            raise HomeAssistantError("TaponBon non è configurato")
        return store

    async def take_bottle(call: ServiceCall) -> ServiceResponse:
        result = await core.async_take_scanned(hass, call.data["code"], source="service")
        if result["result"] == "not_ours":
            raise HomeAssistantError(f"Non è un codice TaponBon: {call.data['code']}")
        if not call.return_response:
            return None
        bottle = result.get("bottle") or {}
        return {"result": result["result"], "name": bottle.get("name"), "vintage": bottle.get("vintage"),
                "location": result.get("location"), "remaining": result.get("remaining")}

    async def print_label(call: ServiceCall) -> ServiceResponse:
        store = _require_store()
        bottle = None
        if call.data.get("bottle_id"):
            bottle = store.get_bottle(call.data["bottle_id"])
        elif call.data.get("code"):
            bottle = store.get_by_code(call.data["code"].strip().lower())
        if bottle is None:
            raise HomeAssistantError("Bottiglia non trovata")
        info = await core.async_request_label(hass, bottle, reason="manual")
        return info if call.return_response else None

    async def check_drink_alerts(call: ServiceCall) -> ServiceResponse:
        _require_store()
        fresh = await core.async_check_alerts(hass, force=call.data.get("force", False))
        return fresh if call.return_response else None

    hass.services.async_register(
        DOMAIN, "take_bottle", take_bottle,
        schema=vol.Schema({vol.Required("code"): cv.string}),
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN, "print_label", print_label,
        schema=vol.Schema({vol.Optional("bottle_id"): cv.string, vol.Optional("code"): cv.string}),
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN, "check_drink_alerts", check_drink_alerts,
        schema=vol.Schema({vol.Optional("force", default=False): cv.boolean}),
        supports_response=SupportsResponse.OPTIONAL,
    )
