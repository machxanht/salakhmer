import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Check,
  ChevronRight,
  Compass,
  Headphones,
  Home,
  Languages,
  Lock,
  PenLine,
  Search,
  Sparkles,
  Type,
  UserRound,
  ArrowLeft,
  Bot,
  SlidersHorizontal,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { AIChatbox } from "@/components/AIChatbox";
import { useAuth } from "@/hooks/useAuth";
import { MOCK_LESSONS } from "@/lib/mock-lessons";
import { LOCALES, useLocale, type Locale } from "@/lib/i18n";
import apsaraTeacher from "@/assets/apsara/apsara-script-basics-teacher.png";
import apsaraReading from "@/assets/apsara/apsara-reading.png";
import apsaraListening from "@/assets/apsara/apsara-listening.png";
import apsaraWriting from "@/assets/apsara/apsara-writing.png";
import apsaraReview from "@/assets/apsara/apsara-review.png";
import apsaraGuide from "@/assets/apsara/apsara-guide.png";

export const LOVABLE_MODULES = [
  {
    id: "module_1",
    title: "Script Basics",
    subtitle: "Recognise letters and their sounds",
    icon: Type,
    art: apsaraTeacher,
  },
  {
    id: "module_2",
    title: "Read & Spell",
    subtitle: "Decode and build Khmer words",
    icon: BookOpen,
    art: apsaraReading,
  },
  {
    id: "module_3",
    title: "Listen & Speak",
    subtitle: "Understand real conversations",
    icon: Headphones,
    art: apsaraListening,
  },
  {
    id: "module_4",
    title: "Handwriting",
    subtitle: "Form Khmer strokes by hand",
    icon: PenLine,
    art: apsaraWriting,
  },
  { id: "module_5", title: "Review & Test", subtitle: "Strengthen what you remember", icon: Check, art: apsaraReview },
  { id: "module_6", title: "Cambodia Guide", subtitle: "Use Khmer in real life", icon: Compass, art: apsaraGuide },
] as const;

const MODULE_COPY: Record<Locale, Record<(typeof LOVABLE_MODULES)[number]["id"], { title: string; subtitle: string }>> = {
  en: Object.fromEntries(LOVABLE_MODULES.map((module) => [module.id, { title: module.title, subtitle: module.subtitle }])) as Record<(typeof LOVABLE_MODULES)[number]["id"], { title: string; subtitle: string }>,
  vi: {
    module_1: { title: "Nền tảng chữ viết", subtitle: "Nhận biết chữ và âm" }, module_2: { title: "Đọc & đánh vần", subtitle: "Ghép và đọc từ Khmer" }, module_3: { title: "Nghe & nói", subtitle: "Hiểu hội thoại đời thường" }, module_4: { title: "Tập viết", subtitle: "Luyện nét chữ Khmer" }, module_5: { title: "Ôn tập & kiểm tra", subtitle: "Củng cố điều đã học" }, module_6: { title: "Cẩm nang Campuchia", subtitle: "Dùng Khmer trong đời sống" },
  },
  zh: {
    module_1: { title: "文字基础", subtitle: "认识字母和发音" }, module_2: { title: "阅读与拼写", subtitle: "拼读高棉语单词" }, module_3: { title: "听说练习", subtitle: "理解日常对话" }, module_4: { title: "书写练习", subtitle: "练习高棉文字笔画" }, module_5: { title: "复习与测验", subtitle: "巩固所学内容" }, module_6: { title: "柬埔寨指南", subtitle: "在生活中使用高棉语" },
  },
  fr: {
    module_1: { title: "Bases de l’écriture", subtitle: "Reconnaître les lettres et leurs sons" }, module_2: { title: "Lire et épeler", subtitle: "Décoder les mots khmers" }, module_3: { title: "Écouter et parler", subtitle: "Comprendre des dialogues réels" }, module_4: { title: "Écriture manuscrite", subtitle: "Former les traits khmers" }, module_5: { title: "Révision et test", subtitle: "Renforcer vos acquis" }, module_6: { title: "Guide du Cambodge", subtitle: "Utiliser le khmer au quotidien" },
  },
};

export function getLocalizedModuleCopy(moduleId: (typeof LOVABLE_MODULES)[number]["id"], locale: Locale) {
  return MODULE_COPY[locale][moduleId] ?? MODULE_COPY.en[moduleId];
}

