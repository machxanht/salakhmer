import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  CheckCircle2,
  FileText,
  Image,
  LibraryBig,
  Lock,
  Plus,
  Sparkles,
  Users,
  Volume2,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { isConfiguredAdmin } from "@/lib/admin-access";
import { LEVEL_1_CONSONANTS_A, LEVEL_2_CONSONANTS_O } from "@/lib/khmerAlphabetData";
import { LOVABLE_MODULES } from "@/components/LovableAppShell";
import { MOCK_LESSONS } from "@/lib/mock-lessons";
import { ProductionCmsPanel } from "@/components/admin/ProductionCmsPanel";

export const Route = createFileRoute("/admin")({ component: AdminPage });

type CmsContent = {
  id: string;
  type: "lesson" | "article";
  module_id?: string | null;
  title: string;
  slug: string;
  summary?: string | null;
  status: "draft" | "scheduled" | "published" | "archived";
  publish_at?: string | null;
};

type CmsMedia = { id: string; media_type: string; filename: string; url: string };

type CmsTranslation = {
  content_id: string;
  locale: "en" | "vi" | "zh" | "fr";
  title: string;
  summary?: string | null;
  body_json?: string | null;
  updated_at?: string | null;
};

const CMS_LOCALES = [
  { id: "en", label: "English", note: "Main/source language" },
  { id: "vi", label: "Vietnamese", note: "Supplementary" },
  { id: "zh", label: "Chinese", note: "Supplementary" },
  { id: "fr", label: "French", note: "Supplementary" },
] as const;

type AlphabetAudioItem = {
  id: string;
  reviewStatus: "reviewed" | "missing";
  url: string | null;
  contentType: string | null;
  sizeBytes: number | null;
  originalFilename: string | null;
  reviewedAt: string | null;
};

