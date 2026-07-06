from __future__ import annotations

import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tmp" / "doodle-transparent"
PUBLIC = ROOT / "public" / "assets"


SHEETS = [
    {
        "file": "sheet-01.png",
        "grid": (4, 6),
        "inset": 12,
        "folder": "doodles",
        "names": [
            "arrow-curve-orange-01", "arrow-loop-black-01", "arrow-dashed-loop-orange-01", "arrow-curve-black-01",
            "arrow-dashed-black-01", "arrow-triple-loop-orange-01", "arrow-wavy-black-01", "arrow-loop-orange-01",
            "arrow-zigzag-orange-01", "arrow-curve-black-02", "reading-path-dotted-orange-01", "arrow-triple-loop-black-01",
            "arrow-loop-circle-black-01", "reading-path-dashed-orange-01", "arrow-loop-black-02", "arrow-curve-orange-02",
            "reading-path-dashed-orange-02", "arrow-double-loop-black-01", "arrow-curve-orange-03", "arrow-stair-black-01",
            "reading-path-loop-black-01", "arrow-loop-orange-02", "reading-path-loop-black-02", "arrow-wavy-orange-01",
        ],
    },
    {
        "file": "sheet-02.png",
        "grid": (6, 6),
        "folder": "doodles",
        "names": [
            "underline-orange-01", "underline-double-black-01", "underline-scribble-orange-01", "wavy-underline-black-01", "wavy-double-orange-01", "highlight-scribble-black-01",
            "circle-double-orange-01", "circle-scribble-black-01", "circle-orange-01", "circle-bold-black-01", "circle-dashed-orange-01", "circle-messy-black-01",
            "highlight-orange-01", "highlight-black-01", "bracket-square-orange-01", "bracket-curly-black-01", "bracket-round-orange-01", "bracket-corner-black-01",
            "emphasis-rays-orange-01", "emphasis-rays-black-01", "sparkle-rays-orange-01", "exclamation-black-01", "emphasis-arrow-orange-01", "emphasis-arrow-black-01",
            "swirl-black-01", "swirl-orange-01", "underline-black-02", "underline-arrow-orange-01", "underline-textured-black-01", "underline-textured-orange-01",
            "checkmark-orange-01", "cross-black-01", "circle-fill-orange-01", "scribble-ball-black-01", "spiral-orange-01", "zigzag-black-01",
        ],
    },
    {
        "file": "sheet-03.png",
        "grid": (6, 5),
        "folder": "doodles",
        "names": [
            "star-orange-01", "sparkle-black-01", "spark-orange-01", "star-black-01", "sparkle-orange-01", "celebration-black-01",
            "spark-black-01", "sun-smiley-orange-01", "sparkle-black-02", "heart-orange-01", "spark-black-02", "celebration-orange-01",
            "smiley-orange-01", "heart-black-01", "spark-orange-02", "celebration-black-02", "heart-badge-orange-01", "sparkle-black-03",
            "celebration-orange-02", "sparkle-black-04", "flame-orange-01", "smiley-black-01", "shooting-star-orange-01", "celebration-black-03",
            "corner-swirl-black-01", "sparkle-orange-02", "celebration-black-04", "sun-orange-01", "heart-black-02", "sparkle-orange-03",
        ],
    },
    {
        "file": "sheet-04.png",
        "grid": (5, 4),
        "folder": "icons",
        "names": [
            "open-book-01", "closed-book-01", "book-stack-01", "bookmark-01", "pen-01",
            "pencil-01", "notebook-01", "speech-bubble-01", "quote-mark-01", "calendar-01",
            "light-bulb-01", "trophy-01", "flame-01", "certificate-01", "paper-sheet-01",
            "paper-clip-01", "discussion-circle-01", "reading-group-01", "magnifier-01", "envelope-01",
        ],
    },
    {
        "file": "sheet-05.png",
        "grid": (4, 6),
        "row_edges": [0, 300, 550, 670, 885, 1080, 1254],
        "folder": "stickers",
        "names": [
            "sticky-note-cream-taped-01", "sticky-note-peach-taped-01", "torn-note-taped-01", "lined-paper-taped-01",
            "torn-paper-blank-01", "note-card-pinned-01", "torn-note-peach-pinned-01", "sticky-note-paperclip-01",
            "tape-cream-01", "tape-orange-01", "tape-gingham-01", "tape-black-01",
            "sticker-starburst-orange-01", "sticker-badge-cream-01", "sticker-circle-orange-01", "sticker-badge-peach-01",
            "stamp-orange-border-01", "stamp-black-border-01", "torn-paper-strip-01", "torn-grid-paper-01",
            "paper-clip-black-01", "paper-clip-orange-01", "tape-polka-dot-01", "tape-striped-orange-01",
        ],
    },
    {
        "file": "sheet-06.png",
        "grid": (4, 6),
        "folder": "dividers",
        "names": [
            "wavy-divider-01", "leaf-dash-divider-01", "loop-dash-divider-01", "handdrawn-divider-01",
            "open-book-divider-01", "leaf-divider-orange-01", "dotted-divider-01", "floral-line-divider-orange-01",
            "dashed-wave-divider-01", "heart-divider-01", "looped-double-divider-01", "leaf-divider-black-01",
            "cross-stitch-divider-01", "botanical-divider-01", "notebook-margin-divider-01", "open-book-rays-divider-01",
            "loop-dot-divider-01", "cream-wave-divider-01", "double-line-divider-01", "floral-dash-divider-01",
            "leaf-dot-divider-01", "orange-loop-divider-01", "flower-divider-01", "dashed-wave-divider-02",
        ],
    },
]


