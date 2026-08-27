import { createFileRoute } from "@tanstack/react-router";
import { useState, type ComponentType } from "react";
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  Compass,
  GraduationCap,
  Headphones,
  Home,
  Lightbulb,
  Lock,
  PenLine,
  Play,
  RefreshCcw,
  Search,
  Settings2,
  Type,
  UserRound,
  Volume2,
} from "lucide-react";

export const Route = createFileRoute("/ui-preview")({
  head: () => ({ meta: [{ title: "SalaKhmer UI Preview" }] }),
  component: UiPreview,
});

type View = "home" | "learn" | "apply" | "profile" | "module" | "lesson";
type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;
type ModuleCard = {
  title: string;
  subtitle: string;
  icon: Icon;
  status: "progress" | "complete" | "locked" | "open";
  progress?: string;
  percent?: number;
};

const modules: ModuleCard[] = [
  {
    title: "Script Basics",
    subtitle: "Recognise the letters and their sounds",
    icon: Type,
    status: "progress",
    progress: "4/6",
    percent: 67,
  },
  {
    title: "Read & Spell",
    subtitle: "Decode and build real Khmer words",
    icon: BookOpen,
    status: "open",
  },
  {
    title: "Listen & Speak",
    subtitle: "Understand dialogues and say them back",
    icon: Headphones,
    status: "progress",
    progress: "1/20",
    percent: 5,
  },
  {
    title: "Handwriting",
    subtitle: "Form each Khmer stroke by hand",
    icon: PenLine,
    status: "complete",
  },
  {
    title: "Review & Test",
    subtitle: "Strengthen what you remember",
    icon: CircleCheckBig,
    status: "locked",
  },
  { title: "Cambodia Guide", subtitle: "Use Khmer in real life", icon: Compass, status: "open" },
];

function UiPreview() {
  const [view, setView] = useState<View>("home");
  const [selected, setSelected] = useState(modules[0]);
  const openModule = (module: ModuleCard) => {
    if (module.status !== "locked") {
      setSelected(module);
      setView("module");
    }
  };
  const content =
    view === "home" ? (
      <HomeView openModule={openModule} openLesson={() => setView("lesson")} />
    ) : view === "learn" ? (
      <LearnView openModule={openModule} />
    ) : view === "apply" ? (
      <ApplyView />
    ) : view === "profile" ? (
      <ProfileView />
    ) : view === "module" ? (
      <ModuleView
        module={selected}
        back={() => setView("learn")}
        openLesson={() => setView("lesson")}
      />
    ) : (
      <LessonView module={selected} back={() => setView("module")} />
    );
  return (
    <div className="min-h-screen bg-[#ECE7DE] font-sans text-[#47382B]">
      <main className="relative mx-auto min-h-screen w-full max-w-[480px] bg-[#FBF7F0] pb-24">
        {content}
      </main>
      {view !== "module" && view !== "lesson" && <PreviewBottomNav view={view} setView={setView} />}
    </div>
  );
}

function ScreenHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-between px-5 pt-6">
      <div>
        {eyebrow && (
          <p className="text-[11px] font-bold uppercase tracking-[.09em] text-[#A9631E]">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 text-2xl font-bold tracking-[-.02em]">{title}</h1>
      </div>
      {action}
    </header>
  );
}

