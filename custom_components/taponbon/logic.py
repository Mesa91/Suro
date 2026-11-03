"""Pure logic: bottle codes, scanned tags, rack placement, drinking windows.

Nothing here imports Home Assistant, so it is tested on its own.

Bottle codes
------------
Every bottle has a short, stable ``code``. Its QR encodes the Home Assistant
tag URL ``https://www.home-assistant.io/tag/taponbon-<code>``: the companion
app turns a scan into the ``tag_scanned`` event with ``tag_id ==
"taponbon-<code>"``. A fixed reader may send the bare id or the whole URL.

A tag can also name a rack slot, ``taponbon-slot-<rack_id>/<row>/<col>``
(an NFC sticker on the shelf): scanning it takes out the bottle in that slot.

Drinking window
---------------
Bottles carry ``drink_from`` / ``drink_until`` years. The window is taken to
close on 31 December of ``drink_until``.
"""

from __future__ import annotations

import re
import secrets
from dataclasses import dataclass
from datetime import date
from typing import Any, Iterable

TAG_URL_PREFIX = "https://www.home-assistant.io/tag/"
TAG_PREFIX = "taponbon-"
SLOT_PREFIX = "taponbon-slot-"

# No 0/O, 1/l/I: the code is printed under the QR and may be typed by hand.
CODE_ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz"
CODE_LENGTH = 8


def new_code(existing: Iterable[str] = ()) -> str:
    """A fresh bottle code not in ``existing``."""
    taken = set(existing)
    while True:
        code = "".join(secrets.choice(CODE_ALPHABET) for _ in range(CODE_LENGTH))
        if code not in taken:
            return code


def new_id(prefix: str) -> str:
    return f"{prefix}{secrets.token_hex(5)}"


def tag_id_for(code: str) -> str:
    return f"{TAG_PREFIX}{code}"


def qr_payload_for(code: str) -> str:
    return f"{TAG_URL_PREFIX}{tag_id_for(code)}"


def slot_tag_id(rack_id: str, row: int, col: int) -> str:
    return f"{SLOT_PREFIX}{rack_id}/{row}/{col}"


@dataclass(frozen=True)
class Scanned:
    kind: str  # "bottle" | "slot"
    code: str = ""
    rack_id: str = ""
    row: int = -1
    col: int = -1


_SLOT_RE = re.compile(r"^(?P<rack>[A-Za-z0-9_-]+)/(?P<row>\d+)/(?P<col>\d+)$")


def parse_scanned(raw: str | None) -> Scanned | None:
    """Interpret a scanned tag id or URL; None if it is not ours."""
    if not raw:
        return None
    text = str(raw).strip()
    if "/tag/" in text:
        text = text.split("/tag/", 1)[1]
    text = text.split("?", 1)[0].split("#", 1)[0].strip().strip("/")
    lowered = text.lower()
    if lowered.startswith(SLOT_PREFIX):
        match = _SLOT_RE.match(text[len(SLOT_PREFIX):])
        if not match:
            return None
        return Scanned("slot", rack_id=match["rack"], row=int(match["row"]), col=int(match["col"]))
    if lowered.startswith(TAG_PREFIX):
        code = lowered[len(TAG_PREFIX):]
        if code and all(c in CODE_ALPHABET for c in code):
            return Scanned("bottle", code=code)
    return None


# ── Racks and placement ───────────────────────────────────────────────────────

def occupied(bottles: Iterable[dict[str, Any]], rack_id: str) -> set[tuple[int, int]]:
    return {
        (b["row"], b["col"]) for b in bottles
        if b.get("rack_id") == rack_id and b.get("row") is not None and b.get("col") is not None
    }


def shelves_of(rack: dict[str, Any]) -> list[int]:
    """Bottles per shelf, top to bottom (older racks: a plain rows × cols grid)."""
    shelves = rack.get("shelves")
    if isinstance(shelves, list) and shelves:
        return [max(1, int(n)) for n in shelves]
    return [int(rack.get("cols") or 1)] * int(rack.get("rows") or 1)


def slot_exists(rack: dict[str, Any], row: int | None, col: int | None) -> bool:
    shelves = shelves_of(rack)
    return row is not None and col is not None and 0 <= row < len(shelves) and 0 <= col < shelves[row]


def rack_capacity(rack: dict[str, Any]) -> int:
    return sum(shelves_of(rack))


def free_slots(rack: dict[str, Any], bottles: Iterable[dict[str, Any]]) -> list[tuple[int, int]]:
    """Free slots of a rack, shelf by shelf from the top left."""
    taken = occupied(bottles, rack["id"])
    return [
        (r, c) for r, n in enumerate(shelves_of(rack)) for c in range(n) if (r, c) not in taken
    ]


