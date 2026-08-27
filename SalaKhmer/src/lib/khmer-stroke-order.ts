/**
 * A finished font outline does not contain pen-down, direction, or pen-lift
 * information. Full stroke paths must therefore be reviewed independently;
 * they must never be inferred from a font's contour order.
 */
export type StrokePoint = { x: number; y: number };

export type KhmerStroke = {
  order: number;
  path: string;
  start: StrokePoint;
  end: StrokePoint;
  orderLabel: StrokePoint;
};

export type KhmerStrokeModel = {
  id: string;
  source: "basic-strokes-reference" | "native-reviewed";
  reviewStatus: "reference" | "native-reviewed";
  viewBox: string;
  strokes: KhmerStroke[];
};

/**
 * A neutral primitive used to test the SVG renderer. It is not presented as
 * a Khmer-letter lesson.
 */
export const KHMER_STROKE_REFERENCE: KhmerStrokeModel = {
  id: "reference-v-form",
  source: "basic-strokes-reference",
  reviewStatus: "reference",
  viewBox: "0 0 320 320",
  strokes: [
    {
      order: 1,
      path: "M 76 218 L 160 126",
      start: { x: 76, y: 218 },
      end: { x: 160, y: 126 },
      orderLabel: { x: 58, y: 206 },
    },
    {
      order: 2,
      path: "M 160 126 L 244 218",
      start: { x: 160, y: 126 },
      end: { x: 244, y: 218 },
      orderLabel: { x: 252, y: 206 },
    },
  ],
};

/**
 * One independently traced direction line for a reviewed glyph. `path` must
 * be drawn in the same viewBox as `glyphPaths`; it is not a generic centreline
 * inferred from a font outline.
 */
export type KhmerGlyphAlignedStroke = {
  order: number;
  start: StrokePoint;
  path: string;
};

export type KhmerGlyphAlignedGuide = {
  id: string;
  source: "owner-reference-video" | "owner-reference-scan";
  alignment: "glyph-contour";
  reviewStatus: "draft-owner-review" | "native-reviewed";
  viewBox: string;
  /** Render the Khmer glyph from the installed Khmer font beneath a draft guide. */
  modelChar?: string;
  /** Original SalaKhmer vector traces forming the displayed handwriting model. */
  glyphPaths?: string[];
  /** Dotted direction paths traced against the glyphPaths above. */
  strokes: KhmerGlyphAlignedStroke[];
};

/**
 * Production stays empty until a complete glyph trace and every dotted
 * direction path have been reviewed by the Khmer-speaking owner. The earlier
 * five approximate centrelines were intentionally removed because they did
 * not hug the displayed glyph and therefore taught the wrong visual model.
 */
export const KHMER_GLYPH_ALIGNED_GUIDES: Readonly<Record<string, KhmerGlyphAlignedGuide>> = {
  "ក": {
    id: "ka-owner-review-v1",
    source: "owner-reference-scan",
    alignment: "glyph-contour",
    reviewStatus: "draft-owner-review",
    viewBox: "0 0 320 320",
    modelChar: "ក",
    // Draft only: short directional cues, deliberately not a full orange
    // trace over the glyph. This is the lightweight visual language the owner
    // requested: show where to start and the initial direction only.
    strokes: [
      {
        order: 1,
        start: { x: 118, y: 218 },
        path: "M 118 218 C 117 202 117 187 121 173",
      },
      {
        order: 2,
        start: { x: 133, y: 104 },
        path: "M 133 104 C 144 88 166 83 183 91 C 192 95 198 102 201 111",
      },
    ],
  },
};

/** Audit-only queue; these entries never render arrows in the learner UI. */
export const KHMER_GLYPH_GUIDE_REVIEW_QUEUE = [
  { char: "ក", referenceWindowSeconds: [0, 15] },
  { char: "ខ", referenceWindowSeconds: [16, 34] },
  { char: "គ", referenceWindowSeconds: [35, 54] },
  { char: "ឃ", referenceWindowSeconds: [55, 81] },
  { char: "ង", referenceWindowSeconds: [82, 105] },
] as const;

export function validateStrokeModel(model: KhmerStrokeModel) {
  const sorted = [...model.strokes].sort((a, b) => a.order - b.order);
  return (
    sorted.length > 0 &&
    sorted.every(
      (stroke, index) => stroke.order === index + 1 && stroke.path.trim().startsWith("M"),
    )
  );
}

export function validateGlyphAlignedGuide(guide: KhmerGlyphAlignedGuide) {
  return (
    guide.alignment === "glyph-contour" &&
    (guide.modelChar !== undefined || (guide.glyphPaths?.length ?? 0) > 0) &&
    (guide.glyphPaths ?? []).every((path) => path.trim().startsWith("M")) &&
    guide.strokes.length > 0 &&
    guide.strokes.every(
      (stroke, index) => stroke.order === index + 1 && stroke.path.trim().startsWith("M"),
    )
  );
}
