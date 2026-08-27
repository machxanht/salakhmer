import { Flag, Lock, MapPin, Sparkles, Trophy } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { computeExpeditionStatus } from "@/lib/expedition-data";
import { hasFullLessonTestAccess } from "@/lib/tester-access";
import { DailyChallenge } from "./DailyChallenge";
import angkorWat from "@/assets/map-landmarks/angkor-wat.webp";
import bayonTemple from "@/assets/map-landmarks/bayon-temple.webp";
import taProhm from "@/assets/map-landmarks/ta-prohm.webp";
import preahKhan from "@/assets/map-landmarks/preah-khan.webp";
import banteaySrei from "@/assets/map-landmarks/banteay-srei.webp";
import kohKer from "@/assets/map-landmarks/koh-ker.webp";

const landmarkArt: Record<string, string> = {
  "bayon-temple": bayonTemple,
  "angkor-wat": angkorWat,
  "ta-prohm": taProhm,
  "preah-khan": preahKhan,
  "banteay-srei": banteaySrei,
  "koh-ker": kohKer,
};

/** A visual map of the real user profile: XP is the source of the level. */
export function AngkorRelicsMap({ showDailyChallenge = true }: { showDailyChallenge?: boolean }) {
  const { user, totalCompletedLessons } = useAuth();
  const isGuest = user.role === "GUEST";
  // The configured owner/tester can inspect the complete visual route without
  // altering their real XP, lesson history, or access for other users.
  const hasMapPreviewAccess = hasFullLessonTestAccess(user.email);
  const nodes = computeExpeditionStatus(
    hasMapPreviewAccess ? 40 : user.level,
    hasMapPreviewAccess ? 120 : totalCompletedLessons,
  );
  const currentNode = nodes.find((node) => node.status === "current");
  const routePoints = nodes.map((node) => `${node.posX},${100 - node.posY}`).join(" ");
  const xpInLevel = user.xp % 200;
  const xpToNextLevel = 200 - xpInLevel || 200;
  const xpProgress = Math.min(100, Math.round((xpInLevel / 200) * 100));

  return (
    <section className="overflow-hidden rounded-[28px] border border-[#E9D7A8] bg-[#FFF9E9] shadow-[0_10px_24px_rgba(80,61,27,.08)]">
      <header className="flex items-center justify-between px-5 pb-3 pt-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.14em] text-[#B67218]">Your learning path</p>
          <h2 className="mt-1 text-[21px] font-black text-[#173B33]">Journey through Angkor</h2>
        </div>
        <span className="rounded-full bg-[#E2F1E8] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.08em] text-[#16775B]">6 stops</span>
      </header>

      <div className="mx-4 mb-4 rounded-[22px] border border-[#D8E9DE] bg-white px-4 py-3.5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#163F35] text-[#FFD166] shadow-[0_5px_12px_rgba(22,63,53,.18)]">
              <Trophy className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-black text-[#173B33]">Level {user.level}</p>
                <p className="whitespace-nowrap text-[11px] font-bold text-[#6B746D]">{user.xp.toLocaleString()} XP</p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E9EEE9]">
                <div className="h-full rounded-full bg-[linear-gradient(90deg,#D9871A,#F6C451)] transition-[width] duration-500" style={{ width: `${xpProgress}%` }} />
              </div>
              <p className="mt-1.5 text-[10px] font-semibold text-[#7D6B49]">{xpToNextLevel} XP to Level {user.level + 1}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#EDF0EC] pt-3 text-center">
            <Stat value={totalCompletedLessons} label="Lessons" />
            <Stat value={user.currentStreak} label="Day streak" />
            <Stat value={`${nodes.filter((node) => node.status !== "locked").length}/6`} label="Places" />
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[10px] leading-4 text-[#6B746D]"><Sparkles className="h-3.5 w-3.5 shrink-0 text-[#D9871A]" /> Finish lessons and answer activities correctly to earn more XP.</p>
      </div>

      {showDailyChallenge && <div className="px-5 pb-4"><DailyChallenge /></div>}

      <div className="relative mx-3 mb-3 h-[390px] overflow-hidden rounded-[22px] border border-[#F0D99F] bg-[#FFFDF5]">
        <div aria-hidden="true" className="absolute -left-10 bottom-4 h-28 w-28 rounded-full bg-[#DBF0E0]" />
        <div aria-hidden="true" className="absolute -right-12 top-8 h-36 w-36 rounded-full bg-[#FFE8AF]/65" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={routePoints} fill="none" stroke="#FFF5D9" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={routePoints} fill="none" stroke="#F2A52B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={routePoints} fill="none" stroke="#FFD77B" strokeWidth="0.35" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1.3 2.1" />
        </svg>
        <MapTrees className="left-[5%] top-[13%] scale-75" />
        <MapTrees className="right-[4%] top-[31%] scale-90" />
        <MapTrees className="bottom-[7%] left-[8%] scale-[.7]" />
        <MapTrees className="bottom-[13%] right-[12%] scale-[.62]" />

        {nodes.map((node, index) => {
          const unlocked = node.status === "unlocked" || node.status === "current";
          const current = node.status === "current";
          return (
            <div key={node.id} className="absolute z-20 -translate-x-1/2 translate-y-1/2" style={{ left: `${node.posX}%`, bottom: `${node.posY}%` }}>
              <div className={`relative grid h-[72px] w-[72px] place-items-center transition-transform ${current ? "scale-110" : ""}`}>
                {current && <span aria-hidden="true" className="absolute inset-1 rounded-full bg-[#F6B431]/30 blur-md" />}
                <img src={landmarkArt[node.id]} alt="" className={`relative h-[76px] w-[76px] max-w-none object-contain drop-shadow-[0_5px_4px_rgba(54,62,35,.24)] ${unlocked ? "" : "grayscale opacity-35"}`} />
                {!unlocked && <span className="absolute inset-0 grid place-items-center"><span className="grid h-7 w-7 place-items-center rounded-full bg-white/90 shadow-sm"><Lock className="h-3.5 w-3.5 text-[#756C5D]" /></span></span>}
                <span className={`absolute -left-2 -top-2 z-10 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[9px] font-black ${current ? "bg-[#173B33] text-white" : "bg-white text-[#7A623D] shadow-sm"}`}>{index + 1}</span>
              </div>
              <span className="absolute left-1/2 top-[71px] w-[84px] -translate-x-1/2 text-center text-[9px] font-black leading-3 text-[#564827]">{node.name}</span>
            </div>
          );
        })}

        {currentNode && !isGuest && <div className="absolute left-4 top-4 z-30 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[10px] font-black text-[#4E3E21] shadow-[0_5px_12px_rgba(65,50,18,.12)]"><MapPin className="h-3.5 w-3.5 text-[#DD6D25]" fill="currentColor" /> You are here</div>}
        {isGuest && <div className="absolute inset-x-4 bottom-4 z-30 flex items-center justify-center gap-2 rounded-2xl bg-white/95 px-4 py-3 text-center text-[11px] font-bold text-[#4E3E21] shadow-sm"><Flag className="h-4 w-4 text-[#DD6D25]" /> Sign in to save your Angkor journey.</div>}
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return <div><p className="text-sm font-black text-[#173B33]">{value}</p><p className="mt-0.5 text-[9px] font-bold uppercase tracking-[.08em] text-[#8C806B]">{label}</p></div>;
}

function MapTrees({ className }: { className: string }) {
  return <div aria-hidden="true" className={`absolute z-10 flex items-end ${className}`}><Tree size="sm" /><Tree size="lg" /><Tree size="md" /></div>;
}

function Tree({ size }: { size: "sm" | "md" | "lg" }) {
  const dimensions = { sm: "h-9 w-7", md: "h-12 w-9", lg: "h-16 w-12" };
  return <span className={`relative inline-block ${dimensions[size]}`}><span className="absolute bottom-0 left-1/2 h-[48%] w-1 -translate-x-1/2 rounded-full bg-[#6C5837]" /><span className="absolute left-0 top-0 h-[68%] w-full rounded-[48%] bg-[#4C8C5B] shadow-[inset_0_-5px_0_rgba(36,104,64,.18)]" /><span className="absolute left-[18%] top-[12%] h-[42%] w-[64%] rounded-[48%] border-l border-[#D7F0B9]/70" /></span>;
}
