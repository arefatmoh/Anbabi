from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets-source" / "brand" / "anbabi logo white background.jpg"
MASTERS = ROOT / "assets-source" / "masters" / "brand"
PUBLIC = ROOT / "public" / "assets" / "brand"


def remove_white_background(image: Image.Image) -> Image.Image:
    rgb = np.array(image.convert("RGB")).astype(np.float32)
    distance = np.max(255.0 - rgb, axis=2)
    alpha = np.clip((distance - 4.0) / 76.0 * 255.0, 0, 255).astype(np.uint8)
    alpha[distance >= 80] = 255
    orange = (rgb[:, :, 0] > rgb[:, :, 1] + 30) & (rgb[:, :, 0] > rgb[:, :, 2] + 50)
    clean = np.zeros_like(rgb, dtype=np.uint8)
    clean[:] = (18, 18, 18)
    clean[orange] = (243, 101, 35)
    rgba = np.dstack((clean, alpha))
    return Image.fromarray(rgba, "RGBA")


def make_inverse(image: Image.Image) -> Image.Image:
    rgba = np.array(image.convert("RGBA"))
    orange = (rgba[:, :, 0] > rgba[:, :, 1] + 30) & (rgba[:, :, 0] > rgba[:, :, 2] + 50)
    rgba[orange, :3] = (255, 255, 255)
    return Image.fromarray(rgba, "RGBA")


def trim(image: Image.Image, padding: int = 12) -> Image.Image:
    bbox = image.getchannel("A").getbbox()
    if not bbox:
        raise ValueError("Logo extraction produced no visible pixels")
    return image.crop(
        (
            max(0, bbox[0] - padding),
            max(0, bbox[1] - padding),
            min(image.width, bbox[2] + padding),
            min(image.height, bbox[3] + padding),
        )
    )


def square_icon(mark: Image.Image, size: int) -> Image.Image:
    margin = max(2, round(size * 0.12))
    target = size - margin * 2
    resized = mark.copy()
    resized.thumbnail((target, target), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    canvas.alpha_composite(resized, ((size - resized.width) // 2, (size - resized.height) // 2))
    return canvas


def save_pair(image: Image.Image, name: str) -> None:
    image.save(MASTERS / f"{name}.png", optimize=True)
    image.save(PUBLIC / f"{name}.png", optimize=True)
    image.save(PUBLIC / f"{name}.webp", "WEBP", lossless=True, method=6)


def main() -> None:
    MASTERS.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    source = Image.open(SOURCE).convert("RGB")
    transparent = remove_white_background(source)
    wordmark = trim(transparent, 14)
    mark = trim(transparent.crop((0, 0, source.width, round(source.height * 0.73))), 14)
    save_pair(wordmark, "anbabi-logo-primary")
    save_pair(mark, "anbabi-mark")
    inverse = make_inverse(transparent)
    inverse_wordmark = trim(inverse, 14)
    inverse_mark = trim(inverse.crop((0, 0, inverse.width, round(inverse.height * 0.73))), 14)
    save_pair(inverse_wordmark, "anbabi-logo-inverse")
    save_pair(inverse_mark, "anbabi-mark-inverse")
    for size in (32, 180, 192, 512):
        icon = square_icon(mark, size)
        name = f"anbabi-icon-{size}"
        icon.save(MASTERS / f"{name}.png", optimize=True)
        icon.save(PUBLIC / f"{name}.png", optimize=True)
    sys.path.insert(0, str(ROOT / "scripts"))
    from curate_and_finalize_assets import build_manifest
    records = build_manifest()
    print(f"Brand assets finalized; manifest now contains {len(records)} files.")


if __name__ == "__main__":
    main()




