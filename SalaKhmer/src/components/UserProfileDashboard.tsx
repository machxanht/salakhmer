import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Download, Flame, LogOut, Target, User as UserIcon } from "lucide-react";
import { MODULE_CONFIG, SKILL_LABELS, type ModuleSkill } from "@/lib/module-config";
import { AngkorRelicsMap } from "./AngkorRelicsMap";
import { AudioSpeedSettings } from "./AudioSpeedSettings";

export function UserProfileDashboard() {
  const { user, logout, totalCompletedLessons, overallProgressPercent } = useAuth();
  const navigate = useNavigate();
  const skillProgress = Object.values(MODULE_CONFIG).reduce<Record<ModuleSkill, number>>(
    (progress, module) => {
      const moduleProgress = user.categoryProgress[module.id] ?? 0;
      for (const skill of module.skills) progress[skill] += moduleProgress;
      return progress;
    },
    { listening: 0, reading: 0, speaking: 0, writing: 0, culture: 0 },
  );
  const highestSkillProgress = Math.max(1, ...Object.values(skillProgress));

  if (user.role === "GUEST") {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center p-8 text-center bg-card rounded-2xl border border-border">
          <UserIcon className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-xl font-bold mb-2">Guest Explorer</h2>
          <p className="text-sm text-muted-foreground mb-6">
            You are browsing as a guest. Create a free account to save progress and unlock every
            lesson.
          </p>
          <Button
            id="profile-login-btn"
            onClick={() =>
              navigate({ to: "/login", search: { redirect: window.location.pathname } })
            }
            className="w-full max-w-xs"
          >
            Log in / Sign up
          </Button>
        </div>
        <AudioSpeedSettings />
        <AngkorRelicsMap />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-br from-card to-primary/5 border-border">
        <CardHeader className="flex flex-row items-center gap-4 pb-4">
          <Avatar className="w-20 h-20 border-4 border-background shadow-lg">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={logout} title="Log out">
            <LogOut className="w-5 h-5 text-muted-foreground" />
          </Button>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="flex items-center gap-2 bg-orange-500/10 text-orange-600 px-3 py-1.5 rounded-full font-semibold">
            <Flame className="w-4 h-4" />
            {user.currentStreak} Day Streak
          </div>
          <div className="flex items-center gap-2 bg-blue-500/10 text-blue-600 px-3 py-1.5 rounded-full font-semibold">
            Lv.{user.level} · {user.xp} XP
          </div>
          <div className="flex items-center gap-2 bg-green-500/10 text-green-600 px-3 py-1.5 rounded-full font-semibold">
            {totalCompletedLessons} lessons · {overallProgressPercent}%
          </div>
        </CardContent>
      </Card>

      <AudioSpeedSettings />

      <AngkorRelicsMap />

      <Card>
        <CardHeader>
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <Target className="h-5 w-5 text-primary" /> Skills
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(skillProgress).map(([skill, value]) => (
            <div key={skill}>
              <div className="flex justify-between text-sm">
                <span className="font-bold">{SKILL_LABELS[skill as ModuleSkill]}</span>
                <span className="text-muted-foreground">{value} lessons</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${Math.round((value / highestSkillProgress) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Certificate Action */}
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <h3 className="font-bold text-lg">Completion Certificate</h3>
            <p className="text-sm text-muted-foreground">
              Download your certificate once you complete all categories.
            </p>
          </div>
          <Button variant="secondary" disabled className="gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
