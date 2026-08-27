import { useCallback, useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { X, CheckCircle2, Lock, Volume2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { playKhmerAudio } from "@/lib/audioService";
import {
  LEVEL_1_CONSONANTS_A,
  LEVEL_2_CONSONANTS_O,
  LEVEL_3_SUB_CONSONANTS,
  LEVEL_4_DEPENDENT_VOWELS,
  LEVEL_5_INDEPENDENT_VOWELS,
  LEVEL_6_NUMERALS,
  type KhmerCharacter,
} from "@/lib/khmerAlphabetData";
import { GREETINGS_DATA } from "@/lib/khmerGreetingData";
import { AudioSpeedSettings } from "@/components/AudioSpeedSettings";
import { hasFullLessonTestAccess } from "@/lib/tester-access";
import { useLocale } from "@/lib/i18n";
import { formatVowelForTTS } from "@/lib/khmer-tts";
import { getAlphabetCharacterCopy } from "@/lib/lesson-localization";
import { PatreonSupportCard } from "@/components/PatreonSupportCard";

export const Route = createFileRoute("/grid-lesson/$lessonId")({
  component: GridLessonPage,
});

function GridLessonPage() {
  const { lessonId } = Route.useParams();
  const navigate = useNavigate();
  const { completeLesson, user, firebaseUser } = useAuth();
  const { t, tr, locale } = useLocale();

  let data: KhmerCharacter[] = [];
  let title = "";
  let theme: "ruby" | "jade" | "amber" | "blue" | "purple" | "slate" = "slate";
  let xpReward = 15;
  let categoryId = "module_1";

  if (lessonId.startsWith("alpha-")) {
    switch (lessonId) {
      case "alpha-l1":
        data = LEVEL_1_CONSONANTS_A;
        title = tr("alphabetLevel1Title");
        theme = "ruby";
        xpReward = 15;
        break;
      case "alpha-l2":
        data = LEVEL_2_CONSONANTS_O;
        title = tr("alphabetLevel2Title");
        theme = "jade";
        xpReward = 18;
        break;
      case "alpha-l3":
        data = LEVEL_3_SUB_CONSONANTS;
        title = tr("alphabetLevel3Title");
        theme = "amber";
        xpReward = 32;
        break;
      case "alpha-l4":
        data = LEVEL_4_DEPENDENT_VOWELS;
        title = tr("alphabetLevel4Title");
        theme = "blue";
        xpReward = 24;
        break;
      case "alpha-l5":
        data = LEVEL_5_INDEPENDENT_VOWELS;
        title = tr("alphabetLevel5Title");
        theme = "purple";
        xpReward = 14;
        break;
      case "alpha-l6":
        data = LEVEL_6_NUMERALS;
        title = tr("alphabetLevel6Title");
        theme = "slate";
        xpReward = 15;
        break;
    }
  } else if (lessonId.startsWith("greet-")) {
    const greet = GREETINGS_DATA[lessonId];
    if (greet) {
      data = greet.data;
      title = greet.title;
      theme = greet.theme;
      xpReward = data.length * 2;
      categoryId = "greetings";
    }
  }

  const hasDirectAccess =
    lessonId.startsWith("greet-") ||
    hasFullLessonTestAccess(firebaseUser?.email ?? user.email) ||
    user.role === "REGISTERED" ||
    lessonId === "alpha-l1";
  if (user.role === "GUEST" && !hasFullLessonTestAccess(firebaseUser?.email ?? user.email) && lessonId === "alpha-l1") data = data.slice(0, 10);

  const [playedIds, setPlayedIds] = useState<Set<string>>(new Set());
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [audioError, setAudioError] = useState("");

  const progressPercent = data.length > 0 ? Math.round((playedIds.size / data.length) * 100) : 0;

  const handlePlay = (char: KhmerCharacter, series?: "a" | "o") => {
    const audioId = series ? `${char.id}-${series}` : char.id;
    const isIndependentVowel = lessonId === "alpha-l5";
    // A dependent vowel must be heard in both consonant series. Stable IDs keep
    // the same media mapping across web, Android, and the future iOS app.
    // Audio payload is intentionally Khmer script only. `latin`, `phonetic`,
    // and learnerReading are display fields and must never reach TTS.
    const rawKhmerCharacter = char.khmer.trim();
    const sampleText = isIndependentVowel
      ? rawKhmerCharacter
      : series === "a"
        ? (char.ttsTextA ?? formatVowelForTTS(rawKhmerCharacter, "A"))
        : series === "o"
          ? (char.ttsTextO ?? formatVowelForTTS(rawKhmerCharacter, "O"))
          : (char.ttsText ?? ttsTextForStandaloneGlyph(char)).trim();
    setPlayingId(audioId);
    setAudioError("");

    void playKhmerAudio(audioId, sampleText, user.audioSettings.playbackRate)
      .then(() => {
        setPlayedIds((previous) => new Set(previous).add(char.id));
      })
      .catch((reason: unknown) => {
        setAudioError(
          reason instanceof Error ? reason.message : "The approved recording could not be played.",
        );
      })
      .finally(() => {
        setTimeout(() => setPlayingId(null), 500);
      });
  };

  const handleFinish = useCallback(async () => {
    if (isSaving || isFinished) return;
    setIsSaving(true);
    try {
      await completeLesson(lessonId, categoryId, title, 100, xpReward);
      setIsFinished(true);
    } finally {
      setIsSaving(false);
    }
  }, [categoryId, completeLesson, isFinished, isSaving, lessonId, title, xpReward]);

  useEffect(() => {
    if (data.length === 0 || playedIds.size !== data.length || isFinished) return;
    const timer = window.setTimeout(() => void handleFinish(), 800);
    return () => window.clearTimeout(timer);
  }, [data.length, handleFinish, isFinished, playedIds.size]);

  if (!hasDirectAccess) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
        <Lock className="h-12 w-12 text-primary" />
        <h1 className="mt-4 text-2xl font-extrabold">{t("lessonNeedsAccount")}</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {tr("lessonGuestPreview")}
        </p>
        <Link
          to="/login"
          search={{ redirect: `/grid-lesson/${lessonId}` }}
          className="mt-6 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground"
        >
          {t("signInOrUp")}
        </Link>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 bg-background">
        <h2 className="text-xl font-bold">{t("lessonMissing")}</h2>
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold"
        >
          {t("back")}
        </button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="h-32 w-32 bg-amber-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
          <CheckCircle2 className="h-16 w-16 text-amber-500" />
        </div>
        <h1 className="text-3xl font-extrabold mb-2">{t("completed")}</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          {tr("lessonCompletedSummary", { lesson: title, xp: xpReward })}
        </p>

        <button
          onClick={() => window.history.back()}
          className="w-full max-w-sm bg-primary text-primary-foreground font-extrabold text-lg py-4 rounded-2xl shadow-sm hover:opacity-90 active:scale-95 transition-all block"
        >
          {tr("backToLessons")}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md flex items-center gap-4 p-4 border-b border-border/50">
        <button
          onClick={() => window.history.back()}
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

      <div className="border-b border-border/50 bg-background px-4 py-2">
        <AudioSpeedSettings compact />
      </div>

      {/* Grid Content */}
      <div className="flex-1 p-4 pb-20">
        <div className="text-center mb-6 mt-2">
          <h2 className="text-xl font-extrabold">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {tr("lessonPlayEverySound")}
          </p>
          {audioError && (
            <p
              role="alert"
              className="mx-auto mt-3 max-w-md rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-bold text-destructive"
            >
              {audioError}
            </p>
          )}
        </div>

        <div
          className={`grid min-w-0 gap-3 ${categoryId === "greetings" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-3 sm:grid-cols-4 md:grid-cols-5"}`}
        >
          {data.map((char) => (
            <CharCard
              key={char.id}
              char={char}
              playingId={playingId}
              isPlayed={playedIds.has(char.id)}
              onPlay={handlePlay}
              theme={theme}
              isGreetings={categoryId === "greetings"}
              isDependentVowel={lessonId === "alpha-l4"}
              locale={locale}
            />
          ))}
        </div>
        <PatreonSupportCard locale={locale} className="mt-7" />
      </div>
    </div>
  );
}

/** A visible coeng/vowel sign is not a speakable Khmer word by itself. */
function ttsTextForStandaloneGlyph(char: KhmerCharacter) {
  if (char.id.startsWith("sub-") && char.khmer.startsWith("្")) {
    return `ជើង ${char.khmer.slice(1)}`;
  }
  if (char.id.startsWith("v-")) return formatVowelForTTS(char.khmer, "A");
  return char.khmer;
}

function CharCard({
  char,
  playingId,
  isPlayed,
  onPlay,
  theme = "slate",
  isGreetings = false,
  isDependentVowel = false,
  locale,
}: {
  char: KhmerCharacter;
  playingId: string | null;
  isPlayed: boolean;
  onPlay: (char: KhmerCharacter, series?: "a" | "o") => void;
  theme: "ruby" | "jade" | "amber" | "blue" | "purple" | "slate";
  isGreetings?: boolean;
  isDependentVowel?: boolean;
  locale: ReturnType<typeof useLocale>["locale"];
}) {
  const { tr } = useLocale();
  const localizedCharacter = getAlphabetCharacterCopy(char, locale);
  const isPlaying =
    playingId === char.id || playingId === `${char.id}-a` || playingId === `${char.id}-o`;
  const isNumeral = char.id.startsWith("num-");
  const numeralLength = Array.from(char.khmer).length;
  const numeralSize =
    numeralLength <= 3
      ? "text-4xl sm:text-5xl"
      : numeralLength <= 5
        ? "text-3xl sm:text-4xl"
        : numeralLength <= 7
          ? "text-2xl sm:text-3xl"
          : "text-[15px] sm:text-xl";

  const themeClasses = {
    ruby: "bg-ruby/5 border-ruby/20 hover:bg-ruby/10 active:bg-ruby/15 text-ruby",
    jade: "bg-jade/5 border-jade/20 hover:bg-jade/10 active:bg-jade/15 text-jade",
    amber:
      "bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10 active:bg-amber-500/15 text-amber-600 dark:text-amber-500",
    blue: "bg-blue-500/5 border-blue-500/20 hover:bg-blue-500/10 active:bg-blue-500/15 text-blue-600 dark:text-blue-500",
    purple:
      "bg-purple-500/5 border-purple-500/20 hover:bg-purple-500/10 active:bg-purple-500/15 text-purple-600 dark:text-purple-400",
    slate:
      "bg-slate-500/5 border-slate-500/20 hover:bg-slate-500/10 active:bg-slate-500/15 text-slate-700 dark:text-slate-300",
  };

  if (isDependentVowel && char.aSeriesSound && char.oSeriesSound) {
    return (
      <div
        className={`relative flex flex-col items-center rounded-2xl border p-3 pt-4 shadow-sm transition-all duration-200 aspect-[4/5] min-h-[150px] ${themeClasses[theme]} ${isPlayed ? "opacity-70 bg-secondary" : ""}`}
      >
        <span className="khmer mb-2 text-center text-4xl font-bold leading-none sm:text-5xl">
          {char.khmer}
        </span>
        <span className="mb-2 text-xs font-bold text-foreground">
          {localizedCharacter.phonetic ?? char.learnerReading ?? char.latin}
        </span>
        <div className="mt-auto grid w-full gap-1.5">
          <button
            type="button"
            onClick={() => onPlay(char, "a")}
            className="flex items-center justify-between rounded-md bg-ruby/10 px-2 py-1 text-[10px] font-bold text-ruby hover:bg-ruby/20"
            aria-label={tr("playASeries", { label: localizedCharacter.phonetic ?? char.latin })}
          >
            <span>A series · {char.aSeriesSound}</span>
            <Volume2 className={`h-3 w-3 ${playingId === `${char.id}-a` ? "animate-pulse" : ""}`} />
          </button>
          <button
            type="button"
            onClick={() => onPlay(char, "o")}
            className="flex items-center justify-between rounded-md bg-jade/10 px-2 py-1 text-[10px] font-bold text-jade hover:bg-jade/20"
            aria-label={tr("playOSeries", { label: localizedCharacter.phonetic ?? char.latin })}
          >
            <span>O series · {char.oSeriesSound}</span>
            <Volume2 className={`h-3 w-3 ${playingId === `${char.id}-o` ? "animate-pulse" : ""}`} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => onPlay(char)}
      className={`
        relative flex min-w-0 flex-col items-center justify-center overflow-hidden rounded-2xl p-3 pt-4
        border transition-all duration-200
        ${isGreetings ? "min-h-[140px]" : "aspect-[4/5] min-h-[120px]"}
        ${themeClasses[theme]}
        ${isPlaying ? "scale-95 ring-2 ring-primary/40" : "hover:scale-[1.03] active:scale-95"}
        ${isPlayed ? "opacity-60 bg-secondary grayscale-[0.2]" : "shadow-sm"}
      `}
    >
      <Volume2
        className={`absolute top-2 right-2 h-3.5 w-3.5 ${
          isPlaying
            ? "text-primary animate-pulse"
            : isPlayed
              ? "text-primary/60"
              : "text-muted-foreground/40"
        }`}
      />

      <span
        className={`khmer mb-2 max-w-full overflow-hidden text-center font-bold leading-none ${isGreetings ? "text-3xl sm:text-4xl leading-snug" : isNumeral ? `${numeralSize} whitespace-nowrap tracking-tight` : "text-4xl sm:text-5xl"}`}
      >
        {char.khmer}
      </span>

      {char.aSeriesSound && char.oSeriesSound ? (
        <div className="flex flex-col items-center gap-0.5 w-full mt-1">
          <div className="text-[10px] font-bold text-ruby w-full text-center bg-ruby/10 rounded px-1 py-0.5">
            {char.aSeriesSound}
          </div>
          <div className="text-[10px] font-bold text-jade w-full text-center bg-jade/10 rounded px-1 py-0.5">
            {char.oSeriesSound}
          </div>
        </div>
      ) : (
        <div className="mt-1 flex flex-col items-center gap-1 text-center">
          <span
            className={`max-w-full break-words px-1 text-center font-bold leading-tight text-foreground ${isGreetings || isNumeral ? "text-xs" : "text-sm"}`}
          >
            {localizedCharacter.phonetic ?? char.learnerReading ?? char.latin}
          </span>
          {char.isAspirated && (
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">
              + air
            </span>
          )}
        </div>
      )}
    </button>
  );
}
