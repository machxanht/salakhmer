/**
 * firebase-auth.ts
 * Firebase Authentication service — all auth operations in one place.
 * Supports: Email/Password, Google Sign-In.
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "./firebase";
import { createUserProfile, getUserProfile, updateUserProfile } from "./firebase-db";
import type { User } from "./db/schema";
import type { AuthProvider } from "./db/schema";

// ── Providers ─────────────────────────────────────────────────────────────
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");
const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope("email");
const appleProvider = new OAuthProvider("apple.com");
appleProvider.addScope("email");
appleProvider.addScope("name");

// ── Types ─────────────────────────────────────────────────────────────────
export type GuestData = {
  xp: number;
  level: number;
  currentStreak: number;
  categoryProgress: Record<string, number>;
  completedLessons: string[];
};

function requireAuth() {
  if (auth) return auth;
  const error = new Error("Firebase Authentication is unavailable. Check the Firebase Web API key.") as Error & { code?: string };
  error.code = "auth/invalid-api-key";
  throw error;
}

function mergeGuestProgress(existing: User, guestData: GuestData): Partial<User> {
  const completedLessons = Array.from(
    new Set([...existing.completedLessons, ...guestData.completedLessons]),
  );
  const categoryProgress = { ...existing.categoryProgress };

  for (const [categoryId, count] of Object.entries(guestData.categoryProgress)) {
    categoryProgress[categoryId] = Math.max(categoryProgress[categoryId] ?? 0, count);
  }

  const xp = existing.xp + guestData.xp;
  return {
    xp,
    level: Math.max(existing.level, guestData.level, Math.floor(xp / 200) + 1),
    currentStreak: Math.max(existing.currentStreak, guestData.currentStreak),
    categoryProgress,
    completedLessons,
  };
}

// ── Email/Password Auth ───────────────────────────────────────────────────

/** Register a new user with email and password */
export async function registerWithEmail(
  email: string,
  password: string,
  displayName: string,
  guestData?: GuestData,
): Promise<FirebaseUser> {
  const credential = await createUserWithEmailAndPassword(requireAuth(), email, password);
  const fbUser = credential.user;

  // Set display name in Firebase Auth
  await updateProfile(fbUser, { displayName });

  try {
    // Create Firestore profile
    await createUserProfile(fbUser.uid, {
      name: displayName,
      email: fbUser.email ?? email,
      avatarUrl: fbUser.photoURL ?? undefined,
      authProvider: "EMAIL",
      role: "REGISTERED",
      level: guestData?.level ?? 1,
      xp: guestData?.xp ?? 0,
      currentStreak: guestData?.currentStreak ?? 0,
      categoryProgress: guestData?.categoryProgress ?? {},
      completedLessons: guestData?.completedLessons ?? [],
      unlockedRelics: [],
      dailyQuizCount: 0,
    });
  } catch (err) {
    console.error("Failed to create Firestore profile (check Firebase rules):", err);
  }

  return fbUser;
}

/** Sign in an existing user with email and password */
export async function loginWithEmail(
  email: string,
  password: string,
  guestData?: GuestData,
): Promise<FirebaseUser> {
  const credential = await signInWithEmailAndPassword(requireAuth(), email, password);
  const fbUser = credential.user;

  if (guestData && guestData.xp > 0) {
    try {
      const existing = await getUserProfile(fbUser.uid);
      if (existing) {
        await updateUserProfile(fbUser.uid, mergeGuestProgress(existing, guestData));
      }
    } catch (err) {
      console.error("Failed to merge guest profile (check Firebase rules):", err);
    }
  }

  return fbUser;
}

// ── Google Auth ───────────────────────────────────────────────────────────

/**
 * Sign in / register with Google using Popup flow.
 * Much more reliable for local development and SPAs than Redirect.
 */
export async function loginWithGoogle(guestData?: GuestData): Promise<FirebaseUser | null> {
  return loginWithSocialProvider(googleProvider, "GOOGLE", guestData);
}

export async function loginWithFacebook(guestData?: GuestData): Promise<FirebaseUser | null> {
  return loginWithSocialProvider(facebookProvider, "FACEBOOK", guestData);
}

export async function loginWithApple(guestData?: GuestData): Promise<FirebaseUser | null> {
  return loginWithSocialProvider(appleProvider, "APPLE", guestData);
}

async function loginWithSocialProvider(
  provider: GoogleAuthProvider | FacebookAuthProvider | OAuthProvider,
  authProvider: Extract<AuthProvider, "GOOGLE" | "FACEBOOK" | "APPLE">,
  guestData?: GuestData,
): Promise<FirebaseUser | null> {
  try {
    const result = await signInWithPopup(requireAuth(), provider);
    if (!result) return null;

    const fbUser = result.user;

    try {
      // Check if profile already exists
      const existing = await getUserProfile(fbUser.uid);
      if (!existing) {
        await createUserProfile(fbUser.uid, {
          name: fbUser.displayName ?? "Angkor Explorer",
          email: fbUser.email ?? "",
          avatarUrl: fbUser.photoURL ?? undefined,
          authProvider,
          role: "REGISTERED",
          level: guestData?.level ?? 1,
          xp: guestData?.xp ?? 0,
          currentStreak: guestData?.currentStreak ?? 0,
          categoryProgress: guestData?.categoryProgress ?? {},
          completedLessons: guestData?.completedLessons ?? [],
          unlockedRelics: [],
          dailyQuizCount: 0,
        });
      } else if (guestData && guestData.xp > 0) {
        await updateUserProfile(fbUser.uid, mergeGuestProgress(existing, guestData));
      }
    } catch (dbErr) {
      console.error(`Failed to merge ${authProvider} profile (check Firebase rules):`, dbErr);
    }

    return fbUser;
  } catch (err) {
    console.error(`${authProvider} popup error:`, err);
    throw err;
  }
}

/**
 * No longer needed since we use Popup, but kept for compatibility if needed elsewhere
 */
export async function handleGoogleRedirectResult(): Promise<FirebaseUser | null> {
  return null;
}

// ── Sign Out ──────────────────────────────────────────────────────────────

export async function logout(): Promise<void> {
  // A guest can still leave local state even while Firebase is temporarily
  // unavailable; do not turn a harmless logout into an unhandled app error.
  if (!auth) return;
  await signOut(auth);
}

// ── Password Reset ────────────────────────────────────────────────────────

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(requireAuth(), email);
}

// ── Auth State Listener ───────────────────────────────────────────────────

/**
 * Subscribe to Firebase auth state changes.
 * Returns an unsubscribe function.
 */
export function subscribeToAuthState(callback: (fbUser: FirebaseUser | null) => void): () => void {
  if (!auth) {
    callback(null);
    return () => undefined;
  }
  return onAuthStateChanged(auth, callback);
}
