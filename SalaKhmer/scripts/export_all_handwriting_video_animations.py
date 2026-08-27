"""Generate local, review-only handwriting animations from each supplied video.

No AI/API is used.  Each output is derived from its own exact video.  Static
worksheet/Subscribe graphics are removed by subtracting blue pixels already
present in the first video frame; this is safer than one global crop ratio.

Run: py scripts/export_all_handwriting_video_animations.py
Resume: existing animations are skipped; use --force to replace them.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

SOURCE = Path(".reference/handwriting-videos")
OUT = Path("public/writing-video-drafts")
FRAME_COUNT = 48
FRAME_DURATION_MS = 42
CANVAS_SIZE = 512


def blue_mask(frame: np.ndarray) -> np.ndarray:
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    return cv2.inRange(hsv, (95, 40, 25), (150, 255, 235))


def selected_frames(video: Path) -> list[np.ndarray]:
    cap = cv2.VideoCapture(str(video))
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if total <= 0:
        raise RuntimeError(f"Could not read {video}")
    wanted = set(np.linspace(0, max(0, total - 2), FRAME_COUNT).astype(int).tolist())
    frames: list[np.ndarray] = []
    index = 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        if index in wanted:
            frames.append(frame)
        index += 1
    cap.release()
    if len(frames) < 2:
        raise RuntimeError(f"Too few frames in {video}")
    return frames


def dynamic_masks(frames: list[np.ndarray]) -> list[np.ndarray]:
    # Dilating the initial ink protects against compression flicker on a static
    # worksheet edge. New lower-writing ink remains untouched.
    initial = cv2.dilate(blue_mask(frames[0]), np.ones((5, 5), np.uint8))
    results: list[np.ndarray] = []
    for frame in frames:
        current = blue_mask(frame)
        dynamic = cv2.bitwise_and(current, cv2.bitwise_not(initial))
        dynamic = cv2.morphologyEx(dynamic, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
        results.append(dynamic)
    return results


def crop_for(masks: list[np.ndarray]) -> tuple[int, int, int, int]:
    combined = np.maximum.reduce(masks)
    ys, xs = np.where(combined > 0)
    if len(xs) == 0:
        raise RuntimeError("No animated ink detected")
    x0, x1 = int(xs.min()), int(xs.max()) + 1
    y0, y1 = int(ys.min()), int(ys.max()) + 1
    side = min(int(max(x1 - x0, y1 - y0) * 1.20), max(combined.shape))
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    left = max(0, min(combined.shape[1] - side, cx - side // 2))
    top = max(0, min(combined.shape[0] - side, cy - side // 2))
    return left, top, side, side


def render(mask: np.ndarray, crop: tuple[int, int, int, int]) -> Image.Image:
    x, y, width, height = crop
    alpha = mask[y:y + height, x:x + width]
    alpha = cv2.resize(alpha, (CANVAS_SIZE, CANVAS_SIZE), interpolation=cv2.INTER_LANCZOS4)
    alpha = cv2.GaussianBlur(alpha, (0, 0), 0.9)
    rgba = np.zeros((CANVAS_SIZE, CANVAS_SIZE, 4), dtype=np.uint8)
    rgba[:, :, 0:3] = (41, 61, 128)
    rgba[:, :, 3] = alpha
    return Image.fromarray(rgba, "RGBA")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    records = json.loads((SOURCE / "manifest.json").read_text(encoding="utf-8"))["records"]
    exported, skipped, failed = 0, 0, []
    for number, record in enumerate(records, 1):
        if record.get("group") == "overview":
            continue
        video_id = record["id"]
        output = OUT / video_id / "animation.webp"
        if output.exists() and not args.force:
            skipped += 1
            continue
        try:
            masks = dynamic_masks(selected_frames(SOURCE / f"{video_id}.mp4"))
            images = [render(mask, crop_for(masks)) for mask in masks]
            output.parent.mkdir(parents=True, exist_ok=True)
            images[0].save(output, "WEBP", save_all=True, append_images=images[1:],
                           duration=FRAME_DURATION_MS, loop=0, lossless=False, quality=92, method=2)
            exported += 1
            print(f"[{number}/{len(records)}] exported {video_id}", flush=True)
        except Exception as error:
            failed.append({"id": video_id, "error": str(error)})
            print(f"[{number}/{len(records)}] failed {video_id}: {error}", flush=True)
    report = {"exported": exported, "skipped": skipped, "failed": failed,
              "status": "owner-review-required"}
    (OUT / "all-video-export-report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report), flush=True)


if __name__ == "__main__":
    main()
