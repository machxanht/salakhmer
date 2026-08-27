import { Lock, CheckCircle2, Layers } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import { GREETINGS_DATA } from "@/lib/khmerGreetingData";
import { isCategoryAccessible } from "@/lib/auth-access";
import { hasFullLessonTestAccess } from "@/lib/tester-access";

export function GreetingsList() {
  const { user, firebaseUser } = useAuth();
  const hasTesterAccess = hasFullLessonTestAccess(firebaseUser?.email ?? user.email);

  const keys = Object.keys(GREETINGS_DATA);

  return (
    <div className="relative pt-2 pb-20">
      {/* Vertical timeline line */}
      <div className="absolute left-6 top-4 bottom-4 w-1 bg-border -z-10 rounded-full"></div>

      <div className="space-y-6">
        {keys.map((lessonId, index) => {
          const level = GREETINGS_DATA[lessonId];
          if (!level) return null;
          const isCompleted = user.completedLessons.includes(lessonId);
          const previousLessonId = keys[index - 1];
          const isUnlocked =
            (hasTesterAccess || isCategoryAccessible(user.role, "module_3")) &&
            (index === 0 ||
              hasTesterAccess ||
              isCompleted ||
              (previousLessonId != null && user.completedLessons.includes(previousLessonId)));
          const isNextToLearn = isUnlocked && !isCompleted;

          return (
            <div key={lessonId} className="relative flex gap-5">
              {/* Timeline node */}
              <div className="shrink-0 mt-2 relative z-10">
                <div
                  className={`h-12 w-12 rounded-full grid place-items-center shadow-sm border-4 border-background transition-all duration-300 ${
                    isCompleted
                      ? "bg-jade text-white"
                      : isNextToLearn
                        ? "bg-primary text-white ring-4 ring-primary/20 scale-110"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <Layers className="h-5 w-5" />
                  )}
                </div>
              </div>

              {/* Lesson Card */}
              <div
                className={`flex-1 rounded-2xl p-4 transition-all duration-300 ${
                  isCompleted
                    ? "bg-card border border-border/50 opacity-90"
                    : isNextToLearn
                      ? "bg-card shadow-md border-2 border-primary/20 scale-[1.02]"
                      : "bg-card/50 border border-border/30 opacity-60 grayscale-[0.3]"
                }`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-[10px] font-bold tracking-[0.1em] text-muted-foreground uppercase">
                    CONVERSATION
                  </span>
                  <span className="text-[10px] font-extrabold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    +{level.data.length * 2} XP
                  </span>
                </div>
                <h3
                  className={`font-extrabold ${isNextToLearn ? "text-lg text-foreground" : "text-base text-foreground/80"}`}
                >
                  {level.title}
                </h3>

                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  {level.subtitle}
                </p>

                {isNextToLearn && (
                  <Link
                    to="/grid-lesson/$lessonId"
                    params={{ lessonId }}
                    className="block mt-4 w-full bg-primary text-primary-foreground font-extrabold text-sm py-3 rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition-all text-center"
                  >
                    Start lesson
                  </Link>
                )}
                {isCompleted && (
                  <Link
                    to="/grid-lesson/$lessonId"
                    params={{ lessonId }}
                    className="block mt-4 w-full bg-secondary text-foreground font-extrabold text-sm py-2 rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition-all text-center"
                  >
                    Review
                  </Link>
                )}
                {!isUnlocked && !isCompleted && (
                  <div className="mt-3 flex items-center justify-center gap-1.5 w-full bg-secondary/50 text-muted-foreground font-bold text-sm py-2.5 rounded-xl">
                    <Lock className="h-4 w-4" /> Locked
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
