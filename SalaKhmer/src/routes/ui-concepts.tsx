import { createFileRoute } from "@tanstack/react-router";
import { useState, type ComponentType } from "react";
import {
  BookOpen,
  Bot,
  Check,
  ChevronRight,
  Compass,
  Crown,
  Headphones,
  Home,
  Languages,
  Library,
  MapPin,
  MessageCircle,
  Mic2,
  PenLine,
  Play,
  Search,
  Sparkles,
  Star,
  Trophy,
  UserRound,
  Volume2,
} from "lucide-react";
import apsaraGuide from "../assets/apsara/apsara-guide-chroma.png";
import apsaraListening from "../assets/apsara/apsara-listening.png";
import apsaraReading from "../assets/apsara/apsara-reading.png";
import apsaraWriting from "../assets/apsara/apsara-writing.png";

export const Route = createFileRoute("/ui-concepts")({
  head: () => ({ meta: [{ title: "SalaKhmer · Icon-first UI concepts" }] }),
  component: UiConcepts,
});

type ConceptId = "atlas" | "path" | "cards" | "dialogue" | "notebook";
type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;

const concepts: Array<{ id: ConceptId; number: string; title: string; sub: string; bestFor: string }> = [
  { id: "atlas", number: "01", title: "Sala Atlas", sub: "Icon-led home", bestFor: "Best overall direction" },
  { id: "path", number: "02", title: "Learning Path", sub: "Progress route", bestFor: "Module progression" },
  { id: "cards", number: "03", title: "Visual Library", sub: "Topic cards", bestFor: "Read & Spell + Guide" },
  { id: "dialogue", number: "04", title: "Conversation", sub: "Audio workspace", bestFor: "Listen & Speak" },
  { id: "notebook", number: "05", title: "Study Notebook", sub: "Quiet focus", bestFor: "Write + Review" },
];

