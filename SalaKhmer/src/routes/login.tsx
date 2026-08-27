import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock, User, AlertCircle } from "lucide-react";
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  loginWithFacebook,
  resetPassword,
} from "@/lib/firebase-auth";
import { useAuth } from "@/hooks/useAuth";
import logo1 from "@/assets/logo-1.svg";
import logo from "@/assets/logo.svg";
import { useLocale } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => {
    return typeof search["redirect"] === "string" ? { redirect: search["redirect"] } : {};
  },
  head: () => ({
    meta: [
      { title: "Log in · SalaKhmer" },
      {
        name: "description",
        content: "Log in or create a SalaKhmer account to save your Khmer learning progress.",
      },
    ],
  }),
  component: LoginPage,
});

type Mode = "login" | "register" | "reset";

function LoginPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const { user } = useAuth();
  const { t } = useLocale();
  const [mode, setMode] = useState<Mode>("login");

  useEffect(() => {
    if (user && user.role !== "GUEST") {
      navigate({ to: redirect || "/home", replace: true });
    }
  }, [user, navigate, redirect]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const clearState = () => {
    setError("");
    setSuccessMsg("");
  };

  // ── Friendly error messages ───────────────────────────────────────────
  function friendlyError(code: string): string {
    const map: Record<string, string> = {
      "auth/email-already-in-use": "This email is already registered. Please log in.",
      "auth/invalid-email": "Please enter a valid email.",
      "auth/weak-password": "Password must be at least 6 characters.",
      "auth/user-not-found": "No account was found with this email.",
      "auth/wrong-password": "The password is incorrect.",
      "auth/invalid-credential": "The email or password is incorrect.",
      "auth/too-many-requests": "Too many attempts. Please wait a few minutes.",
      "auth/popup-closed-by-user": "The sign-in window was closed.",
      "auth/unauthorized-domain":
        "This local address is not authorised in Firebase yet. Add 127.0.0.1 or localhost under Firebase Authentication > Settings > Authorised domains.",
      "auth/network-request-failed":
        "The app could not reach Firebase. Check your internet connection and try again.",
      "auth/operation-not-allowed":
        "This sign-in method is disabled in Firebase. Enable Email/Password or Google in Authentication > Sign-in method.",
      "auth/configuration-not-found":
        "Firebase Authentication is not configured for this project yet.",
      "auth/invalid-api-key":
        "Firebase is rejecting this app configuration. Update the Web API key in the local .env file, then restart the app.",
      "auth/account-exists-with-different-credential":
        "This email already uses a different sign-in method. Try the provider you used originally.",
      "auth/credential-already-in-use":
        "This social account is already linked to another SalaKhmer account.",
    };
    return map[code] ?? "Something went wrong. Please try again.";
  }

  // ── Submit handler ─────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearState();
    setLoading(true);

    try {
      const cleanedEmail = email.trim();
      if (mode === "reset") {
        await resetPassword(cleanedEmail);
        setSuccessMsg("📧 Password reset email sent. Check your inbox.");
        setLoading(false);
        return;
      }
      const guestData =
        user.role === "GUEST"
          ? {
              xp: user.xp,
              level: user.level,
              currentStreak: user.currentStreak,
              categoryProgress: user.categoryProgress,
              completedLessons: user.completedLessons,
            }
          : undefined;

      if (mode === "register") {
        await registerWithEmail(cleanedEmail, password, name.trim() || "Learner", guestData);
      } else {
        await loginWithEmail(cleanedEmail, password, guestData);
      }
      navigate({ to: redirect || "/home", replace: true });
    } catch (err: unknown) {
      console.error("🔴 Auth handleSubmit error:", err);
      const code = (err as { code?: string })?.code ?? "";
      setError(friendlyError(code) || String(err));
    } finally {
      setLoading(false);
    }
  }

  // ── Google login ───────────────────────────────────────────────────────
  async function handleSocial(provider: "google" | "facebook" | "apple") {
    clearState();
    setLoading(true);
    try {
      const guestData =
        user.role === "GUEST"
          ? {
              xp: user.xp,
              level: user.level,
              currentStreak: user.currentStreak,
              categoryProgress: user.categoryProgress,
              completedLessons: user.completedLessons,
            }
          : undefined;
      if (provider === "google") await loginWithGoogle(guestData);
      if (provider === "facebook") await loginWithFacebook(guestData);
    } catch (err: unknown) {
      console.error(`🔴 Auth ${provider} error:`, err);
      const code = (err as { code?: string })?.code ?? "";
      setError(friendlyError(code) || String(err));
      setLoading(false);
    }
    setLoading(false);
  }

  // ── Guest continue ─────────────────────────────────────────────────────
  function handleGuest() {
    navigate({ to: redirect || "/home", replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm">
        {/* ── Logo / Brand ─────────────────────────────────────────── */}
        <div className="mb-8 text-center">
          <img
            src={user.role === "GUEST" ? logo1 : logo}
            alt="SalaKhmer Logo"
            loading="lazy"
            className="h-20 w-20 mx-auto rounded-3xl bg-background object-cover border border-border/50 shadow-lg mb-4"
          />
          <h1
            className="text-4xl tracking-tighter mb-2 whitespace-nowrap"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span style={{ color: "#D4AF37", fontStyle: "italic", fontWeight: 600 }}>Sala</span>
            <span className="text-foreground" style={{ fontWeight: 500 }}>
              Khmer
            </span>
          </h1>
        </div>

        {/* ── Mode Tabs ─────────────────────────────────────────────── */}
        {mode !== "reset" && (
          <div className="mb-6 flex rounded-2xl bg-secondary p-1">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  clearState();
                }}
                className={`flex-1 rounded-xl py-2 text-sm font-bold transition-all ${
                  mode === m
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? t("login") : t("register")}
              </button>
            ))}
          </div>
        )}

        {/* ── Google Button ─────────────────────────────────────────── */}
        {mode !== "reset" && (
          <>
            <button
              id="btn-google-login"
              onClick={() => void handleSocial("google")}
              disabled={loading}
              className="card-flat flex w-full items-center justify-center gap-3 py-3 text-sm font-bold transition-opacity hover:opacity-80 active:scale-[0.98] disabled:opacity-50"
            >
              {/* Google SVG logo */}
              <svg className="h-5 w-5" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.1 0 5.8 1.1 8 2.9l6-6C34.3 3 29.4 1 24 1 14.7 1 6.8 6.8 3.5 15l7 5.4C12.2 14 17.6 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7c4.3-4 6.8-9.9 6.8-16.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.5 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.7-4.6L3.2 14C1.2 17.5 0 21.6 0 26c0 4.3 1.1 8.4 3.1 11.9l7.4-5.7-.7-.4z"
                  transform="translate(.5 -2)"
                />
                <path
                  fill="#34A853"
                  d="M24 47c5.4 0 9.9-1.8 13.2-4.8l-7.4-5.7c-1.8 1.2-4 1.9-5.8 1.9-5.4 0-9.9-3.6-11.5-8.5l-7.4 5.7C6.8 41.2 14.7 47 24 47z"
                />
              </svg>
              {mode === "login" ? t("loginGoogle") : t("register") + " with Google"}
            </button>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => void handleSocial("facebook")}
                disabled={loading}
                className="card-flat flex items-center justify-center gap-2 py-3 text-sm font-bold transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#1877F2] text-[15px] font-black leading-none text-white">f</span>
                Facebook
              </button>
              <button
                type="button"
                onClick={() => void handleSocial("apple")}
                disabled={loading}
                className="hidden"
              >
                <span className="text-[20px] leading-none text-black">●</span>
                Apple
              </button>
            </div>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[11px] font-bold text-muted-foreground">{t("or")}</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </>
        )}

        {/* ── Form ──────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {mode === "reset" && (
            <div className="mb-2 text-center">
              <h2 className="text-lg font-extrabold">{t("forgotPassword")}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Enter your email to receive a password reset link.
              </p>
            </div>
          )}

          {mode === "register" && (
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="input-name"
                type="text"
                placeholder={t("name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="card-flat w-full py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary rounded-2xl"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="input-email"
              type="email"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="card-flat w-full py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary rounded-2xl"
            />
          </div>

          {mode !== "reset" && (
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="input-password"
                type={showPass ? "text" : "password"}
                placeholder={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                className="card-flat w-full py-3 pl-10 pr-12 text-sm outline-none focus:ring-2 focus:ring-primary rounded-2xl"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          )}

          {/* Error / Success messages */}
          {error && (
            <div className="flex items-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}
          {successMsg && (
            <div className="rounded-2xl border border-jade/30 bg-jade/10 px-4 py-3 text-sm text-jade">
              {successMsg}
            </div>
          )}

          <button
            id="btn-submit-auth"
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-extrabold text-primary-foreground shadow transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "login" && t("login")}
            {mode === "register" && t("createAccount")}
            {mode === "reset" && t("resetPassword")}
          </button>
        </form>

        {/* ── Footer links ──────────────────────────────────────────── */}
        <div className="mt-5 space-y-3 text-center text-xs text-muted-foreground">
          {mode === "login" && (
            <button
              onClick={() => {
                setMode("reset");
                clearState();
              }}
              className="hover:text-foreground underline underline-offset-2"
            >
              {t("forgotPassword")}
            </button>
          )}
          {mode === "reset" && (
            <button
              onClick={() => {
                setMode("login");
                clearState();
              }}
              className="hover:text-foreground underline underline-offset-2"
            >
              {t("backToLogin")}
            </button>
          )}
          <div>
            <button
              id="btn-continue-guest"
              onClick={handleGuest}
              className="hover:text-foreground underline underline-offset-2"
            >
              {t("continueGuest")} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
