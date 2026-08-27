import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Image as ImageIcon, Volume2 } from "lucide-react";
import { useState } from "react";
import { LongPageNav, LovableScreen } from "@/components/LovableAppShell";
import { TopicCover } from "@/components/TopicCover";
import { playKhmerAudio } from "@/lib/audioService";
import { getReadSpellTopic, getReadSpellWords } from "@/lib/read-spell-catalog";
import { getReadSpellVisual } from "@/lib/read-spell-visuals";
import { useLocale } from "@/lib/i18n";
import { getLocalizedReadSpellTopic, getLocalizedReadSpellWord } from "@/lib/read-spell-localization";
import { PatreonSupportCard } from "@/components/PatreonSupportCard";

export const Route = createFileRoute("/read-spell/$topicId")({ component: ReadSpellTopicPage });

function ReadSpellTopicPage() {
  const { topicId } = Route.useParams();
  const navigate = useNavigate();
  const topic = getReadSpellTopic(topicId);
  const words = getReadSpellWords(topicId);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState<0.6 | 1 | 1.25>(1);
  const { locale, tr } = useLocale();
  const localizedTopic = topic ? getLocalizedReadSpellTopic(topic, locale) : null;

  if (!topic) {
    return (
      <LovableScreen>
        <div className="p-6">
          <p>{locale === "vi" ? "Chủ đề này chưa sẵn sàng." : "This topic is not available yet."}</p>
          <Link to="/category/$categoryId" params={{ categoryId: "module_2" }} className="mt-4 inline-block text-[#A9631E]">
            {tr("back")} · {tr("readAndSpell")}
          </Link>
        </div>
      </LovableScreen>
    );
  }

  const playWord = async (id: string, khmer: string) => {
    setPlayingId(id);
    try {
      await playKhmerAudio(id, khmer, playbackRate);
    } finally {
      setPlayingId(null);
    }
  };

  return (
    <LovableScreen>
      <header className="flex items-center gap-3 px-5 pt-8">
        <button onClick={() => navigate({ to: "/category/$categoryId", params: { categoryId: "module_2" } })} className="grid h-10 w-10 place-items-center rounded-full border border-[#E4D7C5] bg-[#FFFCF7]" aria-label={locale === "vi" ? "Quay lại Đọc và đánh vần" : "Back to Read and Spell"}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.09em] text-[#A9631E]">{tr("readAndSpell")}</p>
          <h1 className="text-2xl font-bold">{localizedTopic?.title}</h1>
        </div>
      </header>

      <section className="px-5 pb-8 pt-6">
        <div className="rounded-[26px] border border-[#CFE7DC] bg-[#F0F8F5] p-4 shadow-[0_8px_20px_rgba(11,139,118,.07)]">
          <div className="flex items-center gap-3">
            <TopicCover topicId={topic.topic_id} size="hero" label={localizedTopic?.title} />
            <div>
              <h2 className="font-black">{tr("topicWords")}</h2>
              <p className="mt-1 text-[13px] leading-5 text-[#786858]">{localizedTopic?.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-lg font-black">{tr("topicWords")}</h2>
          <span className="text-[12px] font-semibold text-[#A9631E]">{words.length} {tr("topicWords")}</span>
        </div>
        <div className="mt-3 grid gap-4">
          {words.map((word) => {
            const localizedWord = getLocalizedReadSpellWord(word, locale);
            return (
            <article key={word.id} className="overflow-hidden rounded-[24px] border border-[#E5E6E0] bg-white shadow-[0_8px_20px_rgba(23,59,51,.06)]">
              <div className="grid grid-cols-[96px_1fr] items-center gap-4 bg-[#FBFDFB] px-4 py-4">
                <WordVisual
                  english={word.english_translation}
                  topicId={topic.topic_id}
                  wordOrder={word.word_order}
                />
                <div className="flex min-w-0 items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-khmer min-h-10 max-w-full overflow-visible whitespace-nowrap py-1 text-[clamp(22px,7vw,30px)] font-bold leading-[1.35] tracking-normal text-[#5A3520]" lang="km">
                      {word.khmer_text.replace(/\s+/gu, "")}
                    </p>
                    <p className="mt-2 text-[14px] text-[#65786F]">{localizedWord.meaning}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end">
                    <button
                      type="button"
                      onClick={() => playWord(word.id, word.khmer_text)}
                      aria-label={locale === "vi" ? `Phát ${word.khmer_text}` : `Play ${word.khmer_text}`}
                      className="grid h-10 w-10 place-items-center rounded-xl border border-[#F2D28D] bg-[#FFF5D8] text-[#B87300]"
                    >
                      <Volume2 className={`h-4 w-4 ${playingId === word.id ? "animate-pulse" : ""}`} />
                    </button>
                    <div className="hidden" aria-hidden="true">
                      {([0.6, 1, 1.25] as const).map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setPlaybackRate(rate)}
                          aria-pressed={playbackRate === rate}
                          className={`rounded-full px-1.5 py-1 text-[9px] font-extrabold ${playbackRate === rate ? "bg-[#F5A000] text-[#51310F]" : "text-[#8A6B50]"}`}
                        >
                          {rate}×
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <ReadingBridge
                spellingParts={word.spelling_parts}
                khmer={word.khmer_text}
                readAloud={word.phonetic_en}
              />
            </article>
            );
          })}
        </div>
        <PatreonSupportCard locale={locale} className="mt-6" />
      </section>
      <LongPageNav playbackRate={playbackRate} onPlaybackRateChange={setPlaybackRate} />
    </LovableScreen>
  );
}

type BridgePart = { khmer: string; latin: string };

function parseBridge(value: string): { parts: BridgePart[]; result: string } | null {
  if (!value || value.startsWith("Guided spelling")) return null;
  const [rawParts, rawResult] = value.split("➡️").map((part) => part.trim());
  if (!rawParts || !rawResult) return null;
  const parts = rawParts.split("+").map((part) => {
    const match = part.trim().match(/^(.*?)\s*\((.*?)\)$/);
    return match ? { khmer: match[1].trim(), latin: match[2].trim() } : null;
  });
  return parts.every(Boolean) ? { parts: parts as BridgePart[], result: rawResult } : null;
}

function ReadingBridge({
  spellingParts,
  khmer,
  readAloud,
}: {
  spellingParts: string;
  khmer: string;
  readAloud: string;
}) {
  const { tr, locale } = useLocale();
  const bridge = parseBridge(spellingParts) ?? deriveSalaBridge(khmer, readAloud);
  return (
    <div className="border-t border-[#E1EAEB] bg-[#FCFEFE] p-3">
      <div className="rounded-[18px] border border-[#DCE7E8] bg-white p-3">
        <p className="text-[10px] font-bold uppercase tracking-[.1em] text-[#8A5A3D]">{tr("standardSpelling")}</p>
        {bridge ? (
          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[12px] font-bold text-[#563B2B]">
            {bridge.parts.map((part, index) => (
              <span key={`${part.khmer}-${index}`} className="flex items-center gap-1.5">
                <span className="rounded-full bg-[#F7EBD3] px-2.5 py-1">{standardName(part)}</span>
                {index < bridge.parts.length - 1 && <span className="text-[#B76619]">+</span>}
              </span>
            ))}
          </div>
        ) : null}

        <p className="mt-4 text-[10px] font-bold uppercase tracking-[.1em] text-[#8A5A3D]">{tr("readAloud")}</p>
        <div className="mt-2 flex w-full items-center justify-between rounded-[16px] border border-[#D4E1F2] bg-[#F4F8FE] p-3 text-left">
          <span className="text-[17px] font-bold text-[#D98624]">{readAloud}</span>
        </div>

        <div className="mt-4 rounded-[16px] border border-[#D9C6F1] bg-[#F9F5FF] p-3">
          <p className="text-[10px] font-bold uppercase tracking-[.1em] text-[#B76619]">{tr("readingBridge")}</p>
          {bridge ? (
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[12px] font-extrabold text-[#563B2B]">
              {bridge.parts.map((part, index) => (
                <span key={`${part.latin}-${index}`} className="flex items-center gap-1.5">
                  <span className="rounded-full bg-[#F7EBD3] px-2.5 py-1"><span className="font-khmer text-[16px]">{part.khmer}</span> ({part.latin})</span>
                  {index < bridge.parts.length - 1 && <span className="text-[#B76619]">+</span>}
                </span>
              ))}
              <span className="text-[#B76619]">→</span>
              <span className="rounded-full bg-[#F5A000] px-2.5 py-1 text-[#51310F]">{bridge.result}</span>
            </div>
          ) : null}
          <p className="mt-2 text-[11px] leading-4 text-[#786858]">{locale === "vi" ? `Cầu nối dành cho người mới. Cách đọc chuẩn: ${readAloud}.` : `Beginner bridge only. Standard reading: ${readAloud}.`}</p>
        </div>
      </div>
    </div>
  );
}

function deriveSalaBridge(khmer: string, readAloud: string): { parts: BridgePart[]; result: string } | null {
  const consonants: Record<string, string> = {
    ក: "K", ខ: "KH", គ: "K", ឃ: "KH", ង: "NG", ច: "CH", ឆ: "CHH", ជ: "J", ឈ: "CHH", ញ: "NH",
    ដ: "D", ឋ: "TH", ឌ: "D", ឍ: "TH", ណ: "N", ត: "T", ថ: "TH", ទ: "T", ធ: "TH", ន: "N",
    ប: "B", ផ: "PH", ព: "P", ភ: "PH", ម: "M", យ: "Y", រ: "R", ល: "L", វ: "V", ស: "S", ហ: "H", ឡ: "L", អ: "A",
  };
  const signs: Record<string, string> = {
    "ា": "A", "ិ": "I", "ី": "EI", "ឹ": "EU", "ឺ": "EU", "ុ": "U", "ូ": "OU", "ួ": "UO", "ើ": "EU",
    "ៀ": "IE", "េ": "E", "ែ": "AE", "ៃ": "AI", "ោ": "AO", "ៅ": "AO", "ំ": "OM", "ះ": "AH", "ៈ": "AK", "់": "",
    "័": "", "៏": "", "៌": "", "៎": "",
  };
  const chars = Array.from(khmer);
  const parts: BridgePart[] = [];

  for (let index = 0; index < chars.length; index += 1) {
    const char = chars[index];
    if (char === "្" && chars[index + 1]) {
      const next = chars[index + 1];
      const latin = consonants[next];
      if (latin) parts.push({ khmer: `${char}${next}`, latin });
      index += 1;
      continue;
    }
    if (char === "អ" && chars[index + 1] === "ា") {
      parts.push({ khmer: "អា", latin: "A" });
      index += 1;
      continue;
    }
    if (consonants[char]) parts.push({ khmer: char, latin: consonants[char] });
    else if (Object.prototype.hasOwnProperty.call(signs, char) && signs[char]) parts.push({ khmer: char, latin: signs[char] });
  }

  if (!parts.length) return null;
  return { parts, result: readAloud.replace(/[^a-zA-Z]/g, "").toUpperCase() };
}

function standardName(part: BridgePart) {
  const vowelNames: Record<string, string> = {
    "ា": "sRak Ah", "េ": "sRak Ae", "ែ": "sRak Ae", "ិ": "sRak I", "ី": "sRak Ei",
    "ុ": "sRak O", "ូ": "sRak Ou", "ើ": "sRak Eu", "ៀ": "sRak Ie", "ៅ": "sRak Ao",
    "ៃ": "sRak Ai", "ោ": "sRak Ao", "ំ": "sRak Om", "ះ": "sRak Ah",
  };
  const exactVowel = vowelNames[part.khmer];
  if (exactVowel) return exactVowel;
  const consonantNames: Record<string, string> = {
    K: "Ko", KH: "Kho", CH: "Cho", CHH: "Chho", D: "Do", T: "To", TH: "Tho",
    N: "No", B: "Bo", P: "Po", PH: "Pho", M: "Mo", Y: "Yo", R: "Ro", L: "Lo",
    V: "Vo", S: "So", H: "Ho", NH: "Nho", NG: "Ngo", J: "Jo", F: "Fo",
  };
  if (consonantNames[part.latin]) return consonantNames[part.latin];
  if (/^[A-Z]+$/.test(part.latin) && part.latin.length <= 3) return `${part.latin[0]}${part.latin.slice(1).toLowerCase()}o`;
  return part.latin;
}

const COLOR_SWATCHES: Record<string, string> = {
  Red: "#D93B32",
  Blue: "#3478C7",
  Yellow: "#F4C431",
  Green: "#4A9B61",
  White: "#FFFDF7",
  Black: "#282421",
  Pink: "#E97C9B",
  "Orange (color)": "#EC812B",
  Purple: "#8562AD",
  Brown: "#8A5A3D",
  Gray: "#9CA3A7",
  "Gold (color)": "#D6A32B",
  "Silver (color)": "#C0C7CC",
  Dark: "#3E3D45",
  "Light / Bright": "#FFF1A3",
};

function WordVisual({
  english,
  topicId,
  wordOrder,
}: {
  english: string;
  topicId: string;
  wordOrder: number;
}) {
  if (topicId === "topic-colors") {
    const color = COLOR_SWATCHES[english] ?? "#F9E8BF";
    return (
      <div className="aspect-square w-full rounded-[18px] border border-[#E4D7C5] p-3" style={{ backgroundColor: "#FFF8EC" }} aria-label={`${english} color swatch`}>
        <div className="h-full w-full rounded-[13px] shadow-inner" style={{ backgroundColor: color }} />
      </div>
    );
  }
  const visual = getReadSpellVisual(topicId, wordOrder);
  if (visual) {
    return (
      <div
        className="grid aspect-square w-full place-items-center rounded-[18px] border border-[#E4D7C5] bg-[#FFF8EC] p-2 shadow-inner"
        aria-label={`${english} visual`}
      >
        <span
          aria-hidden="true"
          className="select-none text-[58px] leading-none"
          style={{ fontFamily: "'Noto Color Emoji', 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif" }}
        >
          {visual}
        </span>
      </div>
    );
  }

  // Expansion words have a topic-specific generated cover while their own
  // individual illustration is still being produced. This is intentional: it
  // replaces the misleading empty "Illustration queued" card with a real,
  // consistent visual and keeps the vocabulary list light on mobile data.
  if (topicId.startsWith("topic-")) {
    return <TopicCover topicId={topicId} size="word" label={english} />;
  }

  return (
    <div className="grid aspect-square w-full place-items-center rounded-[18px] border border-dashed border-[#E3CDA8] bg-[#FFF8EC] p-3 text-center text-[#A06E48]">
      <ImageIcon className="h-7 w-7 text-[#C87A14]" />
      <span className="mt-1 text-[10px] font-semibold leading-3">Visual unavailable</span>
    </div>
  );
}
