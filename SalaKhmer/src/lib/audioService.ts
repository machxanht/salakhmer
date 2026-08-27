let activeAudio: HTMLAudioElement | null = null;
let settleActiveAudio: ((error?: Error) => void) | null = null;

/** Stop any SalaKhmer audio immediately when a learner leaves the current context. */
export function stopKhmerAudio() {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    settleActiveAudio?.(new Error("Audio stopped"));
    activeAudio = null;
    settleActiveAudio = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function playAudioUrl(url: string, playbackRate: number): Promise<void> {
  return new Promise((resolve, reject) => {
    // R2 object keys are already URL-encoded by importedA1DialogueAudioUrl.
    // Running encodeURI again turns "%2F" into "%252F", which makes the
    // Worker reject the request and leaves the speaker button silent.
    stopKhmerAudio();
    const audio = new Audio(url);
    activeAudio = audio;
    audio.playbackRate = playbackRate;
    let settled = false;
    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      audio.onended = null;
      audio.onerror = null;
      if (activeAudio === audio) activeAudio = null;
      if (settleActiveAudio === finish) settleActiveAudio = null;
      if (error) reject(error);
      else resolve();
    };
    audio.onended = () => finish();
    audio.onerror = () => finish(new Error(`Unable to play audio: ${url}`));
    settleActiveAudio = finish;
    audio
      .play()
      .catch((error: unknown) =>
        finish(error instanceof Error ? error : new Error("The browser blocked audio playback")),
      );
  });
}

function speakWithBrowser(text: string, playbackRate: number): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text.trim());
    utterance.lang = "km-KH";
    utterance.rate = playbackRate;
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    utterance.onend = finish;
    utterance.onerror = finish;
    window.setTimeout(finish, 4_000);
    window.speechSynthesis.speak(utterance);
  });
}

export async function generateKhmerAudio(textScript: string, playbackRate = 1): Promise<void> {
  // Temporary development fallback only. Production lesson audio is generated once by Azure.
  await speakWithBrowser(textScript, playbackRate);
}

/**
 * A last-resort direct endpoint. The normal alphabet source is the verified
 * local Google MP3 pack, so this is never used in a healthy app.
 */
function googleKhmerTtsUrl(text: string): string {
  const query = new URLSearchParams({
    ie: "UTF-8",
    tl: "km-KH",
    client: "gtx",
    q: text,
  });
  return `https://translate.googleapis.com/translate_tts?${query.toString()}`;
}

function localGoogleAlphabetAudioUrl(id: string) {
  // Root public/audio is deliberately used here. TanStack's dev server ignores
  // newly-created nested audio directories to avoid watching a large TTS batch.
  // Level 5 was migrated from descriptive IDs (iv-eh) to the reviewed iv-01
  // through iv-15 set. A versioned URL prevents a browser from reusing an old
  // 404/silent response after that migration.
  const version = id.startsWith("iv-") ? "independent-v2" : "module1-v2";
  return `/audio/google-${encodeURIComponent(id)}.mp3?v=${version}`;
}

function isModuleOneTtsId(id: string) {
  return /^(?:c-|sub-|v-|iv-|num-)/.test(id);
}

function importedA1DialogueAudioUrl(id: string): string | null {
  if (/^a1-b001-d\d{3}-t\d{2}$/.test(id)) return `/audio/a1-batch-001/${id}.mp3`;
  if (/^a1-master-d\d{4}-t\d{2}$/.test(id)) {
    const apiBase = (import.meta.env.VITE_CMS_API_URL ?? "").replace(/\/$/, "");
    if (!apiBase) return null;
    const objectKey = `audio/a1-master-5000/${id}.mp3`;
    return `${apiBase}/assets/${encodeURIComponent(objectKey)}`;
  }
  return null;
}

function readSpellAudioUrl(id: string): string | null {
  if (!/^rs-[a-z0-9-]+-\d{3}$/.test(id)) return null;
  // The batch is generated locally before it is promoted to R2. Let the owner
  // hear the actual Azure MP3s immediately in Vite, while production remains
  // R2-only and never bundles these files into the deployed app build.
  if (import.meta.env.DEV) return `/audio/read-spell-v1/${id}.mp3`;
  const apiBase = (import.meta.env.VITE_CMS_API_URL ?? "").replace(/\/$/, "");
  if (!apiBase) return null;
  const objectKey = `audio/read-spell-v1/${id}.mp3`;
  return `${apiBase}/assets/${encodeURIComponent(objectKey)}`;
}

const readSpellExpansionSlugs = new Set([
  "directions",
  "health",
  "feelings",
  "routine",
  "cooking",
  "travel",
  "technology",
  "personal-care",
  "safety",
  "services",
]);

