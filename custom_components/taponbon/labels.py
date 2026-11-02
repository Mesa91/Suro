"""Bottle labels: QR as SVG (for the card) and a printable 50 × 30 mm PNG.

The PNG is 400 × 240 px (50 × 30 mm at 203 dpi, the usual small thermal
label). It is written to ``<config>/taponbon_labels/<code>.png`` so printer
integrations that take an image path can use it.

Blocking: call these from an executor.
"""

from __future__ import annotations

import io
from pathlib import Path

from .logic import qr_payload_for

LABEL_DIR = "taponbon_labels"
WIDTH, HEIGHT = 400, 240


def qr_svg(code: str) -> str:
    import segno

    buf = io.BytesIO()
    segno.make(qr_payload_for(code), error="m").save(
        buf, kind="svg", scale=4, border=2, xmldecl=False, svgns=True, dark="#000", light="#fff"
    )
    return buf.getvalue().decode("utf-8")


def _font(size: int):
    from PIL import ImageFont

    for name in ("DejaVuSans-Bold.ttf", "DejaVuSans.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    try:
        return ImageFont.load_default(size=size)
    except TypeError:  # Pillow < 10.1
        return ImageFont.load_default()


def _wrap(draw, text: str, font, width: int, max_lines: int) -> list[str]:
    lines: list[str] = []
    current = ""
    for word in text.split():
        trial = f"{current} {word}".strip()
        if draw.textlength(trial, font=font) <= width:
            current = trial
            continue
        if current:
            lines.append(current)
        current = word
        if len(lines) == max_lines:
            break
    if current and len(lines) < max_lines:
        lines.append(current)
    if lines and " ".join(lines) != " ".join(text.split()):
        last = lines[-1]
        while last and draw.textlength(last + "…", font=font) > width:
            last = last[:-1]
        lines[-1] = last.rstrip() + "…"
    return lines


def render_png(code: str, lines: list[str]) -> bytes:
    """QR on the left, text on the right, black and white."""
    import segno
    from PIL import Image, ImageDraw

    label = Image.new("1", (WIDTH, HEIGHT), 1)
    buf = io.BytesIO()
    segno.make(qr_payload_for(code), error="m").save(buf, kind="png", scale=1, border=0)
    qr = Image.open(io.BytesIO(buf.getvalue())).convert("1")
    scale = max(1, 168 // qr.width)  # ~21 mm: comfortable for a phone camera
    qr = qr.resize((qr.width * scale, qr.height * scale), Image.NEAREST)
    label.paste(qr, (12, (HEIGHT - qr.height) // 2))

    draw = ImageDraw.Draw(label)
    x = 12 + qr.width + 14
    width = WIDTH - x - 8
    y = 18
    title = _font(26)
    for line in _wrap(draw, lines[0] if lines else "", title, width, 3):
        draw.text((x, y), line, font=title, fill=0)
        y += 29
    y += 6
    small = _font(19)
    for text in lines[1:]:
        for part in _wrap(draw, text, small, width, 2):
            if y > HEIGHT - 24:
                break
            draw.text((x, y), part, font=small, fill=0)
            y += 22
    draw.text((x, HEIGHT - 22), code, font=_font(16), fill=0)

    out = io.BytesIO()
    label.save(out, format="PNG")
    return out.getvalue()


def write_png(config_dir: str, code: str, lines: list[str]) -> str:
    folder = Path(config_dir) / LABEL_DIR
    folder.mkdir(parents=True, exist_ok=True)
    path = folder / f"{code}.png"
    path.write_bytes(render_png(code, lines))
    return str(path)
