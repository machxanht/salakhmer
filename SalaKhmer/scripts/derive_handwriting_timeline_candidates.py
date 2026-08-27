"""Create local-only stroke-timing review sheets from handwriting videos.

No source, public or R2 asset is written. The images help a Khmer reviewer
check the real lower animation before any hand-cleaned path is promoted.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

import cv2
import numpy as np

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

SOURCE = Path(".reference/handwriting-videos")
OUTPUT = Path(".reference/handwriting-derived")


def remove_small_top_residue(binary: np.ndarray) -> np.ndarray:
    """Remove only small, disconnected top residue; never crop the canvas."""
    count, labels, stats, _ = cv2.connectedComponentsWithStats((binary > 0).astype(np.uint8), 8)
    cleaned = binary.copy()
    height, width = binary.shape
    header_band_end = round(height * 0.20)
    for index in range(1, count):
        _, y, component_width, component_height, area = stats[index]
        if y + component_height <= header_band_end:
            cleaned[labels == index] = 0
    return cleaned


def mask(frame: np.ndarray) -> np.ndarray:
    lower = frame[int(frame.shape[0] * 0.42) :, :]
    hsv = cv2.cvtColor(lower, cv2.COLOR_BGR2HSV)
    raw = cv2.inRange(hsv, (95, 45, 20), (150, 255, 205))
    raw = cv2.morphologyEx(raw, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    count, labels, stats, _ = cv2.connectedComponentsWithStats(raw, 8)
    clean = np.zeros_like(raw)
    height, width = raw.shape
    for i in range(1, count):
        _, _, component_w, component_h, area = stats[i]
        if area >= max(140, width * height * 0.0008) and max(component_w, component_h) >= max(20, min(width, height) * 0.08):
            clean[labels == i] = 255
    return remove_small_top_residue(clean)


def stages(video: Path) -> tuple[list[np.ndarray], list[int]]:
    capture = cv2.VideoCapture(str(video))
    total = max(1, int(capture.get(cv2.CAP_PROP_FRAME_COUNT)))
    frames: list[np.ndarray] = []
    for fraction in np.linspace(0.40, 0.97, 36):
        capture.set(cv2.CAP_PROP_POS_FRAMES, min(total - 1, round((total - 1) * float(fraction))))
        ok, frame = capture.read()
        if ok:
            frames.append(mask(frame))
    capture.release()
    if not frames:
        return [], []
    width = 320
    height = round(frames[0].shape[0] * width / frames[0].shape[1])
    frames = [cv2.resize(frame, (width, height), interpolation=cv2.INTER_AREA) for frame in frames]
    areas = np.array([int((frame > 0).sum()) for frame in frames])
    if not areas.max():
        return frames, []
    peak = int(areas.max())
    chosen: list[int] = []
    for pct in (0.08, 0.22, 0.40, 0.60, 0.80, 0.98):
        index = int(np.argmin(np.abs(areas - peak * pct)))
        if not chosen or index > chosen[-1]:
            chosen.append(index)
    final = int(areas.argmax())
    if not chosen or chosen[-1] != final:
        chosen.append(final)
    return frames, chosen


def write_sheet(destination: Path, frames: list[np.ndarray], selected: list[int]) -> None:
    height, width = frames[0].shape
    pad, label_height = 14, 26
    sheet = np.full((height + label_height, (width + pad) * len(selected) + pad, 3), (249, 242, 227), dtype=np.uint8)
    for order, index in enumerate(selected, start=1):
        x = pad + (order - 1) * (width + pad)
        image = cv2.cvtColor(frames[index], cv2.COLOR_GRAY2BGR)
        image[frames[index] > 0] = (120, 63, 34)
        sheet[label_height : label_height + height, x : x + width] = image
        cv2.putText(sheet, f"stage {order}", (x, 18), cv2.FONT_HERSHEY_SIMPLEX, 0.45, (80, 70, 55), 1, cv2.LINE_AA)
    cv2.imwrite(str(destination), sheet)


def main() -> None:
    records = json.loads((SOURCE / "manifest.json").read_text(encoding="utf-8"))["records"]
    review: list[dict[str, object]] = []
    for record in records:
        if record.get("group") == "overview":
            continue
        frames, selected = stages(SOURCE / f"{record['id']}.mp4")
        output = OUTPUT / record["id"]
        output.mkdir(parents=True, exist_ok=True)
        if selected:
            write_sheet(output / "timeline-stages.png", frames, selected)
        review.append({
            "id": record["id"], "label": record.get("label"), "group": record.get("group"),
            "status": "needs-owner-review" if selected else "no-usable-animation-frame",
            "sampledFrameIndexes": selected,
            "warning": "The stages come from the original lower animation, but native review confirms exact direction and pen lifts.",
        })
        print(f"timeline={record.get('label')} stages={len(selected)}")
    (OUTPUT / "timeline-manifest.json").write_text(json.dumps({"version": 1, "records": review}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Completed {len(review)} local timeline reviews.")


if __name__ == "__main__":
    main()