function UiConcepts() {
  const [active, setActive] = useState<ConceptId>("atlas");
  const concept = concepts.find((item) => item.id === active)!;

  return (
    <main className="min-h-screen bg-[#EAF0F3] px-4 py-7 text-[#17231F] sm:px-8 sm:py-10">
      <section className="mx-auto max-w-6xl">
        <header className="grid gap-5 border-b border-[#D2DFDE] pb-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.22em] text-[#0B8B76]">SalaKhmer · mobile UI review</p>
            <h1 className="mt-2 max-w-2xl text-3xl font-black tracking-[-.04em] sm:text-4xl">Five icon-first directions</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#61706A]">
              A separate demo only. Each screen is designed at phone width first and keeps the same information architecture for Android and iOS.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-[#D2DFDE] bg-white/70 px-3 py-2 text-xs font-bold text-[#52635C]">
            <Sparkles className="h-4 w-4 text-[#F29F05]" /> Icon system over colour noise
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="rounded-[28px] border border-white bg-white/70 p-3 shadow-[0_16px_40px_rgba(29,53,46,.08)] backdrop-blur">
            {concepts.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`mb-1 flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${active === item.id ? "bg-[#173B33] text-white shadow-lg" : "text-[#31433C] hover:bg-[#EDF5F2]"}`}
              >
                <span className={`grid h-10 w-10 place-items-center rounded-xl text-xs font-black ${active === item.id ? "bg-[#F7B733] text-[#173B33]" : "bg-[#E4F2EE] text-[#0B8B76]"}`}>{item.number}</span>
                <span className="min-w-0 flex-1"><b className="block text-sm">{item.title}</b><small className={`mt-0.5 block text-xs ${active === item.id ? "text-[#B9D6CC]" : "text-[#788881]"}`}>{item.sub}</small></span>
                <ChevronRight className={`h-4 w-4 ${active === item.id ? "text-[#F7B733]" : "text-[#95A59E]"}`} />
              </button>
            ))}
            <div className="mt-4 rounded-2xl bg-[#FFF8E9] p-4 text-xs leading-5 text-[#78613A]">
              <b className="block text-[#A26600]">Recommendation</b>
              Use <strong>Sala Atlas</strong> as the global shell, then use Conversation and Notebook only inside their modules.
            </div>
          </aside>

          <section className="rounded-[34px] border border-white bg-white/55 p-4 shadow-[0_20px_55px_rgba(29,53,46,.1)] sm:p-7">
            <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#0B8B76]">{concept.bestFor}</p><h2 className="mt-1 text-2xl font-black tracking-[-.03em]">{concept.title}</h2></div><span className="hidden rounded-full bg-[#E7F2EE] px-3 py-1.5 text-xs font-bold text-[#297362] sm:block">390px mobile frame</span></div>
            <div className="mx-auto w-full max-w-[410px] rounded-[40px] bg-[#142A25] p-2.5 shadow-[0_28px_70px_rgba(21,42,37,.28)]">
              <div className="relative min-h-[790px] overflow-hidden rounded-[32px] bg-[#FFFCF7]">
                <div className="absolute left-1/2 top-2 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-[#142A25]" />
                {active === "atlas" && <AtlasScreen />}
                {active === "path" && <PathScreen />}
                {active === "cards" && <CardsScreen />}
                {active === "dialogue" && <DialogueScreen />}
                {active === "notebook" && <NotebookScreen />}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function AtlasScreen() {
  return <PhoneShell active="Home"><header className="flex items-center justify-between px-5 pt-12"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#0B8B76]">SalaKhmer</p><h2 className="mt-1 text-[25px] font-black tracking-[-.04em]">Learn Khmer<br />with confidence.</h2></div><button className="grid h-11 w-11 place-items-center rounded-2xl bg-[#F7B733] text-[#173B33]"><Languages className="h-5 w-5" /></button></header><section className="mx-5 mt-5 overflow-hidden rounded-[26px] bg-[#173B33] p-5 text-white"><div className="relative z-10 max-w-[60%]"><p className="text-[10px] font-black uppercase tracking-[.14em] text-[#F7C95A]">Continue your path</p><h3 className="mt-2 text-xl font-black leading-tight">Khmer script<br />basics</h3><p className="mt-2 text-xs leading-5 text-[#C3DDD5]">Recognise letters and hear their sound.</p><button className="mt-4 flex items-center gap-1.5 rounded-xl bg-[#F7B733] px-3 py-2 text-xs font-black text-[#173B33]">Continue <ChevronRight className="h-4 w-4" /></button></div><img src={apsaraReading} alt="" className="absolute right-0 top-[96px] h-44 object-contain" /></section><section className="px-5 pt-6"><Title text="Explore modules" action="See all" /><div className="mt-3 grid grid-cols-3 gap-3"><ModuleIcon icon={BookOpen} text="Script" tone="gold"/><ModuleIcon icon={Headphones} text="Listen" tone="mint"/><ModuleIcon icon={PenLine} text="Write" tone="violet"/><ModuleIcon icon={Trophy} text="Review" tone="coral"/><ModuleIcon icon={Compass} text="Guide" tone="blue"/><ModuleIcon icon={Library} text="Words" tone="gold"/></div></section></PhoneShell>;
}

function PathScreen() {
  return <PhoneShell active="Learn"><header className="px-5 pt-12"><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#0B8B76]">Your learning journey</p><h2 className="mt-1 text-[26px] font-black">One clear next step.</h2><p className="mt-2 text-sm text-[#70807A]">Build the Khmer script in small, useful stages.</p></header><section className="mx-5 mt-6 space-y-3"><PathStep n="1" icon={Volume2} title="Hear the alphabet" text="6 of 6 lessons completed" state="done"/><PathStep n="2" icon={BookOpen} title="Read & Spell" text="Your next recommended module" state="current"/><PathStep n="3" icon={Mic2} title="Listen & Speak" text="Unlock after your first words" state="locked"/><PathStep n="4" icon={PenLine} title="Handwriting" text="Trace at your own pace" state="locked"/></section><section className="mx-5 mt-6 rounded-2xl bg-[#FFF3D7] p-4"><div className="flex gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F7B733] text-[#173B33]"><Star className="h-5 w-5 fill-current"/></span><p className="text-sm font-semibold leading-5">Your next step is visible before you need to scroll.</p></div></section></PhoneShell>;
}