def split_sheet(spec: dict) -> list[dict]:
    image = Image.open(SOURCE / spec["file"]).convert("RGBA")
    cols, rows = spec["grid"]
    names = spec["names"]
    if len(names) != cols * rows:
        raise ValueError(f"{spec['file']}: expected {cols * rows} names, got {len(names)}")

    destination = PUBLIC / spec["folder"]
    destination.mkdir(parents=True, exist_ok=True)
    records = []

    for index, name in enumerate(names):
        row, col = divmod(index, cols)
        col_edges = spec.get("col_edges")
        row_edges = spec.get("row_edges")
        left = col_edges[col] if col_edges else round(col * image.width / cols)
        right = col_edges[col + 1] if col_edges else round((col + 1) * image.width / cols)
        top = row_edges[row] if row_edges else round(row * image.height / rows)
        bottom = row_edges[row + 1] if row_edges else round((row + 1) * image.height / rows)

        # Avoid any generated cell-edge remnants before alpha-bound trimming.
        inset = spec.get("inset", max(3, round(min(right - left, bottom - top) * 0.015)))
        cell = image.crop((left + inset, top + inset, right - inset, bottom - inset))
        alpha = cell.getchannel("A")
        bbox = alpha.getbbox()
        if bbox is None:
            raise ValueError(f"{spec['file']} cell {index + 1} ({name}) is empty")

        padding = max(6, round(min(cell.size) * 0.035))
        x0 = max(0, bbox[0] - padding)
        y0 = max(0, bbox[1] - padding)
        x1 = min(cell.width, bbox[2] + padding)
        y1 = min(cell.height, bbox[3] + padding)
        asset = cell.crop((x0, y0, x1, y1))

        out = destination / f"{name}.png"
        asset.save(out, optimize=True)
        extrema = asset.getchannel("A").getextrema()
        records.append(
            {
                "name": name,
                "path": out.relative_to(ROOT).as_posix(),
                "width": asset.width,
                "height": asset.height,
                "alpha_min": extrema[0],
                "alpha_max": extrema[1],
                "source_sheet": spec["file"],
                "source_cell": index + 1,
            }
        )
    return records


def main() -> None:
    records = []
    for spec in SHEETS:
        records.extend(split_sheet(spec))

    manifest = PUBLIC / "doodle-assets.json"
    manifest.write_text(json.dumps(records, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(records)} transparent PNG assets")
    print(f"Manifest: {manifest.relative_to(ROOT)}")


if __name__ == "__main__":
    main()


