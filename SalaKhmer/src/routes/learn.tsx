import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Check, Compass, Headphones, PenLine, Type } from "lucide-react";
import { LovableBottomNav, LovableHeader, LovableScreen, LovableSectionTitle } from "@/components/LovableAppShell";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/learn")({ component: LearnPage });

type ModuleRoute = "/category/module_1" | "/category/module_2" | "/category/module_3" | "/category/module_4" | "/category/module_5" | "/category/module_6";

function LearnPage() {
  const { t } = useLocale();
  return <LovableScreen><LovableHeader eyebrow={t("curriculum")} title={t("learnKhmer")} /><section className="px-5 pt-5"><p className="text-[14px] leading-5 text-[#66766F]">{t("curriculumIntro")}</p><div className="mt-7"><LovableSectionTitle title={t("yourPath")} note="6 modules" /><div className="mt-3 grid grid-cols-2 gap-3"><LearnModule to="/category/module_1" icon={Type} title="Script Basics" text="Letters and sounds" tone="gold" /><LearnModule to="/category/module_2" icon={BookOpen} title="Read & Spell" text="Useful words" tone="mint" /><LearnModule to="/category/module_3" icon={Headphones} title="Listen & Speak" text="Real conversations" tone="blue" /><LearnModule to="/category/module_4" icon={PenLine} title="Handwriting" text="Trace Khmer forms" tone="violet" /><LearnModule to="/category/module_5" icon={Check} title="Review & Test" text="Build recall" tone="coral" /><LearnModule to="/category/module_6" icon={Compass} title="Cambodia Guide" text="Everyday Khmer" tone="mint" /></div></div></section><LovableBottomNav /></LovableScreen>;
}

function LearnModule({ to, icon: Icon, title, text, tone }: { to: ModuleRoute; icon: typeof Type; title: string; text: string; tone: "gold" | "mint" | "blue" | "violet" | "coral" }) {
  const tones = { gold: "bg-[#FFF0CC] text-[#C77800]", mint: "bg-[#E3F4ED] text-[#07836C]", blue: "bg-[#E5F1FF] text-[#3073B6]", violet: "bg-[#EEE8FF] text-[#6756B5]", coral: "bg-[#FFE7DB] text-[#C45E36]" };
  return <Link to={to} className="min-h-[142px] rounded-[22px] border border-[#E5E6E0] bg-white p-4 shadow-[0_7px_18px_rgba(23,59,51,.06)]"><span className={`grid h-12 w-12 place-items-center rounded-[16px] ${tones[tone]}`}><Icon className="h-5 w-5" /></span><strong className="mt-4 block text-[15px] font-black text-[#173B33]">{title}</strong><small className="mt-1 block text-[12px] text-[#73817B]">{text}</small></Link>;
}
