"""Derive private SVG *candidates* from all owner-supplied handwriting videos.

This is deliberately a review pipeline, not a publishing pipeline:
  - Reads only .reference/handwriting-videos/.
  - Uses the lower writing animation, never the thumbnail/title.
  - Removes small blue overlay text (e.g. Subscribe) by component geometry.
  - Writes rough SVG centreline candidates to .reference/handwriting-derived/.
  - Never writes src/, public/, R2, or production lesson data.

The owner must approve each candidate before an SVG is manually cleaned and
promoted into a production stroke-order lesson.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import cv2
import numpy as np

# Windows PowerShell may still default to cp1252; the labels are Khmer.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

SOURCE_DIR = Path(".reference/handwriting-videos")
OUTPUT_DIR = Path(".reference/handwriting-derived")


def sampled_lower_frame(video: Path) -> np.ndarray | None:
    capture = cv2.VideoCapture(str(video))
    total = max(1, int(capture.get(cv2.CAP_PROP_FRAME_COUNT)))
    best: tuple[int, np.ndarray] | None = None
    # Late frames usually contain the completed lower animation. Pick the
    # sample with the most large navy components rather than trusting a frame.
    for fraction in np.linspace(0.45, 0.92, 12):
        capture.set(cv2.CAP_PROP_POS_FRAMES, min(total - 1, round((total - 1) * float(fraction))))
        okay, frame = capture.read()
        if not okay:
            continue
        frame = frame[int(frame.shape[0] * 0.42) :, :]
        candidate = blue_stroke_mask(frame)
        score = int(candidate.sum())
        if best is None or score > best[0]:
            best = (score, frame)
    capture.release()
    return None if best is None else best[1]


def blue_stroke_mask(frame: np.ndarray) -> np.ndarray:
    """Keep large navy writing components; suppress fine overlay lettering."""
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    # Navy/indigo handwriting in supplied clips; deliberately broad enough to
    # tolerate MP4 compression but requires colour and darkness together.
    raw = cv2.inRange(hsv, (95, 45, 20), (150, 255, 205))
    raw = cv2.morphologyEx(raw, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    count, labels, stats, _ = cv2.connectedComponentsWithStats(raw, 8)
    cleaned = np.zeros_like(raw)
    height, width = raw.shape
    for index in range(1, count):
        x, y, w, h, area = stats[index]
        # Subscribe letters/icons are small isolated components. Preserve only
        # substantial stroke components and long continuous segments.
        if area < max(140, width * height * 0.0008):
            continue
        if max(w, h) < max(20, min(width, height) * 0.08):
            continue
        cleaned[labels == index] = 255
    return cleaned


def zhang_suen(binary: np.ndarray) -> np.ndarray:
    """Pure NumPy thinning: no skimage dependency required."""
    image = (binary > 0).astype(np.uint8)
    changed = True
    while changed:
        changed = False
        for phase in (0, 1):
            padded = np.pad(image, 1)
            center = padded[1:-1, 1:-1]
            p2, p3, p4, p5 = padded[:-2, 1:-1], padded[:-2, 2:], padded[1:-1, 2:], padded[2:, 2:]
            p6, p7, p8, p9 = padded[2:, 1:-1], padded[2:, :-2], padded[1:-1, :-2], padded[:-2, :-2]
            neighbours = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9
            transitions = ((p2 == 0) & (p3 == 1)).astype(np.uint8)
            for a, b in ((p3, p4), (p4, p5), (p5, p6), (p6, p7), (p7, p8), (p8, p9), (p9, p2)):
                transitions += ((a == 0) & (b == 1)).astype(np.uint8)
            if phase == 0:
                rule_a = p2 * p4 * p6
                rule_b = p4 * p6 * p8
            else:
                rule_a = p2 * p4 * p8
                rule_b = p2 * p6 * p8
            remove = (center == 1) & (neighbours >= 2) & (neighbours <= 6) & (transitions == 1) & (rule_a == 0) & (rule_b == 0)
            if np.any(remove):
                image[remove] = 0
                changed = True
    return image


def skeleton_polylines(skeleton: np.ndarray) -> list[list[tuple[int, int]]]:
    """Trace a conservative set of skeleton paths for reviewer inspection."""
    points = {tuple(point[::-1]) for point in np.argwhere(skeleton > 0)}
    neighbours = lambda point: [
        (point[0] + dx, point[1] + dy)
        for dx in (-1, 0, 1)
        for dy in (-1, 0, 1)
        if (dx or dy) and (point[0] + dx, point[1] + dy) in points
    ]
    starts = [point for point in points if len(neighbours(point)) != 2] or list(points)
    visited: set[tuple[tuple[int, int], tuple[int, int]]] = set()
    paths: list[list[tuple[int, int]]] = []
    for start in starts:
        for first in neighbours(start):
            edge = tuple(sorted((start, first)))
            if edge in visited:
                continue
            path = [start]
            previous, current = start, first
            while True:
                visited.add(tuple(sorted((previous, current))))
                path.append(current)
                options = [point for point in neighbours(current) if point != previous]
                if len(options) != 1:
                    break
                previous, current = current, options[0]
                if len(path) > 5000:
                    break
            if len(path) > 14:
                paths.append(path)
    return paths


def simplify(points: list[tuple[int, int]], step: int = 5) -> list[tuple[int, int]]:
    sampled = points[::step]
    if points[-1] not in sampled:
        sampled.append(points[-1])
    return sampled


def svg_document(width: int, height: int, paths: list[list[tuple[int, int]]]) -> str:
    commands = []
    for points in paths:
        compact = simplify(points)
        if len(compact) < 2:
            continue
        commands.append("M " + " L ".join(f"{x} {y}" for x, y in compact))
    body = "\n".join(f'  <path d="{command}" fill="none" stroke="#243b78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' for command in commands)
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}">\n{body}\n</svg>\n'


def main() -> None:
    manifest = json.loads((SOURCE_DIR / "manifest.json").read_text(encoding="utf-8"))
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    summary = []
    for record in manifest["records"]:
        if record.get("group") == "overview":
            summary.append({**record, "candidateStatus": "overview-not-a-single-glyph"})
            continue
        video = SOURCE_DIR / f"{record['id']}.mp4"
        frame = sampled_lower_frame(video)
        if frame is None:
            summary.append({**record, "candidateStatus": "video-read-failed"})
            continue
        mask = blue_stroke_mask(frame)
        mask = cv2.resize(mask, (320, round(mask.shape[0] * 320 / mask.shape[1])), interpolation=cv2.INTER_AREA)
        _, mask = cv2.threshold(mask, 80, 255, cv2.THRESH_BINARY)
        skeleton = zhang_suen(mask)
        paths = skeleton_polylines(skeleton)
        candidate_dir = OUTPUT_DIR / record["id"]
        candidate_dir.mkdir(exist_ok=True)
        cv2.imwrite(str(candidate_dir / "writing-mask.png"), mask)
        cv2.imwrite(str(candidate_dir / "skeleton.png"), (skeleton * 255).astype(np.uint8))
        (candidate_dir / "candidate.svg").write_text(svg_document(mask.shape[1], mask.shape[0], paths), encoding="utf-8")
        summary.append({
            **record,
            "candidateStatus": "needs-owner-review",
            "candidatePathCount": len(paths),
            "candidateDirectory": str(candidate_dir).replace("\\", "/"),
            "warning": "Automatic centreline candidate only. Stroke order and direction are not inferred; do not publish without manual Khmer review.",
        })
        print(f"candidate={record['label']} paths={len(paths)}")
    (OUTPUT_DIR / "manifest.json").write_text(json.dumps({"version": 1, "records": summary}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Completed {len(summary)} candidates in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
