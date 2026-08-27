import { Check, ChevronLeft, ChevronRight, Download, Eye, EyeOff, PenTool, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  LEVEL_4_DEPENDENT_VOWELS,
  LEVEL_5_INDEPENDENT_VOWELS,
  LEVEL_6_NUMERALS,
} from "@/lib/khmerAlphabetData";
import {
  KHMER_GLYPH_ALIGNED_GUIDES,
  validateGlyphAlignedGuide,
} from "@/lib/khmer-stroke-order";
import { hasVideoTracedDraft, VideoTracedHandwritingPreview } from "@/components/VideoTracedHandwritingPreview";
import { PatreonSupportCard } from "@/components/PatreonSupportCard";
import { useLocale } from "@/lib/i18n";

type Letter = {
  char: string;
  name: string;
  family: "A series" | "O series";
  cue: string;
  guide: "curve" | "loop" | "body";
};

// Letter names and series are learning data. The board itself is an original UI,
// inspired by the pedagogical pattern of a large model, grid, and guided practice.
const LETTERS: Letter[] = [
  {
    char: "ក",
    name: "Kâ",
    family: "A series",
    cue: "Begin at the marked start. Trace the main body before the finishing detail.",
    guide: "body",
  },
  {
    char: "ខ",
    name: "Khâ",
    family: "A series",
    cue: "Start high, keep the curve smooth, then complete the lower form.",
    guide: "curve",
  },
  {
    char: "គ",
    name: "Kô",
    family: "O series",
    cue: "Trace the main body first. Keep the lower hook inside the square.",
    guide: "body",
  },
  {
    char: "ឃ",
    name: "Khô",
    family: "O series",
    cue: "Follow the large curve slowly, then add the finishing detail.",
    guide: "curve",
  },
  {
    char: "ង",
    name: "Ngô",
    family: "O series",
    cue: "Make one relaxed curve at a time; do not rush the final turn.",
    guide: "loop",
  },
  {
    char: "ច",
    name: "Châ",
    family: "A series",
    cue: "Start at the top marker and keep the body centred on the grid.",
    guide: "body",
  },
  {
    char: "ឆ",
    name: "Chhâ",
    family: "A series",
    cue: "Draw the outer curve first, then finish the inner detail.",
    guide: "curve",
  },
  {
    char: "ជ",
    name: "Chô",
    family: "O series",
    cue: "Use a calm, continuous motion through the centre of the square.",
    guide: "loop",
  },
  {
    char: "ឈ",
    name: "Chhô",
    family: "O series",
    cue: "Start high and let the lower curve sit above the baseline.",
    guide: "curve",
  },
  {
    char: "ញ",
    name: "Nhô",
    family: "O series",
    cue: "Keep the loops open and leave space around the edges.",
    guide: "loop",
  },
  {
    char: "ដ",
    name: "Dâ",
    family: "A series",
    cue: "Make the main body first, then add the small finishing stroke.",
    guide: "body",
  },
  {
    char: "ឋ",
    name: "Thâ",
    family: "A series",
    cue: "Follow the curve from the start marker and finish neatly at the base.",
    guide: "curve",
  },
  {
    char: "ឌ",
    name: "Dô",
    family: "O series",
    cue: "Keep a steady speed through the central curve.",
    guide: "loop",
  },
  {
    char: "ឍ",
    name: "Thô",
    family: "O series",
    cue: "Use the grid to keep the letter tall and balanced.",
    guide: "curve",
  },
  {
    char: "ណ",
    name: "Nâ",
    family: "A series",
    cue: "Start at the dot and keep the final turn inside the box.",
    guide: "loop",
  },
  {
    char: "ត",
    name: "Tâ",
    family: "A series",
    cue: "Trace the tall body first; finish with a light final detail.",
    guide: "body",
  },
  {
    char: "ថ",
    name: "Thâ",
    family: "A series",
    cue: "Move from the start dot in one controlled curve.",
    guide: "curve",
  },
  {
    char: "ទ",
    name: "Tô",
    family: "O series",
    cue: "Keep the shape open and centred before you finish the stroke.",
    guide: "loop",
  },
  {
    char: "ធ",
    name: "Thô",
    family: "O series",
    cue: "Follow the guide slowly and leave space for the lower form.",
    guide: "curve",
  },
  {
    char: "ន",
    name: "Nô",
    family: "O series",
    cue: "Trace the body with a gentle turn rather than sharp corners.",
    guide: "loop",
  },
  {
    char: "ប",
    name: "Bâ",
    family: "A series",
    cue: "Begin with the larger body and add the final detail afterward.",
    guide: "body",
  },
  {
    char: "ផ",
    name: "Phâ",
    family: "A series",
    cue: "Keep the top curve smooth and finish close to the baseline.",
    guide: "curve",
  },
  {
    char: "ព",
    name: "Pô",
    family: "O series",
    cue: "Use the square as a guide; keep the letter from leaning right.",
    guide: "body",
  },
  {
    char: "ភ",
    name: "Phô",
    family: "O series",
    cue: "Make the outer shape first and complete the inner curve last.",
    guide: "curve",
  },
  {
    char: "ម",
    name: "Mô",
    family: "O series",
    cue: "Slow down at the lower loop and finish with a clean lift.",
    guide: "loop",
  },
  {
    char: "យ",
    name: "Yô",
    family: "O series",
    cue: "Keep the main body light and follow the guide through the centre.",
    guide: "body",
  },
  {
    char: "រ",
    name: "Rô",
    family: "O series",
    cue: "Start at the dot and keep the letter compact inside the grid.",
    guide: "curve",
  },
  {
    char: "ល",
    name: "Lô",
    family: "O series",
    cue: "Make a smooth body, then finish the lower turn without lifting early.",
    guide: "loop",
  },
  {
    char: "វ",
    name: "Vô",
    family: "O series",
    cue: "Trace from top to bottom and keep the final detail small.",
    guide: "body",
  },
  {
    char: "ស",
    name: "Sâ",
    family: "A series",
    cue: "Follow the curve from the start marker; keep the shape rounded.",
    guide: "curve",
  },
  {
    char: "ហ",
    name: "Hâ",
    family: "A series",
    cue: "Keep the body broad, then add the final detail carefully.",
    guide: "body",
  },
  {
    char: "ឡ",
    name: "Lâ",
    family: "A series",
    cue: "Use a slow loop and return to the baseline before lifting.",
    guide: "loop",
  },
  {
    char: "អ",
    name: "Â",
    family: "A series",
    cue: "Trace the main body at a steady pace and finish inside the square.",
    guide: "body",
  },
];