function CardsScreen() {
  return <PhoneShell active="Dictionary"><header className="flex items-center justify-between px-5 pt-12"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#0B8B76]">Read & spell</p><h2 className="mt-1 text-[26px] font-black">Useful words</h2></div><button className="grid h-10 w-10 place-items-center rounded-full bg-[#E9F5F0] text-[#0B8B76]"><Search className="h-5 w-5"/></button></header><div className="mx-5 mt-5 flex gap-2 overflow-hidden"><Pill text="Beginner" active/><Pill text="Food"/><Pill text="Travel"/></div><section className="grid grid-cols-2 gap-3 px-5 pt-5"><VisualCard icon={"🥭"} title="Fruit" text="15 words"/><VisualCard icon={"🍜"} title="Food" text="15 words"/><VisualCard icon={"🚌"} title="Travel" text="15 words"/><VisualCard icon={"📱"} title="Technology" text="15 words"/></section><section className="mx-5 mt-5 flex items-center gap-3 rounded-2xl border border-[#E2EDE9] bg-[#F0F8F5] p-4"><img src={apsaraGuide} alt="" className="h-11 w-11 object-contain"/><p className="text-xs leading-5 text-[#467067]">One original illustrated icon per topic. No repeated placeholder images.</p></section></PhoneShell>;
}

function DialogueScreen() {
  return <PhoneShell active="Learn"><header className="flex items-center gap-3 px-5 pt-12"><button className="grid h-9 w-9 place-items-center rounded-full bg-[#F3F0EA]"><ChevronRight className="h-5 w-5 rotate-180"/></button><div><p className="text-[11px] font-bold text-[#7B8B84]">Listen & Speak · 3 of 5</p><h2 className="text-lg font-black">At the market</h2></div></header><section className="mx-5 mt-5 flex items-center gap-3 rounded-2xl bg-[#ECF6F2] p-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#0B8B76]"><MapPin className="h-5 w-5"/></span><span><b className="block text-sm">Market conversation</b><small className="text-xs text-[#628178]">Male + female dialogue · 1 min</small></span></section><section className="mx-5 mt-5 space-y-3"><Speech left avatar="S" khmer="សួស្តី! ចង់ទិញអ្វី?" english="Hello! What would you like to buy?"/><Speech avatar="P" khmer="ខ្ញុំចង់ទិញផ្លែម្នាស់។" english="I would like to buy pineapple."/><Speech left avatar="S" khmer="មួយផ្លែ បីពាន់រៀល។" english="One is three thousand riel."/></section><button className="mx-5 mt-5 flex w-[calc(100%-40px)] items-center justify-center gap-2 rounded-2xl bg-[#173B33] py-3.5 text-sm font-black text-white"><Play className="h-4 w-4 fill-current"/> Play the full conversation</button></PhoneShell>;
}

function NotebookScreen() {
  return <PhoneShell active="Learn"><header className="flex items-center justify-between px-5 pt-12"><button className="grid h-10 w-10 place-items-center rounded-full bg-[#F1EEE9]"><ChevronRight className="h-5 w-5 rotate-180"/></button><span className="text-xs font-black text-[#64766E]">Handwriting · 4 / 33</span><button className="grid h-10 w-10 place-items-center rounded-full bg-[#F1EEE9]"><Volume2 className="h-5 w-5"/></button></header><section className="px-5 pt-7 text-center"><p className="text-[11px] font-black uppercase tracking-[.16em] text-[#0B8B76]">Quiet focus mode</p><h2 className="mt-2 text-4xl font-black text-[#173B33]">ក</h2><p className="mt-1 text-sm font-bold text-[#887A70]">K-aw</p></section><section className="mx-5 mt-6 rounded-[26px] border border-[#E4DED4] bg-[#FFFDF9] p-4 shadow-[0_12px_30px_rgba(41,48,43,.06)]"><div className="grid h-[290px] place-items-center overflow-hidden rounded-2xl border border-[#E5D5AD] bg-[linear-gradient(#EADDBF_1px,transparent_1px),linear-gradient(90deg,#EADDBF_1px,transparent_1px)] bg-[size:100%_58px,58px_100%]"><PenLine className="h-24 w-24 text-[#0B8B76]" strokeWidth={1.25}/></div><button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F7B733] py-3.5 text-sm font-black text-[#173B33]"><Play className="h-4 w-4 fill-current"/> Replay stroke order</button></section><p className="mx-7 mt-4 text-center text-xs leading-5 text-[#7A827E]">One task, one primary action, no distracting cards below it.</p></PhoneShell>;
}

