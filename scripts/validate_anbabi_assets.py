from __future__ import annotations

import json
from pathlib import Path

import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "assets"
MANIFEST = PUBLIC / "manifest.json"
REPORT = ROOT / "assets-source" / "validation-report.json"


def main() -> None:
    records = json.loads(MANIFEST.read_text(encoding="utf-8"))
    errors = []
    warnings = []
    validated = 0

    for record in records:
        path = ROOT / "public" / record["path"].lstrip("/")
        if not path.exists():
            errors.append({"path": record["path"], "issue": "missing file"})
            continue
        try:
            image = Image.open(path).convert("RGBA")
            image.load()
        except Exception as exc:
            errors.append({"path": record["path"], "issue": f"decode failure: {exc}"})
            continue

        alpha = np.array(image.getchannel("A"))
        rgb = np.array(image)[:, :, :3]
        is_full_background = record["name"] == "warm-paper"
        if not is_full_background:
            corners = [alpha[0, 0], alpha[0, -1], alpha[-1, 0], alpha[-1, -1]]
            if any(value > 8 for value in corners):
                errors.append({"path": record["path"], "issue": f"non-transparent corner: {corners}"})
            border = np.concatenate((alpha[0], alpha[-1], alpha[:, 0], alpha[:, -1]))
            if np.any(border > 32):
                warnings.append({"path": record["path"], "issue": "visible pixels touch crop edge"})
            visible = alpha > 24
            rgb16 = rgb.astype(np.int16)
            green_spill = visible & (rgb16[:, :, 1] > rgb16[:, :, 0] + 55) & (rgb16[:, :, 1] > rgb16[:, :, 2] + 55)
            if np.count_nonzero(green_spill) > 8:
                errors.append({"path": record["path"], "issue": "possible chroma-key fringe"})
        validated += 1

    result = {
        "records": len(records),
        "validated": validated,
        "errors": errors,
        "warnings": warnings,
        "passed": not errors,
    }
    REPORT.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"records": len(records), "validated": validated, "errors": len(errors), "warnings": len(warnings), "passed": not errors}))
    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()

