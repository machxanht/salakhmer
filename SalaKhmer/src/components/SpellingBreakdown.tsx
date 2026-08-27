import { useState } from "react";
import contentSyllabus from "@/lib/contentSyllabus.json";
import { Volume2, ChevronRight, Play } from "lucide-react";
import { playKhmerAudio } from "@/lib/audioService";
import { useAuth } from "@/hooks/useAuth";
import { AudioSpeedSettings } from "@/components/AudioSpeedSettings";
import { englishFriendlyRomanization } from "@/lib/romanization";

type SpellingItem = {
  id: string;
  word?: string;
  text?: string;
  meaning?: string;
  english?: string;
  breakdown?: string;
  final?: string;
  phonetic?: string;
  latin?: string;
  audio?: string;
};

type SalaBridgePart = { khmer: string; latin: string };
type SalaBridge = { parts: SalaBridgePart[]; bridge: string; reading: string };

// This is deliberately a beginner aid, not a Khmer transliteration system.
// It lets learners combine familiar letter/sound blocks before they can read
// full Khmer orthography naturally.
const SALA_READING_BRIDGES: Record<string, SalaBridge> = {
  m2_1: {
    parts: [
      { khmer: "ក", latin: "K" },
      { khmer: "ែ", latin: "AE" },
      { khmer: "ប", latin: "B" },
    ],
    bridge: "KAEB",
    reading: "kep",
  },
  m2_2: {
    parts: [
      { khmer: "ប", latin: "B" },
      { khmer: "ា", latin: "A" },
      { khmer: "យ", latin: "Y" },
    ],
    bridge: "BAY",
    reading: "bay",
  },
  m2_3: {
    parts: [
      { khmer: "ទ", latin: "T" },
      { khmer: "ឹ", latin: "EU" },
      { khmer: "ក", latin: "K" },
    ],
    bridge: "TEUK",
    reading: "teuk",
  },
  m2_4: {
    parts: [
      { khmer: "ស", latin: "S" },
      { khmer: "អា", latin: "A" },
      { khmer: "ល", latin: "L" },
      { khmer: "អា", latin: "A" },
    ],
    bridge: "SALA",
    reading: "sa-la",
  },
  m2_5: {
    parts: [
      { khmer: "ស", latin: "S" },
      { khmer: "្រ", latin: "R" },
      { khmer: "ល", latin: "L" },
      { khmer: "អា", latin: "A" },
      { khmer: "ញ", latin: "NH" },
    ],
    bridge: "SRALANH",
    reading: "sro-lanh",
  },
  m2_6: {
    parts: [
      { khmer: "ដ", latin: "D" },
      { khmer: "ំ", latin: "OM" },
      { khmer: "រ", latin: "R" },
      { khmer: "ី", latin: "EY" },
    ],
    bridge: "DOMREY",
    reading: "dom-rey",
  },
  m2_7: {
    parts: [
      { khmer: "ឆ", latin: "CH" },
      { khmer: "្ម", latin: "M" },
      { khmer: "អា", latin: "A" },
    ],
    bridge: "CHMA",
    reading: "chhma",
  },
  m2_8: {
    parts: [
      { khmer: "ឆ", latin: "CH" },
      { khmer: "្ក", latin: "K" },
      { khmer: "ែ", latin: "AE" },
    ],
    bridge: "CHKAE",
    reading: "chhkae",
  },
  m2_9: {
    parts: [
      { khmer: "ម", latin: "M" },
      { khmer: "អា", latin: "EA" },
      { khmer: "ន", latin: "N" },
    ],
    bridge: "MEAN",
    reading: "moan",
  },
  m2_10: {
    parts: [
      { khmer: "ទ", latin: "T" },
      { khmer: "អា", latin: "EA" },
    ],
    bridge: "TEA",
    reading: "tea",
  },
  m2_11: {
    parts: [
      { khmer: "ត", latin: "T" },
      { khmer: "្រ", latin: "R" },
      { khmer: "ី", latin: "EY" },
    ],
    bridge: "TREY",
    reading: "trey",
  },
  m2_12: {
    parts: [
      { khmer: "ផ", latin: "P" },
      { khmer: "្ទ", latin: "T" },
      { khmer: "ះ", latin: "EAH" },
    ],
    bridge: "PTEAH",
    reading: "phteah",
  },
};

const BATH_EXAMPLE: SalaBridge = {
  parts: [
    { khmer: "ប", latin: "B" },
    { khmer: "អា", latin: "A" },
    { khmer: "ទ", latin: "T" },
  ],
  bridge: "BAT",
  reading: "baat",
};