function PhoneShell({ children, active }: { children: React.ReactNode; active: "Home" | "Learn" | "Dictionary" }) {
  return <div className="min-h-[790px] bg-[#FFFCF7] pb-24 text-[#173B33]">{children}<nav className="absolute inset-x-0 bottom-0 flex h-[76px] items-center justify-around border-t border-[#E5E6E0] bg-[#FFFCF7]/95 px-3 text-[10px] font-bold text-[#88938E]"><Nav icon={Home} label="Home" active={active === "Home"}/><Nav icon={Library} label="Dictionary" active={active === "Dictionary"}/><button className="-mt-8 grid h-14 w-14 place-items-center rounded-full border-4 border-[#FFFCF7] bg-[#0B8B76] text-white shadow-lg"><Bot className="h-5 w-5"/></button><Nav icon={Compass} label="Apply"/><Nav icon={UserRound} label="Profile"/></nav></div>;
}
function Nav({ icon: Icon, label, active }: { icon: Icon; label: string; active?: boolean }) { return <button className={`flex min-w-12 flex-col items-center gap-1 ${active ? "text-[#0B8B76]" : ""}`}><Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 1.8}/><span>{label}</span></button>; }
function Title({ text, action }: { text: string; action: string }) { return <div className="flex items-center justify-between"><h3 className="text-lg font-black">{text}</h3><button className="text-xs font-bold text-[#0B8B76]">{action}</button></div>; }
function ModuleIcon({ icon: Icon, text, tone }: { icon: Icon; text: string; tone: "gold" | "mint" | "violet" | "coral" | "blue" }) { const map = { gold: "bg-[#FFF0CC] text-[#C77800]", mint: "bg-[#E3F4ED] text-[#07836C]", violet: "bg-[#EEE8FF] text-[#6756B5]", coral: "bg-[#FFE7DB] text-[#C45E36]", blue: "bg-[#E5F1FF] text-[#3073B6]" }; return <button className="rounded-2xl border border-[#E8E5DE] bg-white p-3 text-center shadow-sm"><span className={`mx-auto grid h-11 w-11 place-items-center rounded-xl ${map[tone]}`}><Icon className="h-5 w-5"/></span><span className="mt-2 block text-[11px] font-black">{text}</span></button>; }
function PathStep({ n, icon: Icon, title, text, state }: { n: string; icon: Icon; title: string; text: string; state: "done" | "current" | "locked" }) { const palette = state === "done" ? "border-[#CFE7DC] bg-[#F2FAF6]" : state === "current" ? "border-[#0B8B76] bg-white shadow-[0_10px_22px_rgba(11,139,118,.12)]" : "border-[#E8E5DE] bg-[#FBFAF8] opacity-65"; return <article className={`flex items-center gap-3 rounded-2xl border p-3 ${palette}`}><span className={`grid h-10 w-10 place-items-center rounded-xl ${state === "current" ? "bg-[#F7B733] text-[#173B33]" : "bg-white text-[#0B8B76]"}`}>{state === "done" ? <Check className="h-5 w-5"/> : <Icon className="h-5 w-5"/>}</span><span className="min-w-0 flex-1"><b className="block text-sm">{n}. {title}</b><small className="mt-1 block text-xs text-[#74827C]">{text}</small></span>{state === "current" && <ChevronRight className="h-5 w-5 text-[#0B8B76]"/>}</article>; }
function Pill({ text, active }: { text: string; active?: boolean }) { return <button className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold ${active ? "bg-[#173B33] text-white" : "bg-[#EEF4F1] text-[#668077]"}`}>{text}</button>; }
function VisualCard({ icon, title, text }: { icon: string; title: string; text: string }) { return <button className="min-h-[145px] rounded-[22px] border border-[#E5E6E0] bg-white p-4 text-left shadow-sm"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#FFF3D9] text-3xl">{icon}</span><b className="mt-4 block text-sm">{title}</b><small className="mt-1 block text-xs text-[#7A8781]">{text}</small></button>; }
function Speech({ left, avatar, khmer, english }: { left?: boolean; avatar: string; khmer: string; english: string }) { return <article className={`flex items-start gap-2 ${left ? "" : "flex-row-reverse"}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-black ${left ? "bg-[#FFE6D7] text-[#BF643B]" : "bg-[#E0ECFF] text-[#4379BD]"}`}>{avatar}</span><div className={`max-w-[78%] rounded-[19px] border p-3 ${left ? "border-[#E5E2DC] bg-white" : "border-[#DCEAE5] bg-[#E9F4EF]"}`}><div className="flex gap-2"><p className="min-w-0 flex-1 font-[Noto_Sans_Khmer] text-[19px] leading-7">{khmer}</p><Volume2 className="mt-1 h-4 w-4 shrink-0 text-[#0B8B76]"/></div><p className="mt-1.5 text-xs leading-5 text-[#71817A]">{english}</p></div></article>; }
