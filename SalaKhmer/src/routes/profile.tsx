import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, ChevronRight, CircleAlert, ExternalLink, Heart, Settings } from "lucide-react";
import { AudioSpeedSettings } from "@/components/AudioSpeedSettings";
import {
  LovableBottomNav,
  LovableHeader,
  LovableModulePath,
  LovableScreen,
  LovableSectionTitle,
} from "@/components/LovableAppShell";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/lib/i18n";
import { PatreonSupportCard } from "@/components/PatreonSupportCard";
export const Route = createFileRoute("/profile")({ component: ProfilePage });
function ProfilePage() {
  const { user, totalCompletedLessons, logout } = useAuth();
  const { locale, t, tr } = useLocale();
  const initial = user.name?.[0]?.toUpperCase() || "O";
  return (
    <LovableScreen>
      <LovableHeader
        eyebrow={tr("myLearning")}
        title={tr("yourProfile")}
        right={<Settings className="h-5 w-5 text-[#786858]" />}
      />
      <section className="px-5 pt-5">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-[#F9E8BF] text-2xl font-bold text-[#A9631E]">
            {initial}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-[19px] font-semibold">{user.name}</h2>
            <p className="truncate text-[13px] text-[#786858]">
              {user.email || "SalaKhmer"}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip>{user.currentStreak}-day streak</Chip>
          <Chip>{totalCompletedLessons} {t("lessonsCompleted")}</Chip>
          <Chip>Level {user.level}</Chip>
        </div>
      </section>
      <section className="px-5 pt-8">
        <LovableSectionTitle title={tr("yourLearningPath")} />
        <LovableModulePath />
      </section>
      <section className="px-5 pt-8">
        <LovableSectionTitle title={t("review")} />
        <div className="overflow-hidden rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7]">
          <Row icon={Bookmark} label={tr("savedWords")} value="Phrase list coming next" />
          <Row
            icon={CircleAlert}
            label={tr("mistakesToReview")}
            value={`${user.reviewQueue.length} ${tr("waiting")}`}
            to="/practice"
          />
        </div>
      </section>
      <section className="px-5 pt-8">
        <PatreonSupportCard locale={locale} />
      </section>
      <section className="px-5 pt-8">
        <LovableSectionTitle title={tr("audio")} />
        <div className="rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7] p-4">
          <p className="text-[14px] font-semibold">{tr("listeningSpeed")}</p>
          <p className="mt-1 text-[12px] text-[#786858]">
            {tr("speedDescription")}
          </p>
          <div className="mt-3">
            <AudioSpeedSettings compact />
          </div>
        </div>
        <button
          onClick={() => void logout()}
          className="mt-4 w-full rounded-[14px] border border-[#DFA7A0] bg-[#FFF7F5] py-3 text-sm font-semibold text-[#A54135]"
        >
          {tr("signOut")}
        </button>
      </section>
      <LovableBottomNav />
    </LovableScreen>
  );
}

const PATREON_URL = "https://www.patreon.com/cw/SalaKhmer";

function SupportSalaKhmer({ locale }: { locale: "en" | "vi" | "zh" | "fr" }) {
  const copy = {
    en: {
      label: "KEEPING SALAKHMER FREE",
      title: "Support SalaKhmer",
      body: "This app is independently made and free for every learner. If it brings you value, you can offer a small encouragement on Patreon.",
      action: "Support on Patreon",
    },
    vi: {
      label: "GIỮ SALAKHMER MIỄN PHÍ",
      title: "Ủng hộ SalaKhmer",
      body: "Ứng dụng này được làm độc lập và luôn miễn phí cho người học. Nếu bạn thấy có giá trị, bạn có thể gửi một lời ủng hộ nhỏ qua Patreon.",
      action: "Ủng hộ trên Patreon",
    },
    zh: {
      label: "让 SALAKHMER 保持免费",
      title: "支持 SalaKhmer",
      body: "此应用由独立开发者制作，并将持续免费提供给学习者。如果它对你有帮助，欢迎通过 Patreon 给予小小支持。",
      action: "在 Patreon 上支持",
    },
    fr: {
      label: "GARDER SALAKHMER GRATUIT",
      title: "Soutenir SalaKhmer",
      body: "Cette application est créée indépendamment et restera gratuite pour les apprenants. Si elle vous est utile, vous pouvez nous encourager sur Patreon.",
      action: "Soutenir sur Patreon",
    },
  }[locale];

  return (
    <aside className="relative overflow-hidden rounded-[22px] border border-[#EDC97E] bg-gradient-to-br from-[#FFF8E9] via-[#FFFDF7] to-[#F4E7C9] p-5 shadow-[0_10px_28px_rgba(99,69,25,0.09)]">
      <div className="absolute -right-8 -top-9 h-28 w-28 rounded-full bg-[#F6B52B]/20" />
      <div className="relative">
        <div className="flex items-center gap-2 text-[#A9631E]">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#F7B52C] text-[#4A3424] shadow-sm">
            <Heart className="h-[18px] w-[18px] fill-current" />
          </span>
          <p className="text-[10px] font-extrabold tracking-[0.12em]">{copy.label}</p>
        </div>
        <h2 className="mt-3 text-[18px] font-extrabold text-[#2F3A35]">{copy.title}</h2>
        <p className="mt-1.5 max-w-[310px] text-[13px] leading-5 text-[#786858]">{copy.body}</p>
        <a
          href={PATREON_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#171717] px-4 text-[13px] font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#2E2E2E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A9631E]"
        >
          <Heart className="h-4 w-4 fill-[#FF6B6B] text-[#FF6B6B]" />
          {copy.action}
          <ExternalLink className="h-3.5 w-3.5 opacity-75" />
        </a>
      </div>
    </aside>
  );
}
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#F9E8BF] px-3 py-1.5 text-[12px] font-semibold text-[#A9631E]">
      {children}
    </span>
  );
}
function Row({
  icon: Icon,
  label,
  value,
  to,
}: {
  icon: typeof Bookmark;
  label: string;
  value: string;
  to?: "/practice";
}) {
  const content = (
    <>
      <span className="flex min-w-0 flex-1 items-center gap-3">
        <Icon className="h-[18px] w-[18px] text-[#786858]" />
        <span className="text-[14px] font-semibold">{label}</span>
      </span>
      <span className="max-w-[120px] truncate text-[12px] text-[#786858]">{value}</span>
      {to && <ChevronRight className="h-[18px] w-[18px] text-[#A99B8C]" />}
    </>
  );
  return to ? (
    <Link
      to={to}
      className="flex h-14 w-full items-center gap-2 border-b border-[#EDE1CE] px-4 text-left last:border-0"
    >
      {content}
    </Link>
  ) : (
    <div className="flex h-14 w-full items-center gap-2 border-b border-[#EDE1CE] px-4 text-left last:border-0">
      {content}
    </div>
  );
}
