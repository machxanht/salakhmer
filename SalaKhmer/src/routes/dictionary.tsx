import { createFileRoute } from "@tanstack/react-router";
import { Languages, Search, Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import { LovableBottomNav, LovableHeader, LovableScreen } from "@/components/LovableAppShell";
import { createDictionaryAudio, lookupKhmerDictionary, type DictionaryLookup } from "@/lib/dictionary-api";
import { LOCALES, type Locale, useLocale } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";
import { PatreonSupportCard } from "@/components/PatreonSupportCard";

export const Route = createFileRoute("/dictionary")({ component: DictionaryPage });

const copy: Record<Locale, { intro: string; search: string; helper: string; signIn: string; loading: string; listen: string; machine: string; audioHint: string }> = {
  en: { intro: "Look up Khmer words. New results are safely cached for faster future searches.", search: "Enter a Khmer word or short phrase", helper: "Khmer → English, Vietnamese, Chinese, French", signIn: "Sign in to search the online dictionary.", loading: "Looking up…", listen: "Create / play pronunciation", machine: "Machine translation — verify important meanings.", audioHint: "Tap the speaker to hear Khmer. First play can take a few seconds while audio is prepared and saved; later plays are instant." },
  vi: { intro: "Tra từ Khmer. Kết quả mới được lưu an toàn để các lần sau nhanh hơn.", search: "Nhập từ hoặc cụm từ Khmer", helper: "Khmer → Anh, Việt, Trung, Pháp", signIn: "Hãy đăng nhập để tra từ điển trực tuyến.", loading: "Đang tra…", listen: "Tạo / phát phát âm", machine: "Bản dịch máy — hãy kiểm tra các nghĩa quan trọng.", audioHint: "Nhấn biểu tượng loa để nghe tiếng Khmer. Lần đầu có thể mất vài giây để chuẩn bị và lưu âm thanh; các lần sau sẽ phát ngay." },
  zh: { intro: "查询高棉语词汇。新结果会安全缓存，以便下次更快显示。", search: "输入一个高棉语词或短语", helper: "高棉语 → 英语、越南语、中文、法语", signIn: "请登录后使用在线词典。", loading: "正在查询…", listen: "生成 / 播放发音", machine: "机器翻译——重要含义请核对。", audioHint: "点击扬声器收听高棉语。首次播放需要几秒钟来准备并保存音频，之后会立即播放。" },
  fr: { intro: "Recherchez des mots khmers. Les nouveaux résultats sont mis en cache pour les recherches suivantes.", search: "Saisissez un mot ou une courte expression khmère", helper: "Khmer → anglais, vietnamien, chinois, français", signIn: "Connectez-vous pour utiliser le dictionnaire en ligne.", loading: "Recherche…", listen: "Créer / écouter la prononciation", machine: "Traduction automatique : vérifiez les sens importants.", audioHint: "Touchez le haut-parleur pour écouter le khmer. La première lecture peut prendre quelques secondes pendant la préparation et la sauvegarde de l’audio ; les suivantes sont immédiates." },
};

const glossaryCopy: Record<Locale, { label: string; level: string; reviewed: string }> = {
  en: { label: "SalaKhmer learning term", level: "Related level", reviewed: "Reviewed SalaKhmer entry." },
  vi: { label: "Thu\u1eadt ng\u1eef h\u1ecdc SalaKhmer", level: "C\u1ea5p li\u00ean quan", reviewed: "M\u1ee5c SalaKhmer \u0111\u00e3 duy\u1ec7t." },
  zh: { label: "SalaKhmer \u5b66\u4e60\u672f\u8bed", level: "\u76f8\u5173\u7ea7\u522b", reviewed: "\u5df2\u5ba1\u6838\u7684 SalaKhmer \u6761\u76ee\u3002" },
  fr: { label: "Terme d'apprentissage SalaKhmer", level: "Niveau associ\u00e9", reviewed: "Entr\u00e9e SalaKhmer approuv\u00e9e." },
};

function DictionaryPage() {
  const { locale } = useLocale();
  const { firebaseUser } = useAuth();
  const [targetLocale, setTargetLocale] = useState<Locale>(locale);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<DictionaryLookup | null>(null);
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [error, setError] = useState("");
  const player = useRef<HTMLAudioElement | null>(null);
  const text = copy[locale];

  const lookup = async () => {
    if (!firebaseUser || !query.trim() || loading) return;
    setLoading(true);
    setError("");
    try {
      const token = await firebaseUser.getIdToken();
      setResult(await lookupKhmerDictionary(token, query));
    } catch (cause) {
      setResult(null);
      setError(cause instanceof Error ? cause.message : "Dictionary lookup failed.");
    } finally {
      setLoading(false);
    }
  };

  const playAudio = async () => {
    if (!firebaseUser || !result || audioLoading) return;
    setAudioLoading(true);
    setError("");
    try {
      const token = await firebaseUser.getIdToken();
      const audio = await createDictionaryAudio(token, result.text);
      if (audio.status !== "ready" || !audio.url) throw new Error("Pronunciation is being created. Tap again in a moment.");
      player.current?.pause();
      player.current = new Audio(audio.url);
      await player.current.play();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Pronunciation could not play.");
    } finally {
      setAudioLoading(false);
    }
  };

  return (
    <LovableScreen>
      <LovableHeader eyebrow="SalaKhmer" title="Dictionary" />
      <section className="px-5 pt-3">
        <p className="text-[14px] leading-5 text-[#786858]">{text.intro}</p>
        <form onSubmit={(event) => { event.preventDefault(); void lookup(); }} className="mt-5">
          <label className="relative block">
            <Search className="absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#A99B8C]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.search} className="khmer h-12 w-full rounded-[14px] border border-[#E4D7C5] bg-[#FFFCF7] pl-10 pr-3 text-[16px] outline-none" />
          </label>
          <button type="submit" disabled={!firebaseUser || !query.trim() || loading} className="mt-3 h-11 w-full rounded-[14px] bg-[#E99B12] text-sm font-bold text-[#392410] disabled:cursor-not-allowed disabled:opacity-45">
            {loading ? text.loading : "Search"}
          </button>
        </form>
        <div className="mt-4 flex items-center gap-2 rounded-[14px] border border-[#DCE9E6] bg-[#EEF8F5] px-3 py-2.5">
          <Languages className="h-4 w-4 shrink-0 text-[#287E75]" />
          <span className="min-w-0 flex-1 text-[12px] text-[#5B756F]">{text.helper}</span>
          <select value={targetLocale} onChange={(event) => setTargetLocale(event.target.value as Locale)} className="max-w-[136px] bg-transparent text-right text-[13px] font-bold outline-none">
            {LOCALES.map((item) => <option key={item.id} value={item.id}>{item.nativeLabel}</option>)}
          </select>
        </div>
        <p className="mt-3 text-[12px] leading-5 text-[#786858]">{text.audioHint}</p>
        {!firebaseUser && <p className="mt-4 rounded-[14px] border border-[#F2D39C] bg-[#FFF7E7] px-3 py-3 text-sm text-[#806239]">{text.signIn}</p>}
        {error && <p role="alert" className="mt-4 rounded-[14px] border border-[#F3B2A9] bg-[#FFF0EE] px-3 py-3 text-sm text-[#A23D2C]">{error}</p>}
      </section>
      {result && (
        <section className="px-5 pt-6">
          <article className="overflow-hidden rounded-[20px] border border-[#DDE9E6] bg-[#FFFCF7] shadow-[0_8px_20px_rgba(47,76,72,.08)]">
            <div className="flex items-center gap-3 border-b border-[#EDE1CE] p-4">
              <span className="khmer min-w-0 flex-1 text-[31px] font-bold leading-tight">{result.text}</span>
              <button onClick={() => void playAudio()} disabled={audioLoading} aria-label={text.listen} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#E9B85D] bg-[#FFF8E8] text-[#C87709] disabled:opacity-50">
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-[11px] font-bold uppercase tracking-[.1em] text-[#A9631E]">{LOCALES.find((item) => item.id === targetLocale)?.nativeLabel}</p>
              <p className="mt-1 text-xl font-bold">{result.translations[targetLocale]}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {LOCALES.filter((item) => item.id !== targetLocale).map((item) => (
                  <div key={item.id} className="rounded-xl bg-[#F7F2E8] px-3 py-2">
                    <p className="text-[10px] font-bold uppercase text-[#A99B8C]">{item.nativeLabel}</p>
                    <p className="mt-0.5 text-sm font-medium">{result.translations[item.id]}</p>
                  </div>
                ))}
              </div>
              {result.glossary && result.explanation?.[targetLocale] && (
                <div className="mt-4 rounded-xl border border-[#DDE9E6] bg-[#F3FAF7] px-3 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-[.08em] text-[#287E75]">{glossaryCopy[locale].label}</p>
                  <p className="mt-1 text-[13px] leading-5 text-[#46635D]">{result.explanation[targetLocale]}</p>
                  {result.relatedLevel && <p className="mt-2 text-[11px] font-semibold text-[#6F817B]">{glossaryCopy[locale].level}: {result.relatedLevel.replace("_", " ").replace("level", "Level")}</p>}
                </div>
              )}
              <p className="mt-4 text-[12px] leading-5 text-[#786858]">{result.status === "machine_draft" ? text.machine : result.glossary ? glossaryCopy[locale].reviewed : "Reviewed SalaKhmer entry."}</p>
            </div>
          </article>
        </section>
      )}
      <section className="px-5 pb-8 pt-6">
        <PatreonSupportCard locale={locale} />
      </section>
      <LovableBottomNav />
    </LovableScreen>
  );
}