const apiBase = (import.meta.env.VITE_CMS_API_URL ?? "").replace(/\/$/, "");
const alphabetCharacters = [...LEVEL_1_CONSONANTS_A, ...LEVEL_2_CONSONANTS_O];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function AdminPage() {
  const { firebaseUser, isLoading } = useAuth();
  const hasAccess = isConfiguredAdmin(firebaseUser?.email);
  const [items, setItems] = useState<CmsContent[]>([]);
  const [translations, setTranslations] = useState<CmsTranslation[]>([]);
  const [media, setMedia] = useState<CmsMedia[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"lesson" | "article">("lesson");
  const [moduleId, setModuleId] = useState("");
  const [summary, setSummary] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [alphabetAudio, setAlphabetAudio] = useState<AlphabetAudioItem[]>([]);
  const [selectedAlphabetId, setSelectedAlphabetId] = useState(alphabetCharacters[0]?.id ?? "c-ka");
  const [isAlphabetApproved, setIsAlphabetApproved] = useState(false);
  const [isUploadingAlphabet, setIsUploadingAlphabet] = useState(false);
  const [translationContentId, setTranslationContentId] = useState("");
  const [translationLocale, setTranslationLocale] = useState<CmsTranslation["locale"]>("vi");
  const [translationTitle, setTranslationTitle] = useState("");
  const [translationSummary, setTranslationSummary] = useState("");
  const [isSavingTranslation, setIsSavingTranslation] = useState(false);

  const loadContent = useCallback(async () => {
    if (!firebaseUser || !apiBase) return;
    setIsFetching(true);
    setError("");
    try {
      const token = await firebaseUser.getIdToken();
      const [contentResponse, mediaResponse, alphabetAudioResponse] = await Promise.all([
        fetch(`${apiBase}/api/admin/content`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${apiBase}/api/admin/media`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${apiBase}/api/admin/alphabet-audio`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      const contentData = (await contentResponse.json()) as {
        items?: CmsContent[];
        translations?: CmsTranslation[];
        error?: string;
      };
      const mediaData = (await mediaResponse.json()) as { items?: CmsMedia[]; error?: string };
      const alphabetAudioData = (await alphabetAudioResponse.json()) as {
        items?: AlphabetAudioItem[];
        error?: string;
      };
      if (!contentResponse.ok) throw new Error(contentData.error ?? "Could not load CMS content.");
      if (!mediaResponse.ok) throw new Error(mediaData.error ?? "Could not load CMS media.");
      setItems(contentData.items ?? []);
      setTranslations(contentData.translations ?? []);
      setMedia(mediaData.items ?? []);
      if (!alphabetAudioResponse.ok)
        throw new Error(alphabetAudioData.error ?? "Could not load reviewed alphabet recordings.");
      setAlphabetAudio(alphabetAudioData.items ?? []);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not connect to the CMS.");
    } finally {
      setIsFetching(false);
    }
  }, [firebaseUser]);

  useEffect(() => {
    if (hasAccess) void loadContent();
  }, [hasAccess, loadContent]);

  const selectedTranslationContent = items.find((item) => item.id === translationContentId);
  const selectedTranslation = translations.find(
    (translation) =>
      translation.content_id === translationContentId && translation.locale === translationLocale,
  );

  useEffect(() => {
    setTranslationTitle(selectedTranslation?.title ?? selectedTranslationContent?.title ?? "");
    setTranslationSummary(selectedTranslation?.summary ?? selectedTranslationContent?.summary ?? "");
  }, [selectedTranslation, selectedTranslationContent]);

  const metrics = useMemo(
    () => ({
      drafts: items.filter((item) => item.status === "draft").length,
      scheduled: items.filter((item) => item.status === "scheduled").length,
      published: items.filter((item) => item.status === "published").length,
    }),
    [items],
  );
  const reviewedAlphabetCount = alphabetAudio.filter(
    (item) => item.reviewStatus === "reviewed",
  ).length;
  const selectedAlphabetCharacter = alphabetCharacters.find(
    (character) => character.id === selectedAlphabetId,
  );
  const selectedAlphabetAudio = alphabetAudio.find((item) => item.id === selectedAlphabetId);

  async function createContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!firebaseUser || !title.trim()) return;
    setIsCreating(true);
    setError("");
    try {
      const token = await firebaseUser.getIdToken();
      const response = await fetch(`${apiBase}/api/admin/content`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          moduleId: moduleId || undefined,
          title: title.trim(),
          slug: slugify(title),
          summary: summary.trim(),
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Could not create draft.");
      setTitle("");
      setSummary("");
      setModuleId("");
      setShowForm(false);
      await loadContent();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not create draft.");
    } finally {
      setIsCreating(false);
    }
  }

  async function publishContent(id: string) {
    if (!firebaseUser) return;
    setError("");
    try {
      const token = await firebaseUser.getIdToken();
      const response = await fetch(`${apiBase}/api/admin/content/${id}/publish`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Could not publish content.");
      await loadContent();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not publish content.");
    }
  }

  async function saveTranslation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!firebaseUser || !translationContentId || !translationTitle.trim()) return;
    setIsSavingTranslation(true);
    setError("");
    try {
      const token = await firebaseUser.getIdToken();
      const response = await fetch(
        `${apiBase}/api/admin/content/${encodeURIComponent(translationContentId)}/translations`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            locale: translationLocale,
            title: translationTitle.trim(),
            summary: translationSummary.trim(),
          }),
        },
      );
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Could not save translation.");
      await loadContent();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not save translation.");
    } finally {
      setIsSavingTranslation(false);
    }
  }

  async function uploadMedia(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem("media-file") as HTMLInputElement;
    const file = input.files?.[0];
    if (!firebaseUser || !file) return;
    if (file.size > 25 * 1024 * 1024) {
      setError(
        "For now, upload files up to 25 MB here. Large video will use a dedicated upload flow.",
      );
      return;
    }
    const mediaType = file.type.startsWith("audio/")
      ? "audio"
      : file.type.startsWith("image/")
        ? "image"
        : file.type.startsWith("video/")
          ? "video"
          : "document";
    setIsUploading(true);
    setError("");
    try {
      const token = await firebaseUser.getIdToken();
      const response = await fetch(`${apiBase}/api/admin/media`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": file.type || "application/octet-stream",
          "X-Filename": file.name,
          "X-Media-Type": mediaType,
        },
        body: file,
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Could not upload media.");
      input.value = "";
      await loadContent();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not upload media.");
    } finally {
      setIsUploading(false);
    }
  }

  async function uploadAlphabetAudio(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem("alphabet-audio-file") as HTMLInputElement;
    const file = input.files?.[0];
    if (!firebaseUser || !file || !selectedAlphabetId) return;
    if (!isAlphabetApproved) {
      setError("Listen to the recording and confirm that it is approved before uploading.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Alphabet recordings must be 5 MB or smaller.");
      return;
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    const contentType =
      extension === "mp3"
        ? "audio/mpeg"
        : extension === "wav"
          ? "audio/wav"
          : file.type === "audio/mpeg" || file.type === "audio/wav"
            ? file.type
            : "";
    if (!contentType) {
      setError("Choose an MP3 or WAV recording.");
      return;
    }

    setIsUploadingAlphabet(true);
    setError("");
    try {
      const token = await firebaseUser.getIdToken();
      const response = await fetch(
        `${apiBase}/api/admin/alphabet-audio/${encodeURIComponent(selectedAlphabetId)}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": contentType,
            "X-Filename": file.name,
            "X-Review-Status": "reviewed",
          },
          body: file,
        },
      );
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Could not upload alphabet audio.");
      input.value = "";
      setIsAlphabetApproved(false);
      await loadContent();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not upload alphabet audio.");
    } finally {
      setIsUploadingAlphabet(false);
    }
  }

  if (isLoading) return <div className="min-h-screen bg-background" />;

  if (!hasAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-6 text-center">
        <div className="max-w-md rounded-3xl border border-border bg-card p-7 shadow-sm">
          <Lock className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 text-2xl font-extrabold">Admin access only</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with the owner account configured as a SalaKhmer administrator.
          </p>
          <p className="mt-4 rounded-xl bg-secondary px-3 py-2 text-xs text-muted-foreground">
            Signed in as:{" "}
            <span className="font-bold text-foreground">{firebaseUser?.email ?? "no account"}</span>
          </p>
          <Link
            to="/home"
            className="mt-6 inline-block rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground"
          >
            Back to app
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
              SalaKhmer CMS
            </p>
            <h1 className="mt-1 text-3xl font-extrabold">Content control room</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Cloudflare D1 stores content. R2 stores media. The mobile app reads published content
              only.
            </p>
          </div>
          <Link
            to="/home"
            className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-bold hover:bg-secondary"
          >
            Open learner app
          </Link>
        </header>

        {!apiBase && (
          <p className="mt-5 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            CMS URL is missing. Restart the dev server after adding VITE_CMS_API_URL to .env.
          </p>
        )}
        {error && (
          <p className="mt-5 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AdminMetric
            icon={FileText}
            label="Content drafts"
            value={String(metrics.drafts)}
            detail="Ready for your review"
          />
          <AdminMetric
            icon={CalendarDays}
            label="Scheduled"
            value={String(metrics.scheduled)}
            detail="Published by Worker cron"
          />
          <AdminMetric
            icon={Image}
            label="Media library"
            value={String(media.length)}
            detail="Stored in protected R2"
          />
          <AdminMetric
            icon={Users}
            label="Learners"
            value="—"
            detail="Firebase reporting is next"
          />
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-extrabold">Module control centre</h2>
              <p className="mt-1 text-sm text-muted-foreground">Open a module to test its learner flow, then create matching CMS content below.</p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">6 modules</span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {LOVABLE_MODULES.map((module) => {
              const count = module.id === "module_1" ? 6 : (MOCK_LESSONS[module.id]?.length ?? 0);
              const Icon = module.icon;
              return (
                <Link key={module.id} to="/category/$categoryId" params={{ categoryId: module.id }} className="group rounded-2xl border border-border bg-background p-4 transition hover:border-primary/40 hover:shadow-sm">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
                  <p className="mt-3 font-bold">{module.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{count} learner lessons · {module.subtitle}</p>
                  <p className="mt-3 text-xs font-bold text-primary">Open & test →</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-extrabold">Content queue</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Create a draft, review it, then publish.
                </p>
              </div>
              <button
                onClick={() => setShowForm((value) => !value)}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
              >
                <Plus className="h-4 w-4" />
                New content
              </button>
            </div>
            {showForm && (
              <form
                onSubmit={createContent}
                className="mt-5 grid gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4"
              >
                <input
                  required
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Title, for example: First Khmer greetings"
                  className="rounded-xl border border-border bg-card px-3 py-2 text-sm"
                />
                <select
                  value={type}
                  onChange={(event) => setType(event.target.value as "lesson" | "article")}
                  className="rounded-xl border border-border bg-card px-3 py-2 text-sm"
                >
                  <option value="lesson">Lesson</option>
                  <option value="article">Article</option>
                </select>
                <select
                  value={moduleId}
                  onChange={(event) => setModuleId(event.target.value)}
                  className="rounded-xl border border-border bg-card px-3 py-2 text-sm"
                >
                  <option value="">General content (not attached to a module)</option>
                  {LOVABLE_MODULES.map((module) => (
                    <option key={module.id} value={module.id}>{module.title}</option>
                  ))}
                </select>
                <textarea
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                  placeholder="Short English summary (optional)"
                  className="min-h-20 rounded-xl border border-border bg-card px-3 py-2 text-sm"
                />
                <div className="flex gap-2">
                  <button
                    disabled={isCreating}
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-50"
                  >
                    {isCreating ? "Creating…" : "Save draft"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-xl border border-border px-4 py-2 text-sm font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            <div className="mt-5 divide-y divide-border">
              {isFetching ? (
                <p className="py-6 text-sm text-muted-foreground">Loading real CMS content…</p>
              ) : items.length === 0 ? (
                <p className="py-6 text-sm text-muted-foreground">
                  No content yet. Create the first draft above.
                </p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 py-4">
                    <div>
                      <p className="font-bold">{item.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.type} · /{item.slug}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-700">
                        {item.status}
                      </span>
                      {item.status !== "published" && (
                        <button
                          onClick={() => void publishContent(item.id)}
                          className="rounded-lg border border-primary/30 px-2.5 py-1 text-xs font-bold text-primary"
                        >
                          Publish
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-5">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="mt-3 font-extrabold">Safe AI workflow</h2>
            <ol className="mt-3 space-y-3 text-sm text-muted-foreground">
              <li>1. You choose topic, level, and vocabulary.</li>
              <li>2. AI creates a draft for your review.</li>
              <li>3. You approve, schedule, or publish it.</li>
              <li>4. The Worker releases only approved content.</li>
            </ol>
            <p className="mt-5 rounded-xl border border-primary/20 bg-card p-3 text-xs text-muted-foreground">
              The CMS backend is live. AI drafting and large-video upload will be added after the
              core content and reviewed native-audio pipeline are ready.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-extrabold">Language content manager</h2>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Keep English as the source, then save Vietnamese, Chinese, and French versions for
                each CMS lesson or article. The mobile app can request the published version using
                the same API.
              </p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              EN · VI · 中文 · FR
            </span>
          </div>

          {items.length === 0 ? (
            <p className="mt-5 rounded-2xl bg-secondary/60 p-4 text-sm text-muted-foreground">
              Create CMS content above first. Its translations can then be managed here.
            </p>
          ) : (
            <form onSubmit={saveTranslation} className="mt-5 grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
              <div className="rounded-2xl border border-border bg-background p-4">
                <label className="block text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                  Content item
                </label>
                <select
                  value={translationContentId}
                  onChange={(event) => setTranslationContentId(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm"
                >
                  <option value="">Choose content</option>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.type}: {item.title}
                    </option>
                  ))}
                </select>

                <label className="mt-4 block text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                  Editing language
                </label>
                <select
                  value={translationLocale}
                  onChange={(event) =>
                    setTranslationLocale(event.target.value as CmsTranslation["locale"])
                  }
                  className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm"
                >
                  {CMS_LOCALES.map((locale) => (
                    <option key={locale.id} value={locale.id}>
                      {locale.label} — {locale.note}
                    </option>
                  ))}
                </select>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  {CMS_LOCALES.map((locale) => {
                    const available =
                      locale.id === "en"
                        ? Boolean(selectedTranslationContent)
                        : translations.some(
                            (translation) =>
                              translation.content_id === translationContentId &&
                              translation.locale === locale.id,
                          );
                    return (
                      <span
                        key={locale.id}
                        className={`rounded-lg px-2 py-2 text-center text-[11px] font-bold ${
                          available
                            ? "bg-emerald-500/10 text-emerald-700"
                            : "bg-amber-500/10 text-amber-700"
                        }`}
                      >
                        {locale.id.toUpperCase()} {available ? "ready" : "missing"}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm font-bold">
                  {selectedTranslationContent
                    ? `${translationLocale.toUpperCase()} version for “${selectedTranslationContent.title}”`
                    : "Choose a content item to start"}
                </p>
                <label className="mt-4 block text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                  Localized title
                </label>
                <input
                  required
                  disabled={!translationContentId}
                  value={translationTitle}
                  onChange={(event) => setTranslationTitle(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm disabled:opacity-50"
                  placeholder="Title in the selected language"
                />
                <label className="mt-4 block text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                  Localized summary
                </label>
                <textarea
                  disabled={!translationContentId}
                  value={translationSummary}
                  onChange={(event) => setTranslationSummary(event.target.value)}
                  className="mt-2 min-h-24 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm disabled:opacity-50"
                  placeholder="Short summary in the selected language"
                />
                <button
                  disabled={!translationContentId || !translationTitle.trim() || isSavingTranslation}
                  className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSavingTranslation ? "Saving…" : `Save ${translationLocale.toUpperCase()} version`}
                </button>
              </div>
            </form>
          )}
        </section>

        <ProductionCmsPanel
          apiBase={apiBase}
          getToken={async () => {
            if (!firebaseUser) throw new Error("Sign in as an administrator first.");
            return firebaseUser.getIdToken();
          }}
        />

        <section className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-primary" />
                <h2 className="font-extrabold">Native alphabet recordings</h2>
              </div>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Upload a native speaker's reviewed MP3 or WAV for each stable letter ID. Uploading
                the same ID replaces its previous recording.
              </p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-extrabold text-primary">
              {reviewedAlphabetCount}/{alphabetCharacters.length} reviewed
            </span>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <form
              onSubmit={uploadAlphabetAudio}
              className="rounded-2xl border border-border bg-background p-4"
            >
              <label
                htmlFor="alphabet-audio-id"
                className="block text-xs font-extrabold uppercase tracking-wide text-muted-foreground"
              >
                Letter
              </label>
              <select
                id="alphabet-audio-id"
                value={selectedAlphabetId}
                onChange={(event) => {
                  setSelectedAlphabetId(event.target.value);
                  setIsAlphabetApproved(false);
                }}
                className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm"
              >
                {alphabetCharacters.map((character) => (
                  <option key={character.id} value={character.id}>
                    {character.khmer} — {character.id}
                  </option>
                ))}
              </select>

              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-secondary/60 px-3 py-2">
                <div>
                  <p className="khmer text-3xl font-bold">{selectedAlphabetCharacter?.khmer}</p>
                  <p className="text-xs text-muted-foreground">Stable ID: {selectedAlphabetId}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${
                    selectedAlphabetAudio?.reviewStatus === "reviewed"
                      ? "bg-emerald-500/10 text-emerald-700"
                      : "bg-amber-500/10 text-amber-700"
                  }`}
                >
                  {selectedAlphabetAudio?.reviewStatus === "reviewed" ? "Reviewed" : "Missing"}
                </span>
              </div>

              {selectedAlphabetAudio?.url && (
                <div className="mt-3">
                  <p className="mb-1 text-xs font-bold text-muted-foreground">
                    Current reviewed recording
                  </p>
                  <audio
                    key={selectedAlphabetAudio.url}
                    controls
                    preload="none"
                    src={selectedAlphabetAudio.url}
                    className="h-10 w-full"
                  />
                  {selectedAlphabetAudio.reviewedAt && (
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Reviewed {new Date(selectedAlphabetAudio.reviewedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              )}

              <label className="mt-4 block text-xs font-bold" htmlFor="alphabet-audio-file">
                New recording (MP3 or WAV, up to 5 MB)
              </label>
              <input
                id="alphabet-audio-file"
                name="alphabet-audio-file"
                type="file"
                accept="audio/mpeg,audio/wav,.mp3,.wav"
                required
                className="mt-2 max-w-full text-sm"
              />

              <label className="mt-4 flex cursor-pointer items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm">
                <input
                  type="checkbox"
                  checked={isAlphabetApproved}
                  onChange={(event) => setIsAlphabetApproved(event.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
                />
                <span>
                  I listened to this file and approve it as the native pronunciation for
                  <strong className="ml-1">{selectedAlphabetCharacter?.khmer}</strong>.
                </span>
              </label>

              <button
                disabled={isUploadingAlphabet || !isAlphabetApproved}
                className="mt-4 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUploadingAlphabet
                  ? "Uploading…"
                  : selectedAlphabetAudio?.reviewStatus === "reviewed"
                    ? "Replace reviewed recording"
                    : "Upload reviewed recording"}
              </button>
            </form>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                Review status
              </p>
              <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-7">
                {alphabetCharacters.map((character) => {
                  const audio = alphabetAudio.find((item) => item.id === character.id);
                  const isReviewed = audio?.reviewStatus === "reviewed";
                  return (
                    <button
                      key={character.id}
                      type="button"
                      onClick={() => {
                        setSelectedAlphabetId(character.id);
                        setIsAlphabetApproved(false);
                      }}
                      aria-label={`${character.id}: ${isReviewed ? "reviewed" : "missing"}`}
                      className={`relative rounded-xl border p-2 text-center transition-colors ${
                        selectedAlphabetId === character.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:bg-secondary"
                      }`}
                    >
                      <span className="khmer block text-2xl font-bold">{character.khmer}</span>
                      <span className="mt-0.5 block truncate text-[9px] text-muted-foreground">
                        {character.id}
                      </span>
                      {isReviewed && (
                        <CheckCircle2 className="absolute right-1 top-1 h-3.5 w-3.5 text-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Green check = reviewed native file in R2. No check = the learner app stays silent
                for that letter instead of using an unapproved synthetic voice.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-extrabold">Media library</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload learning MP3, images, and small documents to R2. Assets are delivered through the
            Worker; direct upload limit: 25 MB.
          </p>
          <form onSubmit={uploadMedia} className="mt-4 flex flex-wrap items-center gap-3">
            <input name="media-file" type="file" required className="max-w-full text-sm" />
            <button
              disabled={isUploading}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-50"
            >
              {isUploading ? "Uploading…" : "Upload to R2"}
            </button>
          </form>
          {media.length > 0 && (
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {media.slice(0, 6).map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border px-3 py-2 text-sm hover:bg-secondary"
                >
                  <span className="font-bold">{item.filename}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{item.media_type}</span>
                </a>
              ))}
            </div>
          )}
        </section>

        <section className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <LibraryBig className="h-5 w-5 text-primary" />
            <h2 className="font-extrabold">Mobile-ready architecture</h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            This is a normal HTTPS API, not a browser-only trick: the Android and future iOS apps
            can use the same published-content endpoint. Media stays private in R2 and is served
            through the Worker when needed.
          </p>
        </section>
      </div>
    </main>
  );
}

function AdminMetric({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof FileText;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <Icon className="h-5 w-5 text-primary" />
      <p className="mt-4 text-2xl font-extrabold">{value}</p>
      <p className="text-sm font-bold">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}
