"""Create clean, smooth visual drafts from owner-supplied handwriting videos.

This is deliberately not font tracing or guessed SVG. Each draft is an
animated WebP made from the lower, real writing demonstration in its source
video. The upper worksheet, red arrows, and Subscribe banner are excluded.
"""
from __future__ import annotations

from pathlib import Path
import json

import cv2
import numpy as np
from PIL import Image

SOURCE = Path(".reference/handwriting-videos")
OUT = Path("public/writing-video-drafts")
TARGETS = {
    "u1780_ka": "TmlN73zSQ8I",
    "u1781_kha": "M9SXYmwMBnA",
    "u1782_ko": "leHEF9DW39M",
    "u1783_kho": "XhQ49geiDac",
    "u1784_ngo": "7yutJvZP_qE",
}
FRAME_COUNT = 90
FRAME_DURATION_MS = 33  # about 30 fps
CANVAS_SIZE = 720
# Most clips have an upper worksheet/Subscribe banner; Ng-o's supplied clip
# places the real animation much higher, so its top must be preserved.
LIVE_TOP_RATIO = {"7yutJvZP_qE": 0.42}


def navy_mask(frame: np.ndarray, video_id: str) -> np.ndarray:
    """Keep only blue ink in the lower live-writing section.

    The previous exporter began at 42% height, so it included the upper
    worksheet and blue Subscribe banner. The actual live writing starts below
    55% in the supplied clips.
    """
    lower = frame[round(frame.shape[0] * LIVE_TOP_RATIO.get(video_id, 0.55)):, :]
    hsv = cv2.cvtColor(lower, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, (95, 40, 25), (150, 255, 235))
    return cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))


def tight_square(mask: np.ndarray) -> tuple[int, int, int, int]:
    ys, xs = np.where(mask > 0)
    if len(xs) == 0:
        raise RuntimeError("No blue handwriting pixels were found.")
    x0, x1 = int(xs.min()), int(xs.max()) + 1
    y0, y1 = int(ys.min()), int(ys.max()) + 1
    side = min(int(max(x1 - x0, y1 - y0) * 1.18), max(mask.shape))
    cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
    left = max(0, min(mask.shape[1] - side, cx - side // 2))
    top = max(0, min(mask.shape[0] - side, cy - side // 2))
    return left, top, side, side


def rgba_frame(mask: np.ndarray, crop: tuple[int, int, int, int]) -> Image.Image:
    x, y, width, height = crop
    ink = mask[y:y + height, x:x + width]
    ink = cv2.resize(ink, (CANVAS_SIZE, CANVAS_SIZE), interpolation=cv2.INTER_LANCZOS4)
    # Preserve a soft anti-aliased edge after colour masking. The former hard
    # binary edge made the extracted ink look visibly stair-stepped.
    ink = cv2.GaussianBlur(ink, (0, 0), 1.05)
    rgba = np.zeros((CANVAS_SIZE, CANVAS_SIZE, 4), dtype=np.uint8)
    rgba[:, :, 0] = 41
    rgba[:, :, 1] = 61
    rgba[:, :, 2] = 128
    rgba[:, :, 3] = ink
    return Image.fromarray(rgba, "RGBA")


def source_frames(path: Path) -> list[np.ndarray]:
    cap = cv2.VideoCapture(str(path))
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if total <= 0:
        raise RuntimeError(f"Could not read {path}")
    # Start from the beginning of the actual clip. Earlier versions began at
    # 38%, so the first stroke was already long before the preview appeared.
    indexes = np.linspace(0, round(total * 0.98), FRAME_COUNT).astype(int)
    frames: list[np.ndarray] = []
    for index in indexes:
        cap.set(cv2.CAP_PROP_POS_FRAMES, min(total - 1, int(index)))
        ok, frame = cap.read()
        if ok:
            frames.append(frame)
    cap.release()
    if len(frames) < 2:
        raise RuntimeError(f"Too few frames in {path}")
    return frames


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    manifest: dict[str, dict[str, object]] = {}
    for slug, video_id in TARGETS.items():
        frames = source_frames(SOURCE / f"{video_id}.mp4")
        masks = [navy_mask(frame, video_id) for frame in frames]
        crop = tight_square(np.maximum.reduce(masks))
        rendered = [rgba_frame(mask, crop) for mask in masks]
        target = OUT / video_id
        target.mkdir(parents=True, exist_ok=True)
        rendered[0].save(target / "animation.webp", format="WEBP", save_all=True,
                         append_images=rendered[1:], duration=FRAME_DURATION_MS,
                         loop=0, lossless=False, quality=92, method=2)
        manifest[slug] = {"videoId": video_id, "frames": len(rendered),
                          "fps": round(1000 / FRAME_DURATION_MS, 1),
                          "asset": f"/writing-video-drafts/{video_id}/animation.webp",
                          "status": "owner-review-required"}
        print(f"exported {slug}: {len(rendered)} frames", flush=True)
    (OUT / "first-five-manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