export function SpellingBreakdown() {
  const { user } = useAuth();
  const spellingData = (contentSyllabus.modules[1]?.data ?? []) as SpellingItem[];
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const toggleWord = (index: number) => {
    setActiveWordIndex(activeWordIndex === index ? null : index);
  };

  const playAudio = async (id: string, word: string) => {
    if (playingId) return;
    setPlayingId(id);
    try {
      await playKhmerAudio(id, word, user.audioSettings.playbackRate);
    } finally {
      setPlayingId(null);
    }
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="bg-jade/10 border border-jade/20 rounded-2xl p-4 mb-4">
        <h3 className="font-extrabold text-jade flex items-center gap-2">
          <Volume2 className="h-5 w-5" /> Spelling Breakdown
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Select a word to see standard spelling, then a beginner-friendly SalaKhmer reading bridge.
        </p>
      </div>

      <AudioSpeedSettings compact />

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
        <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
          SalaKhmer Reading Bridge
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          A beginner shortcut: combine familiar sound blocks first. It helps you start reading, but
          it is not a 100% exact Khmer spelling or pronunciation system.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-extrabold">
          {BATH_EXAMPLE.parts.map((part, index) => (
            <span key={part.khmer} className="flex items-center gap-2">
              <span className="rounded-md bg-amber-100 px-2 py-1 text-amber-950">
                <span className="khmer">{part.khmer}</span> ({part.latin})
              </span>
              {index < BATH_EXAMPLE.parts.length - 1 && <span className="text-amber-700">+</span>}
            </span>
          ))}
          <span className="text-amber-700">→</span>
          <span className="rounded-md bg-amber-500 px-2 py-1 text-amber-950">
            {BATH_EXAMPLE.bridge}
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Example: បាទ = “yes” (typically used by a male speaker) · standard reading:{" "}
          {BATH_EXAMPLE.reading}
        </p>
      </div>

      {spellingData.map((item, index) => {
        const isActive = activeWordIndex === index;
        const salaBridge = SALA_READING_BRIDGES[item.id];
        return (
          <div
            key={item.id}
            className={`card-flat transition-all overflow-hidden ${isActive ? "ring-2 ring-jade/50 bg-jade/5" : ""}`}
          >
            <div
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleWord(index)}
            >
              <div>
                <h4 className="khmer text-2xl font-bold text-foreground">
                  {item.word ?? item.text ?? "—"}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.meaning ?? item.english ?? ""}
                </p>
              </div>
              <ChevronRight
                className={`h-5 w-5 text-muted-foreground transition-transform ${isActive ? "rotate-90" : ""}`}
              />
            </div>

            {isActive && (
              <div className="px-4 pb-4 pt-2 border-t border-border animate-in slide-in-from-top-2">
                <div className="bg-card border border-border rounded-xl p-4 shadow-inner">
                  <div className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase mb-2">
                    Standard spelling
                  </div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-sm mb-4">
                    {(item.breakdown ?? item.word ?? item.text ?? "")
                      .split(" - ")
                      .map((part: string, i: number, arr: string[]) => (
                        <span key={i} className="flex items-center gap-2">
                          <span className="bg-secondary px-2 py-1 rounded-md text-foreground font-semibold border border-border/50">
                            {part}
                          </span>
                          {i < arr.length - 1 && <span className="text-jade font-bold">+</span>}
                        </span>
                      ))}
                  </div>

                  <div className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase mb-2">
                    Read aloud
                  </div>
                  <div className="flex items-center justify-between bg-primary/10 rounded-xl p-3 border border-primary/20">
                    <span className="text-lg font-extrabold text-primary">
                      {englishFriendlyRomanization(
                        item.final ?? item.phonetic ?? item.latin ?? "",
                      ) || "—"}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        void playAudio(item.audio ?? item.id, item.word ?? item.text ?? "");
                      }}
                      disabled={playingId != null}
                      aria-label={`Pronounce ${item.word ?? item.text ?? "Khmer word"}`}
                      className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                    >
                      <Play
                        className={`h-5 w-5 ml-1 ${playingId === item.id ? "animate-pulse" : ""}`}
                      />
                    </button>
                  </div>

                  {salaBridge && (
                    <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-amber-700">
                        SalaKhmer Reading Bridge
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-extrabold">
                        {salaBridge.parts.map((part, partIndex) => (
                          <span key={`${item.id}-${partIndex}`} className="flex items-center gap-2">
                            <span className="rounded-md bg-amber-100 px-2 py-1 text-amber-950">
                              <span className="khmer">{part.khmer}</span> ({part.latin})
                            </span>
                            {partIndex < salaBridge.parts.length - 1 && (
                              <span className="text-amber-700">+</span>
                            )}
                          </span>
                        ))}
                        <span className="text-amber-700">→</span>
                        <span className="rounded-md bg-amber-500 px-2 py-1 text-amber-950">
                          {salaBridge.bridge}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Beginner bridge only. Standard reading: {salaBridge.reading}.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
