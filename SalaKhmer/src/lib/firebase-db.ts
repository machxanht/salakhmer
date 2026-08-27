/**
 * firebase-db.ts
 * Firestore database operations — all reads/writes for user data.
 *
 * Firestore Collections:
 * ├── users/{userId}           → User profile + settings
 * └── users/{userId}/progress  → Learning progress per lesson
 *
 * Security Rules (paste into Firebase Console → Firestore → Rules):
 * ─────────────────────────────────────────────────────────────────
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /users/{userId} {
 *       allow read, write: if request.auth != null && request.auth.uid == userId;
 *       match /progress/{lessonId} {
 *         allow read, write: if request.auth != null && request.auth.uid == userId;
 *       }
 *     }
 *   }
 * }
 */

import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { User } from "./db/schema";

// ── Types ──────────────────────────────────────────────────────────────────

export interface LessonProgress {
  lessonId: string;
  categoryId: string;
  lessonTitle: string;
  score: number; // 0–100
  xpEarned: number;
  durationSeconds: number;
  completedAt: Timestamp | null;
}

// ── User Profile ──────────────────────────────────────────────────────────

/** Fetch a user's profile document from Firestore */
export async function getUserProfile(uid: string): Promise<User | null> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as User;
}

/** Create a new user profile document in Firestore (on first sign-up) */
export async function createUserProfile(
  uid: string,
  data: Omit<User, "userId" | "dailyQuizResetDate" | "lastActiveDate">,
): Promise<void> {
  const ref = doc(db, "users", uid);
  await setDoc(ref, {
    ...data,
    userId: uid,
    lastActiveDate: new Date().toISOString(),
    dailyQuizResetDate: new Date().toISOString().split("T")[0],
    createdAt: serverTimestamp(),
  });
}

/** Update specific fields of a user profile */
export async function updateUserProfile(uid: string, updates: Partial<User>): Promise<void> {
  const ref = doc(db, "users", uid);
  await setDoc(
    ref,
    {
      ...updates,
      lastActiveDate: new Date().toISOString(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

// ── Daily Streak Logic ──────────────────────────────────────────────────────

/** Calculate the new streak given a user's lastActiveDate and currentStreak */
export function calculateDailyStreak(
  lastActiveStr: string | undefined,
  currentStreak: number,
): { newStreak: number; updated: boolean } {
  if (!lastActiveStr) return { newStreak: 1, updated: true };

  const today = new Date();
  const lastActive = new Date(lastActiveStr);

  // Strip time for accurate day comparison
  today.setHours(0, 0, 0, 0);
  lastActive.setHours(0, 0, 0, 0);

  const diffTime = Math.abs(today.getTime() - lastActive.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Already logged in today
    return { newStreak: currentStreak, updated: false };
  } else if (diffDays === 1) {
    // Logged in yesterday, increment streak
    return { newStreak: currentStreak + 1, updated: true };
  } else {
    // Missed a day, reset streak
    return { newStreak: 1, updated: true };
  }
}

// ── Lesson Progress ───────────────────────────────────────────────────────

/** Save a completed lesson to the user's progress sub-collection */
export async function saveLessonProgress(
  uid: string,
  progress: Omit<LessonProgress, "completedAt">,
): Promise<void> {
  const progressRef = collection(db, "users", uid, "progress");
  await addDoc(progressRef, {
    ...progress,
    completedAt: serverTimestamp(),
  });
}

/** Fetch all progress records for a user (sorted by most recent first) */
export async function getUserProgress(uid: string): Promise<LessonProgress[]> {
  const progressRef = collection(db, "users", uid, "progress");
  const q = query(progressRef, orderBy("completedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as LessonProgress);
}

/** Update categoryProgress map and completedLessons array atomically */
export async function markLessonComplete(
  uid: string,
  lessonId: string,
  categoryId: string,
  lessonTitle: string,
  score: number,
  xpEarned: number,
  durationSeconds: number,
  currentCategoryProgress: Record<string, number>,
  currentCompletedLessons: string[],
  currentXp: number,
  currentLevel: number,
): Promise<{ newXp: number; newLevel: number }> {
  // Don't double count
  if (currentCompletedLessons.includes(lessonId)) {
    return { newXp: currentXp, newLevel: currentLevel };
  }

  const newXp = currentXp + xpEarned;
  const newLevel = Math.max(1, Math.floor(newXp / 200) + 1);
  const newCompletedLessons = [...currentCompletedLessons, lessonId];
  const newCategoryProgress = {
    ...currentCategoryProgress,
    [categoryId]: (currentCategoryProgress[categoryId] ?? 0) + 1,
  };

  // Update user profile
  await updateUserProfile(uid, {
    completedLessons: newCompletedLessons,
    categoryProgress: newCategoryProgress,
    xp: newXp,
    level: newLevel,
  });

  return { newXp, newLevel };
}
