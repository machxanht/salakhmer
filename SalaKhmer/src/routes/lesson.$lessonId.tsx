import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { X, CheckCircle2, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { MOCK_LESSONS, type LessonMock } from "@/lib/mock-lessons";
import { playKhmerAudio } from "@/lib/audioService";
import { isCategoryAccessible, type ContentCategory } from "@/lib/auth-access";
import { useLocale } from "@/lib/i18n";
import {
  getActivityAnswer,
  getActivityPrompt,
  getLessonActivities,
  type ActivityResult,
} from "@/lib/lesson-activities";
import { ActivityRenderer } from "@/components/ActivityRenderer";
import { AudioSpeedSettings } from "@/components/AudioSpeedSettings";
import { ConversationTranscriptLesson } from "@/components/ConversationTranscriptLesson";
import { addReviewItem, removeReviewItem } from "@/lib/review-queue";
import { hasFullLessonTestAccess } from "@/lib/tester-access";
import { localizeLegacyLesson } from "@/lib/content-localization";
import { PatreonSupportCard } from "@/components/PatreonSupportCard";

const PASS_THRESHOLD = 70;

export const Route = createFileRoute("/lesson/$lessonId")({
  validateSearch: (search: Record<string, unknown>) => ({
    activity:
      typeof search["activity"] === "number" && search["activity"] >= 0 ? search["activity"] : 0,
  }),
  component: LessonPage,
});

function LessonPage() {
  const { lessonId } = Route.useParams();
  const { activity: requestedActivity } = Route.useSearch();
  const navigate = useNavigate();
  const { completeLesson, updateUser, user, firebaseUser } = useAuth();
  const { t, tr, locale } = useLocale();

  // Find lesson
  const sourceLesson: LessonMock | null =
    Object.values(MOCK_LESSONS)
      .flat()
      .find((candidate) => candidate.id === lessonId) ?? null;
  const lesson = sourceLesson ? localizeLegacyLesson(sourceLesson, locale) : null;

  const [currentIndex, setCurrentIndex] = useState(requestedActivity);
  const [flipped, setFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [results, setResults] = useState<Record<number, ActivityResult>>({});
  const [finalScore, setFinalScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  // This route stays mounted when only :lessonId changes. Reset state so the
  // completion view does not remain on screen after pressing Next lesson.
  useEffect(() => {
    setCurrentIndex(requestedActivity);
    setFlipped(false);
    setIsFinished(false);
    setIsSaving(false);
    setResults({});
    setFinalScore(0);
    setPassed(false);
    setSessionKey((value) => value + 1);
  }, [lessonId, requestedActivity]);

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 bg-background">
        <h2 className="text-xl font-bold">{t("lessonMissing")}</h2>
        <button
          onClick={() => navigate({ to: "/home" })}
          className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold"
        >
          {t("back")}
        </button>
      </div>
    );
  }

  const canAccessLesson =
    hasFullLessonTestAccess(firebaseUser?.email ?? user.email) ||
    isCategoryAccessible(user.role, lesson.categoryId as ContentCategory);

  if (!canAccessLesson) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
        <h2 className="text-2xl font-extrabold">{t("lessonNeedsAccount")}</h2>
        <p className="mt-2 text-muted-foreground">{t("lessonNeedsAccountText")}</p>
        <Link
          to="/login"
          search={{ redirect: `/lesson/${lessonId}` }}
          className="mt-6 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground"
        >
          {t("signInOrUp")}
        </Link>
      </div>
    );
  }

  if (lesson.type === "conversation" && lesson.content?.length) {
    return (
      <ConversationTranscriptLesson
        lesson={lesson}
        playbackRate={user.audioSettings.playbackRate}
        onBack={() =>
          navigate({ to: "/category/$categoryId", params: { categoryId: lesson.categoryId } })
        }
        onComplete={async () => {
          await completeLesson(lesson.id, lesson.categoryId, lesson.title, 100, lesson.xpReward);
          navigate({ to: "/category/$categoryId", params: { categoryId: lesson.categoryId } });
        }}
      />
    );
  }

  const activities = getLessonActivities(lesson);
  const flashcards = activities[0]?.type === "flashcard" ? activities[0].cards : [];
  const activityCount = activities[0]?.type === "flashcard" ? flashcards.length : activities.length;
  const activeActivity = flashcards.length > 0 ? activities[0] : activities[currentIndex];
  const progressPercent =
    activityCount > 0 ? Math.round(((currentIndex + 1) / activityCount) * 100) : 0;
  const currentResult = results[currentIndex];
  const canContinue = flashcards.length > 0 ? flipped : currentResult !== undefined;

  const handleNext = () => {
    if (!canContinue) return;
    if (currentIndex < activityCount - 1) {
      setFlipped(false);
      // Wait a tiny bit for flip animation before changing content, or change immediately
      setTimeout(() => setCurrentIndex(currentIndex + 1), 150);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    setIsSaving(true);
    const calculatedScore =
      flashcards.length > 0
        ? 100
        : Math.round(
            (Object.values(results).filter((result) => result.correct).length /
              Math.max(activityCount, 1)) *
              100,
          );
    const didPass = calculatedScore >= PASS_THRESHOLD;
    setFinalScore(calculatedScore);
    setPassed(didPass);
    if (didPass) {
      await completeLesson(
        lesson.id,
        lesson.categoryId,
        lesson.title,
        calculatedScore,
        lesson.xpReward,
      );
    }
    setIsFinished(true);
    setIsSaving(false);
  };

  const retryLesson = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setResults({});
    setFinalScore(0);
    setPassed(false);
    setIsFinished(false);
    setSessionKey((value) => value + 1);
  };

  const goToNextLesson = () => {
    const categoryLessons = MOCK_LESSONS[lesson.categoryId] ?? [];
    const currentLessonIndex = categoryLessons.findIndex((candidate) => candidate.id === lesson.id);
    const nextLesson = currentLessonIndex >= 0 ? categoryLessons[currentLessonIndex + 1] : undefined;
    if (nextLesson) {
      navigate({ to: "/lesson/$lessonId", params: { lessonId: nextLesson.id }, search: { activity: 0 } });
      return;
    }
    navigate({ to: "/category/$categoryId", params: { categoryId: lesson.categoryId } });
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
        <div
          className={`h-32 w-32 rounded-full flex items-center justify-center mb-6 shadow-lg ${passed ? "bg-emerald-100 shadow-emerald-500/20" : "bg-amber-100 shadow-amber-500/20"}`}
        >
          <CheckCircle2 className={`h-16 w-16 ${passed ? "text-emerald-600" : "text-amber-500"}`} />
        </div>
        <h1 className="text-3xl font-extrabold mb-2">
          {passed ? t("completed") : tr("checkpointNotPassed")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {tr("scoreLabel")}: <span className="font-extrabold text-foreground">{finalScore}%</span>
        </p>
        <p className="mt-2 mb-8 text-sm text-muted-foreground">
          {passed ? (
            <>
              {t("earned")} <span className="font-bold text-amber-500">+{lesson.xpReward} XP</span>
            </>
          ) : (
            tr("needScore", { score: PASS_THRESHOLD })
          )}
        </p>

        {passed && <PatreonSupportCard locale={locale} className="mb-5 w-full max-w-sm" />}

        <div className="flex w-full max-w-sm flex-col gap-3">
          <button
            type="button"
            onClick={retryLesson}
            className="w-full rounded-2xl border border-primary bg-card py-4 text-lg font-extrabold text-primary shadow-sm transition-all hover:bg-primary/5 active:scale-95"
          >
            {tr("reviewLesson")}
          </button>
          <button
            type="button"
            onClick={goToNextLesson}
            className="w-full rounded-2xl bg-primary py-4 text-lg font-extrabold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-95"
          >
            {tr("nextLesson")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Top Bar */}
      <div className="flex items-center gap-4 p-4 pt-8">
        <button
          onClick={() =>
            navigate({ to: "/category/$categoryId", params: { categoryId: lesson.categoryId } })
          }
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          <X className="h-7 w-7" />
        </button>
        <div className="flex-1 h-3.5 bg-secondary rounded-full overflow-hidden border border-border/50">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="px-4 pb-1">
        <AudioSpeedSettings compact />
      </div>

      {/* Shared activity renderer */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 [perspective:1000px]">
        <ActivityRenderer
          key={`${sessionKey}-${currentIndex}`}
          activity={activeActivity ?? { type: "flashcard", cards: [] }}
          cardIndex={activeActivity?.type === "flashcard" ? currentIndex : 0}
          flipped={flipped}
          onFlip={() => setFlipped(!flipped)}
          onPlayAudio={async (card) => {
            setIsPlaying(true);
            try {
              await playKhmerAudio(
                card.audioId || `${lesson.id}-${card.back}`,
                card.front,
                user.audioSettings.playbackRate,
              );
            } finally {
              setIsPlaying(false);
            }
          }}
          onPlayPromptAudio={async (audioId, text) => {
            setIsPlaying(true);
            try {
              await playKhmerAudio(audioId, text, user.audioSettings.playbackRate);
            } finally {
              setIsPlaying(false);
            }
          }}
          isPlaying={isPlaying}
          onResult={(result) => {
            if (!activeActivity || results[currentIndex]) return;
            setResults((current) => ({ ...current, [currentIndex]: result }));
            const reviewId = `${lesson.id}-${currentIndex}`;
            if (result.correct) {
              void updateUser({ reviewQueue: removeReviewItem(user.reviewQueue, reviewId) });
            } else {
              void updateUser({
                reviewQueue: addReviewItem(user.reviewQueue, {
                  id: reviewId,
                  lessonId: lesson.id,
                  activityIndex: currentIndex,
                  prompt: getActivityPrompt(activeActivity),
                  answer: getActivityAnswer(activeActivity),
                  wrongAnswer: result.response,
                }),
              });
            }
          }}
        />
      </div>

      {/* Bottom Controls */}
      <div className="p-6 pb-10">
        <button
          onClick={handleNext}
          disabled={isSaving || !canContinue}
          className="w-full max-w-sm mx-auto bg-primary text-primary-foreground font-extrabold text-lg py-4 rounded-2xl shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSaving ? t("saving") : currentIndex === activityCount - 1 ? t("complete") : t("next")}
          {!isSaving && <ChevronRight className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
