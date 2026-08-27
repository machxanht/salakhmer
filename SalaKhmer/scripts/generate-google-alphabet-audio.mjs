/**
 * Generates a clean, temporary Google Cloud TTS pack for the 33 standalone
 * consonant cards. Keys stay in .env and are never emitted to the terminal.
 * Usage: node scripts/generate-google-alphabet-audio.mjs [--limit=2]
 */
import fs from "node:fs/promises";
import path from "node:path";

const alphabet = [
  ["c-ka", "ក"], ["c-kha", "ខ"], ["c-ko", "គ"], ["c-kho", "ឃ"], ["c-ngo", "ង"],
  ["c-cha", "ច"], ["c-chha", "ឆ"], ["c-cho", "ជ"], ["c-chho", "ឈ"], ["c-nho", "ញ"],
  ["c-da", "ដ"], ["c-tha1", "ឋ"], ["c-do", "ឌ"], ["c-tho1", "ឍ"], ["c-na1", "ណ"],
  ["c-ta", "ត"], ["c-tha2", "ថ"], ["c-to", "ទ"], ["c-tho2", "ធ"], ["c-no", "ន"],
  ["c-ba", "ប"], ["c-pha", "ផ"], ["c-po", "ព"], ["c-pho", "ភ"], ["c-mo", "ម"],
  ["c-yo", "យ"], ["c-ro", "រ"], ["c-lo", "ល"], ["c-vo", "វ"], ["c-sa", "ស"],
  ["c-ha", "ហ"], ["c-la", "ឡ"], ["c-a", "អ"],
];

const limit = Number(process.argv.find((value) => value.startsWith("--limit="))?.slice(8) ?? alphabet.length);
const env = await fs.readFile(path.resolve(".env"), "utf8");
const apiKey = env.match(/^GOOGLE_TTS_API_KEY=(.+)$/m)?.[1]?.trim();
if (!apiKey || apiKey.includes("your_"))
  throw new Error("GOOGLE_TTS_API_KEY is not configured in .env.");

const outDir = path.resolve("public", "audio");
const force = process.argv.includes("--force");
await fs.mkdir(outDir, { recursive: true });
let created = 0;

for (const [id, text] of alphabet.slice(0, Math.max(0, limit))) {
  const target = path.join(outDir, `google-${id}.mp3`);
  try {
    await fs.access(target);
    if (!force) {
      console.log(`exists ${id}`);
      continue;
    }
  } catch {}

  const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: "km-KH", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3", speakingRate: 0.82 },
    }),
  });
  if (!response.ok) throw new Error(`${id}: Google TTS returned ${response.status}`);
  const payload = await response.json();
  if (!payload.audioContent) throw new Error(`${id}: Google TTS returned no audio.`);
  await fs.writeFile(target, Buffer.from(payload.audioContent, "base64"));
  created += 1;
  console.log(`created ${id}`);
}

console.log(`done created=${created}`);
