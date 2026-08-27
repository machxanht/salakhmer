"""Create owner-review sheets from private handwriting-reference videos.

The lesson thumbnails are intentionally ignored. For each video this script
samples only the lower animation region, saves a four-frame contact sheet, and
writes the result below .reference/. These sheets are review material only and
must never be moved into public/ or used as runtime lesson assets.

Run from the project root on the owner's machine:
  py scripts/extract_handwriting_animation_sheets.py
"""

from __future__ import annotations

import json
from pathlib import Path

import cv2
import numpy as np

REFERENCE = Path(".reference/handwriting-videos")
SHEETS = Path(".reference/handwriting-animation-sheets")
SAMPLE_POINTS = (0.32, 0.48, 0.68, 0.88)


def lower_animation(frame: np.ndarray) -> np.ndarray:
    """Remove the title/thumbnail area; retain the lower stroke animation."""
    height = frame.shape[0]
    return frame[int(height * 0.42) :, :]


def letterbox(image: np.ndarray, width: int, height: int) -> np.ndarray:
    scale = min(width / image.shape[1], height / image.shape[0])
    resized = cv2.resize(image, (round(image.shape[1] * scale), round(image.shape[0] * scale)), interpolation=cv2.INTER_AREA)
    board = np.full((height, width, 3), 255, dtype=np.uint8)
    top = (height - resized.shape[0]) // 2
    left = (width - resized.shape[1]) // 2
    board[top : top + resized.shape[0], left : left + resized.shape[1]] = resized
    return board


def main() -> None:
    manifest_path = REFERENCE / "manifest.json"
    records = json.loads(manifest_path.read_text(encoding="utf-8"))["records"]
    SHEETS.mkdir(parents=True, exist_ok=True)
    completed: list[str] = []

    for record in records:
        video = REFERENCE / f"{record['id']}.mp4"
        capture = cv2.VideoCapture(str(video))
        count = max(1, int(capture.get(cv2.CAP_PROP_FRAME_COUNT)))
        tiles: list[np.ndarray] = []
        for point in SAMPLE_POINTS:
            capture.set(cv2.CAP_PROP_POS_FRAMES, min(count - 1, round((count - 1) * point)))
            okay, frame = capture.read()
            if okay:
                tiles.append(letterbox(lower_animation(frame), 360, 360))
        capture.release()
        if not tiles:
            print(f"skipped={record['label']}")
            continue
        while len(tiles) < 4:
            tiles.append(tiles[-1].copy())
        sheet = np.vstack((np.hstack(tiles[:2]), np.hstack(tiles[2:4])))
        label = record["label"] or record["id"]
        cv2.putText(sheet, f"{label}  |  lower animation reference only", (18, 35), cv2.FONT_HERSHEY_SIMPLEX, 0.65, (30, 30, 30), 2, cv2.LINE_AA)
        output = SHEETS / f"{record['id']}.png"
        cv2.imwrite(str(output), sheet)
        completed.append(record["id"])

    (SHEETS / "README.txt").write_text(
        "These sheets show only lower animation samples. They are private reference material, not app assets.\n"
        "Each target SVG must be independently traced and approved by a Khmer reviewer.\n",
        encoding="utf-8",
    )
    print(f"Generated {len(completed)} review sheets in {SHEETS}")


if __name__ == "__main__":
    main()
