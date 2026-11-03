import asyncio

from conftest import FakeStore
from tb.store import TaponBonStore


def load(disk):
    FakeStore.disk, FakeStore.saves = disk, 0
    st = TaponBonStore(None)
    asyncio.run(st.async_load())
    return st


def test_first_start_creates_a_rack():
    st = load(None)
    assert len(st.racks) == 1 and st.capacity() == 70
    assert FakeStore.saves == 1


def test_add_move_remove_restore_keeps_qr():
    st = load(None)
    rack = st.racks[0]["id"]
    added = st.add_bottles({"name": "Barolo", "vintage": "2016", "type": "red", "price": "35,5x"}, 3, rack, 0, 0)
    assert [(b["row"], b["col"]) for b in added] == [(0, 0), (0, 1), (0, 2)]
    assert added[0]["vintage"] == 2016 and added[0]["price"] is None
    assert len({b["code"] for b in added}) == 3

    # move onto an occupied slot swaps
    assert st.move_bottle(added[0]["id"], rack, 0, 1)
    assert (added[0]["col"], added[1]["col"]) == (1, 0)

    code = added[0]["code"]
    entry = st.remove_bottle(added[0]["id"], "drank")
    assert st.get_by_code(code) is None and st.history_by_code(code)["reason"] == "drank"
    back = st.restore(entry["history_id"])
    assert back["code"] == code and (back["row"], back["col"]) == (0, 1)


def test_shrinking_or_deleting_a_rack_never_loses_bottles():
    st = load(None)
    rack = st.racks[0]
    st.add_bottles({"name": "A"}, 1, rack["id"], 6, 9)
    _, displaced = st.save_rack({"id": rack["id"], "name": "Scaffale", "rows": 5, "cols": 5})
    assert displaced == 1 and st.bottles[0]["rack_id"] is None
    st.move_bottle(st.bottles[0]["id"], rack["id"], 0, 0)
    assert st.delete_rack(rack["id"]) == 1 and len(st.bottles) == 1


def test_codes_are_assigned_once_and_persisted():
    st = load({"racks": [], "bottles": [{"id": "x", "name": "A"}, {"id": "y", "name": "B", "code": "abc"},
                                         {"id": "z", "name": "C", "code": "abc"}], "history": [], "settings": {}})
    codes = [b["code"] for b in st.bottles]
    assert len(set(codes)) == 3 and codes[1] == "abc" and FakeStore.saves == 1
    st2 = load(FakeStore.disk)
    assert [b["code"] for b in st2.bottles] == codes and FakeStore.saves == 0


def test_shelves_with_different_sizes():
    st = load(None)
    rack, _ = st.save_rack({"id": st.racks[0]["id"], "name": "Mobile", "shelves": [3, 5]})
    assert st.capacity() == 8 and rack["rows"] == 2 and rack["cols"] == 5
    added = st.add_bottles({"name": "A"}, 4, rack["id"])
    assert [(b["row"], b["col"]) for b in added] == [(0, 0), (0, 1), (0, 2), (1, 0)]
    assert not st.move_bottle(added[0]["id"], rack["id"], 0, 4)  # shelf 0 has 3 places
    assert st.move_bottle(added[0]["id"], rack["id"], 1, 4)
    _, displaced = st.save_rack({"id": rack["id"], "name": "Mobile", "shelves": [3, 2]})
    assert displaced == 1 and st.free_count() == 2


def test_rating_on_remove_and_later():
    from tb.logic import cellar_value, wine_ratings
    st = load(None)
    rack = st.racks[0]["id"]
    a, b, c = st.add_bottles({"name": "Barolo", "vintage": 2016, "type": "red", "price": 38}, 3, rack, 0, 0)
    assert cellar_value(st.bottles) == {"total": 114.0, "priced": 3, "bottles": 3}
    e1 = st.remove_bottle(a["id"], "drank", 5, "  Splendido  ")
    assert (e1["rating"], e1["tasting_notes"]) == (5, "Splendido")
    e2 = st.remove_bottle(b["id"], "drank", 9, "")
    assert "rating" not in e2
    st.rate_history(e2["history_id"], 3, "un po' chiuso")
    r = wine_ratings(st.history)
    (only,) = r.values()
    assert only["rating"] == 4.0 and only["count"] == 2
    st.rate_history(e2["history_id"], None, "")
    assert "rating" not in e2 and "tasting_notes" not in e2
    back = st.restore(e1["history_id"])
    assert "rating" not in back and "tasting_notes" not in back
