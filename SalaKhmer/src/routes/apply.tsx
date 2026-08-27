import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CalendarDays, ChevronRight, Keyboard, Search } from "lucide-react";
import { useRef, useState, type ComponentType } from "react";
import momentkh from "@thyrith/momentkh";
import { LovableBottomNav, LovableHeader, LovableScreen, LovableSectionTitle } from "@/components/LovableAppShell";
import { useLocale } from "@/lib/i18n";
import { PatreonSupportCard } from "@/components/PatreonSupportCard";

export const Route = createFileRoute("/apply")({ component: ApplyPage });

function ApplyPage() {
  const { locale, tr, t } = useLocale();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const calendarRef = useRef<HTMLElement>(null);
  const lunar = momentkh.format(momentkh.fromDate(new Date(`${date}T12:00:00+07:00`)));

  return (
    <LovableScreen>
      <LovableHeader eyebrow={tr("practicalKhmer")} title={t("practice")} />
      <section className="px-5 pt-4">
        <p className="text-[14px] text-[#786858]">{tr("applyIntro")}</p>
      </section>
      <section className="px-5 pt-7">
        <LovableSectionTitle title={tr("tools")} />
        <div className="grid grid-cols-2 gap-3">
          <Link to="/dictionary" className="rounded-[18px] border border-[#B7DDD7] bg-[#EFF9F6] p-4 text-left shadow-[0_5px_14px_rgba(43,112,101,.08)]">
            <IconTile icon={Search} tone="teal" />
            <h2 className="mt-3 text-[15px] font-semibold">{t("dictionary")}</h2>
            <p className="mt-1 text-[12px] text-[#56756E]">Look up Khmer words and hear saved pronunciation.</p>
            <ChevronRight className="mt-2 h-4 w-4 text-[#287E75]" />
          </Link>
          <ToolCard icon={CalendarDays} title={tr("khmerCalendar")} text={tr("checkLunarDate")} onClick={() => calendarRef.current?.scrollIntoView({ behavior: "smooth" })} />
          <ToolCard icon={Keyboard} title={tr("khmerKeyboard")} text={tr("setUpTyping")} onClick={() => setKeyboardOpen((open) => !open)} />
          <Link to="/practice" className="rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7] p-4 text-left">
            <IconTile icon={BookOpen} />
            <h2 className="mt-3 text-[15px] font-semibold">{t("review")}</h2>
            <p className="mt-1 text-[12px] text-[#786858]">{tr("reviewSavedMistakes")}</p>
          </Link>
        </div>
      </section>
      {keyboardOpen && <section className="px-5 pt-6"><article className="rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7] p-4 text-[13px] leading-5 text-[#786858]"><h2 className="text-[15px] font-semibold text-[#47382B]">Set up Khmer typing</h2><p className="mt-2"><strong className="text-[#47382B]">Android:</strong> Settings → System → Languages & input → Gboard → Languages → Add keyboard → Khmer.</p><p className="mt-2"><strong className="text-[#47382B]">iPhone/iPad:</strong> Settings → General → Keyboard → Keyboards → Add New Keyboard → Khmer.</p><p className="mt-2"><strong className="text-[#47382B]">Windows:</strong> Settings → Time & language → Language & region → Add a language → Khmer. Switch with Win + Space.</p></article></section>}
      <section ref={calendarRef} className="px-5 pt-8"><LovableSectionTitle title={tr("khmerCalendar")} note="Choose a date" /><article className="rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7] p-4"><input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="rounded-[12px] border border-[#E4D7C5] bg-[#FBF7F0] px-3 py-2 text-sm" /><p className="khmer mt-3 rounded-[12px] bg-[#F9E8BF]/50 p-3 text-center text-lg">{lunar}</p></article></section>
      <section className="px-5 pb-8 pt-7"><PatreonSupportCard locale={locale} /></section>
      <LovableBottomNav />
    </LovableScreen>
  );
}

function IconTile({ icon: Icon, tone = "gold" }: { icon: ComponentType<{ className?: string; strokeWidth?: number }>; tone?: "gold" | "teal" }) {
  return <span className={`grid h-10 w-10 place-items-center rounded-[14px] ${tone === "teal" ? "bg-[#D7EFEA] text-[#287E75]" : "bg-[#F9E8BF] text-[#A9631E]"}`}><Icon className="h-5 w-5" strokeWidth={1.75} /></span>;
}

function ToolCard({ icon, title, text, onClick }: { icon: ComponentType<{ className?: string; strokeWidth?: number }>; title: string; text: string; onClick: () => void }) {
  return <button onClick={onClick} className="min-h-[142px] rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7] p-4 text-left"><IconTile icon={icon} /><h2 className="mt-3 text-[15px] font-semibold">{title}</h2><p className="mt-1 text-[12px] text-[#786858]">{text}</p><ChevronRight className="mt-2 h-4 w-4 text-[#A99B8C]" /></button>;
}
