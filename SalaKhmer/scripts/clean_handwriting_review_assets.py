"""Create audited, clean review images without cropping any glyph canvas.

The supplied videos sometimes leave a small, disconnected preview residue at
the top of the lower-writing area.  A global top crop would damage tall Khmer
letters and vowel marks, so this script removes only *small isolated top
components*.  It always saves an audit mask alongside the cleaned preview.

These files stay under .reference/ and are never production app assets.
"""
from __future__ import annotations

import json
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(".reference/handwriting-derived")
OVERRIDES_PATH = Path("scripts/handwriting-review-overrides.json")


def split_top_residue(mask: np.ndarray) -> tuple[np.ndarray, np.ndarray, list[dict[str, int]]]:
    binary = (mask > 0).astype(np.uint8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(binary, 8)
    cleaned = binary.copy()
    removed = np.zeros_like(binary)
    height, width = binary.shape
    audit: list[dict[str, int]] = []

    # This is not a size rule: the preview residue can be wide. A component is
    # eligible only when it is fully isolated inside the video-header band.
    # Real lower-animation strokes extend below that band and are retained.
    header_band_end = round(height * 0.20)
    for index in range(1, count):
        x, y, component_width, component_height, area = [int(value) for value in stats[index]]
        is_isolated_header_residue = y + component_height <= header_band_end
        if is_isolated_header_residue:
            component = labels == index
            cleaned[component] = 0
            removed[component] = 255
            audit.append({"x": x, "y": y, "width": component_width, "height": component_height, "area": area})
    return cleaned * 255, removed, audit


def apply_owner_override(mask: np.ndarray, override: dict[str, object] | None) -> tuple[np.ndarray, list[dict[str, int]]]:
    """Apply only owner-confirmed per-video rectangles, never a global crop."""
    removed = np.zeros_like(mask)
    audit: list[dict[str, int]] = []
    for rect in (override or {}).get("removeRects", []):
        x, y = int(rect["x"]), int(rect["y"])
        width, height = int(rect["width"]), int(rect["height"])
        removed[y : y + height, x : x + width] = 255
        audit.append({"x": x, "y": y, "width": width, "height": height, "area": width * height})
    return removed, audit


def main() -> None:
    manifest = json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
    overrides = json.loads(OVERRIDES_PATH.read_text(encoding="utf-8")) if OVERRIDES_PATH.exists() else {}
    audit_rows = []
    for item in manifest["records"]:
        if item.get("candidateStatus") != "needs-owner-review":
            continue
        folder = ROOT / item["id"]
        mask_path = folder / "writing-mask.png"
        skeleton_path = folder / "skeleton.png"
        if not mask_path.exists() or not skeleton_path.exists():
            continue
        mask = cv2.imread(str(mask_path), cv2.IMREAD_GRAYSCALE)
        skeleton = cv2.imread(str(skeleton_path), cv2.IMREAD_GRAYSCALE)
        cleaned, removed, removed_boxes = split_top_residue(mask)
        override_removed, override_boxes = apply_owner_override(cleaned, overrides.get(item["id"]))
        if override_boxes:
            cleaned[override_removed > 0] = 0
            removed = cv2.bitwise_or(removed, override_removed)
            removed_boxes.extend(override_boxes)
        # Skeletons share the same canvas. Dilate the audit region slightly so
        # thin centreline pixels from the same residue disappear as well.
        removed_for_skeleton = cv2.dilate(removed, np.ones((3, 3), np.uint8))
        clean_skeleton = skeleton.copy()
        clean_skeleton[removed_for_skeleton > 0] = 0
        cv2.imwrite(str(folder / "review-mask.png"), cleaned)
        cv2.imwrite(str(folder / "review-skeleton.png"), clean_skeleton)
        cv2.imwrite(str(folder / "removed-top-residue.png"), removed)
        audit_rows.append({"id": item["id"], "label": item.get("label"), "removed": removed_boxes})
    (ROOT / "top-residue-audit.json").write_text(json.dumps(audit_rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Created audited review masks for {len(audit_rows)} glyphs.")


if __name__ == "__main__":
    main()
