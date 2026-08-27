import { Clock3, Layers, Lock, Target, Trophy } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { MODULE_CONFIG, SKILL_LABELS } from "@/lib/module-config";
import type { ContentCategory } from "@/lib/auth-access";

type ModuleOverviewProps = {
  moduleId: ContentCategory;
  lessonCount: number;
  progressPercent: number;
};

export function ModuleOverview({ moduleId, lessonCount, progressPercent }: ModuleOverviewProps) {
  const module = MODULE_CONFIG[moduleId];

  return (
    <div className="px-5 pt-5">
      <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground">
              Module objective
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed">{module.objective}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border/60 pt-4 text-center">
          <OverviewMetric
            icon={<Clock3 className="h-4 w-4" />}
            value={`${module.durationMinutes} min`}
            label="duration"
          />
          <OverviewMetric
            icon={<Layers className="h-4 w-4" />}
            value={`${lessonCount} lessons`}
            label="learning path"
          />
          <OverviewMetric
            icon={<Trophy className="h-4 w-4" />}
            value="100 XP+"
            label="checkpoint"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {module.skills.map((skill) => (
            <span key={skill} className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold">
              {SKILL_LABELS[skill]}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground">
            Learning path
          </p>
          <h2 className="mt-1 text-lg font-extrabold">Your learning path</h2>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary">
          {progressPercent}%
        </span>
      </div>
    </div>
  );
}

export function ModuleCheckpoint({
  moduleId,
  unlocked,
}: {
  moduleId: ContentCategory;
  unlocked: boolean;
}) {
  const module = MODULE_CONFIG[moduleId];
  return (
    <div
      className={`mt-6 rounded-2xl border border-dashed p-4 ${unlocked ? "border-primary bg-primary/10" : "border-primary/40 bg-primary/5"}`}
    >
      <div className="flex items-start gap-3">
        <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="font-extrabold">{module.checkpointLabel}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {module.checkpointDescription}
          </p>
          <p className="mt-2 text-[11px] font-bold text-primary">
            {unlocked ? "Checkpoint ready" : "Unlock after completing the learning path"}
          </p>
          {unlocked ? (
            moduleId === "module_1" ? (
              <Link
                to="/grid-lesson/$lessonId"
                params={{ lessonId: "alpha-l1" }}
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-extrabold text-primary-foreground"
              >
                <Trophy className="h-4 w-4" /> Review checkpoint
              </Link>
            ) : (
              <Link
                to="/lesson/$lessonId"
                params={{ lessonId: checkpointLessonId(moduleId) }}
                search={{ activity: 0 }}
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-extrabold text-primary-foreground"
              >
                <Trophy className="h-4 w-4" /> Start checkpoint
              </Link>
            )
          ) : (
            <span className="mt-3 inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-xs font-bold text-muted-foreground">
              <Lock className="h-4 w-4" /> Locked
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function checkpointLessonId(moduleId: ContentCategory): string {
  if (moduleId === "module_3") return "dialogue-checkpoint-1";
  if (moduleId === "module_5") return "assessment-starter";
  return `${moduleId}-1`;
}

function OverviewMetric({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div>
      <div className="flex justify-center text-primary">{icon}</div>
      <p className="mt-1 text-xs font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
