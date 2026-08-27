import type { Locale } from "@/lib/i18n";

const apiBase = (import.meta.env.VITE_CMS_API_URL ?? "").replace(/\/$/, "");

export type DictionaryLookup = {
  text: string;
  translations: Record<Locale, string>;
  status: "machine_draft" | "reviewed" | "blocked";
  cached: boolean;
  /** Hand-reviewed SalaKhmer grammar term, never machine-translated. */
  glossary?: boolean;
  explanation?: Partial<Record<Locale, string>>;
  relatedLevel?: string;
};

async function callDictionary<T>(path: string, token: string, body: unknown): Promise<T> {
  if (!apiBase) throw new Error("Dictionary service has not been configured.");
  const response = await fetch(`${apiBase}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const payload = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new Error(payload.error ?? "Dictionary service is unavailable.");
  return payload;
}

export function lookupKhmerDictionary(token: string, text: string) {
  return callDictionary<DictionaryLookup>("/api/dictionary/lookup", token, { text });
}

export type DictionaryAudio = { status: "ready" | "generating"; url?: string; cached?: boolean };

export function createDictionaryAudio(token: string, text: string) {
  return callDictionary<DictionaryAudio>("/api/dictionary/audio", token, { text });
}
