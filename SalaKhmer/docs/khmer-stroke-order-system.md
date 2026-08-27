# Khmer Stroke Order System

## Non-negotiable source of truth

Do **not** convert a Khmer font to SVG and assume its anchor-point order is the handwriting order. Font outlines only describe the final shape; they can be clockwise, counter-clockwise, split, merged, or reordered by a font editor. Stroke order must be manually traced from a Khmer handwriting reference and reviewed by a native Khmer teacher.

Each `strokes[]` item means one continuous pen-down to pen-up movement. Its `path` starts with `M`; `start` and `end` are explicit metadata for QA; `order` matches the Khmer numeral next to the reference arrow.

## Current safe UI mode

The handwriting module does not publish a font-contour conversion as if it were verified. A learner-facing entry must use a `KhmerGlyphAlignedGuide` containing two independently reviewed layers in the same viewBox:

- `glyphPaths`: the actual SalaKhmer handwriting model visible to the learner;
- `strokes[].path`: thin dotted direction traces that hug or run immediately alongside the corresponding glyph stroke, with a small arrowhead and numbered start point.

The earlier approximate centre-lines for the first five consonants were rejected and removed. Those five recording windows remain only in an audit queue; they do not render arrows. `KHMER_GLYPH_ALIGNED_GUIDES` stays empty until an exact trace is approved. No frame, SVG, source path, or other third-party asset is bundled in the application.

```json
{
  "id": "reviewed-letter-id",
  "source": "owner-reference-video",
  "alignment": "glyph-contour",
  "reviewStatus": "native-reviewed",
  "viewBox": "0 0 320 220",
  "glyphPaths": ["M ... independently traced visible glyph ..."],
  "strokes": [
    {
      "order": 1,
      "start": { "x": 0, "y": 0 },
      "path": "M ... dotted path aligned to glyphPaths ..."
    }
  ]
}
```

## SVG rendering rule

```svg
<marker id="arrow" orient="auto" markerUnits="userSpaceOnUse">...</marker>
<path d="M ..." fill="none" stroke-width="2.4" stroke-dasharray="1 6" marker-end="url(#arrow)" />
```

The renderer is intentionally static. `orient="auto"` ties the small arrowhead
to the final tangent of the dotted guide. Do not synthesize a guide by drawing a
generic curve over a font glyph; the visible glyph and direction paths must be
traced and reviewed as one aligned asset.

## Intake workflow for every Khmer glyph

1. Crop the authoritative handwritten reference for one glyph.
2. Separate every pen lift into a distinct `strokes[]` element.
3. Trace the visible glyph into original SalaKhmer `glyphPaths` without copying a third-party vector asset.
4. In the same viewBox, trace each dotted direction line so it hugs the exact corresponding glyph stroke.
5. Record the source arrow's start/end and its Khmer numeral as `order`.
6. Native reviewer compares the static numbered guide against the reference and sets `reviewStatus: "native-reviewed"`.
7. Only then add it to `KHMER_GLYPH_ALIGNED_GUIDES` and expose it in the student module.

The chart supplied in chat confirms the basic visual convention: a filled/arrowed direction identifies the travel direction, and Khmer numerals label the order. It is sufficient for this engine and sample primitive; it is not sufficient evidence to publish all Khmer letter strokes.
