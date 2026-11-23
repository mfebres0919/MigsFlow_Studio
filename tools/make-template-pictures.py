#!/usr/bin/env python3
"""Makes the pictures that show a template on Studio's public pages.

From two screenshots of the template's home page it writes, into
public/images/templates/TEMPLATE_ID/ and public/images/showcase/:

  card.webp                    the top of the page (its hero section), for the
                               shop's cards and the template's page
  showcase/ID-laptop.webp      the same screenshot tilted onto the landing
  showcase/ID-phone.webp       page's laptop and phone

The laptop and phone on the landing page are photos taken from an angle
(public/images/showcase/macbook-frame.webp and iphone-frame.webp, the same
ones migsflow.com uses), so the screenshot is tilted to the same angle and
trimmed to the shape of the glass.

You need two screenshots of the template's home page, from its live preview:
  - laptop: 1440 x 900 pixels
  - phone:   390 x 844 pixels

Then, in Terminal, from the MigsFlow_Studio folder:

  python3 tools/make-template-pictures.py TEMPLATE_ID laptop.png phone.png

For example:

  python3 tools/make-template-pictures.py moving-easy ~/Desktop/laptop.png ~/Desktop/phone.png

To show it on the landing page's laptop, add the id to lib/showcase.ts.

Needs the Pillow and numpy packages (pip3 install pillow numpy).
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent

# For each device: the size of the finished picture, and where the four
# corners of the screenshot land in it (top-left, top-right, bottom-right,
# bottom-left). Measured from the pictures made for migsflow.com.
DEVICES = {
    "laptop": {"size": (670, 768), "corners": [(126.9, 2.2), (666.9, 317.2), (548.0, 764.8), (2.1, 450.8)]},
    "phone": {"size": (161, 451), "corners": [(2.1, 88.1), (158.0, -1.7), (157.9, 362.7), (2.0, 452.8)]},
}

# Work at 3x and shrink at the end: it keeps small text and edges smooth.
SCALE = 3


def tilt_numbers(corners, width, height):
    """The 8 numbers Pillow needs to map each output pixel back to the screenshot."""
    source = [(0, 0), (width, 0), (width, height), (0, height)]
    rows, values = [], []
    for (x, y), (u, v) in zip(corners, source):
        rows.append([x, y, 1, 0, 0, 0, -u * x, -u * y])
        rows.append([0, 0, 0, x, y, 1, -v * x, -v * y])
        values += [u, v]
    return np.linalg.solve(np.array(rows, dtype=float), np.array(values, dtype=float)).tolist()


def make(kind, screenshot_path, out_path):
    device = DEVICES[kind]
    width, height = device["size"]
    shot = Image.open(screenshot_path).convert("RGB")
    big = (width * SCALE, height * SCALE)
    corners = [(x * SCALE, y * SCALE) for x, y in device["corners"]]
    tilted = shot.transform(big, Image.Transform.PERSPECTIVE, tilt_numbers(corners, *shot.size), Image.Resampling.BICUBIC)
    tilted = tilted.resize((width, height), Image.Resampling.LANCZOS).convert("RGBA")
    # The mask is the exact shape of the device's glass: white where the screen shows.
    tilted.putalpha(Image.open(ROOT / "tools" / "showcase-masks" / f"{kind}.png").convert("L"))
    tilted.save(out_path, "WEBP", quality=86, method=6)
    print("wrote", out_path.relative_to(ROOT))


def make_card(screenshot_path, out_path):
    """The top of the page at 16:10 (the shape of the shop's cards), 1200 pixels wide."""
    shot = Image.open(screenshot_path).convert("RGB")
    width = shot.width
    card = shot.crop((0, 0, width, round(width * 10 / 16))).resize((1200, 750), Image.Resampling.LANCZOS)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    card.save(out_path, "WEBP", quality=84, method=6)
    print("wrote", out_path.relative_to(ROOT))


def main():
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    template_id, laptop, phone = sys.argv[1:]
    make_card(laptop, ROOT / "public" / "images" / "templates" / template_id / "card.webp")
    out = ROOT / "public" / "images" / "showcase"
    out.mkdir(parents=True, exist_ok=True)
    make("laptop", laptop, out / f"{template_id}-laptop.webp")
    make("phone", phone, out / f"{template_id}-phone.webp")


if __name__ == "__main__":
    main()