export function LovableScreen({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-h-screen bg-[#EAF0F3] font-sans text-[#173B33] ${className}`}>
      <main className="mx-auto min-h-screen w-full max-w-[480px] bg-[#FFFCF7] pb-[calc(6.5rem+env(safe-area-inset-bottom))] shadow-[0_0_0_1px_rgba(23,59,51,.05)]">
        {children}
      </main>
    </div>
  );
}

export function LovableHeader({
  eyebrow,
  title,
  right,
}: {
  eyebrow?: string;
  title: string;
  right?: ReactNode;
}) {
  return (
    <header className="flex items-center justify-between px-5 pt-8">
      <div>
        {eyebrow && (
          <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#0B8B76]">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 text-[26px] font-black tracking-[-.04em] text-[#173B33]">{title}</h1>
      </div>
      {right}
    </header>
  );
}

export function LanguagePicker() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const active = LOCALES.find((item) => item.id === locale) ?? LOCALES[0];
  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Change interface language"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
        className="grid h-11 w-11 place-items-center rounded-2xl border border-[#D8E6E3] bg-[#EAF6F2] text-[#0B8B76] shadow-[0_4px_12px_rgba(40,88,82,.10)]"
      >
        <Languages className="h-[19px] w-[19px]" strokeWidth={2} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-12 z-40 w-40 overflow-hidden rounded-2xl border border-[#DCE9E6] bg-white p-1.5 shadow-[0_12px_30px_rgba(47,76,72,.18)]">
          {LOCALES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setLocale(item.id);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${item.id === locale ? "bg-[#E7F5F1] text-[#167C70]" : "text-[#5F6F6B] hover:bg-[#F5FAF8]"}`}
            >
              <span>{item.nativeLabel}</span>
              <span className="text-[10px] font-bold uppercase opacity-65">{item.id}</span>
            </button>
          ))}
        </div>
      )}
      <span className="sr-only">{active.nativeLabel}</span>
    </div>
  );
}

export function LovableModulePath() {
  const { user } = useAuth();
  const { locale } = useLocale();
  const iconTones = [
    "bg-[#FFF0CC] text-[#C77800]",
    "bg-[#E3F4ED] text-[#07836C]",
    "bg-[#E5F1FF] text-[#3073B6]",
    "bg-[#EEE8FF] text-[#6756B5]",
    "bg-[#FFE7DB] text-[#C45E36]",
    "bg-[#E7F2EE] text-[#0B8B76]",
  ];
  return (
    <ul className="flex flex-col gap-3">
      {LOVABLE_MODULES.map((module, index) => {
        const total = module.id === "module_1" ? 6 : (MOCK_LESSONS[module.id]?.length ?? 0);
        const done = user.categoryProgress[module.id] ?? 0;
        const locked = user.role === "GUEST" && index > 0;
        const Icon = module.icon;
        const copy = getLocalizedModuleCopy(module.id, locale);
        const percent = total ? Math.min(100, Math.round((done / total) * 100)) : 0;
        return (
          <li key={module.id}>
            <Link
              to="/category/$categoryId"
              params={{ categoryId: module.id }}
            className={`flex min-h-[82px] items-center gap-3 rounded-[22px] border px-4 transition active:scale-[.99] ${locked ? "border-[#EDE1CE] bg-[#F5F0E6]" : "border-[#E5E6E0] bg-white shadow-[0_7px_18px_rgba(23,59,51,.06)]"}`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] ${locked ? "bg-[#EDE1CE] text-[#A99B8C]" : iconTones[index]}`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <strong className={`block text-[15px] font-black ${locked ? "text-[#A99B8C]" : ""}`}>
                  {copy.title}
                </strong>
                <small className="mt-0.5 block truncate text-[12.5px] text-[#786858]">
                  {copy.subtitle}
                </small>
              </span>
              {locked ? (
                <Lock className="h-4 w-4 text-[#A99B8C]" />
              ) : done >= total && total > 0 ? (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#367562] text-white">
                  <Check className="h-[13px] w-[13px]" strokeWidth={3} />
                </span>
              ) : (
                <ProgressRing value={percent} label={`${done}/${total}`} />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function ProgressRing({ value, label }: { value: number; label: string }) {
  const c = 119.38;
  return (
    <span className="relative h-11 w-11 shrink-0">
      <svg width="44" height="44" className="-rotate-90">
        <circle cx="22" cy="22" r="19" fill="none" stroke="#E9E7E0" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r="19"
          fill="none"
          stroke="#0B8B76"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[10px] font-black text-[#61736B]">
        {label}
      </span>
    </span>
  );
}

export function LovableBottomNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { t } = useLocale();
  const [assistantOpen, setAssistantOpen] = useState(false);
  const items = [
    [Home, t("home"), "/home"],
    [Search, t("dictionary"), "/dictionary"],
    [Compass, t("practice"), "/apply"],
    [UserRound, t("profile"), "/profile"],
  ] as const;
  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[480px] border-t border-[#E5E6E0] bg-[#FFFCF7]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <ul className="flex h-[72px]">
          {items.slice(0, 2).map(([Icon, label, to]) => {
          const active = pathname === to || (to === "/learn" && pathname.startsWith("/category"));
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={`flex h-full w-full flex-col items-center justify-center gap-1 ${active ? "text-[#0B8B76]" : "text-[#8A9891]"}`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
                <span className="text-[11px] font-bold">{label}</span>
              </Link>
            </li>
          );
          })}
          <li className="relative flex flex-1 justify-center">
            <button
              type="button"
              onClick={() => setAssistantOpen(true)}
              aria-label="Open SalaKhmer AI Assistant"
              className="absolute -top-7 grid h-[58px] w-[58px] place-items-center rounded-full border-4 border-[#FFFCF7] bg-[#0B8B76] text-white shadow-[0_10px_22px_rgba(11,139,118,.30)] transition-transform active:scale-95"
            >
              <Bot className="h-6 w-6" strokeWidth={2} />
            </button>
            <span className="mt-9 text-[10px] font-black text-[#0B8B76]">AI</span>
          </li>
          {items.slice(2).map(([Icon, label, to]) => {
            const active = pathname === to;
            return (
              <li key={to} className="flex-1">
                <Link to={to} className={`flex h-full w-full flex-col items-center justify-center gap-1 ${active ? "text-[#0B8B76]" : "text-[#8A9891]"}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                  <span className="text-[11px] font-bold">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {assistantOpen && <AIChatbox onClose={() => setAssistantOpen(false)} />}
    </>
  );
}

/**
 * Kept above the fixed bottom navigation on long lesson/category screens.
 * It gives a learner an obvious way back without needing to scroll to the top.
 */
export function LongPageNav({
  playbackRate,
  onPlaybackRateChange,
}: {
  playbackRate?: 0.6 | 1 | 1.25;
  onPlaybackRateChange?: (rate: 0.6 | 1 | 1.25) => void;
}) {
  const navigate = useNavigate();
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
      return;
    }
    navigate({ to: "/learn" });
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[76px] z-20 mx-auto flex w-full max-w-[480px] justify-end px-4">
      <div className="pointer-events-auto relative">
        {isOpen && (
          <div className="absolute bottom-12 right-0 flex min-w-[178px] flex-col gap-2 rounded-[18px] border border-[#D8E6E3] bg-[#FFFCF7]/95 p-2 shadow-[0_10px_28px_rgba(40,88,82,.18)] backdrop-blur">
            <div className="flex gap-2">
              <button type="button" onClick={goBack} className="grid h-9 flex-1 place-items-center rounded-xl bg-[#EAF6F2] text-[#167C70]" aria-label={t("back")}><ArrowLeft className="h-4 w-4" /></button>
              <Link to="/home" aria-label={t("home")} className="grid h-9 flex-1 place-items-center rounded-xl bg-[#FFF3DB] text-[#C77A16]"><Home className="h-4 w-4" /></Link>
            </div>
            {playbackRate !== undefined && onPlaybackRateChange && (
              <div className="flex items-center justify-between gap-1 rounded-xl bg-[#F5EFE3] p-1" aria-label="Audio speed">
                {([0.6, 1, 1.25] as const).map((rate) => (
                  <button key={rate} type="button" onClick={() => onPlaybackRateChange(rate)} aria-pressed={playbackRate === rate} className={`rounded-lg px-2 py-1.5 text-[11px] font-extrabold ${playbackRate === rate ? "bg-[#F5A000] text-[#51310F]" : "text-[#8A6B50]"}`}>{rate}×</button>
                ))}
              </div>
            )}
          </div>
        )}
        <button type="button" onClick={() => setIsOpen((value) => !value)} aria-label="Page controls" aria-expanded={isOpen} className="grid h-10 w-10 place-items-center rounded-full border border-[#E7D5B5] bg-[#FFF9ED]/95 text-[#C77A16] shadow-[0_6px_18px_rgba(112,77,30,.14)] backdrop-blur">
          <SlidersHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export function LovableSectionTitle({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <h2 className="text-[19px] font-semibold tracking-[-.01em]">{title}</h2>
      {note && <p className="text-[12.5px] font-medium text-[#786858]">{note}</p>}
    </div>
  );
}
