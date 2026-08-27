import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { HANDWRITING_VIDEO_BY_CHARACTER } from "@/lib/handwriting-video-map";

type Draft = { label: string; videoId: string };

/**
 * First five visual drafts use extracted lower-video stages directly. No
 * hand-guessed SVG curves are used here.
 */
const FIRST_FIVE: Record<string, Draft> = {
  ក: {
    label: "Kâ",
    videoId: "TmlN73zSQ8I",
  },
  ខ: {
    label: "Khâ",
    videoId: "M9SXYmwMBnA",
  },
  គ: {
    label: "Kô",
    videoId: "leHEF9DW39M",
  },
  ឃ: {
    label: "Khô",
    videoId: "XhQ49geiDac",
  },
  ង: {
    label: "Ngô",
    videoId: "7yutJvZP_qE",
  },
};

const ALL_CONSONANT_DRAFTS: Record<string, Draft> = Object.fromEntries(
  Object.entries(HANDWRITING_VIDEO_BY_CHARACTER).map(([character, videoId]) => [
    character,
    { label: "Video-traced draft", videoId },
  ]),
);

export function hasVideoTracedDraft(character: string) {
  return character in ALL_CONSONANT_DRAFTS;
}

export function VideoTracedHandwritingPreview({ character }: { character: string }) {
  const [replayKey, setReplayKey] = useState(0);
  const draft = ALL_CONSONANT_DRAFTS[character];
  if (!draft) return null;
  const replay = () => setReplayKey((value) => value + 1);
  // Every video crop carries the same safe padding. Position the image itself
  // against one fixed baseline: its visible ink therefore lands on the second
  // horizontal guide from the bottom, regardless of the letter's height.
  // This is deliberately not a per-letter scale/translate workaround.
  const modelSize = "absolute bottom-[25%] h-[70%] w-[70%]";

  return (
    <div className="space-y-3">
      <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center overflow-hidden rounded-2xl border-2 border-gold/30 bg-[#fffdf5]">
        <PracticeGrid />
        <img
          key={replayKey}
          src={`/writing-video-drafts/${draft.videoId}/animation.webp?v=3`}
          alt=""
          className={`z-10 ${modelSize} object-contain`}
        />
      </div>
      <button type="button" onClick={replay} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-3 py-3 text-xs font-extrabold text-gold-foreground hover:opacity-90">
        <RotateCcw className="h-4 w-4" /> Replay writing animation
      </button>
      <p className="text-center text-[11px] leading-4 text-muted-foreground">Draft from supplied video {draft.videoId} · owner review required before publishing.</p>
    </div>
  );
}

function PracticeGrid() {
  return <><div className="pointer-events-none absolute inset-x-0 top-[12%] h-px bg-[#b9a36c]" /><div className="pointer-events-none absolute inset-x-0 top-[31%] h-px bg-[#d8c89e]" /><div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[#b9a36c]" /><div className="pointer-events-none absolute inset-x-0 top-[69%] h-px bg-[#d8c89e]" /><div className="pointer-events-none absolute inset-x-0 top-[88%] h-px bg-[#b9a36c]" /><div className="pointer-events-none absolute inset-y-0 left-1/2 w-px border-l border-dashed border-[#d8c89e]" /></>;
}
