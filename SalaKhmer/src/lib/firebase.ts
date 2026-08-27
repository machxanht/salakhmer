/**
 * firebase.ts
 * Firebase configuration and service initialization.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// ── Firebase Config (values loaded from .env) ─────────────────────────────
const firebaseConfig = {
  // Vite only exposes VITE_* variables to browser code through direct member
  // access. Bracket access leaves the expression unresolved and gave Firebase
  // an empty API key in the browser.
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "",
};

// ── Initialize ────────────────────────────────────────────────────────────
// Use a named app instead of blindly reusing Firebase's default app.
// TanStack SSR and Vite HMR can create a default app before browser env values
// are available. Reusing that instance makes Auth see an empty/stale API key
// even after .env has been corrected.
const FIREBASE_APP_NAME = "salakhmer-client";
const app = getApps().some((existingApp) => existingApp.name === FIREBASE_APP_NAME)
  ? getApp(FIREBASE_APP_NAME)
  : initializeApp(firebaseConfig, FIREBASE_APP_NAME);

// Firebase browser services must never initialise during TanStack SSR. If a
// local Firebase key is revoked/misconfigured, getAuth() otherwise throws at
// module evaluation and turns every route into a server-side HTTP 500.
// All callers use these services only from browser interactions/effects.
const isBrowser = typeof window !== "undefined";
let initializedAuth: Auth | null = null;
let firebaseAuthInitError: unknown = null;

if (isBrowser) {
  try {
    initializedAuth = getAuth(app);
  } catch (error) {
    // Keep learning content available if Firebase's web key is temporarily
    // invalid. Login then shows a useful configuration error instead of
    // crashing every route behind the application error boundary.
    firebaseAuthInitError = error;
    console.error("Firebase Auth is unavailable:", error);
  }
}

export const auth: Auth | null = initializedAuth;
export const firebaseAuthError = firebaseAuthInitError;
export const db: Firestore = isBrowser ? getFirestore(app) : (null as unknown as Firestore);

// Analytics is disabled until key restrictions and the consent flow are ready.
// Auth and Firestore do not require Firebase Installations.

export default app;
