/**
 * Generate the temporary Google TTS MP3 pack for Module 1 non-standalone
 * glyphs. Coeng letters are spoken as "ជើង <letter>". Dependent vowels are
 * spoken with independent dummy carriers (A: អ, O: អ៊), never as an
 * isolated sign.
 * Usage: node scripts/generate-google-module1-audio.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";

const coeng = [
  ["sub-ka", "ក"], ["sub-kha", "ខ"], ["sub-ko", "គ"], ["sub-kho", "ឃ"], ["sub-ngo", "ង"],
  ["sub-cha", "ច"], ["sub-chha", "ឆ"], ["sub-cho", "ជ"], ["sub-chho", "ឈ"], ["sub-nho", "ញ"],
  ["sub-da", "ដ"], ["sub-tha1", "ឋ"], ["sub-do", "ឌ"], ["sub-tho1", "ឍ"], ["sub-na", "ណ"],
  ["sub-ta", "ត"], ["sub-tha2", "ថ"], ["sub-to", "ទ"], ["sub-tho2", "ធ"], ["sub-no", "ន"],
  ["sub-ba", "ប"], ["sub-pha", "ផ"], ["sub-po", "ព"], ["sub-pho", "ភ"], ["sub-mo", "ម"],
  ["sub-yo", "យ"], ["sub-ro", "រ"], ["sub-lo", "ល"], ["sub-vo", "វ"], ["sub-sa", "ស"],
  ["sub-ha", "ហ"], ["sub-a", "អ"],
].map(([id, letter]) => [id, `ជើង ${letter}`]);

const signs = [
  ["v-aa", "ា"], ["v-i", "ិ"], ["v-ii", "ី"], ["v-ue", "ឹ"], ["v-uee", "ឺ"], ["v-u", "ុ"],
  ["v-uu", "ូ"], ["v-ua", "ួ"], ["v-ae", "ើ"], ["v-ya", "ៀ"], ["v-ie", "ៀ"], ["v-e", "េ"],
  ["v-ae2", "ែ"], ["v-ai", "ៃ"], ["v-o", "ោ"], ["v-au", "ៅ"], ["v-um", "ុំ"], ["v-om", "ំ"],
  ["v-am", "ាំ"], ["v-ah", "ះ"], ["v-uh", "ុះ"], ["v-eh", "េះ"], ["v-aeh", "ែះ"], ["v-oh", "ោះ"],
];
const dependent = signs.flatMap(([id, sign]) => [
  [`${id}-a`, `អ${sign}`],
  [`${id}-o`, `អ៊${sign}`],
]);

const independent = [
  ["iv-01", "ឥ"], ["iv-02", "ឦ"], ["iv-03", "ឧ"], ["iv-04", "ឨ"], ["iv-05", "ឩ"],
  ["iv-06", "ឪ"], ["iv-07", "ឫ"], ["iv-08", "ឬ"], ["iv-09", "ឭ"], ["iv-10", "ឮ"],
  ["iv-11", "ឯ"], ["iv-12", "ឰ"], ["iv-13", "ឱ"], ["iv-14", "ឲ"], ["iv-15", "ឳ"],
];
const numerals = [
  ["num-0", "សូន្យ"], ["num-1", "មួយ"], ["num-2", "ពីរ"], ["num-3", "បី"], ["num-4", "បួន"],
  ["num-5", "ប្រាំ"], ["num-6", "ប្រាំមួយ"], ["num-7", "ប្រាំពីរ"], ["num-8", "ប្រាំបី"], ["num-9", "ប្រាំបួន"],
  ["num-100", "មួយរយ"], ["num-1000", "មួយពាន់"], ["num-10000", "មួយម៉ឺន"], ["num-1000000", "មួយលាន"], ["num-1000000000", "មួយកោដិ"],
];
const items = [...coeng, ...dependent, ...independent, ...numerals];
const regenerateDependent = process.argv.includes("--regenerate-dependent");

const env = await fs.readFile(path.resolve(".env"), "utf8");
const apiKey = env.match(/^GOOGLE_TTS_API_KEY=(.+)$/m)?.[1]?.trim();
if (!apiKey || apiKey.includes("your_"))
  throw new Error("GOOGLE_TTS_API_KEY is not configured in .env.");

let created = 0;
for (const [id, text] of items) {
  const target = path.resolve("public", "audio", `google-${id}.mp3`);
  try {
    await fs.access(target);
    if (!(regenerateDependent && id.startsWith("v-"))) {
      console.log(`exists ${id}`);
      continue;
    }
  } catch {}
  const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ input: { text }, voice: { languageCode: "km-KH", ssmlGender: "FEMALE" }, audioConfig: { audioEncoding: "MP3", speakingRate: 0.82 } }),
  });
  if (!response.ok) throw new Error(`${id}: Google TTS returned ${response.status}`);
  const payload = await response.json();
  await fs.writeFile(target, Buffer.from(payload.audioContent, "base64"));
  created += 1;
  console.log(`created ${id}`);
}
console.log(`done created=${created} total=${items.length}`);
