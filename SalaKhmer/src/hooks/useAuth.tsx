import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { User, defaultGuestUser, levelFromXp } from "@/lib/db/schema";
import {
  subscribeToAuthState,
  logout as firebaseLogout,
  loginWithGoogle as firebaseLoginWithGoogle,
  handleGoogleRedirectResult,
} from "@/lib/firebase-auth";
import {
  getUserProfile,
  updateUserProfile,
  markLessonComplete,
  calculateDailyStreak,
} from "@/lib/firebase-db";
import { MOCK_LESSONS } from "@/lib/mock-lessons";

// ── Context Types ─────────────────────────────────────────────────────────

interface AuthContextType {
  user: User;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  login: (provider: "GOOGLE" | "FACEBOOK") => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  completeLesson: (
    lessonId: string,
    categoryId: string,
    lessonTitle: string,
    score?: number,
    xpReward?: number,
    durationSeconds?: number,
  ) => Promise<void>;
  incrementDailyQuiz: () => Promise<void>;
  totalCompletedLessons: number;
  overallProgressPercent: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Helpers ───────────────────────────────────────────────────────────────

function computeOverallProgress(completedLessons: string[]): number {
  const totalLessons = Object.values(MOCK_LESSONS).flat().length;
  if (totalLessons === 0) return 0;
  return Math.round((completedLessons.length / totalLessons) * 100);
}

function maybeResetDailyQuiz(user: User): User {
  const today = new Date().toISOString().split("T")[0];
  if (user.dailyQuizResetDate !== today) {
    return { ...user, dailyQuizCount: 0, dailyQuizResetDate: today };
  }
  return user;
}

// ── Provider ──────────────────────────────────────────────────────────────

export function AuthProviderComponent({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User>(defaultGuestUser);
  const [isLoading, setIsLoading] = useState(true);

  // Listen to Firebase auth state
  useEffect(() => {
    // Handle Google redirect result on app load
    handleGoogleRedirectResult().catch((err) => console.error("Redirect result error:", err));

    const unsubscribe = subscribeToAuthState(async (fbUser) => {
      setFirebaseUser(fbUser);

      if (fbUser) {
        // Fetch Firestore profile
        try {
          const profile = await getUserProfile(fbUser.uid);
          if (profile) {
            const normalizedProfile: User = {
              ...defaultGuestUser,
              ...profile,
              reviewQueue: profile.reviewQueue ?? [],
              audioSettings: { ...defaultGuestUser.audioSettings, ...profile.audioSettings },
            };
            const withQuiz = maybeResetDailyQuiz(normalizedProfile);
            const streakInfo = calculateDailyStreak(profile.lastActiveDate, profile.currentStreak);

            if (streakInfo.updated) {
              withQuiz.currentStreak = streakInfo.newStreak;
              withQuiz.lastActiveDate = new Date().toISOString();
              // Update firestore async without blocking UI
              updateUserProfile(fbUser.uid, {
                currentStreak: streakInfo.newStreak,
              }).catch((err) => console.error("Failed to update streak:", err));
            }
            setUser(withQuiz);
          } else {
            // Profile doesn't exist yet (edge case) — use defaults
            setUser({
              ...defaultGuestUser,
              userId: fbUser.uid,
              name: fbUser.displayName ?? "Angkor Explorer",
              email: fbUser.email ?? undefined,
              avatarUrl: fbUser.photoURL ?? undefined,
              role: "REGISTERED",
              authProvider: "GOOGLE",
            });
          }
        } catch (err) {
          console.error("Failed to load user profile (Firestore error):", err);
          // Fallback if Firestore fails so the user is still logged in locally
          setUser({
            ...defaultGuestUser,
            userId: fbUser.uid,
            name: fbUser.displayName ?? "Angkor Explorer",
            email: fbUser.email ?? undefined,
            avatarUrl: fbUser.photoURL ?? undefined,
            role: "REGISTERED",
            authProvider: "GOOGLE",
          });
        }
      } else {
        // No user logged in — restore guest from localStorage
        const saved = localStorage.getItem("sala-khmer-guest");
        if (saved) {
          try {
            setUser(maybeResetDailyQuiz(JSON.parse(saved)));
          } catch {
            /* ignore */
          }
        } else {
          setUser(defaultGuestUser);
        }
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // Persist guest state to localStorage
  useEffect(() => {
    if (user.role === "GUEST") {
      localStorage.setItem("sala-khmer-guest", JSON.stringify(user));
    }
  }, [user]);

  // ── Auth Actions ─────────────────────────────────────────────────────

  const login = useCallback(
    async (provider: "GOOGLE" | "FACEBOOK") => {
      setIsLoading(true);
      try {
        const guestData =
          user.role === "GUEST" && user.xp > 0
            ? {
                xp: user.xp,
                level: user.level,
                currentStreak: user.currentStreak,
                categoryProgress: user.categoryProgress,
                completedLessons: user.completedLessons,
              }
            : undefined;

        if (provider === "GOOGLE") {
          await firebaseLoginWithGoogle(guestData);
        } else {
          // Facebook — falls back to Google for now
          await firebaseLoginWithGoogle(guestData);
        }
      } catch (err) {
        console.error("Login error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [user],
  );

  const logout = useCallback(async () => {
    await firebaseLogout();
    localStorage.removeItem("sala-khmer-guest");
    setUser(defaultGuestUser);
  }, []);

  const updateUser = useCallback(
    async (updates: Partial<User>) => {
      const updated = { ...user, ...updates };
      setUser(updated);
      if (firebaseUser) {
        await updateUserProfile(firebaseUser.uid, updates);
      } else {
        localStorage.setItem("sala-khmer-guest", JSON.stringify(updated));
      }
    },
    [user, firebaseUser],
  );

  const completeLesson = useCallback(
    async (
      lessonId: string,
      categoryId: string,
      lessonTitle: string,
      score = 100,
      xpReward = 10,
      durationSeconds = 60,
    ) => {
      if (user.completedLessons.includes(lessonId)) return;

      // Every completed lesson earns its designed reward. A strong score earns
      // a small accuracy bonus too, so the Angkor level reflects both study
      // consistency and correct answers without double-counting retries.
      const safeScore = Math.max(0, Math.min(100, Math.round(score)));
      const earnedXp = xpReward + Math.round(safeScore / 10);

      const streakInfo = calculateDailyStreak(user.lastActiveDate, user.currentStreak);
      const activityUpdates = {
        currentStreak: streakInfo.newStreak,
        lastActiveDate: new Date().toISOString(),
      };

      if (firebaseUser) {
        // Save to Firestore
        const { newXp, newLevel } = await markLessonComplete(
          firebaseUser.uid,
          lessonId,
          categoryId,
          lessonTitle,
          score,
          earnedXp,
          durationSeconds,
          user.categoryProgress,
          user.completedLessons,
          user.xp,
          user.level,
        );
        // Update local state
        setUser((prev) => ({
          ...prev,
          completedLessons: [...prev.completedLessons, lessonId],
          categoryProgress: {
            ...prev.categoryProgress,
            [categoryId]: (prev.categoryProgress[categoryId] ?? 0) + 1,
          },
          xp: newXp,
          level: newLevel,
          ...activityUpdates,
        }));
        await updateUserProfile(firebaseUser.uid, activityUpdates);
      } else {
        // Guest — only local
        const newXp = user.xp + earnedXp;
        setUser((prev) => ({
          ...prev,
          completedLessons: [...prev.completedLessons, lessonId],
          categoryProgress: {
            ...prev.categoryProgress,
            [categoryId]: (prev.categoryProgress[categoryId] ?? 0) + 1,
          },
          xp: newXp,
          level: levelFromXp(newXp),
          ...activityUpdates,
        }));
      }
    },
    [user, firebaseUser],
  );

  const incrementDailyQuiz = useCallback(async () => {
    const reset = maybeResetDailyQuiz(user);
    const updated = { ...reset, dailyQuizCount: reset.dailyQuizCount + 1 };
    setUser(updated);
    if (firebaseUser) {
      await updateUserProfile(firebaseUser.uid, {
        dailyQuizCount: updated.dailyQuizCount,
        dailyQuizResetDate: updated.dailyQuizResetDate,
      });
    }
  }, [user, firebaseUser]);

  // ── Derived State ─────────────────────────────────────────────────────

  const totalCompletedLessons = user.completedLessons.length;
  const overallProgressPercent = computeOverallProgress(user.completedLessons);

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        isLoading,
        login,
        logout,
        updateUser,
        completeLesson,
        incrementDailyQuiz,
        totalCompletedLessons,
        overallProgressPercent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProviderComponent");
  }
  return context;
}
