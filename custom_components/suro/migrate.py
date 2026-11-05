"""One-time move from the old name of this integration (``taponbon``).

The integration used to live under the domain ``taponbon``. Changing a
domain makes Home Assistant see a brand-new integration, so on first setup
Suro brings over what the old one left behind:

* the cellar data (``.storage/taponbon``), copied, the old file kept;
* the options (Gemini key, climate sensors, printer), done by the config flow;
* storage-mode dashboards: the card type and the old sensor ids;
* the old config entry is disabled, so two integrations never react to the
  same scan, and its card resource is dropped.

Printed QR labels keep working: ``logic.parse_scanned`` still accepts the
old tag prefix.
"""

from __future__ import annotations

import json
import logging
from typing import Any

from homeassistant.components import persistent_notification
from homeassistant.config_entries import ConfigEntry, ConfigEntryDisabler
from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import DOMAIN, STORAGE_VERSION

_LOGGER = logging.getLogger(__name__)

OLD_DOMAIN = "taponbon"
OLD_CARD_URL = f"/{OLD_DOMAIN}/{OLD_DOMAIN}-card.js"
DASHBOARD_REPLACEMENTS = (
    (f"custom:{OLD_DOMAIN}-card", f"custom:{DOMAIN}-card"),
    (f"sensor.{OLD_DOMAIN}_", f"sensor.{DOMAIN}_"),
)


def old_entry(hass: HomeAssistant) -> ConfigEntry | None:
    entries = hass.config_entries.async_entries(OLD_DOMAIN)
    return entries[0] if entries else None


async def async_load_old_data(hass: HomeAssistant) -> dict[str, Any] | None:
    """The old cellar data, if any (read-only: the old file is kept)."""
    try:
        return await Store(hass, STORAGE_VERSION, OLD_DOMAIN).async_load()
    except Exception as err:  # never block setup on this
        _LOGGER.warning("Impossibile leggere i dati di TaponBon: %s", err)
        return None


def rewrite_dashboard(config: Any) -> tuple[Any, bool]:
    """Dashboard config with the old card type and sensor ids renamed."""
    text = json.dumps(config, ensure_ascii=False)
    new = text
    for old, repl in DASHBOARD_REPLACEMENTS:
        new = new.replace(old, repl)
    if new == text:
        return config, False
    return json.loads(new), True


async def async_migrate(hass: HomeAssistant, imported_data: bool) -> None:
    """Dashboards, old resource, old entry. Safe to run more than once."""
    dashboards = await _async_fix_dashboards(hass)
    await _async_drop_old_resource(hass)
    entry = old_entry(hass)
    disabled = False
    if entry is not None and entry.disabled_by is None:
        try:
            await hass.config_entries.async_set_disabled_by(entry.entry_id, ConfigEntryDisabler.USER)
            disabled = True
        except Exception as err:
            _LOGGER.warning("Impossibile disattivare TaponBon: %s", err)
    if not (imported_data or dashboards or disabled):
        return
    lines = ["Suro ha preso il posto di TaponBon."]
    if imported_data:
        lines.append("- Cantina, storico, desideri e impostazioni sono stati copiati.")
    if dashboards:
        lines.append(f"- Dashboard aggiornate: {', '.join(dashboards)}.")
    if disabled or entry is not None:
        lines.append("- La vecchia integrazione TaponBon è stata disattivata: eliminala da "
                     "Impostazioni → Dispositivi e servizi, poi rimuovi TaponBon da HACS e riavvia.")
    lines.append("- Le automazioni che usano eventi o servizi `taponbon` vanno aggiornate a `suro`.")
    persistent_notification.async_create(
        hass, "\n".join(lines), title="Suro", notification_id=f"{DOMAIN}_migrated"
    )


def _lovelace(hass: HomeAssistant) -> Any:
    try:
        from homeassistant.components.lovelace.const import LOVELACE_DATA

        data = hass.data.get(LOVELACE_DATA)
    except ImportError:
        data = None
    return data if data is not None else hass.data.get("lovelace")


async def _async_fix_dashboards(hass: HomeAssistant) -> list[str]:
    changed: list[str] = []
    lovelace = _lovelace(hass)
    dashboards = getattr(lovelace, "dashboards", None)
    if dashboards is None and isinstance(lovelace, dict):
        dashboards = lovelace.get("dashboards")
    for url_path, dashboard in (dashboards or {}).items():
        if not hasattr(dashboard, "async_save"):
            continue  # YAML dashboard: cannot be written
        try:
            config = await dashboard.async_load(False)
        except Exception:
            continue  # empty / auto-generated dashboard
        new, did = rewrite_dashboard(config)
        if not did:
            continue
        try:
            await dashboard.async_save(new)
            changed.append(url_path or "Panoramica")
        except Exception as err:
            _LOGGER.warning("Impossibile aggiornare la dashboard %s: %s", url_path, err)
    return changed


async def _async_drop_old_resource(hass: HomeAssistant) -> None:
    lovelace = _lovelace(hass)
    resources = getattr(lovelace, "resources", None)
    if resources is None and isinstance(lovelace, dict):
        resources = lovelace.get("resources")
    if resources is None or not hasattr(resources, "async_delete_item"):
        return
    try:
        ensure = getattr(resources, "_async_ensure_loaded", None)
        if ensure is not None:
            await ensure()
        for item in list(resources.async_items()):
            if str(item.get("url", "")).split("?")[0] == OLD_CARD_URL:
                await resources.async_delete_item(item["id"])
    except Exception as err:
        _LOGGER.warning("Impossibile rimuovere la vecchia risorsa della card: %s", err)
