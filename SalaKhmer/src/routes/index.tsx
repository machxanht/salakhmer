import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Languages, LogIn, UserRound } from "lucide-react";
import mascot from "@/assets/mascot-apsara.png";
import logo from "@/assets/logo-1.svg";
import { useLocale, type Locale } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Learn Khmer with SalaKhmer" },
      { name: "description", content: "Learn Khmer script, words, conversations, and Cambodian culture." },
    ],
  }),
  component: Welcome,
});

const LANGUAGES: { code: Locale; short: string; label: string }[] = [
  { code: "en", short: "EN", label: "English" },
  { code: "vi", short: "VI", label: "Tiếng Việt" },
  { code: "zh", short: "中", label: "中文" },
  { code: "fr", short: "FR", label: "Français" },
];

function Welcome() {
  const navigate = useNavigate();
  const { locale, setLocale } = useLocale();

  return (
    <main className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#FFFDF9] px-5 pb-6 pt-8 sm:px-8 sm:pt-10">
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#BDE8DE]/50 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-[#D9F1E9]/60 blur-3xl" />

      <header className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center text-center">
        <img src={logo} alt="SalaKhmer" className="h-[88px] w-[88px] object-contain drop-shadow-[0_9px_15px_rgba(49,43,32,.13)]" />
        <h1 className="mt-2 text-[32px] tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="font-semibold italic text-[#D4A832]">Sala</span><span className="font-medium text-[#143D35]">Khmer</span>
        </h1>
        <p className="mt-1 text-[11px] font-medium tracking-wide text-[#748077]">Khmer School Made Easy.</p>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-[470px] flex-1 flex-col items-center justify-center py-5">
        <div className="relative flex w-full flex-col items-center">
          <div className="absolute bottom-5 h-[270px] w-[270px] rounded-full bg-gradient-to-b from-[#BCE8DE] via-[#DDF2EC] to-transparent sm:h-[350px] sm:w-[350px]" />
          <div className="relative z-10 flex w-full max-w-[300px] flex-col items-end sm:max-w-[380px]">
            <div className="relative mr-1 rounded-2xl border border-[#E5E1D9] bg-white px-4 py-2 text-center shadow-[0_6px_14px_rgba(64,55,38,.10)]">
              <span className="absolute -bottom-2 left-7 h-4 w-4 rotate-45 border-b border-r border-[#E5E1D9] bg-white" />
              <p className="relative font-khmer text-[20px] font-bold leading-none text-[#21453C]">ជំរាបសួរ</p>
              <p className="relative mt-1 text-[8px] font-bold tracking-[.12em] text-[#87918B]">CHOM REAB SOUR</p>
            </div>
            <img
              src={mascot}
              alt="Apsara mascot greeting learners"
              width={1024}
              height={1024}
              className="relative -mt-1 w-full max-w-[300px] self-center object-contain drop-shadow-[0_12px_16px_rgba(39,79,67,.16)] sm:max-w-[370px]"
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-md">
        <div className="rounded-[20px] border border-[#E9DDC8] bg-white/90 p-3.5 shadow-[0_12px_28px_rgba(74,61,37,.08)] backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-[11px] font-extrabold tracking-[.02em] text-[#34554B]">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#E5F5EE]"><Languages className="h-3.5 w-3.5 text-[#15977F]" /></span>
              Choose your language
            </span>
            <span className="text-[10px] font-semibold text-[#9A8F7D]">You can change this later</span>
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {LANGUAGES.map((language) => {
              const selected = locale === language.code;
              return (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => setLocale(language.code)}
                  aria-pressed={selected}
                  className={`relative min-h-[52px] rounded-[13px] border px-1.5 text-center transition-all ${selected ? "border-[#15977F] bg-[#E3F6EF] text-[#0E7865] shadow-[inset_0_0_0_1px_rgba(21,151,127,.12)]" : "border-[#EEE6D8] bg-[#FFFEFC] text-[#756D61] hover:-translate-y-0.5 hover:border-[#C8DCCF] hover:shadow-sm"}`}
                >
                  {selected && <Check className="absolute right-1 top-1 h-3 w-3" />}
                  <span className="block text-[13px] font-extrabold leading-5">{language.short}</span>
                  <span className="block truncate text-[9px] leading-3">{language.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <button onClick={() => navigate({ to: "/login" })} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#D9D6CC] bg-white text-[13px] font-extrabold text-[#284239] transition hover:bg-[#F7FAF8]">
            <LogIn className="h-4 w-4" /> Log in
          </button>
          <button onClick={() => navigate({ to: "/home" })} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#13957F] text-[13px] font-extrabold text-white shadow-[0_8px_15px_rgba(19,149,127,.22)] transition hover:bg-[#0D846F]">
            <UserRound className="h-4 w-4" /> Continue as guest <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </main>
  );
}