type WritingGroup =
  | "o-consonants"
  | "oo-consonants"
  | "vowels"
  | "independent"
  | "numbers";

const EXTRA_ITEMS: Record<Exclude<WritingGroup, "o-consonants" | "oo-consonants">, Letter[]> = {
  vowels: LEVEL_4_DEPENDENT_VOWELS.map((item) => ({
    char: item.khmer,
    name: item.latin,
    family: "O series",
    cue: "Write the vowel sign in its correct position around an imaginary base consonant.",
    guide: "curve",
  })),
  independent: LEVEL_5_INDEPENDENT_VOWELS.map((item) => ({
    char: item.khmer,
    name: item.latin,
    family: "O series",
    cue: "Keep the full independent-vowel form inside the writing lines.",
    guide: "body",
  })),
  numbers: LEVEL_6_NUMERALS.slice(0, 10).map((item) => ({
    char: item.khmer,
    name: item.latin,
    family: "O series",
    cue: "Trace the Khmer numeral, then write it again without the pale model.",
    guide: "loop",
  })),
};

const WRITING_GROUPS: { id: WritingGroup; label: string; sourcePage: number }[] = [
  { id: "o-consonants", label: "O consonants (15)", sourcePage: 13 },
  { id: "oo-consonants", label: "Ô consonants (18)", sourcePage: 13 },
  { id: "vowels", label: "Vowel signs", sourcePage: 16 },
  { id: "independent", label: "Independent vowels", sourcePage: 106 },
  { id: "numbers", label: "Khmer numbers", sourcePage: 118 },
];

