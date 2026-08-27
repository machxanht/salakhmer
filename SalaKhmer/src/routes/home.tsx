import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Compass, Headphones, Library, PenLine, Trophy } from "lucide-react";
import { LanguagePicker, LovableBottomNav, LovableHeader, LovableScreen, LovableSectionTitle } from "@/components/LovableAppShell";
import { AngkorRelicsMap } from "@/components/AngkorRelicsMap";
import apsaraTeacher from "@/assets/apsara/apsara-script-basics-teacher.png";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "SalaKhmer · Learn Khmer" }] }),
  component: HomePage,
});

type ModuleRoute =
  | "/category/module_1"
  | "/category/module_2"
  | "/category/module_3"
  | "/category/module_4"
  | "/category/module_5"
  | "/category/module_6";

function HomePage() {
  const { user, firebaseUser } = useAuth();
  const { tr } = useLocale();
  const firstName = user.name?.split(" ")[0] || "there";
  const avatarUrl = user.avatarUrl ?? firebaseUser?.photoURL ?? undefined;

  return (
    <LovableScreen>
      <LovableHeader
        eyebrow="SalaKhmer"
        title={tr("homeGreeting", { name: firstName })}
        right={
          <div className="flex items-center gap-2">
            <LanguagePicker />
            <Link
              to="/profile"
              aria-label="Open profile"
              className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-[#173B33] text-[15px] font-black text-white shadow-[0_6px_14px_rgba(23,59,51,.22)]"
            >
              {avatarUrl ? <img src={avatarUrl} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" /> : firstName[0]?.toUpperCase()}
            </Link>
          </div>
        }
      />

      <section className="px-5 pt-5">
        <div className="relative min-h-[248px] overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#123C32_0%,#18493B_62%,#245642_100%)] p-5 text-white shadow-[0_16px_34px_rgba(23,59,51,.2)]">
          <div aria-hidden="true" className="absolute -right-12 -top-16 h-60 w-60 rounded-full border-[26px] border-[#F7B733]/15" />
          <div aria-hidden="true" className="absolute right-[38%] top-7 h-1.5 w-1.5 rounded-full bg-white/80 shadow-[18px_16px_0_rgba(255,255,255,.55),35px_-10px_0_rgba(255,255,255,.45),51px_12px_0_rgba(255,255,255,.35)]" />
          <div className="relative z-10 max-w-[60%]">
            <p className="text-[11px] font-bold uppercase tracking-[.12em] text-white/75">Today&apos;s lesson</p>
            <h2 className="mt-2 text-[29px] font-extrabold leading-[1.05] tracking-[-.03em]">Build your Khmer sound map.</h2>
            <p className="mt-3 text-[13px] leading-5 text-white/85">Discover two sound series and take your first step into Khmer.</p>
            <Link to="/grid-lesson/$lessonId" params={{ lessonId: "alpha-l1" }} className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-black text-[#173B33] shadow-[0_5px_12px_rgba(10,35,27,.25)]">Start lesson <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <img src={apsaraTeacher} alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-3 -right-5 z-10 h-[232px] w-[47%] object-contain object-bottom drop-shadow-[0_12px_10px_rgba(48,26,113,.25)]" />
        </div>
      </section>

      <section className="px-5 pt-7">
        <LovableSectionTitle title="Explore modules" note="6 modules" />
        <div className="mt-3 grid grid-cols-3 gap-3">
          <ModuleShortcut icon={BookOpen} title="Script" tone="gold" to="/category/module_1" />
          <ModuleShortcut icon={Library} title="Read & Spell" tone="mint" to="/category/module_2" />
          <ModuleShortcut icon={Headphones} title="Listen" tone="blue" to="/category/module_3" />
          <ModuleShortcut icon={PenLine} title="Write" tone="violet" to="/category/module_4" />
          <ModuleShortcut icon={Trophy} title="Review" tone="coral" to="/category/module_5" />
          <ModuleShortcut icon={Compass} title="Guide" tone="mint" to="/category/module_6" />
        </div>
      </section>

      <section className="px-5 pb-8 pt-8">
        <LovableSectionTitle title="Your Angkor journey" note="Six learning levels" />
        <AngkorRelicsMap showDailyChallenge={false} />
      </section>
      <LovableBottomNav />
    </LovableScreen>
  );
}

function ModuleShortcut({ icon: Icon, title, tone, to }: { icon: typeof BookOpen; title: string; tone: "gold" | "mint" | "violet" | "coral" | "blue"; to: ModuleRoute }) {
  const tones = {
    gold: "bg-[#FFF0CC] text-[#C77800]",
    mint: "bg-[#E3F4ED] text-[#07836C]",
    violet: "bg-[#EEE8FF] text-[#6756B5]",
    coral: "bg-[#FFE7DB] text-[#C45E36]",
    blue: "bg-[#E5F1FF] text-[#3073B6]",
  };
  return <Link to={to} className="min-h-[120px] rounded-[20px] border border-[#E8E5DE] bg-white p-3 text-center shadow-[0_7px_18px_rgba(23,59,51,.05)]"><span className={`mx-auto grid h-11 w-11 place-items-center rounded-xl ${tones[tone]}`}><Icon className="h-5 w-5" strokeWidth={1.9} /></span><span className="mt-2 block text-[11px] font-black leading-4 text-[#173B33]">{title}</span></Link>;
}
