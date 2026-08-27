import type { Locale } from "@/lib/i18n";

export type PublishedCmsContent = {
  id: string;
  type: "lesson" | "article";
  module_id: string | null;
  title: string;
  slug: string;
  summary: string | null;
  body_json: string;
  published_at: string | null;
  cover_media_key: string | null;
  locale: Locale;
};

const apiBase = (import.meta.env.VITE_CMS_API_URL ?? "").replace(/\/$/, "");

/**
 * The learner app always asks the Worker for the active locale. The Worker
 * resolves a saved translation and falls back to canonical English, so a
 * missing translation never creates a blank lesson card.
 */
export async function getPublishedModuleContent(moduleId: string, locale: Locale) {
  if (!apiBase) return [] as PublishedCmsContent[];
  const params = new URLSearchParams({ moduleId, locale });
  const response = await fetch(`${apiBase}/api/content?${params.toString()}`);
  if (!response.ok) throw new Error("Published content could not be loaded.");
  const payload = (await response.json()) as { items?: PublishedCmsContent[] };
  return payload.items ?? [];
}
