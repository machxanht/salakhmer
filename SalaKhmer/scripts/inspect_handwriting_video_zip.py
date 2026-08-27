"""Inspect owner-supplied handwriting MP4s without putting them in the web build.

The source ZIP remains outside the app. This helper extracts only a few selected
videos into .reference/handwriting-videos for review and writes representative
frames into .tmp/handwriting-inspection. Nothing in those directories is served
by Vite or included in production assets.
"""

from __future__ import annotations

import argparse
import re
import shutil
import zipfile
from pathlib import Path

import cv2


def safe_name(name: str) -> str:
    return re.sub(r"[^A-Za-z0-9_-]+", "_", Path(name).stem).strip("_")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("zip", type=Path)
    parser.add_argument("--characters", nargs="+", default=["ក", "ខ", "គ"])
    parser.add_argument("--reference-dir", type=Path, default=Path(".reference/handwriting-videos"))
    parser.add_argument("--out-dir", type=Path, default=Path(".tmp/handwriting-inspection"))
    args = parser.parse_args()

    args.reference_dir.mkdir(parents=True, exist_ok=True)
    args.out_dir.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(args.zip) as archive:
        entries = [entry for entry in archive.infolist() if entry.filename.lower().endswith(".mp4")]
        for char in args.characters:
            matches = [entry for entry in entries if f"＂{char}＂" in entry.filename or f'"{char}"' in entry.filename]
            if not matches:
                print(f"missing={char}")
                continue
            entry = matches[0]
            destination = args.reference_dir / f"{char}-{safe_name(entry.filename)}.mp4"
            if not destination.exists():
                with archive.open(entry) as source, destination.open("wb") as target:
                    shutil.copyfileobj(source, target)

            capture = cv2.VideoCapture(str(destination))
            frames = int(capture.get(cv2.CAP_PROP_FRAME_COUNT))
            fps = capture.get(cv2.CAP_PROP_FPS) or 30
            width = int(capture.get(cv2.CAP_PROP_FRAME_WIDTH))
            height = int(capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
            print(f"character={char} frames={frames} fps={fps:.2f} size={width}x{height}")
            for label, position in (("start", 0.05), ("middle", 0.5), ("end", 0.92)):
                capture.set(cv2.CAP_PROP_POS_FRAMES, max(0, min(frames - 1, int(frames * position))))
                ok, frame = capture.read()
                if ok:
                    cv2.imwrite(str(args.out_dir / f"{char}-{label}.png"), frame)
            capture.release()


if __name__ == "__main__":
    main()
