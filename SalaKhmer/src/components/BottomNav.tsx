import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, RotateCcw, User, Sparkles } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { useLocale } from "@/lib/i18n";

const AIChatbox = lazy(() =>
  import("./AIChatbox").then((module) => ({ default: module.AIChatbox })),
);

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const { t } = useLocale();
  const items = [
    { to: "/home", label: t("home"), icon: Home },
    { to: "/dictionary", label: t("dictionary"), icon: BookOpen },
    { type: "ai", label: "AI", icon: Sparkles },
    { to: "/practice", label: "REVIEW", icon: RotateCcw },
    { to: "/profile", label: t("profile"), icon: User },
  ] as const;

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur">
        <ul className="mx-auto grid max-w-md grid-cols-5 px-1 pb-3 pt-2">
          {items.map((item) => {
            const Icon = item.icon;
            if (!("to" in item)) {
              return (
                <li key="ai" className="flex justify-center">
                  <button
                    onClick={() => setIsAIChatOpen(true)}
                    className="flex flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-bold tracking-[0.14em] transition-colors text-ruby hover:opacity-80"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-ruby text-ruby-foreground shadow-md">
                      <Icon className="h-5 w-5" strokeWidth={2.2} />
                    </span>
                    <span className="text-ruby font-extrabold">{item.label}</span>
                  </button>
                </li>
              );
            }

            const active = pathname === item.to;
            return (
              <li key={item.to} className="flex justify-center">
                <Link
                  to={item.to}
                  className={`flex flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-bold tracking-[0.14em] transition-colors ${
                    active ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-xl transition-all ${
                      active ? "bg-primary" : "bg-transparent"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {isAIChatOpen && (
        <Suspense fallback={null}>
          <AIChatbox onClose={() => setIsAIChatOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
