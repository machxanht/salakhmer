import { Link } from "@tanstack/react-router";
import { RefreshCcw, X } from "lucide-react";
import { removeReviewItem } from "@/lib/review-queue";
import { useAuth } from "@/hooks/useAuth";

export function ReviewQueueCard() {
  const { updateUser, user } = useAuth();
  const items = user.reviewQueue;

  if (items.length === 0) return null;
  const next = items[0];
  if (!next) return null;

  return (
    <section className="px-4 pt-5">
      <div className="rounded-2xl border border-amber-300/60 bg-amber-50 p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-700">
              Review incorrect answers
            </p>
            <h2 className="mt-1 font-extrabold text-amber-950">{items.length} items to review</h2>
            <p className="mt-1 text-sm text-amber-900/80">{next.prompt}</p>
          </div>
          <button
            type="button"
            aria-label="Remove item from review queue"
            onClick={() => {
              void updateUser({ reviewQueue: removeReviewItem(items, next.id) });
            }}
            className="rounded-lg p-1 text-amber-800 hover:bg-amber-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <Link
          to="/lesson/$lessonId"
          params={{ lessonId: next.lessonId }}
          search={{ activity: next.activityIndex ?? 0 }}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-extrabold text-white transition-opacity hover:opacity-90"
        >
          <RefreshCcw className="h-4 w-4" /> Review this lesson
        </Link>
      </div>
    </section>
  );
}
