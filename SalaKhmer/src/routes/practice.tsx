import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, RotateCcw, Volume2 } from "lucide-react";
import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { playKhmerAudio } from "@/lib/audioService";
import { removeReviewItem } from "@/lib/review-queue";
import { useAuth } from "@/hooks/useAuth";
import { AudioSpeedSettings } from "@/components/AudioSpeedSettings";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice · Learn Khmer" },
      {
        name: "description",
        content: "Practice Khmer pronunciation, writing, and word building with short activities.",
      },
    ],
  }),
  component: Practice,
});

function Practice() {
  const { updateUser, user } = useAuth();
  const items = user.reviewQueue;
  const [selected, setSelected] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const current = items[0];

  const playCurrent = async () => {
    if (!current || playing) return;
    setPlaying(true);
    try {
      await playKhmerAudio(current.id, current.prompt, user.audioSettings.playbackRate);
    } finally {
      setPlaying(false);
    }
  };

  const markReviewed = async (correct: boolean) => {
    if (!current) return;
    setSelected(correct ? "correct" : "wrong");
    if (correct) {
      await updateUser({ reviewQueue: removeReviewItem(items, current.id) });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="px-4 pb-3 pt-6">
        <p className="khmer text-sm text-muted-foreground">លំហាត់</p>
        <h1 className="text-2xl font-extrabold">Practice</h1>
        <div className="mt-3">
          <AudioSpeedSettings compact />
        </div>
      </header>

      {current ? (
        <section className="px-4">
          <div className="rounded-3xl border border-amber-300/60 bg-amber-50 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-700">
                  Review incorrect answers · {items.length} items
                </p>
                <h2 className="mt-3 text-xl font-extrabold text-amber-950">{current.prompt}</h2>
                <p className="mt-2 text-sm text-amber-900/80">Answer: {current.answer}</p>
              </div>
              <button
                type="button"
                onClick={() => void playCurrent()}
                disabled={playing}
                aria-label="Listen to the question"
                className="rounded-full bg-amber-500 p-3 text-white disabled:opacity-50"
              >
                <Volume2 className={playing ? "animate-pulse" : ""} />
              </button>
            </div>
            {selected === "wrong" && (
              <p className="mt-4 rounded-xl bg-red-100 p-3 text-sm font-bold text-red-700">
                Keep this item for another review.
              </p>
            )}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => void markReviewed(false)}
                className="rounded-xl border border-amber-300 px-4 py-3 text-sm font-extrabold text-amber-900"
              >
                <RotateCcw className="mr-2 inline h-4 w-4" /> Not yet
              </button>
              <button
                type="button"
                onClick={() => void markReviewed(true)}
                className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-extrabold text-white"
              >
                <Check className="mr-2 inline h-4 w-4" /> I remember
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-4 rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-8 text-center">
          <Check className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-3 text-xl font-extrabold">No items left to review</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start a new lesson to continue building your Khmer skills.
          </p>
          <Link
            to="/home"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground"
          >
            Back to learning path <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      )}
      <BottomNav />
    </div>
  );
}
