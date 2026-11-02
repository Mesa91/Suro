"""Gemini: read a wine label photo, or complete a wine from its name.

No Home Assistant imports here: the HTTP session is passed in, and the
prompt/parsing helpers are pure, so they are tested on their own.
"""

from __future__ import annotations

import json
import re
from datetime import date
from typing import Any

API = "https://generativelanguage.googleapis.com/v1beta/models"
# An alias Google keeps pointing at its newest Flash model, so a model being
# retired never breaks label reading.
DEFAULT_MODEL = "gemini-flash-latest"
TIMEOUT = 30  # per attempt; a busy model then falls back to Flash-Lite

TYPES = ("red", "white", "rose", "sparkling", "dessert")

FIELDS_DOC = """\
- "name": nome del vino come in etichetta, senza produttore né annata (es. "Barolo Cannubi")
- "producer": cantina / produttore
- "vintage": annata (numero intero) oppure null se non millesimato
- "type": uno tra "red", "white", "rose", "sparkling", "dessert"
- "region": denominazione o zona (es. "Barolo DOCG, Piemonte")
- "country": paese, in italiano
- "grape": vitigno o uvaggio
- "alcohol": gradazione, es. "14%"
- "drink_from": primo anno consigliato per berlo (intero)
- "drink_until": ultimo anno consigliato per berlo (intero)
- "description": 2-3 frasi in italiano su stile, profumi e gusto
- "food_pairings": 3-5 abbinamenti in italiano separati da virgola
"""


def label_prompt(today: date | None = None) -> str:
    year = (today or date.today()).year
    return f"""Sei un sommelier esperto. Guarda la foto dell'etichetta di questo vino (se
le foto sono due, la prima è il fronte e la seconda il retro: usale entrambe) e
restituisci SOLO un oggetto JSON con questi campi:
{FIELDS_DOC}
Regole: quello che leggi in etichetta ha la precedenza; quello che non si legge
(finestra di beva, descrizione, abbinamenti, vitigno se assente) stimalo dalle
tue conoscenze sul vino e sull'annata. L'anno corrente è {year}. Se un campo è
davvero impossibile da stabilire usa null. Niente testo fuori dal JSON."""


def fill_prompt(wine: dict[str, Any], today: date | None = None) -> str:
    year = (today or date.today()).year
    known = {k: v for k, v in wine.items() if v not in (None, "") and k in (
        "name", "producer", "vintage", "type", "region", "country", "grape")}
    return f"""Sei un sommelier esperto. Di questo vino conosco:
{json.dumps(known, ensure_ascii=False)}
Restituisci SOLO un oggetto JSON con questi campi, completando quelli mancanti
con le tue conoscenze (non cambiare quelli noti se non sono chiaramente errati):
{FIELDS_DOC}
L'anno corrente è {year}. Se un campo è impossibile da stabilire usa null."""


def _int_year(value: Any) -> int | None:
    match = re.search(r"\b(1[89]\d\d|20\d\d|21\d\d)\b", str(value or ""))
    return int(match.group(1)) if match else None


def normalize(raw: dict[str, Any]) -> dict[str, Any]:
    """Turn Gemini's answer into clean wine fields (unknown keys dropped)."""
    out: dict[str, Any] = {}
    for key in ("name", "producer", "region", "country", "grape", "alcohol", "description", "food_pairings"):
        value = raw.get(key)
        if isinstance(value, list):
            value = ", ".join(str(v) for v in value if v)
        if value not in (None, "") and str(value).strip().lower() not in ("null", "none", "n/a"):
            out[key] = str(value).strip()
    for key in ("vintage", "drink_from", "drink_until"):
        year = _int_year(raw.get(key))
        if year:
            out[key] = year
    kind = str(raw.get("type") or "").strip().lower()
    aliases = {"rosé": "rose", "rosato": "rose", "rosso": "red", "bianco": "white",
               "spumante": "sparkling", "bollicine": "sparkling", "champagne": "sparkling",
               "dolce": "dessert", "passito": "dessert", "fortified": "dessert"}
    kind = aliases.get(kind, kind)
    if kind in TYPES:
        out["type"] = kind
    if out.get("drink_from") and out.get("drink_until") and out["drink_from"] > out["drink_until"]:
        out["drink_from"], out["drink_until"] = out["drink_until"], out["drink_from"]
    if isinstance(out.get("alcohol"), str) and re.fullmatch(r"\d+([.,]\d+)?", out["alcohol"]):
        out["alcohol"] += "%"
    return out