function HomeView({
  openModule,
  openLesson,
}: {
  openModule: (module: ModuleCard) => void;
  openLesson: () => void;
}) {
  return (
    <>
      <span className="absolute right-3 top-2 text-[9px] font-bold uppercase tracking-[.12em] text-[#9A8979]">
        Demo preview
      </span>
      <ScreenHeader
        eyebrow="Suosdey"
        title="Good morning, Oliver"
        action={
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F9E8BF] font-bold text-[#A9631E]">
            O
          </span>
        }
      />
      <section className="px-5 pt-5">
        <div className="overflow-hidden rounded-[18px] border border-[#DE9B38]/25 bg-gradient-to-br from-[#F9E8BF]/45 to-[#FFFCF7] p-5 shadow-[0_6px_20px_-8px_rgba(71,56,43,.16)]">
          <p className="text-[11px] font-bold uppercase tracking-[.09em] text-[#A9631E]">
            Script Basics
          </p>
          <h2 className="mt-1.5 text-[19px] font-semibold">Consonants · Series 1</h2>
          <p className="khmer mt-2 text-[23px]">ក ខ គ ឃ ង</p>
          <p className="text-[13px] font-medium italic text-[#786858]">
            K-aw · Kh-aw · K-o · Kh-o · Ng-o
          </p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#EDE1CE]">
            <div className="h-full w-2/3 rounded-full bg-[#D98624]" />
          </div>
          <p className="mt-2 text-[12.5px] font-medium text-[#786858]">Lesson 4 of 6</p>
          <button
            onClick={openLesson}
            className="mt-4 flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#D98624] text-base font-semibold text-[#FFFCF7]"
          >
            Continue lesson <ChevronRight className="h-[18px] w-[18px]" />
          </button>
        </div>
      </section>
      <section className="px-5 pt-8">
        <SectionTitle title="Your path" note="6 modules · beginner" />
        <ul className="flex flex-col gap-3">
          {modules.map((module) => (
            <ModulePathCard key={module.title} module={module} onClick={() => openModule(module)} />
          ))}
        </ul>
      </section>
      <section className="pt-8">
        <div className="px-5">
          <SectionTitle title="Today’s practice" />
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-2">
          <PracticeCard icon={RefreshCcw} title="5-min review" text="12 letters seen" />
          <PracticeCard icon={PenLine} title="Handwriting drill" text="Trace ក to ង" />
          <PracticeCard icon={Headphones} title="Daily dialogue" text="Listen and repeat" />
        </div>
      </section>
    </>
  );
}

