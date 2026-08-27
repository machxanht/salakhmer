#!/usr/bin/env python3
"""Extract centerline-only SVG drafts from a Khmer alphabet composite sheet.

This tool deliberately DOES NOT outline-trace the glyph.  It thresholds a
cropped letter, reduces the foreground to a one-pixel skeleton (Zhang-Suen
thinning), then turns the skeleton graph into SVG M/L paths.

Important pedagogical limit
----------------------------
An image does not contain pen-down / pen-lift information.  The generated SVG
is a *centerline draft*, not proof of native Khmer stroke order.  Review and
set stroke sequence manually before publishing it in the SalaKhmer app.

Install once:
  py -m pip install Pillow opencv-python numpy cairosvg

Example (the first two cells of a five-column composite):
  py scripts/extract_handwriting_centerlines.py \
    "C:\\Users\\OliverkhangPC\\OneDrive\\Desktop\\Thiết kế chưa có tên.png" \
    --out-dir public/writing-drafts

The script writes:
  public/writing-drafts/u1780_ka.png
  public/writing-drafts/u1780_ka.svg
  public/writing-drafts/u1781_kha.png
  public/writing-drafts/u1781_kha.svg

No generated SVG contains <image>, raster data, or Base64.  The SVG paths are
real vector M/L commands generated from the skeleton pixels.
"""

from __future__ import annotations

import argparse
import base64
import html
import re
from io import BytesIO
from pathlib import Path
from typing import Iterable

import cv2
import numpy as np
from PIL import Image, ImageOps


TARGETS = (("u1780_ka", "ក", 0, 0), ("u1781_kha", "ខ", 0, 1))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("image", type=Path, help="Composite PNG/JPG/SVG-rendered image")
    parser.add_argument("--out-dir", type=Path, default=Path("public/writing-drafts"))
    parser.add_argument("--columns", type=int, default=5, help="Composite grid columns (default: 5)")
    parser.add_argument("--rows", type=int, default=7, help="Composite grid rows (default: 7)")
    parser.add_argument("--padding", type=int, default=18, help="Extra pixels around detected ink")
    parser.add_argument("--threshold", type=int, default=0, help="0 = Otsu; otherwise 1..254")
    parser.add_argument("--min-component", type=int, default=12, help="Drop smaller foreground blobs")
    return parser.parse_args()


def load_gray(path: Path) -> np.ndarray:
    """Load RGB/RGBA image; alpha is composited onto white for predictable ink detection."""
    if path.suffix.lower() == ".svg":
        # Canva-style exports often call themselves SVG but contain a raster
        # PNG in an <image href="data:image/png;base64,..."> element. Extract
        # that directly first: this works on stock Windows without Cairo DLLs.
        source = path.read_text(encoding="utf-8", errors="ignore")
        encoded_images = re.findall(r"data:image/(?:png|jpeg);base64,([A-Za-z0-9+/=\\s]+)", source)
        decoded: list[Image.Image] = []
        for encoded in encoded_images:
            try:
                raw = base64.b64decode(re.sub(r"\\s+", "", encoded))
                with Image.open(BytesIO(raw)) as candidate:
                    decoded.append(candidate.convert("RGBA").copy())
            except Exception:
                continue
        if decoded:
            # Keep the largest embedded image: it is the full alphabet sheet,
            # while smaller images are usually logos or Canva metadata previews.
            image_context = max(decoded, key=lambda item: item.width * item.height)
        else:
            try:
                import cairosvg
            except (ImportError, OSError) as error:
                raise RuntimeError(
                    "This SVG has no embedded raster image and CairoSVG could not load. "
                    "Export it as PNG from Canva, then run the same command with that PNG."
                ) from error
            png_bytes = cairosvg.svg2png(url=str(path), output_width=2048)
            image_context = Image.open(BytesIO(png_bytes))
    else:
        image_context = Image.open(path)
    with image_context as image:
        image = image.convert("RGBA")
        canvas = Image.new("RGBA", image.size, "white")
        canvas.alpha_composite(image)
        return np.asarray(ImageOps.grayscale(canvas.convert("RGB")), dtype=np.uint8)


def foreground_mask(gray: np.ndarray, threshold: int, min_component: int) -> np.ndarray:
    """Return black/dark ink as uint8 0/255; supports light or dark source backgrounds."""
    blur = cv2.GaussianBlur(gray, (3, 3), 0)
    if threshold:
        _, dark = cv2.threshold(blur, threshold, 255, cv2.THRESH_BINARY_INV)
    else:
        _, dark = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    # If Otsu chose the dark background as foreground, swap the polarity.
    if np.count_nonzero(dark) > dark.size * 0.55:
        dark = cv2.bitwise_not(dark)

    count, labels, stats, _ = cv2.connectedComponentsWithStats(dark, connectivity=8)
    clean = np.zeros_like(dark)
    for label in range(1, count):
        if stats[label, cv2.CC_STAT_AREA] >= min_component:
            clean[labels == label] = 255
    return clean


def crop_grid_cell(gray: np.ndarray, row: int, col: int, rows: int, columns: int, padding: int) -> np.ndarray:
    """Crop one logical grid cell, then tightly crop its ink with a safe margin."""
    height, width = gray.shape
    x0, x1 = round(col * width / columns), round((col + 1) * width / columns)
    y0, y1 = round(row * height / rows), round((row + 1) * height / rows)
    cell = gray[y0:y1, x0:x1]
    mask = foreground_mask(cell, threshold=0, min_component=12)
    points = cv2.findNonZero(mask)
    if points is None:
        raise ValueError(f"No ink found in grid cell row={row + 1}, col={col + 1}.")
    x, y, w, h = cv2.boundingRect(points)
    x0, y0 = max(0, x - padding), max(0, y - padding)
    x1, y1 = min(cell.shape[1], x + w + padding), min(cell.shape[0], y + h + padding)
    return cell[y0:y1, x0:x1]


