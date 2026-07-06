from __future__ import annotations

import json
import re
import shutil
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r"C:\Users\arefa\Downloads\anbabi assets")
PUBLIC = ROOT / "public" / "assets"
ASSET_SOURCE = ROOT / "assets-source"
ARCHIVE = ASSET_SOURCE / "archive" / "originals"
MASTERS = ASSET_SOURCE / "masters"
REFERENCES = ASSET_SOURCE / "references"


ILLUSTRATION_NAMES = {
    1: "hero-reading-group",
    2: "single-reader-book",
    3: "book-stack-growth",
    4: "writing-reflection-notebook",
    5: "community-discussion-circle",
    6: "current-reading-cycle",
    7: "voices-from-the-circle",
    8: "empty-state-reading",
    9: "closing-session",
    10: "mobile-community",
}

SHEET_PREFIXES = {
    "Gamification Assets": [
        "badge-reading",
        "streak-progress",
        "passport-certificate",
        "leaderboard-profile",
        "reward-sticker",
    ],
    "Page-Specific Decorative Asset Sets": [
        "home-decoration",
        "current-cycle-decoration",
        "community-decoration",
        "voices-decoration",
        "dashboard-decoration",
    ],
}


def numbered(path: Path) -> int:
    matches = re.findall(r"\((\d+)\)", path.stem)
    return int(matches[-1]) if matches else 0


def copy_originals() -> None:
    for path in SOURCE.rglob("*"):
        if not path.is_file():
            continue
        target = ARCHIVE / path.relative_to(SOURCE)
        target.parent.mkdir(parents=True, exist_ok=True)
        if not target.exists() or target.stat().st_size != path.stat().st_size:
            shutil.copy2(path, target)


def create_references() -> None:
    groups = {
        "Anbabi UI": "ui-screens",
        "Component Reference Sheet": "component-sheets",
    }
    for source_folder, target_folder in groups.items():
        target_dir = REFERENCES / target_folder
        target_dir.mkdir(parents=True, exist_ok=True)
        for index, path in enumerate(sorted((SOURCE / source_folder).glob("*.png")), 1):
            clean = re.sub(r"^\d+\.\s*", "", path.stem.lower())
            clean = re.sub(r"[^a-z0-9]+", "-", clean).strip("-")
            if source_folder == "Anbabi UI":
                page_no = int(re.match(r"(\d+)", path.name).group(1))
                clean = f"{page_no:02d}-{clean}"
            else:
                clean = f"{index:02d}-{clean}"
            image = Image.open(path).convert("RGB")
            image.save(target_dir / f"{clean}.webp", "WEBP", quality=82, method=6)


def flood_background(rgb: np.ndarray) -> np.ndarray:
    """Return alpha that removes only border-connected baked checkerboard."""
    chroma = rgb.max(axis=2).astype(np.int16) - rgb.min(axis=2).astype(np.int16)
    minimum = rgb.min(axis=2)
    candidate = (minimum >= 224) & (chroma <= 20)
    height, width = candidate.shape
    visited = np.zeros_like(candidate, dtype=bool)
    queue: deque[tuple[int, int]] = deque()

    def seed(y: int, x: int) -> None:
        if candidate[y, x] and not visited[y, x]:
            visited[y, x] = True
            queue.append((y, x))

    for x in range(width):
        seed(0, x)
        seed(height - 1, x)
    for y in range(height):
        seed(y, 0)
        seed(y, width - 1)

    while queue:
        y, x = queue.popleft()
        if y and candidate[y - 1, x] and not visited[y - 1, x]:
            visited[y - 1, x] = True
            queue.append((y - 1, x))
        if y + 1 < height and candidate[y + 1, x] and not visited[y + 1, x]:
            visited[y + 1, x] = True
            queue.append((y + 1, x))
        if x and candidate[y, x - 1] and not visited[y, x - 1]:
            visited[y, x - 1] = True
            queue.append((y, x - 1))
        if x + 1 < width and candidate[y, x + 1] and not visited[y, x + 1]:
            visited[y, x + 1] = True
            queue.append((y, x + 1))

    alpha = np.full((height, width), 255, dtype=np.uint8)
    alpha[visited] = 0

    # Feather only the first two pixels at the extracted boundary.
    transparent = Image.fromarray((visited * 255).astype(np.uint8))
    near = np.array(transparent.filter(ImageFilter.MaxFilter(5))) > 0
    edge = near & ~visited
    darkness = np.maximum(0, 232 - minimum).astype(np.float32)
    color = chroma.astype(np.float32)
    edge_alpha = np.clip(np.maximum(darkness * 5.5, color * 9.0), 24, 255)
    alpha[edge] = edge_alpha[edge].astype(np.uint8)
    return alpha


def extract_rgba(path: Path) -> Image.Image:
    rgb = np.array(Image.open(path).convert("RGB"))
    alpha = flood_background(rgb)
    rgba = np.dstack((rgb, alpha))
    return Image.fromarray(rgba, "RGBA")


def trim(image: Image.Image, padding: int = 16) -> Image.Image:
    bbox = image.getchannel("A").getbbox()
    if not bbox:
        raise ValueError("Asset has no visible pixels")
    x0 = max(0, bbox[0] - padding)
    y0 = max(0, bbox[1] - padding)
    x1 = min(image.width, bbox[2] + padding)
    y1 = min(image.height, bbox[3] + padding)
    return image.crop((x0, y0, x1, y1))


def save_master_and_web(image: Image.Image, category: str, name: str) -> None:
    master_dir = MASTERS / category
    public_dir = PUBLIC / category
    master_dir.mkdir(parents=True, exist_ok=True)
    public_dir.mkdir(parents=True, exist_ok=True)
    image.save(master_dir / f"{name}.png", optimize=True)
    image.save(public_dir / f"{name}.webp", "WEBP", quality=88, method=6)


