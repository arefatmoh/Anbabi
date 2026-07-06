from __future__ import annotations

import json
import shutil
from pathlib import Path

import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "assets"
MASTERS = ROOT / "assets-source" / "masters"
REJECTED = ROOT / "assets-source" / "archive" / "rejected" / "extracted"
GENERATED = ROOT / "assets-source" / "generated-sheets"


BOOK_NAMES = [
    "bookshelf-plant-01", "open-book-01", "book-stack-01", "standing-books-01",
    "closed-book-black-01", "book-stack-02", "bookmark-orange-01", "bookmark-cream-01",
    "reading-path-01", "reading-path-02", "page-turn-book-01", "arrow-pair-01",
    "magnifier-01", "page-curl-01", "reading-rays-01", "reading-sparks-01",
    "cycle-sticker-cream-01", "cycle-sticker-orange-01", "tag-starburst-cream-01", "tag-scribble-black-01",
]

CTA_NAMES = [
    "open-book-rays-01", "arrow-up-01", "sparkle-cluster-01", "loop-arrow-01",
    "celebration-rays-01", "underline-swish-01", "star-outline-01", "dashed-arrow-01",
    "double-loop-01", "open-book-rays-02", "sparkle-swish-01", "corner-flourish-01",
    "circle-arrow-01", "sparkle-cluster-02", "loop-arrow-02", "celebration-rays-02",
    "corner-flourish-02", "dashed-journey-01", "book-spark-01", "page-swish-01",
]


def trim(image: Image.Image, padding: int = 12) -> Image.Image:
    bbox = image.getchannel("A").getbbox()
    if not bbox:
        raise ValueError("empty crop")
    return image.crop(
        (
            max(0, bbox[0] - padding),
            max(0, bbox[1] - padding),
            min(image.width, bbox[2] + padding),
            min(image.height, bbox[3] + padding),
        )
    )


def save(image: Image.Image, category: str, name: str) -> None:
    master = MASTERS / category
    public = PUBLIC / category
    master.mkdir(parents=True, exist_ok=True)
    public.mkdir(parents=True, exist_ok=True)
    image.save(master / f"{name}.png", optimize=True)
    image.save(public / f"{name}.webp", "WEBP", quality=90, method=6)


def split_grid(path: Path, category: str, names: list[str], cols: int, rows: int) -> None:
    image = Image.open(path).convert("RGBA")
    for index, name in enumerate(names):
        row, col = divmod(index, cols)
        x0 = round(col * image.width / cols)
        x1 = round((col + 1) * image.width / cols)
        y0 = round(row * image.height / rows)
        y1 = round((row + 1) * image.height / rows)
        inset = max(3, round(min(x1 - x0, y1 - y0) * 0.015))
        crop = trim(image.crop((x0 + inset, y0 + inset, x1 - inset, y1 - inset)))
        save(crop, category, name)


def move_reject(path: Path) -> None:
    relative = path.relative_to(PUBLIC)
    target = REJECTED / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.move(str(path), str(target))
    master = MASTERS / relative.with_suffix(".png")
    if master.exists():
        master_target = REJECTED / "masters" / relative.with_suffix(".png")
        master_target.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(str(master), str(master_target))


def curate_extractions() -> None:
    roots = [PUBLIC / "gamification", PUBLIC / "textures", PUBLIC / "decorations"]
    for root in roots:
        for path in list(root.rglob("*.webp")):
            if path.name in {"warm-paper.webp", "notebook-grid-overlay.webp"}:
                continue
            image = Image.open(path).convert("RGBA")
            alpha = np.array(image.getchannel("A"))
            visible = int(np.count_nonzero(alpha > 32))
            too_small = image.width < 30 or image.height < 24 or visible < 320
            accidental_sheet = image.width > 560 and image.height > 560
            if too_small or accidental_sheet:
                move_reject(path)


def intended_usage(relative: Path) -> str:
    category = relative.parts[0]
    return {
        "doodles": "decorative emphasis, arrows, paths, and playful accents",
        "icons": "reading-related interface illustration",
        "stickers": "paper collage, notes, tape, and labels",
        "dividers": "section separation and editorial rhythm",
        "illustrations": "hero, community, cycle, blog, and empty-state artwork",
        "gamification": "badges, progress, rewards, profiles, and milestones",
        "textures": "backgrounds and editorial paper overlays",
        "decorations": "page-specific decorative accents",
        "brand": "logo, wordmark, favicon, and application identity",
    }.get(category, "website asset")


def source_label(relative: Path) -> str:
    text = relative.as_posix()
    if "/books/" in f"/{text}":
        return "generated replacement: missing Books decoration pack"
    if "/cta/" in f"/{text}":
        return "generated replacement: corrected CTA overlay pack"
    if relative.parts[0] == "illustrations":
        return "Main Illustrations source batch"
    if relative.parts[0] == "gamification":
        return "Gamification Assets source batch"
    if relative.parts[0] == "textures":
        return "Backgrounds and Textures source batch"
    if relative.parts[0] == "decorations":
        return "Page-Specific Decorative Asset Sets source batch"
    if relative.parts[0] == "brand":
        return "supplied Read & Revive / አንባቢ logo files"
    return "Batch 2 extracted library"


def build_manifest() -> list[dict]:
    records = []
    for path in sorted(PUBLIC.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in {".png", ".webp", ".svg", ".jpg", ".jpeg"}:
            continue
        relative = path.relative_to(PUBLIC)
        image = Image.open(path)
        alpha = "A" in image.getbands()
        records.append(
            {
                "name": path.stem,
                "path": f"/assets/{relative.as_posix()}",
                "category": relative.parts[0],
                "subcategory": relative.parts[1] if len(relative.parts) > 2 else None,
                "format": path.suffix.lower().lstrip("."),
                "width": image.width,
                "height": image.height,
                "hasAlpha": alpha,
                "source": source_label(relative),
                "intendedUsage": intended_usage(relative),
                "approvalStatus": "accepted",
            }
        )
    (PUBLIC / "manifest.json").write_text(json.dumps(records, indent=2) + "\n", encoding="utf-8")
    return records


def main() -> None:
    curate_extractions()
    split_grid(GENERATED / "books-decoration-transparent.png", "decorations/books", BOOK_NAMES, 4, 5)
    split_grid(GENERATED / "cta-overlay-transparent.png", "decorations/cta", CTA_NAMES, 4, 5)
    records = build_manifest()
    print(f"Curated production records: {len(records)}")


if __name__ == "__main__":
    main()

