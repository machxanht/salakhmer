# Private handwriting review board

This folder is local-only reference material. It is ignored by git and must
never be served from `public/`, uploaded to R2, or treated as a licensed asset.

## Review every glyph

From the repository root run:

```powershell
node scripts\build_handwriting_reference_review.cjs
Start-Process .reference\handwriting-derived\index.html
```

Each card is matched by video ID, so a candidate is never shared between Khmer
characters. The two small images are automatic final-shape candidates. Click
**Open real animation stages** to see sampled frames from the lower animation
in the corresponding owner-supplied video.

## What is safe to approve

Only promote a glyph after the Khmer owner confirms:

1. the character identity;
2. pen-down location for every stroke;
3. direction of every stroke;
4. pen lifts and stroke order.

The scripts can identify a final centreline and rough stage order. They cannot
prove the exact native pen direction by themselves. Do not make an app SVG or
claim a writing direction solely from `candidate.svg`.

## Regeneration commands

```powershell
python scripts\derive_handwriting_svg_candidates.py
python scripts\derive_handwriting_timeline_candidates.py
node scripts\build_handwriting_reference_review.cjs
```

All three commands write only under `.reference/handwriting-derived/`.
