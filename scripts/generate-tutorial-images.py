#!/usr/bin/env python3
"""
Generator gambar tutorial beranotasi (DERIZ & MPCS).

Jalankan dari root project:
    pip install pillow
    python3 scripts/generate-tutorial-images.py

Input : public/plugin/deriz.webp, public/plugin/mpcs.webp  (screenshot asli)
Output: public/tutorial/deriz-annotated.webp, public/tutorial/mpcs-annotated.webp

Cara edit: ubah daftar ITEMS di bawah (nomor, label singkat, kotak target,
posisi label). Nomor di sini HARUS sama dengan nomor di lib/tutorials.js.
Koordinat target memakai koordinat screenshot ASLI (sebelum di-scale).
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public", "plugin")
OUT = os.path.join(ROOT, "public", "tutorial")
os.makedirs(OUT, exist_ok=True)

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
BG = (14, 13, 20)
ACCENT = (255, 196, 64)      # kuning: highlight + garis
PILL_BG = (28, 26, 40)
WHITE = (245, 244, 250)


def font(size):
    return ImageFont.truetype(FONT_BOLD, size)


def pill_width(label):
    """Lebar pill (harus sama dengan hitungan di annotate)."""
    tmp = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    return tmp.textlength(label, font=font(30)) + 2 * 24 + 28


def chain_right(labels, right_edge, y, gap=14):
    """Susun pill berurutan dari kiri ke kanan, rata kanan di right_edge. Return list pusat (cx, y)."""
    widths = [pill_width(l) for l in labels]
    x = right_edge - (sum(widths) + gap * (len(widths) - 1))
    out = []
    for w in widths:
        out.append((x + w / 2, y))
        x += w + gap
    return out


def draw_dashed_rect(d, box, color, width=3, dash=12, gap=8, radius=10):
    x0, y0, x1, y1 = box
    # rounded corner sederhana: gambar garis putus-putus di tepi, lalu sudut bulat tipis
    def hline(y, xa, xb):
        x = xa
        while x < xb:
            d.line([(x, y), (min(x + dash, xb), y)], fill=color, width=width)
            x += dash + gap

    def vline(x, ya, yb):
        y = ya
        while y < yb:
            d.line([(x, y), (x, min(y + dash, yb))], fill=color, width=width)
            y += dash + gap

    hline(y0, x0 + radius, x1 - radius)
    hline(y1, x0 + radius, x1 - radius)
    vline(x0, y0 + radius, y1 - radius)
    vline(x1, y0 + radius, y1 - radius)
    for (cx, cy, a) in [
        (x0 + radius, y0 + radius, 180),
        (x1 - radius, y0 + radius, 270),
        (x1 - radius, y1 - radius, 0),
        (x0 + radius, y1 - radius, 90),
    ]:
        d.arc([cx - radius, cy - radius, cx + radius, cy + radius], a, a + 90, fill=color, width=width)


def badge(d, cx, cy, n, r, f):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=ACCENT, outline=BG, width=3)
    t = str(n)
    w = d.textlength(t, font=f)
    asc, desc = f.getmetrics()
    d.text((cx - w / 2, cy - (asc + desc) / 2 - 1), t, font=f, fill=(20, 16, 4))


def annotate(src_name, out_name, scale, pad, items):
    """
    pad   = (kiri, atas, kanan, bawah) margin kanvas dalam piksel hasil.
    items = list dict:
        n      nomor
        label  teks singkat di pill
        box    (x0,y0,x1,y1) elemen target di screenshot asli
        pill   (cx, cy) pusat pill, koordinat kanvas hasil
        anchor "l"|"r"|"t"|"b"  sisi kotak target tempat garis menempel
                (default: otomatis)
    """
    im = Image.open(os.path.join(SRC, src_name)).convert("RGB")
    w, h = im.size
    im = im.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    pl, pt, pr, pb = pad
    W, H = im.size[0] + pl + pr, im.size[1] + pt + pb
    canvas = Image.new("RGB", (W, H), BG)
    canvas.paste(im, (pl, pt))
    d = ImageDraw.Draw(canvas)

    f_label = font(30)
    f_num = font(28)
    r = 24

    # urutan: garis & kotak dulu, pill di atasnya
    pills = []
    for it in items:
        x0, y0, x1, y1 = it["box"]
        bx0, by0 = pl + x0 * scale, pt + y0 * scale
        bx1, by1 = pl + x1 * scale, pt + y1 * scale
        draw_dashed_rect(d, (bx0, by0, bx1, by1), ACCENT)

        pcx, pcy = it["pill"]
        tw = d.textlength(it["label"], font=f_label)
        pw, ph = tw + 2 * r + 28, 2 * r + 4
        px0, py0 = pcx - pw / 2, pcy - ph / 2

        # titik tempel di kotak target
        anchor = it.get("anchor")
        if anchor is None:
            if pcy < by0 - 10:
                anchor = "t"
            elif pcy > by1 + 10:
                anchor = "b"
            elif pcx < bx0:
                anchor = "l"
            else:
                anchor = "r"
        ax, ay = {
            "t": ((bx0 + bx1) / 2, by0),
            "b": ((bx0 + bx1) / 2, by1),
            "l": (bx0, (by0 + by1) / 2),
            "r": (bx1, (by0 + by1) / 2),
        }[anchor]
        if "line_x" in it:      # paksa x titik tempel (untuk kotak lebar)
            ax = pl + it["line_x"] * scale
        if "line_y" in it:
            ay = pt + it["line_y"] * scale

        # titik keluar dari pill
        if anchor == "t":
            sx, sy = max(px0 + r, min(ax, px0 + pw - r)), py0 + ph
        elif anchor == "b":
            sx, sy = max(px0 + r, min(ax, px0 + pw - r)), py0
        elif anchor == "l":
            sx, sy = px0 + pw, pcy
        else:
            sx, sy = px0, pcy
        if not it.get("inside"):
            d.line([(sx, sy), (ax, ay)], fill=ACCENT, width=3)
            d.ellipse([ax - 6, ay - 6, ax + 6, ay + 6], fill=ACCENT)
        pills.append((it, px0, py0, pw, ph, pcx, pcy))

    for it, px0, py0, pw, ph, pcx, pcy in pills:
        d.rounded_rectangle([px0, py0, px0 + pw, py0 + ph], radius=ph / 2, fill=PILL_BG, outline=ACCENT, width=3)
        badge(d, px0 + r + 2, pcy, it["n"], r - 2, f_num)
        d.text((px0 + 2 * r + 14, pcy - 18), it["label"], font=f_label, fill=WHITE)

    out = os.path.join(OUT, out_name)
    canvas.save(out, "WEBP", quality=92, method=6)
    print(out, canvas.size)


# ---------------------------------------------------------------- DERIZ
# screenshot asli 720x465 -> scale 2 (1440x930)
TOP_D = chain_right(["Menu", "Indikator", "Tutup"], right_edge=400 + 1440 + 20, y=62)
annotate(
    "deriz.webp",
    "deriz-annotated.webp",
    scale=2,
    pad=(400, 150, 430, 60),
    items=[
        dict(n=1, label="Canvas Audio", box=(22, 70, 602, 330), pill=(200, 150 + 2 * 120), anchor="l", line_y=120),
        dict(n=2, label="Upload audio", box=(195, 172, 430, 226), pill=(200, 150 + 2 * 199), anchor="l"),
        dict(n=3, label="Zoom Canvas", box=(22, 336, 602, 356), pill=(200, 150 + 2 * 346), anchor="l"),
        dict(n=4, label="Keyboard", box=(22, 372, 700, 450), pill=(200, 150 + 2 * 411), anchor="l"),
        dict(n=5, label="Knob Speed", box=(630, 72, 688, 128), pill=(1440 + 400 + 215, 150 + 2 * 100), anchor="r"),
        dict(n=6, label="Knob Pitch", box=(630, 158, 688, 214), pill=(1440 + 400 + 215, 150 + 2 * 186), anchor="r"),
        dict(n=7, label="Knob Volume", box=(630, 247, 688, 304), pill=(1440 + 400 + 215, 150 + 2 * 276), anchor="r"),
        dict(n=8, label="Menu", box=(564, 22, 594, 52), pill=TOP_D[0], anchor="b"),
        dict(n=9, label="Indikator", box=(612, 20, 646, 54), pill=TOP_D[1], anchor="b"),
        dict(n=10, label="Tutup", box=(660, 14, 706, 60), pill=TOP_D[2], anchor="b"),
    ],
)

# ----------------------------------------------------------------- MPCS
# screenshot asli 1440x800 -> scale 1
TOP_M = chain_right(["Download", "Layar penuh", "Seret", "Tutup"], right_edge=1495, y=70)
annotate(
    "mpcs.webp",
    "mpcs-annotated.webp",
    scale=1,
    pad=(0, 150, 60, 210),
    items=[
        # di dalam gambar (area canvas yang kosong)
        dict(n=1, label="Canvas Pitch (piano roll)", box=(24, 116, 1418, 686), pill=(330, 150 + 170), inside=True),
        dict(n=2, label="Upload audio", box=(592, 324, 848, 384), pill=(1110, 150 + 354), anchor="r"),
        # kontrol bawah (dua baris, selang-seling)
        dict(n=3, label="Upload", box=(82, 724, 260, 784), pill=(171, 150 + 800 + 50), anchor="b"),
        dict(n=4, label="Select all", box=(272, 724, 478, 784), pill=(375, 150 + 800 + 135), anchor="b"),
        dict(n=5, label="Cut", box=(490, 724, 625, 784), pill=(557, 150 + 800 + 50), anchor="b"),
        dict(n=6, label="Knob Glide", box=(676, 720, 842, 786), pill=(760, 150 + 800 + 135), anchor="b"),
        dict(n=7, label="Knob Human", box=(866, 720, 1050, 786), pill=(960, 150 + 800 + 50), anchor="b"),
        dict(n=8, label="Knob Lock", box=(1076, 720, 1230, 786), pill=(1150, 150 + 800 + 135), anchor="b"),
        dict(n=9, label="Play", box=(1282, 724, 1358, 784), pill=(1320, 150 + 800 + 50), anchor="b"),
        # ikon kanan atas (di margin atas)
        dict(n=10, label="Download", box=(1093, 18, 1160, 77), pill=TOP_M[0], anchor="t"),
        dict(n=11, label="Layar penuh", box=(1176, 18, 1244, 77), pill=TOP_M[1], anchor="t"),
        dict(n=12, label="Seret", box=(1260, 18, 1328, 77), pill=TOP_M[2], anchor="t"),
        dict(n=13, label="Tutup", box=(1344, 18, 1412, 77), pill=TOP_M[3], anchor="t"),
    ],
)