/**
 * The 150 expanded Read & Spell clips use deterministic Azure pipeline IDs,
 * not their learner-facing rs-<topic>-<number> IDs. Rebuild the same hash the
 * generator used so the browser reaches the already-uploaded R2 object.
 */
async function readSpellExpansionAudioUrl(id: string, text: string): Promise<string | null> {
  const match = /^rs-([a-z-]+)-\d{3}$/.exec(id);
  if (!match || !readSpellExpansionSlugs.has(match[1])) return null;
  if (typeof crypto === "undefined" || !crypto.subtle) return null;

  const normalized = text.normalize("NFC").replace(/\s+/gu, " ").trim();
  const bytes = new TextEncoder().encode(`src/lib/read-spell-expansion.ts\n${normalized}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 16);
  const filename = `module-2-expansion-v1-${hash}.mp3`;
  const outputKey = `audio/module-expansion-v1/module_2/${filename}`;

  const apiBase = (import.meta.env.VITE_CMS_API_URL ?? "").replace(/\/$/, "");
  return apiBase ? `${apiBase}/assets/${encodeURIComponent(outputKey)}` : null;
}

/** Resolves Azure MP3s created for the later Listen & Speak expansion lessons. */
async function listenSpeakExpansionAudioUrl(id: string, text: string): Promise<string | null> {
  if (!/^a1-expansion-d\d{2}-t\d{2}$/.test(id)) return null;
  const normalized = text.normalize("NFC").replace(/\s+/gu, " ").trim();
  const apiBase = (import.meta.env.VITE_CMS_API_URL ?? "").replace(/\/$/, "");
  if (!apiBase || !normalized) return null;

  // A LAN development URL (for example http://192.168.x.x) is not a secure
  // browser context, so `crypto.subtle` is unavailable there. Resolve the
  // deterministic R2 key inside the Worker instead. This is also the stable
  // path for the Android/iOS webview builds.
  const query = new URLSearchParams({ text: normalized });
  return `${apiBase}/api/lesson-audio/module-3?${query.toString()}`;
}

export async function playKhmerAudio(
  id: string,
  fallbackText: string,
  playbackRate = 1,
): Promise<void> {
  // The caller must supply Khmer script, never a learner-facing romanization.
  // Normalising here protects every module and every fallback path.
  const khmerText = fallbackText.trim();
  if (!khmerText) throw new Error("Khmer text is required for TTS.");

  if (isModuleOneTtsId(id)) {
    try {
      // Owner selected Google TTS for the temporary alphabet pack. Do not
      // probe the native R2 endpoint first: a missing native file creates a
      // false console error and can cancel this requested fallback.
      await playAudioUrl(localGoogleAlphabetAudioUrl(id), playbackRate);
      return;
    } catch (localReason) {
      if (localReason instanceof Error && localReason.message === "Audio stopped") return;
      console.warn("Local Google Khmer TTS is unavailable; trying direct Google TTS.", localReason);
      try {
        await playAudioUrl(googleKhmerTtsUrl(khmerText), playbackRate);
        return;
      } catch (directReason) {
        if (directReason instanceof Error && directReason.message === "Audio stopped") return;
        await generateKhmerAudio(khmerText, playbackRate);
        return;
      }
    }
  }

  const importedAudioUrl = importedA1DialogueAudioUrl(id);
  if (importedAudioUrl) {
    try {
      await playAudioUrl(importedAudioUrl, playbackRate);
      return;
    } catch (reason) {
      console.error("Imported Azure dialogue audio is unavailable:", reason);
      throw new Error("This dialogue audio is still being prepared.");
    }
  }

  const expansionDialogueUrl = await listenSpeakExpansionAudioUrl(id, khmerText);
  if (expansionDialogueUrl) {
    try {
      await playAudioUrl(expansionDialogueUrl, playbackRate);
      return;
    } catch (reason) {
      console.error("Expanded Listen & Speak Azure audio is unavailable:", reason);
    }
  }

  const expansionReadSpellUrl = await readSpellExpansionAudioUrl(id, khmerText);
  if (expansionReadSpellUrl) {
    try {
      await playAudioUrl(expansionReadSpellUrl, playbackRate);
      return;
    } catch (reason) {
      console.error("Expanded Read & Spell Azure audio is unavailable:", reason);
    }
  }

  const readSpellUrl = readSpellAudioUrl(id);
  if (readSpellUrl) {
    try {
      await playAudioUrl(readSpellUrl, playbackRate);
      return;
    } catch (reason) {
      console.error("Read & Spell Azure audio is unavailable:", reason);
      // During the first upload pass, retain the Khmer browser fallback instead of making
      // every word card look broken. The MP3 takes priority automatically once in R2.
    }
  }

  await generateKhmerAudio(khmerText, playbackRate);
}
