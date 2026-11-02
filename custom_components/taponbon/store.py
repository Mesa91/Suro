"""Persisted data: racks, bottles, history, settings (``.storage/taponbon``).

One record per physical bottle. Wine details are copied onto each bottle,
so a bottle stays self-contained when it moves to the history.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import DEFAULT_RACK, MAX_RACK_SIDE, STORAGE_KEY, STORAGE_VERSION, WINE_TYPES
from .logic import new_code, new_id, occupied, plan_positions, rack_capacity, shelves_of, slot_exists

# Wine fields a bottle carries; anything else sent by a client is ignored.
WINE_FIELDS = {
    "name": str, "producer": str, "vintage": int, "type": str, "region": str,
    "country": str, "grape": str, "drink_from": int, "drink_until": int,
    "price": float, "notes": str, "description": str, "food_pairings": str,
    "alcohol": str, "image": str,
}


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def clean_wine(data: dict[str, Any]) -> dict[str, Any]:
    """Keep known fields, coerce types, turn empty values into None/""."""
    out: dict[str, Any] = {}
    for key, kind in WINE_FIELDS.items():
        if key not in data:
            continue
        value = data[key]
        if value in (None, ""):
            out[key] = None if kind in (int, float) else ""
            continue
        try:
            out[key] = kind(value) if kind is not str else str(value).strip()
        except (TypeError, ValueError):
            out[key] = None
    if "type" in out and out["type"] not in WINE_TYPES:
        out["type"] = "red"
    return out


class TaponBonStore:
    """All cellar data, with the operations the card and services need."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.data: dict[str, Any] = {}

    # ── persistence ──────────────────────────────────────────────────────────

    async def async_load(self) -> None:
        data = await self._store.async_load()
        if data is None:
            data = {
                "racks": [{"id": "rack-a", "order": 0, **DEFAULT_RACK,
                           "shelves": [DEFAULT_RACK["cols"]] * DEFAULT_RACK["rows"]}],
                "bottles": [],
                "history": [],
                "settings": {},
            }
            self.data = data
            await self.async_save()
            return
        self.data = data
        for key, default in (("racks", []), ("bottles", []), ("history", []), ("settings", {})):
            self.data.setdefault(key, default)
        for rack in self.racks:
            if not rack.get("shelves"):
                rack["shelves"] = shelves_of(rack)
        if self._ensure_codes():
            # A code that only lived in memory would change at the next
            # restart, and its printed label would stop working.
            await self.async_save()

    async def async_save(self) -> None:
        await self._store.async_save(self.data)

    def _ensure_codes(self) -> bool:
        changed = False
        seen: set[str] = set()
        for b in self.bottles:
            if not b.get("code") or b["code"] in seen:
                b["code"] = new_code(seen | self._all_codes())
                changed = True
            seen.add(b["code"])
        return changed

    # ── accessors ────────────────────────────────────────────────────────────

    @property
    def racks(self) -> list[dict[str, Any]]:
        return self.data["racks"]

    @property
    def bottles(self) -> list[dict[str, Any]]:
        return self.data["bottles"]

    @property
    def history(self) -> list[dict[str, Any]]:
        return self.data["history"]

    @property
    def settings(self) -> dict[str, Any]:
        return self.data["settings"]

    def _all_codes(self) -> set[str]:
        codes = {b.get("code") for b in self.bottles}
        codes |= {h.get("code") for h in self.history}
        return {c for c in codes if c}

    def get_bottle(self, bottle_id: str) -> dict[str, Any] | None:
        return next((b for b in self.bottles if b["id"] == bottle_id), None)

    def get_by_code(self, code: str) -> dict[str, Any] | None:
        return next((b for b in self.bottles if b.get("code") == code), None)

    def history_by_code(self, code: str) -> dict[str, Any] | None:
        return next((h for h in reversed(self.history) if h.get("code") == code), None)

    def bottle_at(self, rack_id: str, row: int, col: int) -> dict[str, Any] | None:
        return next(
            (b for b in self.bottles
             if b.get("rack_id") == rack_id and b.get("row") == row and b.get("col") == col),
            None,
        )

    def get_rack(self, rack_id: str | None) -> dict[str, Any] | None:
        return next((r for r in self.racks if r["id"] == rack_id), None)

    # ── bottles ──────────────────────────────────────────────────────────────

    def add_bottles(
        self,
        wine: dict[str, Any],
        quantity: int = 1,
        rack_id: str | None = None,
        row: int | None = None,
        col: int | None = None,
    ) -> list[dict[str, Any]]:
        """Add ``quantity`` bottles of one wine, filling free slots from (row, col)."""
        quantity = max(1, min(100, int(quantity)))
        start = (row, col) if row is not None and col is not None else None
        plan = plan_positions(self.racks, self.bottles, quantity, rack_id, start)
        details = clean_wine(wine)
        details.setdefault("name", "Vino")
        details.setdefault("type", "red")
        added = []
        codes = self._all_codes()
        for rack, r, c in plan:
            code = new_code(codes)
            codes.add(code)
            bottle = {
                "id": new_id("b"),
                "code": code,
                **details,
                "rack_id": rack,
                "row": r,
                "col": c,
                "added_at": _now(),
            }
            self.bottles.append(bottle)
            added.append(bottle)
        return added

    def update_bottle(self, bottle_id: str, changes: dict[str, Any], same_wine: bool = False) -> list[dict[str, Any]]:
        """Edit a bottle's wine details; with ``same_wine`` every bottle of that wine."""
        from .logic import wine_key

        bottle = self.get_bottle(bottle_id)
        if bottle is None:
            return []
        targets = [bottle]
        if same_wine:
            key = wine_key(bottle)
            targets = [b for b in self.bottles if wine_key(b) == key]
        details = clean_wine(changes)
        for b in targets:
            b.update(details)
        return targets

    def move_bottle(self, bottle_id: str, rack_id: str | None, row: int | None, col: int | None) -> bool:
        """Move to a slot; whoever was there swaps into the old slot."""
        bottle = self.get_bottle(bottle_id)
        if bottle is None:
            return False
        if rack_id is None:
            bottle.update(rack_id=None, row=None, col=None)
            return True
        rack = self.get_rack(rack_id)
        if rack is None or not slot_exists(rack, row, col):
            return False
        other = self.bottle_at(rack_id, row, col)
        if other is not None and other is not bottle:
            other.update(rack_id=bottle.get("rack_id"), row=bottle.get("row"), col=bottle.get("col"))
        bottle.update(rack_id=rack_id, row=row, col=col)
        return True

    def remove_bottle(self, bottle_id: str, reason: str = "drank") -> dict[str, Any] | None:
        """Take a bottle out of the cellar; it goes to the history."""
        bottle = self.get_bottle(bottle_id)
        if bottle is None:
            return None
        self.bottles.remove(bottle)
        entry = {**bottle, "history_id": new_id("h"), "removed_at": _now(), "reason": reason}
        self.history.append(entry)
        return entry

    def restore(self, history_id: str) -> dict[str, Any] | None:
        """Put a bottle back: its old slot if free, otherwise unplaced. Keeps its QR."""
        entry = next((h for h in self.history if h.get("history_id") == history_id), None)
        if entry is None:
            return None
        self.history.remove(entry)
        bottle = {k: v for k, v in entry.items() if k not in ("history_id", "removed_at", "reason")}
        rack = self.get_rack(bottle.get("rack_id"))
        slot_ok = (
            rack is not None and slot_exists(rack, bottle.get("row"), bottle.get("col"))
            and self.bottle_at(rack["id"], bottle["row"], bottle["col"]) is None
        )
        if not slot_ok:
            bottle.update(rack_id=None, row=None, col=None)
        if self.get_by_code(bottle.get("code", "")):
            bottle["code"] = new_code(self._all_codes())
        self.bottles.append(bottle)
        return bottle

    # ── racks ────────────────────────────────────────────────────────────────

    def save_rack(self, rack: dict[str, Any]) -> tuple[dict[str, Any], int]:
        """Create or update a rack. Returns (rack, bottles moved to unplaced)."""
        if isinstance(rack.get("shelves"), list) and rack["shelves"]:
            shelves = [max(1, min(MAX_RACK_SIDE, int(n or 1))) for n in rack["shelves"][:MAX_RACK_SIDE]]
        else:
            shelves = [max(1, min(MAX_RACK_SIDE, int(rack.get("cols") or 1)))] * max(
                1, min(MAX_RACK_SIDE, int(rack.get("rows") or 1))
            )
        name = str(rack.get("name") or "Scaffale").strip()[:40] or "Scaffale"
        existing = self.get_rack(rack.get("id"))
        if existing is None:
            existing = {"id": new_id("rack-"), "order": len(self.racks)}
            self.racks.append(existing)
        existing.update(name=name, shelves=shelves, rows=len(shelves), cols=max(shelves))
        displaced = 0
        for b in self.bottles:
            if b.get("rack_id") == existing["id"] and not slot_exists(existing, b.get("row"), b.get("col")):
                b.update(rack_id=None, row=None, col=None)
                displaced += 1
        return existing, displaced

    def delete_rack(self, rack_id: str) -> int:
        """Remove a rack; its bottles become unplaced (never deleted)."""
        rack = self.get_rack(rack_id)
        if rack is None:
            return 0
        self.racks.remove(rack)
        moved = 0
        for b in self.bottles:
            if b.get("rack_id") == rack_id:
                b.update(rack_id=None, row=None, col=None)
                moved += 1
        for i, r in enumerate(sorted(self.racks, key=lambda r: r.get("order", 0))):
            r["order"] = i
        return moved

    def capacity(self) -> int:
        return sum(rack_capacity(r) for r in self.racks)

    def free_count(self) -> int:
        return sum(rack_capacity(r) - len(occupied(self.bottles, r["id"])) for r in self.racks)
