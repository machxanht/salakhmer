const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const input = process.argv.find((argument) => argument.startsWith("--input="))?.slice("--input=".length);
if (!input) throw new Error("Usage: node scripts/import_dialogue_workbook.cjs --input=C:\\path\\file.xlsx");
const collection = process.argv.find((argument) => argument.startsWith("--collection="))?.slice("--collection=".length) ?? "a1-batch-001";
const ownerApproved = process.argv.includes("--owner-approved");
if (!/^[a-z0-9-]+$/.test(collection)) throw new Error("--collection must use lowercase letters, numbers, and hyphens only.");

const dialogueHeaders = [
  "dialogue_id", "level", "unit", "topic", "title_en", "scenario_en", "speaker_a", "speaker_b", "turn_count", "review_status", "copyright_status", "notes",
];
const turnHeaders = [
  "item_id", "dialogue_id", "turn_number", "speaker", "speaker_gender", "tts_voice", "level", "topic", "khmer", "english", "english_phonetic", "spelling_note", "content_type", "review_status", "audio_status", "source", "copyright_status", "notes",
];

function xmlUnescape(value) {
  return value
    .replace(/&#(\d+);/g, (_, codePoint) => String.fromCodePoint(Number(codePoint)))
    .replace(/&#x([0-9a-f]+);/gi, (_, codePoint) => String.fromCodePoint(Number.parseInt(codePoint, 16)))
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function columnNumber(reference) {
  return [...reference.replace(/\d/g, "")].reduce((number, letter) => number * 26 + letter.charCodeAt(0) - 64, 0) - 1;
}

function readSheet(zip, sheetNumber) {
  const xml = zip.readAsText(`xl/worksheets/sheet${sheetNumber}.xml`);
  const rows = [];
  for (const rowMatch of xml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)) {
    const values = [];
    for (const cellMatch of rowMatch[1].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
      const ref = /r="([A-Z]+\d+)"/.exec(cellMatch[1])?.[1];
      if (!ref) continue;
      const text = /<t[^>]*>([\s\S]*?)<\/t>/.exec(cellMatch[2])?.[1] ?? /<v[^>]*>([\s\S]*?)<\/v>/.exec(cellMatch[2])?.[1] ?? "";
      values[columnNumber(ref)] = xmlUnescape(text.replace(/<[^>]+>/g, ""));
    }
    rows.push(values);
  }
  return rows;
}

function records(rows, headers) {
  if (JSON.stringify(rows[0]) !== JSON.stringify(headers)) throw new Error("Workbook headers do not match the SalaKhmer import schema.");
  return rows.slice(1).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])));
}

const zip = new AdmZip(path.resolve(input));
const dialogues = records(readSheet(zip, 1), dialogueHeaders);
const turns = records(readSheet(zip, 2), turnHeaders);
const dialogueById = new Map(dialogues.map((dialogue) => [dialogue.dialogue_id, dialogue]));
const issues = [];
const audioKeyByTextAndVoice = new Map();
const normalizedItems = [];

for (const turn of turns) {
  const dialogue = dialogueById.get(turn.dialogue_id);
  if (!dialogue) issues.push({ itemId: turn.item_id, issue: "missing_dialogue" });
  if (!/[\u1780-\u17ff]/u.test(turn.khmer)) issues.push({ itemId: turn.item_id, issue: "missing_khmer_unicode" });
  if (!/^[A-Za-z0-9 ,.!?'\-]+$/.test(turn.english_phonetic)) issues.push({ itemId: turn.item_id, issue: "phonetic_noncompliant" });
  const expectedVoice = turn.speaker_gender === "female" ? "km-KH-SreymomNeural" : "km-KH-PisethNeural";
  if (turn.tts_voice !== expectedVoice) issues.push({ itemId: turn.item_id, issue: "voice_gender_mismatch" });
  const textVoiceKey = `${turn.tts_voice}\u0000${turn.khmer}`;
  const audioKey = audioKeyByTextAndVoice.get(textVoiceKey) ?? turn.item_id;
  audioKeyByTextAndVoice.set(textVoiceKey, audioKey);
  normalizedItems.push({
    id: turn.item_id,
    dialogueId: turn.dialogue_id,
    turnNumber: Number(turn.turn_number),
    speaker: turn.speaker,
    speakerGender: turn.speaker_gender,
    khmer: turn.khmer,
    english: turn.english,
    englishPhonetic: turn.english_phonetic,
    voice: turn.tts_voice,
    outputKey: `${collection}/${audioKey}.mp3`,
    audioReuseOf: audioKey === turn.item_id ? null : audioKey,
    reviewStatus: "approved-for-azure",
    publicationStatus: ownerApproved ? "owner_approved" : "pending_native_review",
    audioStatus: "queued",
  });
}

const uniqueItems = normalizedItems.filter((item) => !item.audioReuseOf);
const output = {
  schemaVersion: 1,
  workbook: path.basename(input),
  importedAt: new Date().toISOString(),
  publicationStatus: ownerApproved ? "owner_approved" : "pending_native_review",
  totalDialogues: dialogues.length,
  totalTurns: normalizedItems.length,
  uniqueAzureFiles: uniqueItems.length,
  estimatedKhmerCharacters: uniqueItems.reduce((sum, item) => sum + Array.from(item.khmer).length, 0),
  validationIssues: issues,
  dialogues,
  items: normalizedItems,
};
const outputPath = path.join(__dirname, `${collection}-azure-queue.json`);
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`Imported ${dialogues.length} dialogues and ${normalizedItems.length} turns.`);
console.log(`Azure needs ${uniqueItems.length} unique MP3 files, estimated ${output.estimatedKhmerCharacters} Khmer characters.`);
console.log(`Validation issues: ${issues.length}. Queue: ${outputPath}`);
