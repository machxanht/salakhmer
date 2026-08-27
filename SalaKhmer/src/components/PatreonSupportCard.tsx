import { ExternalLink, Heart } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const PATREON_URL = "https://www.patreon.com/cw/SalaKhmer";

const COPY: Record<Locale, { label: string; title: string; body: string; action: string }> = {
  en: {
    label: "KEEP SALAKHMER FREE",
    title: "Support SalaKhmer",
    body: "SalaKhmer is independently made and free for every learner. If this helped you, a small Patreon encouragement helps us keep building.",
    action: "Support on Patreon",
  },
  vi: {
    label: "GIỮ SALAKHMER MIỄN PHÍ",
    title: "Ủng hộ SalaKhmer",
    body: "SalaKhmer được làm độc lập và luôn miễn phí cho người học. Nếu phần này hữu ích, một lời ủng hộ nhỏ qua Patreon sẽ giúp ứng dụng tiếp tục phát triển.",
    action: "Ủng hộ trên Patreon",
  },
  zh: {
    label: "让 SALAKHMER 保持免费",
    title: "支持 SalaKhmer",
    body: "SalaKhmer 由独立开发者制作，并始终免费提供给学习者。如果它对你有帮助，欢迎通过 Patreon 支持我们继续建设它。",
    action: "在 Patreon 上支持",
  },
  fr: {
    label: "GARDER SALAKHMER GRATUIT",
    title: "Soutenir SalaKhmer",
    body: "SalaKhmer est créé indépendamment et reste gratuit pour tous les apprenants. Si cela vous a aidé, un petit soutien sur Patreon nous aide à continuer.",
    action: "Soutenir sur Patreon",
  },
};

/** One consistent, optional Patreon CTA throughout the learner experience. */
export function PatreonSupportCard({ locale, className = "" }: { locale: Locale; className?: string }) {
  const copy = COPY[locale];

  return (
    <aside className={`relative overflow-hidden rounded-[18px] border border-[#EFCB7B] bg-[#FFF2D2] p-4 text-left shadow-[0_8px_18px_rgba(109,73,20,0.08)] ${className}`}>
      <div aria-hidden="true" className="absolute -right-7 -top-9 h-24 w-24 rounded-full bg-[#F3C34B]/25" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#F5B321] text-[#4D3420] shadow-sm">
            <Heart className="h-3.5 w-3.5 fill-current" />
          </span>
          <p className="text-[9px] font-extrabold tracking-[0.1em] text-[#A25C1E]">{copy.label}</p>
        </div>
        <h3 className="mt-3 text-[16px] font-extrabold text-[#3C332A]">{copy.title}</h3>
        <p className="mt-1 text-[12px] leading-5 text-[#80654B]">{copy.body}</p>
        <a
          href={PATREON_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-[#1D1B1B] px-3.5 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A9631E]"
        >
          <Heart className="h-3.5 w-3.5 fill-[#FF7272] text-[#FF7272]" />
          {copy.action}
          <ExternalLink className="h-3.5 w-3.5 opacity-70" />
        </a>
      </div>
    </aside>
  );
}
