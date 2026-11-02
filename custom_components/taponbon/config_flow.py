"""Config flow: one TaponBon per Home Assistant; options hold the Gemini key."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .ai import DEFAULT_MODEL, async_check_key
from .const import CONF_GEMINI_KEY, CONF_GEMINI_MODEL, DOMAIN, NAME


class TaponBonConfigFlow(ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()
        if user_input is not None:
            return self.async_create_entry(title=NAME, data={})
        return self.async_show_form(step_id="user")

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        return TaponBonOptionsFlow()


class TaponBonOptionsFlow(OptionsFlow):
    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        current = self.config_entry.options
        if user_input is not None:
            key = (user_input.get(CONF_GEMINI_KEY) or "").strip()
            model = (user_input.get(CONF_GEMINI_MODEL) or DEFAULT_MODEL).strip()
            if key:
                problem = await async_check_key(async_get_clientsession(self.hass), key, model)
                if problem:
                    errors["base"] = problem
            if not errors:
                return self.async_create_entry(data={CONF_GEMINI_KEY: key, CONF_GEMINI_MODEL: model})
        schema = vol.Schema({
            vol.Optional(CONF_GEMINI_KEY, default=current.get(CONF_GEMINI_KEY, "")): str,
            vol.Optional(CONF_GEMINI_MODEL, default=current.get(CONF_GEMINI_MODEL, DEFAULT_MODEL)): str,
        })
        return self.async_show_form(step_id="init", data_schema=schema, errors=errors)