def process_illustrations() -> None:
    paths = sorted((SOURCE / "Main Illustrations").glob("*.png"), key=numbered)
    for path in paths:
        number = numbered(path)
        image = trim(extract_rgba(path), 24)
        save_master_and_web(image, "illustrations", ILLUSTRATION_NAMES[number])


def label_components(mask: np.ndarray) -> list[tuple[int, int, int, int, int]]:
    height, width = mask.shape
    seen = np.zeros_like(mask, dtype=bool)
    boxes: list[tuple[int, int, int, int, int]] = []
    for y in range(height):
        for x in range(width):
            if not mask[y, x] or seen[y, x]:
                continue
            queue = [(y, x)]
            seen[y, x] = True
            min_x = max_x = x
            min_y = max_y = y
            count = 0
            for yy, xx in queue:
                count += 1
                min_x, max_x = min(min_x, xx), max(max_x, xx)
                min_y, max_y = min(min_y, yy), max(max_y, yy)
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = yy + dy, xx + dx
                    if 0 <= ny < height and 0 <= nx < width and mask[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True
                        queue.append((ny, nx))
            if count >= 22:
                boxes.append((min_x, min_y, max_x + 1, max_y + 1, count))
    return boxes


def component_crops(image: Image.Image) -> list[Image.Image]:
    scale = 4
    alpha = image.getchannel("A")
    small_size = (max(1, image.width // scale), max(1, image.height // scale))
    small = alpha.resize(small_size, Image.Resampling.NEAREST).point(lambda p: 255 if p > 32 else 0)
    grouped = small.filter(ImageFilter.MaxFilter(5))
    boxes = label_components(np.array(grouped) > 0)
    boxes = sorted(boxes, key=lambda b: (round(((b[1] + b[3]) / 2) / 24), b[0]))
    crops = []
    for x0, y0, x1, y1, _ in boxes:
        pad = 18
        box = (
            max(0, x0 * scale - pad),
            max(0, y0 * scale - pad),
            min(image.width, x1 * scale + pad),
            min(image.height, y1 * scale + pad),
        )
        crop = trim(image.crop(box), 8)
        visible = np.count_nonzero(np.array(crop.getchannel("A")) > 32)
        if visible >= 180:
            crops.append(crop)
    return crops


def process_component_sheets() -> None:
    for group, prefixes in SHEET_PREFIXES.items():
        paths = sorted((SOURCE / group).glob("*.png"), key=numbered)
        category = "gamification" if group == "Gamification Assets" else "decorations"
        for sheet_index, path in enumerate(paths):
            sheet = extract_rgba(path)
            crops = component_crops(sheet)
            prefix = prefixes[sheet_index]
            destination = category
            if category == "decorations":
                page = prefix.replace("-decoration", "")
                destination = f"decorations/{page}"
            for item_index, crop in enumerate(crops, 1):
                save_master_and_web(crop, destination, f"{prefix}-{item_index:02d}")


def process_backgrounds() -> None:
    paths = sorted((SOURCE / "Backgrounds and Textures").glob("*.png"), key=numbered)
    for path in paths:
        number = numbered(path)
        if number == 1:
            image = Image.open(path).convert("RGB")
            target = PUBLIC / "textures"
            master = MASTERS / "textures"
            target.mkdir(parents=True, exist_ok=True)
            master.mkdir(parents=True, exist_ok=True)
            shutil.copy2(path, master / "warm-paper.png")
            image.save(target / "warm-paper.webp", "WEBP", quality=86, method=6)
        elif number == 2:
            image = extract_rgba(path)
            save_master_and_web(image, "textures", "notebook-grid-overlay")
        elif number in (3, 5):
            image = extract_rgba(path)
            prefix = "torn-paper" if number == 3 else "blog-editorial"
            for index, crop in enumerate(component_crops(image), 1):
                save_master_and_web(crop, "textures", f"{prefix}-{index:02d}")
        else:
            # Sheet 4 contradicts its prompt: it contains flattened orange banners.
            rejected = ASSET_SOURCE / "archive" / "rejected"
            rejected.mkdir(parents=True, exist_ok=True)
            shutil.copy2(path, rejected / "incorrect-orange-cta-sheet.png")


def preserve_existing_doodles() -> None:
    for category in ("doodles", "icons", "stickers", "dividers"):
        public_dir = PUBLIC / category
        if not public_dir.exists():
            continue
        master_dir = MASTERS / category
        master_dir.mkdir(parents=True, exist_ok=True)
        for path in public_dir.glob("*.png"):
            image = Image.open(path).convert("RGBA")
            image.save(master_dir / path.name, optimize=True)
            if category == "stickers":
                image.save(public_dir / f"{path.stem}.webp", "WEBP", quality=88, method=6)


def create_brand_placeholder() -> None:
    brand = ASSET_SOURCE / "brand"
    brand.mkdir(parents=True, exist_ok=True)
    (brand / "README.md").write_text(
        "# Brand files\n\n"
        "The production Read & Revive / áŠ áŠ•á‰£á‰¢ logo is intentionally not extracted "
        "from a screenshot. Add the original SVG or high-resolution transparent PNG here.\n",
        encoding="utf-8",
    )


def main() -> None:
    copy_originals()
    create_references()
    preserve_existing_doodles()
    process_illustrations()
    process_component_sheets()
    process_backgrounds()
    create_brand_placeholder()
    print("Existing source library processed.")


if __name__ == "__main__":
    main()

