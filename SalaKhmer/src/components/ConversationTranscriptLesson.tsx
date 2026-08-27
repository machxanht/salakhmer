import { Languages, Pause, Play, Repeat2, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FlashcardContent, LessonMock } from "@/lib/mock-lessons";
import { playKhmerAudio, stopKhmerAudio } from "@/lib/audioService";
import { englishFriendlyRomanization } from "@/lib/romanization";
import { useLocale } from "@/lib/i18n";
import { localizeLegacyText } from "@/lib/content-localization";

type Props = {
  lesson: LessonMock;
  playbackRate: number;
  onBack: () => void;
  onComplete: () => Promise<void>;
};

export function ConversationTranscriptLesson({ lesson, playbackRate, onBack, onComplete }: Props) {
  const { locale, tr } = useLocale();
  const lines = lesson.content ?? [];
  const [active, setActive] = useState(0);
  const [showEnglish, setShowEnglish] = useState(true);
  const [playingAll, setPlayingAll] = useState(false);
  const [saving, setSaving] = useState(false);
  const [rate, setRate] = useState(playbackRate);
  const [error, setError] = useState<string | null>(null);
  const stopAfterLine = useRef(false);
  const progress = lines.length ? ((active + 1) / lines.length) * 100 : 0;
  const scenario = getDialogueScenario(lesson.title, lesson.scenarioIcon, lesson.scenarioLabel);

  useEffect(() => {
    const stopWhenHidden = () => {
      if (document.visibilityState !== "visible") stopKhmerAudio();
    };
    document.addEventListener("visibilitychange", stopWhenHidden);
    window.addEventListener("pagehide", stopKhmerAudio);
    return () => {
      document.removeEventListener("visibilitychange", stopWhenHidden);
      window.removeEventListener("pagehide", stopKhmerAudio);
      stopKhmerAudio();
    };
  }, []);

  async function playLine(line: FlashcardContent, index: number) {
    setActive(index);
    setError(null);
    try {
      await playKhmerAudio(line.audioId, line.front, rate);
    } catch (reason) {
      if ((reason as Error).message !== "Audio stopped")
        setError(locale === "vi" ? "Không thể phát âm thanh này. Hãy kiểm tra kết nối và thử lại." : "This audio could not be played. Check your connection and try again.");
    }
  }
  async function playAll() {
    if (playingAll) {
      stopAfterLine.current = true;
      stopKhmerAudio();
      return;
    }
    stopAfterLine.current = false;
    setPlayingAll(true);
    setError(null);
    try {
      for (const [index, line] of lines.entries()) {
        setActive(index);
        await playKhmerAudio(line.audioId, line.front, rate);
        if (stopAfterLine.current) break;
      }
    } catch (reason) {
      if ((reason as Error).message !== "Audio stopped")
        setError(locale === "vi" ? "Hội thoại đã dừng vì một câu audio không phát được." : "The conversation stopped because one audio line could not be played.");
    } finally {
      setPlayingAll(false);
      stopAfterLine.current = false;
    }
  }
  async function complete() {
    setSaving(true);
    try {
      await onComplete();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFCF7] font-sans text-[#173B33] pb-28">
      <div className="mx-auto min-h-screen max-w-[480px]">
        <header className="border-b border-[#E5E6E0] bg-[#FFFCF7] px-5 pt-2">
          <div className="flex items-center gap-3 py-2">
            <button
              onClick={() => {
                stopKhmerAudio();
                onBack();
              }}
              className="grid h-9 w-6 place-items-center"
              aria-label={tr("backToLessons")}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg font-black">{lesson.title}</h1>
              <p className="text-[12px] text-[#786858]">
                {locale === "vi" ? `Câu ${active + 1} / ${lines.length}` : `Line ${active + 1} of ${lines.length}`}
              </p>
            </div>
            <button
              onClick={() => setShowEnglish((value) => !value)}
              className="grid h-9 w-9 place-items-center"
              aria-label={locale === "vi" ? "Hiện hoặc ẩn bản dịch" : "Show or hide English"}
            >
              <Languages className="h-5 w-5" />
            </button>
          </div>
          <div className="h-[3px] bg-[#EDE5D8]">
            <div
              className="h-full bg-[#0B8B76] transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>
        <main className="px-5 py-5">
          <section className="mb-5 flex items-center gap-3 rounded-[22px] border border-[#CFE7DC] bg-[#F0F8F5] p-3 shadow-[0_7px_18px_rgba(11,139,118,.07)]">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-3xl" role="img" aria-label={scenario.label}>{scenario.icon}</span>
            <div><p className="text-[10px] font-black uppercase tracking-[.16em] text-[#0B8B76]">Conversation setting</p><p className="text-sm font-black text-[#173B33]">{scenario.label}</p></div>
          </section>
          <ul className="space-y-4">
            {lines.map((line, index) => (
              <DialogueLine
                key={line.id}
                line={line}
                index={index}
                active={active === index}
                showEnglish={showEnglish}
                locale={locale}
                onPlay={() => void playLine(line, index)}
              />
            ))}
          </ul>
          {error && (
            <p className="mt-5 rounded-[14px] border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <button
            onClick={() => void complete()}
            disabled={saving}
            className="mt-7 w-full rounded-2xl border border-[#D6E7E0] bg-white py-3 text-sm font-black text-[#587169] disabled:opacity-50"
          >
            {saving ? (locale === "vi" ? "Đang lưu tiến độ..." : "Saving progress...") : (locale === "vi" ? "Đánh dấu hoàn thành hội thoại" : "Mark conversation complete")}
          </button>
        </main>
        <footer className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[480px] bg-[#FFFCF7] px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-3">
          <div className="rounded-[20px] border border-[#E5E6E0] bg-white p-3 shadow-[0_10px_22px_rgba(23,59,51,.10)]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => void playAll()}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0B8B76] text-white"
              >
                {playingAll ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 fill-current" />
                )}
              </button>
              <div className="min-w-0 flex-1">
                <div className="relative h-1 rounded-full bg-[#EEE5D8]">
                  <div
                    className="h-full rounded-full bg-[#0B8B76]"
                    style={{ width: `${progress}%` }}
                  />
                  <span
                    className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#0B8B76]"
                    style={{ left: `calc(${progress}% - 6px)` }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-[12px] text-[#786858]">
                  <span>{playingAll ? (locale === "vi" ? "Đang phát" : "Playing") : (locale === "vi" ? "Sẵn sàng" : "Ready")}</span>
                  <span>
                    {active + 1}/{lines.length}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 gap-1">
                {[0.6, 1, 1.25].map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      stopKhmerAudio();
                      setRate(value);
                    }}
                    className={`rounded-full px-2 py-1 text-[10px] font-bold ${rate === value ? "bg-[#0B8B76] text-white" : "bg-[#E7F2EE] text-[#62766D]"}`}
                  >
                    {value}x
                  </button>
                ))}
              </div>
              <Repeat2 className="h-4 w-4 text-[#786858]" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function DialogueLine({
  line,
  index,
  active,
  showEnglish,
  locale,
  onPlay,
}: {
  line: FlashcardContent;
  index: number;
  active: boolean;
  showEnglish: boolean;
  locale: "en" | "vi" | "zh" | "fr";
  onPlay: () => void;
}) {
  const speaker = line.speaker ?? (index % 2 === 0 ? "female" : "male");
  const speakerName = line.speakerName ?? (speaker === "female" ? "Sreymom" : "Piseth");
  const isMale = speaker === "male";
  const bubble = [
    "max-w-[74%] rounded-[18px] border px-3.5 py-3 text-left",
    isMale ? "bg-[#E9F4EF] border-[#D2E8DE]" : "bg-white border-[#E5E6E0]",
    active ? "ring-2 ring-[#0B8B76]" : "",
  ].join(" ");
  return (
    <li className={isMale ? "flex flex-row-reverse items-start gap-2" : "flex items-start gap-2"}>
      <span title={speakerName} className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${isMale ? "bg-[#E5E9F5]" : "bg-[#F8E2E8]"}`}>
        {isMale ? "👨" : "👩"}
      </span>
      <button
        onClick={onPlay}
        className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#F2D28D] bg-[#FFF5D8] text-[#B87300]"
      >
        <Volume2 className={active ? "h-[18px] w-[18px] animate-pulse" : "h-[18px] w-[18px]"} />
      </button>
      <article className={bubble}>
        <p className="khmer text-[20px] font-bold leading-[1.55]">{line.front}</p>
        <p className="mt-0.5 text-[12px] italic leading-4 text-[#786858]">
          {englishFriendlyRomanization(line.desc)}
        </p>
        {showEnglish && <p className="mt-1.5 text-[13px] leading-5 text-[#665546]">{localizeLegacyText(line.back, locale)}</p>}
      </article>
    </li>
  );
}

function getDialogueScenario(title: string, icon?: string, label?: string) {
  if (icon && label) return { icon, label };
  const value = title.toLowerCase();
  if (/(market|shopping|fruit|price)/.test(value)) return { icon: "🛍️", label: "Market conversation" };
  if (/(restaurant|coffee|food|drink)/.test(value)) return { icon: "🍜", label: "Restaurant conversation" };
  if (/(school|class|library)/.test(value)) return { icon: "🏫", label: "School conversation" };
  if (/(hotel|room)/.test(value)) return { icon: "🏨", label: "Hotel conversation" };
  if (/(clinic|medicine|pharmacy|health)/.test(value)) return { icon: "💊", label: "Health conversation" };
  if (/(bus|train|tuk|travel|trip|airport)/.test(value)) return { icon: "🛺", label: "Travel conversation" };
  if (/(morning|home|family)/.test(value)) return { icon: "🏠", label: "Everyday conversation" };
  return { icon: "💬", label: "Everyday Khmer conversation" };
}