def parse_response(payload: dict[str, Any]) -> dict[str, Any]:
    """Extract and normalise the JSON object from a generateContent response."""
    try:
        text = "".join(p.get("text", "") for p in payload["candidates"][0]["content"]["parts"])
    except (KeyError, IndexError, TypeError) as err:
        reason = (payload.get("promptFeedback") or {}).get("blockReason") if isinstance(payload, dict) else None
        raise AIError(f"Risposta vuota da Gemini{f' ({reason})' if reason else ''}") from err
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?|```$", "", text, flags=re.M).strip()
    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", text, re.S)
        if not match:
            raise AIError("Gemini non ha risposto con dei dati leggibili") from None
        data = json.loads(match.group(0))
    if isinstance(data, list):
        data = data[0] if data else {}
    return normalize(data)


class AIError(Exception):
    """Something the user should read (in Italian)."""


class ModelNotFound(AIError):
    """The configured model does not exist (any more) for this key."""


class ModelBusy(AIError):
    """Google is overloaded or too slow right now (503/500/timeout)."""


_SKIP = ("image", "tts", "live", "audio", "embed", "robotics", "computer", "exp", "learnlm", "gemma", "nano")


def choose_model(models: list[dict[str, Any]], lite: bool = False) -> str | None:
    """Best general-purpose Flash model from a models.list answer.

    Stable before preview, then full Flash before Flash-Lite (or the other way
    round with ``lite``), newest version first.
    """
    best: tuple | None = None
    choice = None
    for m in models:
        name = str(m.get("name", "")).removeprefix("models/")
        if not name.startswith("gemini-") or "flash" not in name:
            continue
        if "generateContent" not in (m.get("supportedGenerationMethods") or []):
            continue
        if any(token in name for token in _SKIP):
            continue
        version = re.search(r"gemini-(\d+(?:\.\d+)?)", name)
        rank = (
            "preview" not in name and "latest" not in name,
            ("lite" in name) == lite,
            float(version.group(1)) if version else 0.0,
            -len(name),
        )
        if best is None or rank > best:
            best, choice = rank, name
    return choice


async def async_pick_model(session, api_key: str, lite: bool = False) -> str | None:
    """Ask Google which models this key can use and pick the best Flash."""
    import aiohttp

    try:
        async with session.get(
            f"{API}?pageSize=200", headers={"x-goog-api-key": api_key},
            timeout=aiohttp.ClientTimeout(total=15),
        ) as resp:
            if resp.status != 200:
                return None
            payload = await resp.json(content_type=None)
    except (TimeoutError, aiohttp.ClientError):
        return None
    return choose_model(payload.get("models") or [], lite)


def _strip_data_url(image: str) -> tuple[str, str]:
    if image.startswith("data:"):
        head, _, data = image.partition(",")
        mime = head[5:].split(";")[0] or "image/jpeg"
        return mime, data
    return "image/jpeg", image


_resolved: dict[str, str] = {}


async def async_generate(session, api_key: str, model: str, prompt: str, images: list[str] | None = None) -> dict[str, Any]:
    """Call Gemini; if the model is gone, switch to the best available Flash."""
    model = _resolved.get(model or DEFAULT_MODEL, model or DEFAULT_MODEL)
    try:
        return await _async_call(session, api_key, model, prompt, images)
    except ModelNotFound:
        replacement = await async_pick_model(session, api_key)
        if not replacement or replacement == model:
            raise
        _resolved[model] = replacement
        return await _async_call(session, api_key, replacement, prompt, images)
    except ModelBusy:
        # The free tier is often the first to be throttled on the big model;
        # Flash-Lite is lighter, quicker and reads labels just as well.
        lite = await async_pick_model(session, api_key, lite=True) or "gemini-flash-lite-latest"
        if lite == model:
            raise
        return await _async_call(session, api_key, lite, prompt, images)


async def _async_call(session, api_key: str, model: str, prompt: str, images: list[str] | None) -> dict[str, Any]:
    import aiohttp

    parts: list[dict[str, Any]] = []
    for image in images or []:
        mime, data = _strip_data_url(image)
        parts.append({"inline_data": {"mime_type": mime, "data": data}})
    parts.append({"text": prompt})
    body = {
        "contents": [{"role": "user", "parts": parts}],
        "generationConfig": {"temperature": 0.2, "responseMimeType": "application/json"},
    }
    url = f"{API}/{model}:generateContent"
    try:
        async with session.post(
            url, json=body, headers={"x-goog-api-key": api_key},
            timeout=aiohttp.ClientTimeout(total=TIMEOUT),
        ) as resp:
            payload = await resp.json(content_type=None)
            if resp.status != 200:
                message = ((payload or {}).get("error") or {}).get("message", "")
                if resp.status in (401, 403) or "API key" in message:
                    raise AIError("La chiave Gemini non è valida. Controllala nelle opzioni di TaponBon.")
                if resp.status in (500, 502, 503, 504):
                    raise ModelBusy("Gemini è sovraccarico in questo momento: riprova tra qualche minuto.")
                if resp.status == 429:
                    raise AIError("Limite gratuito di Gemini raggiunto per ora: riprova più tardi.")
                if resp.status == 404:
                    raise ModelNotFound(f"Il modello \"{model}\" non è disponibile e non ne ho trovato un altro: "
                                        "controlla il modello nelle opzioni di TaponBon.")
                raise AIError(f"Gemini ha risposto con un errore ({resp.status}): {message[:200]}")
    except TimeoutError as err:
        raise ModelBusy("Gemini non ha risposto in tempo: riprova tra qualche minuto.") from err
    except aiohttp.ClientError as err:
        raise AIError(f"Impossibile contattare Gemini: {err}") from err
    return parse_response(payload)


async def async_check_key(session, api_key: str, model: str) -> str | None:
    """None if the key works, otherwise an error code for the options form."""
    import aiohttp

    try:
        async with session.get(
            f"{API}?pageSize=200", headers={"x-goog-api-key": api_key},
            timeout=aiohttp.ClientTimeout(total=15),
        ) as resp:
            if resp.status != 200:
                return "invalid_key"
            payload = await resp.json(content_type=None)
    except (TimeoutError, aiohttp.ClientError):
        return "cannot_connect"
    names = {str(m.get("name", "")).removeprefix("models/") for m in payload.get("models") or []}
    wanted = (model or DEFAULT_MODEL).strip()
    if wanted.endswith("-latest") or wanted in names:
        return None
    return "bad_model"