function itemsForGroup(group: WritingGroup): Letter[] {
  if (group === "o-consonants") return LETTERS.filter((letter) => letter.family === "A series");
  if (group === "oo-consonants") return LETTERS.filter((letter) => letter.family === "O series");
  return EXTRA_ITEMS[group];
}

function getPoint(event: React.PointerEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) {
  const bounds = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - bounds.left) * (canvas.width / bounds.width),
    y: (event.clientY - bounds.top) * (canvas.height / bounds.height),
  };
}

function StrokeDirectionModel({ character }: { character: string }) {
  const guide = KHMER_GLYPH_ALIGNED_GUIDES[character];

  if (!guide || !validateGlyphAlignedGuide(guide)) {
    return (
      <div className="rounded-2xl border border-dashed border-gold/35 bg-[#fffdf5] px-5 py-6 text-center">
        <div className="mx-auto flex aspect-[3/2] w-full max-w-xs items-center justify-center rounded-xl bg-[linear-gradient(to_bottom,transparent_32%,rgba(185,163,108,.45)_32%,rgba(185,163,108,.45)_32.5%,transparent_32.5%,transparent_68%,rgba(185,163,108,.45)_68%,rgba(185,163,108,.45)_68.5%,transparent_68.5%)]">
          <span className="khmer text-[8rem] leading-none text-slate-700/15">{character}</span>
        </div>
        <p className="mt-3 text-sm font-extrabold text-foreground">Glyph-aligned guide pending</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Dotted arrows appear only after they are traced against this exact letter and reviewed.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border-2 border-gold/30 bg-[#fffdf5]">
        <svg
          viewBox={guide.viewBox}
          className="aspect-[3/2] w-full"
          role="img"
          aria-label={`Full stroke directions for ${character}`}
        >
          <defs>
            <marker
              id={`writing-arrow-${character.codePointAt(0)}`}
              markerWidth="7"
              markerHeight="7"
              refX="6.5"
              refY="3.5"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M 0 0 L 7 3.5 L 0 7 z" fill="#c46b09" />
            </marker>
          </defs>
          <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#d8c89e" strokeWidth="1" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#d8c89e" strokeWidth="1" />
          <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#d8c89e" strokeWidth="1" />
          <line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            stroke="#d8c89e"
            strokeWidth="1"
            strokeDasharray="4 5"
          />
          {guide.modelChar ? (
            <text x="160" y="232" textAnchor="middle" className="font-khmer" fontSize="185" fill="#3f2b1e">
              {guide.modelChar}
            </text>
          ) : null}
          {(guide.glyphPaths ?? []).map((path, index) => (
            <path
              key={`glyph-${index}`}
              d={path}
              fill="#3f2b1e"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          ))}
          {guide.strokes.map((stroke) => (
            <g key={stroke.order}>
              <path
                d={stroke.path}
                fill="none"
                stroke="#d97706"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="3 4"
                markerEnd={`url(#writing-arrow-${character.codePointAt(0)})`}
              />
              <circle
                cx={stroke.start.x}
                cy={stroke.start.y}
                r="7"
                fill="#fff6de"
                stroke="#c46b09"
                strokeWidth="1.4"
              />
              <text
                x={stroke.start.x}
                y={stroke.start.y + 3}
                textAnchor="middle"
                fill="#8c4500"
                fontSize="9"
                fontWeight="800"
              >
                {stroke.order}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        {guide.reviewStatus === "draft-owner-review"
          ? "Draft guide — please approve or correct it before it becomes a lesson standard."
          : "Dotted paths are shown only for native-reviewed, glyph-aligned guides."}
      </p>
    </div>
  );
}

export function StrokeOrderDrawing() {
  const { locale } = useLocale();
  const [activeGroup, setActiveGroup] = useState<WritingGroup>("o-consonants");
  const [letterIndex, setLetterIndex] = useState(0);
  const [practiceTab, setPracticeTab] = useState<"model" | "draw">("model");
  const [isDrawing, setIsDrawing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showModel, setShowModel] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeItems = itemsForGroup(activeGroup);
  const letter = activeItems[letterIndex] ?? activeItems[0] ?? LETTERS[0];
  const groupInfo = WRITING_GROUPS.find((group) => group.id === activeGroup) ?? WRITING_GROUPS[0];

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) context.clearRect(0, 0, canvas.width, canvas.height);
    setSaved(false);
  };

  useEffect(() => clearCanvas(), [letterIndex]);

  const begin = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const point = getPoint(event, canvas);
    canvas.setPointerCapture(event.pointerId);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = Math.max(8, canvas.width * 0.035);
    context.strokeStyle = "#b7791f";
    context.beginPath();
    context.moveTo(point.x, point.y);
    setIsDrawing(true);
  };

  const draw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const point = getPoint(event, canvas);
    context.lineTo(point.x, point.y);
    context.stroke();
  };

  const end = () => {
    setIsDrawing(false);
    canvasRef.current?.getContext("2d")?.beginPath();
  };

  const changeLetter = (nextIndex: number) => {
    setLetterIndex((nextIndex + activeItems.length) % activeItems.length);
    setSaved(false);
    setShowModel(true);
    setPracticeTab("model");
  };

  const savePractice = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `salakhmer-practice-${letter.char}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setSaved(true);
  };

  return (
    <section className="space-y-4 pt-2" aria-label="Khmer handwriting practice">
      <div className="rounded-[24px] bg-[#173B33] p-5 text-white shadow-[0_12px_26px_rgba(23,59,51,.15)]">
        <h3 className="flex items-center gap-2 font-extrabold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#F7B733] text-[#173B33]"><PenTool className="h-5 w-5" /></span> Khmer writing practice
        </h3>
        <p className="mt-3 text-sm leading-5 text-[#C7DDD6]">
          Trace the pale letter inside the grid. Use one finger on a phone or a mouse on computer.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5" aria-label="Choose a writing group">
        {WRITING_GROUPS.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => {
              setActiveGroup(group.id);
              setLetterIndex(0);
              setSaved(false);
              setPracticeTab("model");
            }}
            className={`rounded-xl border px-3 py-2 text-xs font-extrabold transition ${
              activeGroup === group.id
                ? "border-gold bg-gold text-gold-foreground"
                : "border-border bg-card hover:border-gold/50"
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Choose a Khmer writing item">
        {activeItems.map((item, index) => (
          <button
            key={item.char}
            type="button"
            onClick={() => changeLetter(index)}
            className={`khmer h-11 min-w-11 rounded-xl border text-2xl font-bold transition ${
              index === letterIndex
                ? "border-gold bg-gold text-gold-foreground shadow-sm"
                : "border-border bg-card text-foreground hover:border-gold/50"
            }`}
            aria-label={`Practice ${item.name}`}
          >
            {item.char}
          </button>
        ))}
      </div>

      <div className="rounded-[28px] border border-[#E5E6E0] bg-white p-4 shadow-[0_10px_24px_rgba(23,59,51,.07)]">
        <div className="mb-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => changeLetter(letterIndex - 1)}
            className="rounded-xl border border-border p-2 hover:bg-secondary"
            aria-label="Previous letter"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <p className="khmer text-5xl font-bold leading-none">{letter.char}</p>
            <p className="mt-1 text-sm font-bold">{letter.name}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Reference writing page {groupInfo.sourcePage}
            </p>
          </div>
          <button
            type="button"
            onClick={() => changeLetter(letterIndex + 1)}
            className="rounded-xl border border-border p-2 hover:bg-secondary"
            aria-label="Next letter"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4 grid grid-cols-2 overflow-hidden rounded-xl border border-gold/25 bg-[#fffaf1] p-1">
          <button
            type="button"
            onClick={() => setPracticeTab("model")}
            className={`rounded-lg px-3 py-2 text-sm font-extrabold transition ${practiceTab === "model" ? "bg-gold text-gold-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            Model
          </button>
          <button
            type="button"
            onClick={() => setPracticeTab("draw")}
            className={`rounded-lg px-3 py-2 text-sm font-extrabold transition ${practiceTab === "draw" ? "bg-gold text-gold-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            Write
          </button>
        </div>

        {practiceTab === "model" ? (
          hasVideoTracedDraft(letter.char) ? <VideoTracedHandwritingPreview character={letter.char} /> : <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center overflow-hidden rounded-2xl border-2 border-gold/30 bg-[#fffdf5]">
            <PracticeGrid />
            <div className="relative z-10 px-5 text-center"><span className="khmer text-[14rem] leading-none text-[#47382B]">{letter.char}</span><p className="mt-3 text-sm font-bold text-muted-foreground">Writing-direction model is being reviewed.</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Use the Write tab to practise the letter shape for now.</p></div>
          </div>
        ) : (
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border-2 border-gold/30 bg-[#fffdf5]">
            <PracticeGrid />
            {showModel && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
                <span className="khmer -mt-2 text-[13rem] leading-none text-slate-700/10">{letter.char}</span>
              </div>
            )}
            <canvas
              ref={canvasRef}
              width="720"
              height="720"
              className="relative z-10 h-full w-full touch-none cursor-crosshair"
              onPointerDown={begin}
              onPointerMove={draw}
              onPointerUp={end}
              onPointerCancel={end}
              onPointerLeave={end}
              aria-label={`Trace the Khmer letter ${letter.char}`}
            />
          </div>
        )}

        <div className="mt-4 rounded-2xl border border-[#DDEBE5] bg-[#F0F8F5] p-4 text-sm">
          <p className="font-extrabold text-foreground">{practiceTab === "draw" ? "Trace the pale model, then hide it and write again." : "Open Write when you are ready to trace this letter."}</p>
          <p className="mt-1 text-muted-foreground">
            {practiceTab === "draw"
              ? "This is a free-hand practice board for finger, stylus, or mouse."
              : "Stroke directions will be added only after each letter is reviewed from its own source reference."}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={clearCanvas}
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-3 text-xs font-extrabold hover:bg-secondary"
          >
            <RotateCcw className="h-4 w-4" /> Clear
          </button>
          <button
            type="button"
            onClick={() => setShowModel((value) => !value)}
            disabled={practiceTab !== "draw"}
            className="flex items-center justify-center gap-1 rounded-xl border border-gold/35 bg-gold/10 px-3 py-3 text-xs font-extrabold text-gold hover:bg-gold/20 disabled:opacity-40"
          >
            {showModel ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showModel ? "Hide model" : "Show model"}
          </button>
          <button
            type="button"
            onClick={savePractice}
            disabled={practiceTab !== "draw"}
            className="flex items-center justify-center gap-1 rounded-xl bg-gold px-3 py-3 text-xs font-extrabold text-gold-foreground hover:opacity-90 disabled:opacity-40"
          >
            {saved ? <Check className="h-4 w-4" /> : <Download className="h-4 w-4" />}
            {saved ? "Saved" : "Save practice"}
          </button>
        </div>
        <PatreonSupportCard locale={locale} className="mt-5" />
      </div>
    </section>
  );
}

function PracticeGrid() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-[12%] h-px bg-[#b9a36c]" />
      <div className="pointer-events-none absolute inset-x-0 top-[31%] h-px bg-[#d8c89e]" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[#b9a36c]" />
      <div className="pointer-events-none absolute inset-x-0 top-[69%] h-px bg-[#d8c89e]" />
      <div className="pointer-events-none absolute inset-x-0 top-[88%] h-px bg-[#b9a36c]" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px border-l border-dashed border-[#d8c89e]" />
    </>
  );
}