def plan_positions(
    racks: list[dict[str, Any]],
    bottles: list[dict[str, Any]],
    quantity: int,
    rack_id: str | None = None,
    start: tuple[int, int] | None = None,
) -> list[tuple[str | None, int | None, int | None]]:
    """Where ``quantity`` new bottles go.

    From ``start`` in ``rack_id`` onwards if given, then any free slot in that
    rack, then the other racks in order. Bottles that do not fit stay
    unplaced (rack None) rather than being refused.
    """
    ordered = sorted(racks, key=lambda r: r.get("order", 0))
    if rack_id:
        ordered = [r for r in ordered if r["id"] == rack_id] + [r for r in ordered if r["id"] != rack_id]
    plan: list[tuple[str | None, int | None, int | None]] = []
    taken_extra: dict[str, set[tuple[int, int]]] = {}
    for rack in ordered:
        slots = free_slots(rack, bottles)
        if start and rack["id"] == rack_id:
            slots = [s for s in slots if s >= start] + [s for s in slots if s < start]
        for slot in slots:
            if len(plan) == quantity:
                break
            if slot in taken_extra.get(rack["id"], set()):
                continue
            taken_extra.setdefault(rack["id"], set()).add(slot)
            plan.append((rack["id"], slot[0], slot[1]))
    while len(plan) < quantity:
        plan.append((None, None, None))
    return plan


def location_text(bottle: dict[str, Any], racks: list[dict[str, Any]]) -> str:
    rack = next((r for r in racks if r["id"] == bottle.get("rack_id")), None)
    if not rack or bottle.get("row") is None or bottle.get("col") is None:
        return "Da sistemare"
    return f"{rack['name']} · mensola {bottle['row'] + 1}, posto {bottle['col'] + 1}"


# ── Drinking window ───────────────────────────────────────────────────────────

STATUS_UNKNOWN = "unknown"
STATUS_WAIT = "wait"        # not open yet
STATUS_READY = "ready"      # inside the window
STATUS_CLOSING = "closing"  # inside, near the end
STATUS_PAST = "past"        # closed


def _year(value: Any) -> int | None:
    try:
        year = int(value)
    except (TypeError, ValueError):
        return None
    return year if 1800 <= year <= 2200 else None


def window_status(bottle: dict[str, Any], today: date, lead_days: int) -> tuple[str, int | None]:
    """(status, days until the window closes)."""
    start, end = _year(bottle.get("drink_from")), _year(bottle.get("drink_until"))
    if end is None:
        return STATUS_UNKNOWN, None
    days_left = (date(end, 12, 31) - today).days
    if days_left < 0:
        return STATUS_PAST, days_left
    if start is not None and today < date(start, 1, 1):
        return STATUS_WAIT, days_left
    if days_left <= lead_days:
        return STATUS_CLOSING, days_left
    return STATUS_READY, days_left


def wine_key(bottle: dict[str, Any]) -> str:
    """Bottles of the same wine share this key (case/space-insensitive)."""
    name = re.sub(r"\s+", " ", str(bottle.get("name") or "")).strip().lower()
    producer = re.sub(r"\s+", " ", str(bottle.get("producer") or "")).strip().lower()
    return f"{name}|{producer}|{bottle.get('vintage') or ''}"


def drink_alerts(bottles: Iterable[dict[str, Any]], today: date, lead_days: int) -> dict[str, list[dict[str, Any]]]:
    """Wines that need attention, one entry per wine: {"closing": [...], "past": [...]}."""
    groups: dict[str, dict[str, dict[str, Any]]] = {STATUS_CLOSING: {}, STATUS_PAST: {}}
    for b in bottles:
        status, days_left = window_status(b, today, lead_days)
        if status not in groups:
            continue
        key = f"{status}|{wine_key(b)}"
        entry = groups[status].setdefault(key, {
            "key": key,
            "name": b.get("name") or "",
            "producer": b.get("producer") or "",
            "vintage": b.get("vintage"),
            "type": b.get("type") or "",
            "drink_from": b.get("drink_from"),
            "drink_until": b.get("drink_until"),
            "days_left": days_left,
            "bottles": 0,
            "bottle_ids": [],
        })
        entry["bottles"] += 1
        entry["bottle_ids"].append(b.get("id"))
    return {
        status: sorted(items.values(), key=lambda e: (e["days_left"], e["name"]))
        for status, items in groups.items()
    }


def label_lines(bottle: dict[str, Any], type_label: str, location: str) -> list[str]:
    """Text printed next to the QR, most important first."""
    lines = [str(bottle.get("name") or "Vino").strip()]
    second = " · ".join(str(p) for p in (bottle.get("vintage"), type_label) if p)
    if second:
        lines.append(second)
    if bottle.get("producer"):
        lines.append(str(bottle["producer"]).strip())
    if location:
        lines.append(location)
    return lines


# ── Cellar climate ────────────────────────────────────────────────────────────

def climate_status(value: Any, low: float, high: float) -> str | None:
    """"ok", "low", "high", or None when the reading is unavailable."""
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    if number < low:
        return "low"
    if number > high:
        return "high"
    return "ok"