def zhang_suen(binary: np.ndarray) -> np.ndarray:
    """Pure NumPy Zhang-Suen thinning; input is 0/1 foreground."""
    image = binary.astype(np.uint8).copy()
    changed = True
    while changed:
        changed = False
        for phase in (0, 1):
            padded = np.pad(image, 1)
            p2 = padded[:-2, 1:-1]
            p3 = padded[:-2, 2:]
            p4 = padded[1:-1, 2:]
            p5 = padded[2:, 2:]
            p6 = padded[2:, 1:-1]
            p7 = padded[2:, :-2]
            p8 = padded[1:-1, :-2]
            p9 = padded[:-2, :-2]
            neighbours = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9
            transitions = ((p2 == 0) & (p3 == 1)).astype(np.uint8)
            for before, after in ((p3, p4), (p4, p5), (p5, p6), (p6, p7), (p7, p8), (p8, p9), (p9, p2)):
                transitions += ((before == 0) & (after == 1)).astype(np.uint8)
            if phase == 0:
                guard = (p2 * p4 * p6 == 0) & (p4 * p6 * p8 == 0)
            else:
                guard = (p2 * p4 * p8 == 0) & (p2 * p6 * p8 == 0)
            remove = (image == 1) & (neighbours >= 2) & (neighbours <= 6) & (transitions == 1) & guard
            if np.any(remove):
                image[remove] = 0
                changed = True
    return image


NEIGHBOURS = ((-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1))


def skeleton_paths(skeleton: np.ndarray) -> list[list[tuple[int, int]]]:
    """Trace skeleton pixels into polylines, starting at endpoints/junctions."""
    pixels = {tuple(point) for point in np.argwhere(skeleton > 0)}  # (y, x)

    def adjacent(point: tuple[int, int]) -> list[tuple[int, int]]:
        y, x = point
        return [(y + dy, x + dx) for dy, dx in NEIGHBOURS if (y + dy, x + dx) in pixels]

    nodes = {point for point in pixels if len(adjacent(point)) != 2}
    visited_edges: set[frozenset[tuple[int, int]]] = set()
    paths: list[list[tuple[int, int]]] = []

    def walk(start: tuple[int, int], next_point: tuple[int, int]) -> list[tuple[int, int]]:
        path = [start, next_point]
        previous, current = start, next_point
        visited_edges.add(frozenset((previous, current)))
        while current not in nodes:
            choices = [candidate for candidate in adjacent(current) if candidate != previous]
            if not choices:
                break
            candidate = choices[0]
            edge = frozenset((current, candidate))
            if edge in visited_edges:
                break
            visited_edges.add(edge)
            path.append(candidate)
            previous, current = current, candidate
        return path

    for node in nodes:
        for neighbour in adjacent(node):
            edge = frozenset((node, neighbour))
            if edge not in visited_edges:
                path = walk(node, neighbour)
                if len(path) >= 3:
                    paths.append(path)

    # Closed loops have no endpoint/junction, so trace each remaining cycle.
    for point in pixels:
        for neighbour in adjacent(point):
            edge = frozenset((point, neighbour))
            if edge not in visited_edges:
                path = walk(point, neighbour)
                if len(path) >= 3:
                    paths.append(path)
    return paths


def simplify(points: list[tuple[int, int]], epsilon: float = 1.25) -> np.ndarray:
    contour = np.array([[[x, y]] for y, x in points], dtype=np.float32)
    return cv2.approxPolyDP(contour, epsilon, False).reshape(-1, 2)


def svg_document(letter: str, source_name: str, skeleton: np.ndarray) -> str:
    paths = skeleton_paths(skeleton)
    height, width = skeleton.shape
    commands: list[str] = []
    for path in paths:
        points = simplify(path)
        if len(points) < 2:
            continue
        move_x, move_y = points[0]
        segments = [f"M {move_x:.1f} {move_y:.1f}"]
        segments.extend(f"L {x:.1f} {y:.1f}" for x, y in points[1:])
        commands.append(f'  <path d="{" ".join(segments)}" />')
    if not commands:
        raise ValueError("Skeleton produced no vector paths; inspect crop/threshold.")
    safe_label = html.escape(f"Centerline draft for {letter} from {source_name}")
    return "\n".join([
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-label="{safe_label}">',
        "  <g fill=\"none\" stroke=\"#111\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\">",
        *commands,
        "  </g>",
        "</svg>",
        "",
    ])


def main() -> None:
    args = parse_args()
    if not args.image.is_file():
        raise SystemExit(f"Input file not found: {args.image}")
    args.out_dir.mkdir(parents=True, exist_ok=True)
    gray = load_gray(args.image)
    for filename, letter, row, col in TARGETS:
        crop = crop_grid_cell(gray, row, col, args.rows, args.columns, args.padding)
        png_path = args.out_dir / f"{filename}.png"
        Image.fromarray(crop).save(png_path)
        mask = foreground_mask(crop, args.threshold, args.min_component)
        skeleton = zhang_suen((mask > 0).astype(np.uint8))
        svg_path = args.out_dir / f"{filename}.svg"
        svg_path.write_text(svg_document(letter, args.image.name, skeleton), encoding="utf-8")
        print(f"{letter}: {png_path} -> {svg_path}")


if __name__ == "__main__":
    main()