function LearnView({ openModule }: { openModule: (module: ModuleCard) => void }) {
  return (
    <>
      <ScreenHeader
        eyebrow="Your curriculum"
        title="Learn Khmer"
        action={<Settings2 className="h-5 w-5 text-[#786858]" />}
      />
      <section className="px-5 pt-6">
        <div className="rounded-[18px] bg-[#E9F2EC] p-4">
          <p className="text-sm font-semibold text-[#367562]">You are building a strong start.</p>
          <p className="mt-1 text-[13px] text-[#607B6D]">
            Complete Script Basics, then unlock a reading path.
          </p>
        </div>
        <div className="mt-7">
          <SectionTitle title="All modules" note="Start anywhere open" />
          <ul className="flex flex-col gap-3">
            {modules.map((module) => (
              <ModulePathCard
                key={module.title}
                module={module}
                onClick={() => openModule(module)}
              />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function ApplyView() {
  const tools = [
    { icon: Search, title: "Khmer dictionary", text: "Find words, meanings and examples" },
    { icon: Compass, title: "Khmer calendar", text: "Learn dates, festivals and lunar days" },
    { icon: Type, title: "Khmer keyboard", text: "Set up Khmer typing on phone or computer" },
    { icon: Lightbulb, title: "Ask Sala AI", text: "Practice a useful everyday situation" },
  ];
  return (
    <>
      <ScreenHeader eyebrow="Use it in real life" title="Apply" />
      <section className="px-5 pt-6">
        <div className="rounded-[20px] border border-[#E5D5BC] bg-[#FFF8E8] p-5">
          <p className="text-[11px] font-bold uppercase tracking-[.09em] text-[#A9631E]">
            Today’s tip
          </p>
          <h2 className="mt-2 text-lg font-semibold">Small practice, real confidence.</h2>
          <p className="mt-1 text-[13px] leading-5 text-[#786858]">
            Use one phrase today — at a restaurant, shop, or with a Khmer friend.
          </p>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3">
          {tools.map((tool) => (
            <button
              key={tool.title}
              className="min-h-[152px] rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7] p-4 text-left"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#F9E8BF] text-[#A9631E]">
                <tool.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-[15px] font-semibold">{tool.title}</h2>
              <p className="mt-1 text-[12px] leading-4 text-[#786858]">{tool.text}</p>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function ProfileView() {
  return (
    <>
      <ScreenHeader
        eyebrow="My learning"
        title="Your profile"
        action={<Settings2 className="h-5 w-5 text-[#786858]" />}
      />
      <section className="px-5 pt-6">
        <div className="flex items-center gap-4 rounded-[20px] border border-[#E4D7C5] bg-[#FFFCF7] p-5">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F9E8BF] text-xl font-bold text-[#A9631E]">
            O
          </span>
          <div>
            <h2 className="font-semibold">Oliver</h2>
            <p className="mt-1 text-[13px] text-[#786858]">Beginner · 4 lessons completed</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            ["4", "Lessons"],
            ["12", "Words"],
            ["3", "Day streak"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="rounded-[16px] border border-[#E4D7C5] bg-[#FFFCF7] py-4 text-center"
            >
              <strong className="block text-xl text-[#A9631E]">{number}</strong>
              <span className="mt-1 block text-[11px] font-medium text-[#786858]">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-7">
          <SectionTitle title="Learning preferences" />
          <div className="divide-y divide-[#EDE1CE] rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7] px-4">
            {["Audio speed", "Daily practice reminder", "Interface language"].map((item) => (
              <button
                key={item}
                className="flex w-full items-center justify-between py-4 text-left text-[14px] font-semibold"
              >
                {item}
                <ChevronRight className="h-4 w-4 text-[#A99B8C]" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ModuleView({
  module,
  back,
  openLesson,
}: {
  module: ModuleCard;
  back: () => void;
  openLesson: () => void;
}) {
  const Icon = module.icon;
  return (
    <>
      <BackHeader onClick={back} label="All modules" />
      <section className="px-5 pt-5">
        <span className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#F9E8BF] text-[#A9631E]">
          <Icon className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-[28px] font-bold tracking-[-.025em]">{module.title}</h1>
        <p className="mt-2 text-[14px] leading-5 text-[#786858]">
          {module.subtitle}. A gentle, practical lesson path for an English speaker.
        </p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#EDE1CE]">
          <div
            className="h-full rounded-full bg-[#D98624]"
            style={{ width: `${module.percent ?? 20}%` }}
          />
        </div>
      </section>
      <section className="px-5 pt-8">
        <SectionTitle
          title="Lessons"
          note={module.status === "locked" ? "Locked" : "Choose a lesson"}
        />
        <div className="flex flex-col gap-3">
          {["Warm up", "Learn the pattern", "Hear it in context", "Practice in real life"].map(
            (lesson, index) => (
              <button
                onClick={module.status === "locked" ? undefined : openLesson}
                disabled={module.status === "locked"}
                key={lesson}
                className="flex items-center gap-4 rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7] p-4 text-left disabled:bg-[#F5F0E6]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F9E8BF] text-sm font-bold text-[#A9631E]">
                  {index + 1}
                </span>
                <span className="flex-1">
                  <strong className="block text-[15px]">{lesson}</strong>
                  <small className="mt-1 block text-[12px] text-[#786858]">
                    About 4 minutes · audio included
                  </small>
                </span>
                {module.status === "locked" ? (
                  <Lock className="h-4 w-4 text-[#A99B8C]" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-[#A99B8C]" />
                )}
              </button>
            ),
          )}
        </div>
      </section>
    </>
  );
}

function LessonView({ module, back }: { module: ModuleCard; back: () => void }) {
  const lines = [
    ["Sreymom", "សួស្តី។ តើអ្នកសុខសប្បាយទេ?", "Hello. How are you?"],
    ["Piseth", "សុខសប្បាយទេ។ អរគុណ។", "I am well, thank you."],
    ["Sreymom", "ខ្ញុំសប្បាយចិត្តដែលបានជួបអ្នក។", "I am happy to meet you."],
    ["Piseth", "ខ្ញុំក៏ដូចគ្នា។", "Me too."],
  ];
  return (
    <>
      <BackHeader onClick={back} label={module.title} />
      <section className="px-5 pt-4">
        <p className="text-[11px] font-bold uppercase tracking-[.09em] text-[#A9631E]">
          Lesson 1 · everyday Khmer
        </p>
        <h1 className="mt-2 text-[27px] font-bold tracking-[-.025em]">Meeting someone</h1>
        <p className="mt-2 text-[14px] text-[#786858]">
          Listen to the full dialogue, then replay any line.
        </p>
        <button className="mt-5 flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#D98624] text-base font-semibold text-[#FFFCF7]">
          <Play className="h-[18px] w-[18px] fill-current" /> Play full conversation
        </button>
      </section>
      <section className="px-5 pt-6">
        <div className="space-y-3">
          {lines.map(([speaker, khmer, english], index) => (
            <article
              key={speaker}
              className={`rounded-[18px] border p-4 ${index % 2 ? "border-[#DCE9E2] bg-[#F5FAF6]" : "border-[#E4D7C5] bg-[#FFFCF7]"}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[.08em] text-[#A9631E]">
                  {speaker}
                </span>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F9E8BF] text-[#A9631E]">
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <p className="khmer mt-2 text-[22px] leading-8">{khmer}</p>
              <p className="mt-1 text-[13px] font-medium italic text-[#786858]">
                English-friendly sound guide
              </p>
              <p className="mt-2 text-[14px] text-[#47382B]">{english}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function BackHeader({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <header className="flex items-center gap-3 px-5 pt-6">
      <button
        onClick={onClick}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4D7C5] bg-[#FFFCF7]"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <span className="text-[14px] font-semibold text-[#786858]">{label}</span>
    </header>
  );
}
function SectionTitle({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <h2 className="text-[19px] font-semibold tracking-[-.01em]">{title}</h2>
      {note && <p className="text-[12.5px] font-medium text-[#786858]">{note}</p>}
    </div>
  );
}
function ModulePathCard({ module, onClick }: { module: ModuleCard; onClick: () => void }) {
  const Icon = module.icon;
  const locked = module.status === "locked";
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex min-h-[76px] w-full items-center gap-3 rounded-[18px] border px-4 text-left ${locked ? "border-[#EDE1CE] bg-[#F5F0E6]" : "border-[#E4D7C5] bg-[#FFFCF7]"}`}
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] ${locked ? "bg-[#EDE1CE] text-[#A99B8C]" : "bg-[#F9E8BF] text-[#A9631E]"}`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <strong className={`block text-base ${locked ? "text-[#A99B8C]" : ""}`}>
            {module.title}
          </strong>
          <small className="mt-0.5 block truncate text-[12.5px] text-[#786858]">
            {module.subtitle}
          </small>
        </span>
        {module.status === "progress" && (
          <ProgressRing progress={module.percent ?? 0} label={module.progress ?? ""} />
        )}
        {module.status === "complete" && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#367562] text-white">
            <Check className="h-[13px] w-[13px]" strokeWidth={3} />
          </span>
        )}
        {locked && <Lock className="h-4 w-4 text-[#A99B8C]" />}
        {module.status === "open" && <ChevronRight className="h-5 w-5 text-[#A99B8C]" />}
      </button>
    </li>
  );
}
function ProgressRing({ progress, label }: { progress: number; label: string }) {
  const c = 113.1;
  return (
    <span className="relative h-10 w-10 shrink-0">
      <svg width="40" height="40" className="-rotate-90">
        <circle cx="20" cy="20" r="18" fill="none" stroke="#EDE1CE" strokeWidth="4" />
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="#D98624"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#786858]">
        {label}
      </span>
    </span>
  );
}
function PracticeCard({ icon: Icon, title, text }: { icon: Icon; title: string; text: string }) {
  return (
    <article className="w-[148px] shrink-0 rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7] p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#F9E8BF] text-[#A9631E]">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-3 text-base font-semibold">{title}</h3>
      <p className="mt-1 text-[12.5px] text-[#786858]">{text}</p>
    </article>
  );
}
function PreviewBottomNav({ view, setView }: { view: View; setView: (view: View) => void }) {
  const items: [Icon, string, View][] = [
    [Home, "Home", "home"],
    [GraduationCap, "Learn", "learn"],
    [Compass, "Apply", "apply"],
    [UserRound, "Profile", "profile"],
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[480px] border-t border-[#E4D7C5] bg-[#FFFCF7]">
      <ul className="flex h-16">
        {items.map(([Icon, label, destination]) => {
          const active = view === destination;
          return (
            <li key={label} className="flex-1">
              <button
                onClick={() => setView(destination)}
                className={`flex h-full w-full flex-col items-center justify-center gap-1 ${active ? "text-[#D98624]" : "text-[#A99B8C]"}`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[11px] font-bold">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
