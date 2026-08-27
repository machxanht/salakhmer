import { Flame, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export function DailyChallenge() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 p-4 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Icon block */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-orange-500">
          <Flame className="h-6 w-6" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            Daily Challenge
          </p>
          <h3 className="mt-0.5 truncate text-sm font-bold text-foreground">
            Write <span className="khmer text-primary">"សួស្តី"</span> from memory
          </h3>
          <p className="mt-1 flex items-center text-xs text-muted-foreground">
            <span className="font-bold text-orange-600 dark:text-orange-400">+50 XP</span>
            <span className="mx-1.5 opacity-50">•</span>
            <span>4 min</span>
            <span className="mx-1.5 opacity-50">•</span>
            <span>Expires 11h 22m</span>
          </p>
        </div>

        {/* Action button */}
        <Button
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-md"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
