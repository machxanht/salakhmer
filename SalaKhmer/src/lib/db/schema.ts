import { z } from "zod";

// ── Auth & Role Types ──────────────────────────────────────────────────────

export const AuthProviderEnum = z.enum(["GUEST", "EMAIL", "GOOGLE", "FACEBOOK", "APPLE"]);
export type AuthProvider = z.infer<typeof AuthProviderEnum>;

export const UserRoleEnum = z.enum(["GUEST", "REGISTERED"]);
export type UserRole = z.infer<typeof UserRoleEnum>;

// ── User Schema ────────────────────────────────────────────────────────────

export const UserSchema = z.object({
  userId: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  avatarUrl: z.string().url().optional(),
  authProvider: AuthProviderEnum,
  role: UserRoleEnum,

  // Progression
  level: z.number().default(1),
  xp: z.number().default(0),
  currentStreak: z.number().default(0),
  lastActiveDate: z.string().optional(), // ISO date string
  learningGoal: z.enum(["travel", "family", "work", "culture"]).optional(),
  onboardingComplete: z.boolean().default(false),

  // Content tracking
  /** Maps category id → number of completed lessons in that category */
  categoryProgress: z.record(z.string(), z.number()).default({}),
  /** Set of completed lesson IDs */
  completedLessons: z.array(z.string()).default([]),
  reviewQueue: z
    .array(
      z.object({
        id: z.string(),
        lessonId: z.string(),
        activityIndex: z.number().optional(),
        prompt: z.string(),
        answer: z.string(),
        wrongAnswer: z.string(),
        attempts: z.number(),
        updatedAt: z.string(),
      }),
    )
    .default([]),
  audioSettings: z
    .object({
      playbackRate: z.number().min(0.5).max(1.25).default(1),
      repeatCount: z.number().int().min(1).max(3).default(1),
      autoPlayNext: z.boolean().default(false),
    })
    .default({ playbackRate: 1, repeatCount: 1, autoPlayNext: false }),

  // Gamification
  /** Set of unlocked relic IDs (from expedition map) */
  unlockedRelics: z.array(z.string()).default([]),

  // Guest restriction
  /** How many quizzes the guest has taken today (resets daily) */
  dailyQuizCount: z.number().default(0),
  /** ISO date string of last quiz reset */
  dailyQuizResetDate: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

// ── Helper: Compute XP needed for a level ─────────────────────────────────

/** Simple level threshold: level N requires N * 200 cumulative XP */
export function xpForLevel(level: number): number {
  return level * 200;
}

/** Returns the user's level based on their XP */
export function levelFromXp(xp: number): number {
  return Math.max(1, Math.floor(xp / 200) + 1);
}

/** Returns XP progress within the current level (0–200) */
export function xpProgress(xp: number): { current: number; needed: number; percent: number } {
  const needed = 200;
  const current = xp % 200;
  return { current, needed, percent: Math.round((current / needed) * 100) };
}

// ── Default Users ──────────────────────────────────────────────────────────

export const defaultGuestUser: User = {
  userId: "guest-temp",
  name: "Guest Explorer",
  authProvider: "GUEST",
  role: "GUEST",
  level: 1,
  xp: 0,
  currentStreak: 0,
  categoryProgress: {
    // Guests get partial progress only in accessible categories
    alphabet: 4, // First 4 consonants traced
    phrases: 5, // 5 greetings completed
  },
  completedLessons: [
    "alpha-k-ka",
    "alpha-k-kha",
    "alpha-k-ko",
    "alpha-k-ngo",
    "ph-g-hello",
    "ph-g-thank",
    "ph-g-sorry",
    "ph-g-name",
    "ph-g-fine",
  ],
  reviewQueue: [],
  audioSettings: { playbackRate: 1, repeatCount: 1, autoPlayNext: false },
  unlockedRelics: [],
  dailyQuizCount: 0,
};

/** Mock registered user data mirroring the screenshot percentages */
export const createMockRegisteredUser = (provider: AuthProvider): User => ({
  userId: `user-${Date.now()}`,
  name: "Angkor Explorer",
  email: "explorer@example.com",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=AngkorExplorer",
  authProvider: provider,
  role: "REGISTERED",
  level: 7,
  xp: 1400,
  currentStreak: 7,
  lastActiveDate: new Date().toISOString(),
  categoryProgress: {
    // Matches: 34% of 12, 61% of 18, 20% of 24, 45% of 16, 78% of 10, 55% of 30
    alphabet: 4, // 4/12 ~ 34% DONE
    phrases: 11, // 11/18 ~ 61% DONE
    grammar: 5, // 5/24 ~ 20% DONE
    conversations: 7, // 7/16 ~ 45% DONE
    culture: 8, // 8/10 ~ 78% DONE (high — cultural enthusiast!)
    quizzes: 17, // 17/30 ~ 55% DONE
  },
  completedLessons: [
    // Alphabet (4 lessons)
    "alpha-k-ka",
    "alpha-k-kha",
    "alpha-k-ko",
    "alpha-k-ngo",
    // Phrases (11 lessons — all greetings + emergency + some food)
    "ph-g-hello",
    "ph-g-thank",
    "ph-g-sorry",
    "ph-g-name",
    "ph-g-fine",
    "ph-e-help",
    "ph-e-hospital",
    "ph-e-police",
    "ph-e-lost",
    "ph-e-toilet",
    "ph-f-water",
    // Grammar (5 lessons)
    "gr-s-basic",
    "gr-s-neg",
    "gr-s-question",
    "gr-s-tense",
    "gr-s-particle",
    // Conversations (7 lessons)
    "conv-m-intro",
    "conv-m-price",
    "conv-m-choose",
    "conv-m-pay",
    "conv-r-order",
    "conv-r-dietary",
    "conv-r-bill",
    // Culture (8 lessons)
    "cult-t-angkor",
    "cult-t-bayon",
    "cult-t-taprohm",
    "cult-f-khmer-new",
    "cult-f-water",
    "cult-f-pchum",
    "cult-c-sampeah",
    "cult-c-dress",
    // Quizzes (17 lessons)
    "qz-f-daily",
    "qz-f-alpha1",
    "qz-f-alpha2",
    "qz-f-phrase1",
    "qz-f-phrase2",
    "qz-m-script1",
    "qz-m-script2",
    "qz-m-vocab1",
    "qz-m-vocab2",
    "qz-m-vocab3",
    "qz-s-60sec",
    "qz-s-audio",
    "qz-s-write",
    "qz-r-week",
    "qz-r-month",
    "qz-r-hard",
    "conv-r-review",
  ],
  reviewQueue: [],
  audioSettings: { playbackRate: 1, repeatCount: 1, autoPlayNext: false },
  unlockedRelics: ["relic-1", "relic-2"],
  dailyQuizCount: 0,
});
