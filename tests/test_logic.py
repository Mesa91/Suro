import io
from datetime import date

from tb import labels, logic as lg


def test_codes_unique_and_scans_round_trip():
    codes = set()
    for _ in range(300):
        codes.add(lg.new_code(codes))
    assert len(codes) == 300
    code = next(iter(codes))
    for raw in (lg.tag_id_for(code), lg.qr_payload_for(code), lg.qr_payload_for(code) + "/"):
        assert lg.parse_scanned(raw) == lg.Scanned("bottle", code=code)
    for raw in (None, "", "front-door", "taponbon-", "taponbon-OOO0", "corkdork-abc"):
        assert lg.parse_scanned(raw) is None


def test_slot_tag():
    tag = lg.slot_tag_id("rack-a", 2, 5)
    assert lg.parse_scanned(tag) == lg.Scanned("slot", rack_id="rack-a", row=2, col=5)


def test_plan_positions_fills_from_start_then_spills_over():
    racks = [{"id": "a", "rows": 2, "cols": 2, "order": 0}, {"id": "b", "rows": 1, "cols": 2, "order": 1}]
    bottles = [{"rack_id": "a", "row": 0, "col": 0}]
    plan = lg.plan_positions(racks, bottles, 6, "a", (1, 0))
    assert plan == [("a", 1, 0), ("a", 1, 1), ("a", 0, 1), ("b", 0, 0), ("b", 0, 1), (None, None, None)]


def test_window_status_and_alerts():
    today = date(2026, 11, 2)
    s = lambda b: lg.window_status(b, today, 180)[0]  # noqa: E731
    assert s({"drink_from": 2028, "drink_until": 2035}) == lg.STATUS_WAIT
    assert s({"drink_from": 2024, "drink_until": 2030}) == lg.STATUS_READY
    assert s({"drink_until": 2026}) == lg.STATUS_CLOSING
    assert s({"drink_until": 2025}) == lg.STATUS_PAST
    assert s({}) == lg.STATUS_UNKNOWN
    bottles = [
        {"id": "1", "name": "Barolo", "vintage": 2012, "drink_until": 2026},
        {"id": "2", "name": "barolo ", "vintage": 2012, "drink_until": 2026},
        {"id": "3", "name": "Soave", "vintage": 2019, "drink_until": 2023},
    ]
    groups = lg.drink_alerts(bottles, today, 180)
    assert [(e["name"], e["bottles"]) for e in groups["closing"]] == [("Barolo", 2)]
    assert [e["name"] for e in groups["past"]] == ["Soave"]


def test_label_renders_and_decodes_size():
    from PIL import Image

    lines = lg.label_lines({"name": "Brunello di Montalcino", "vintage": 2016, "producer": "Mastrojanni"},
                           "Rosso", "Scaffale · fila 2, posto 5")
    assert lines[:2] == ["Brunello di Montalcino", "2016 · Rosso"]
    png = labels.render_png("k7m2xq9p", lines)
    assert Image.open(io.BytesIO(png)).size == (labels.WIDTH, labels.HEIGHT)
    assert labels.qr_svg("k7m2xq9p").startswith("<svg")


def test_qr_only_label_is_square_and_decodable_size():
    from PIL import Image

    png = labels.render("k7m2xq9p", [], "qr")
    assert Image.open(io.BytesIO(png)).size == (labels.QR_PX, labels.QR_PX)
    assert labels.render("k7m2xq9p", ["A"], "full") != png
