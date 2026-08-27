//#region node_modules/.nitro/vite/services/ssr/assets/audioService-CfsJ3L6R.js
var activeAudio = null;
var settleActiveAudio = null;
/** Stop any SalaKhmer audio immediately when a learner leaves the current context. */
function stopKhmerAudio() {
	if (activeAudio) {
		activeAudio.pause();
		activeAudio.currentTime = 0;
		settleActiveAudio?.(/* @__PURE__ */ new Error("Audio stopped"));
		activeAudio = null;
		settleActiveAudio = null;
	}
	if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}
function playAudioUrl(url, playbackRate) {
	return new Promise((resolve, reject) => {
		stopKhmerAudio();
		const audio = new Audio(url);
		activeAudio = audio;
		audio.playbackRate = playbackRate;
		let settled = false;
		const finish = (error) => {
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
		audio.onerror = () => finish(/* @__PURE__ */ new Error(`Unable to play audio: ${url}`));
		settleActiveAudio = finish;
		audio.play().catch((error) => finish(error instanceof Error ? error : /* @__PURE__ */ new Error("The browser blocked audio playback")));
	});
}
function speakWithBrowser(text, playbackRate) {
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
		window.setTimeout(finish, 4e3);
		window.speechSynthesis.speak(utterance);
	});
}
async function generateKhmerAudio(textScript, playbackRate = 1) {
	await speakWithBrowser(textScript, playbackRate);
}
/**
* A last-resort direct endpoint. The normal alphabet source is the verified
* local Google MP3 pack, so this is never used in a healthy app.
*/
function googleKhmerTtsUrl(text) {
	return `https://translate.googleapis.com/translate_tts?${new URLSearchParams({
		ie: "UTF-8",
		tl: "km-KH",
		client: "gtx",
		q: text
	}).toString()}`;
}
function localGoogleAlphabetAudioUrl(id) {
	const version = id.startsWith("iv-") ? "independent-v2" : "module1-v2";
	return `/audio/google-${encodeURIComponent(id)}.mp3?v=${version}`;
}
function isModuleOneTtsId(id) {
	return /^(?:c-|sub-|v-|iv-|num-)/.test(id);
}
function importedA1DialogueAudioUrl(id) {
	if (/^a1-b001-d\d{3}-t\d{2}$/.test(id)) return `/audio/a1-batch-001/${id}.mp3`;
	if (/^a1-master-d\d{4}-t\d{2}$/.test(id)) {
		const apiBase = "https://salakhmer-cms-api.oliverkhang.workers.dev".replace(/\/$/, "");
		if (!apiBase) return null;
		const objectKey = `audio/a1-master-5000/${id}.mp3`;
		return `${apiBase}/assets/${encodeURIComponent(objectKey)}`;
	}
	return null;
}
function readSpellAudioUrl(id) {
	if (!/^rs-[a-z0-9-]+-\d{3}$/.test(id)) return null;
	const apiBase = "https://salakhmer-cms-api.oliverkhang.workers.dev".replace(/\/$/, "");
	if (!apiBase) return null;
	const objectKey = `audio/read-spell-v1/${id}.mp3`;
	return `${apiBase}/assets/${encodeURIComponent(objectKey)}`;
}
var readSpellExpansionSlugs = /* @__PURE__ */ new Set([
	"directions",
	"health",
	"feelings",
	"routine",
	"cooking",
	"travel",
	"technology",
	"personal-care",
	"safety",
	"services"
]);
/**
* The 150 expanded Read & Spell clips use deterministic Azure pipeline IDs,
* not their learner-facing rs-<topic>-<number> IDs. Rebuild the same hash the
* generator used so the browser reaches the already-uploaded R2 object.
*/
async function readSpellExpansionAudioUrl(id, text) {
	const match = /^rs-([a-z-]+)-\d{3}$/.exec(id);
	if (!match || !readSpellExpansionSlugs.has(match[1])) return null;
	if (typeof crypto === "undefined" || !crypto.subtle) return null;
	const normalized = text.normalize("NFC").replace(/\s+/gu, " ").trim();
	const bytes = new TextEncoder().encode(`src/lib/read-spell-expansion.ts\n${normalized}`);
	const digest = await crypto.subtle.digest("SHA-256", bytes);
	const outputKey = `audio/module-expansion-v1/module_2/${`module-2-expansion-v1-${Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, 16)}.mp3`}`;
	const apiBase = "https://salakhmer-cms-api.oliverkhang.workers.dev".replace(/\/$/, "");
	return apiBase ? `${apiBase}/assets/${encodeURIComponent(outputKey)}` : null;
}
/** Resolves Azure MP3s created for the later Listen & Speak expansion lessons. */
async function listenSpeakExpansionAudioUrl(id, text) {
	if (!/^a1-expansion-d\d{2}-t\d{2}$/.test(id)) return null;
	const normalized = text.normalize("NFC").replace(/\s+/gu, " ").trim();
	const apiBase = "https://salakhmer-cms-api.oliverkhang.workers.dev".replace(/\/$/, "");
	if (!apiBase || !normalized) return null;
	return `${apiBase}/api/lesson-audio/module-3?${new URLSearchParams({ text: normalized }).toString()}`;
}
async function playKhmerAudio(id, fallbackText, playbackRate = 1) {
	const khmerText = fallbackText.trim();
	if (!khmerText) throw new Error("Khmer text is required for TTS.");
	if (isModuleOneTtsId(id)) try {
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
	const importedAudioUrl = importedA1DialogueAudioUrl(id);
	if (importedAudioUrl) try {
		await playAudioUrl(importedAudioUrl, playbackRate);
		return;
	} catch (reason) {
		console.error("Imported Azure dialogue audio is unavailable:", reason);
		throw new Error("This dialogue audio is still being prepared.");
	}
	const expansionDialogueUrl = await listenSpeakExpansionAudioUrl(id, khmerText);
	if (expansionDialogueUrl) try {
		await playAudioUrl(expansionDialogueUrl, playbackRate);
		return;
	} catch (reason) {
		console.error("Expanded Listen & Speak Azure audio is unavailable:", reason);
	}
	const expansionReadSpellUrl = await readSpellExpansionAudioUrl(id, khmerText);
	if (expansionReadSpellUrl) try {
		await playAudioUrl(expansionReadSpellUrl, playbackRate);
		return;
	} catch (reason) {
		console.error("Expanded Read & Spell Azure audio is unavailable:", reason);
	}
	const readSpellUrl = readSpellAudioUrl(id);
	if (readSpellUrl) try {
		await playAudioUrl(readSpellUrl, playbackRate);
		return;
	} catch (reason) {
		console.error("Read & Spell Azure audio is unavailable:", reason);
	}
	await generateKhmerAudio(khmerText, playbackRate);
}
//#endregion
export { stopKhmerAudio as n, playKhmerAudio as t };
