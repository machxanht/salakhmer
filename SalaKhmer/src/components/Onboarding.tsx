import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Plane, Heart, BriefcaseBusiness, Landmark } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const goals = [
  {
    id: "travel",
    title: "Travel in Cambodia",
    desc: "Useful phrases for daily situations.",
    icon: Plane,
    to: "/category/module_3",
  },
  {
    id: "family",
    title: "Talk with family",
    desc: "Build a warm foundation for conversations.",
    icon: Heart,
    to: "/category/module_3",
  },
  {
    id: "work",
    title: "Work or study",
    desc: "Start with script and clear reading skills.",
    icon: BriefcaseBusiness,
    to: "/category/module_1",
  },
  {
    id: "culture",
    title: "Culture and heritage",
    desc: "Learn the language through Cambodia's culture.",
    icon: Landmark,
    to: "/category/module_6",
  },
] as const;

export function Onboarding() {
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const choose = async (goal: (typeof goals)[number]) => {
    setSaving(true);
    await updateUser({ learningGoal: goal.id, onboardingComplete: true });
    navigate({ to: goal.to });
  };
  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/45 p-0 sm:place-items-center sm:p-5">
      <section className="w-full max-w-md rounded-t-3xl bg-card p-6 shadow-2xl sm:rounded-3xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
          Welcome to SalaKhmer
        </p>
        <h1 className="mt-2 text-2xl font-extrabold">Why are you learning Khmer?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose one path. You can change your focus later.
        </p>
        <div className="mt-5 space-y-3">
          {goals.map((goal) => {
            const Icon = goal.icon;
            return (
              <button
                key={goal.id}
                disabled={saving}
                onClick={() => void choose(goal)}
                className="flex w-full items-center gap-3 rounded-2xl border border-border p-4 text-left hover:border-primary hover:bg-primary/5 disabled:opacity-60"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-extrabold">{goal.title}</span>
                  <span className="block text-sm text-muted-foreground">{goal.desc}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
