/*
 * SalaKhmer Read & Spell Azure generator.
 *
 * Safe to rerun: it never overwrites an existing MP3, keeps a JSON manifest,
 * and writes each completed file atomically. It only synthesizes complete Khmer
 * words from the catalog -- never the isolated Khmer alphabet cards.
 */
const fs = require("fs");
const https = require("https");
const path = require("path");

const root = path.join(__dirname, "..");
if (typeof process.loadEnvFile === "function") process.loadEnvFile(path.join(root, ".env"));

const catalog = require(path.join(root, "src", "lib", "generated", "read-spell-catalog.json"));
const outputDirectory = path.join(root, "public", "audio", "read-spell-v1");
const reportPath = path.join(__dirname, "read-spell-v1-azure-report.json");
const manifestPath = path.join(__dirname, "read-spell-v1-audio-manifest.json");
const key = process.env.AZURE_TTS_API_KEY;
const region = process.env.AZURE_TTS_REGION;
const dryRun = process.argv.includes("--dry-run");
const limitArgument = process.argv.find((value) => value.startsWith("--limit="));
const limit = limitArgument ? Number(limitArgument.slice("--limit=".length)) : Infinity;
const requestDelayMs = 3250; // Azure F0 supports 20 synthesis requests/minute.

if (!key || !region) throw new Error("Azure TTS secret is missing.");
if (limitArgument && (!Number.isFinite(limit) || limit <= 0)) throw new Error("--limit must be a positive number.");

const items = catalog.vocabulary.map((word) => ({
  id: word.id,
  text: String(word.khmer_text).trim(),
  voice: word.azure_voice || "km-KH-SreymomNeural",
  objectKey: `audio/read-spell-v1/${word.id}.mp3`,
  topicId: word.topic_id,
  english: word.english_translation,
}));

if (new Set(items.map((item) => item.id)).size !== items.length) throw new Error("Duplicate Read & Spell IDs.");
if (items.some((item) => !item.text || !/^[\u1780-\u17FF\sៗ។ៈ]+$/u.test(item.text))) {
  throw new Error("Catalog contains an invalid Khmer word; refusing to synthesize.");
}

fs.writeFileSync(manifestPath, `${JSON.stringify({
  version: 1,
  generatedAt: new Date().toISOString(),
  rule: "Azure Khmer complete vocabulary words only. Do not use for isolated alphabet cards.",
  prefix: "audio/read-spell-v1/",
  items,
}, null, 2)}\n`, "utf8");

const report = fs.existsSync(reportPath)
  ? JSON.parse(fs.readFileSync(reportPath, "utf8"))
  : { version: 1, startedAt: new Date().toISOString(), created: [], skipped: [], errors: [] };
const created = new Set(report.created);
const skipped = new Set(report.skipped);
function saveReport() {
  report.completedCount = created.size + skipped.size;
  report.updatedAt = new Date().toISOString();
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}
function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}
function synthesize(item, attempt = 1) {
  const target = path.join(outputDirectory, `${item.id}.mp3`);
  if (fs.existsSync(target) && fs.statSync(target).size > 0) return Promise.resolve("skipped");
  fs.mkdirSync(outputDirectory, { recursive: true });
  const temporary = `${target}.tmp`;
  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="km-KH"><voice name="${item.voice}">${escapeXml(item.text)}</voice></speak>`;
  return new Promise((resolve, reject) => {
    const request = https.request({
      hostname: `${region}.tts.speech.microsoft.com`, path: "/cognitiveservices/v1", method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/ssml+xml; charset=utf-8",
        "X-Microsoft-OutputFormat": "audio-24khz-96kbitrate-mono-mp3",
        "User-Agent": "SalaKhmer-ReadSpell-v1",
      },
    }, (response) => {
      if (response.statusCode !== 200) {
        const code = response.statusCode;
        response.resume();
        if (code === 429 && attempt <= 8) {
          const waitMs = Math.min(120000, 30000 * 2 ** (attempt - 1));
          console.log(`Azure throttled ${item.id}; retry ${attempt}/8 in ${Math.round(waitMs / 1000)}s.`);
          setTimeout(() => synthesize(item, attempt + 1).then(resolve, reject), waitMs);
          return;
        }
        reject(new Error(`Azure HTTP ${code}`));
        return;
      }
      const file = fs.createWriteStream(temporary);
      response.pipe(file);
      file.on("finish", () => file.close(() => {
        fs.renameSync(temporary, target);
        resolve("created");
      }));
      file.on("error", reject);
    });
    request.on("error", reject);
    request.end(ssml);
  });
}

(async () => {
  const pending = items.filter((item) => !created.has(item.id) && !skipped.has(item.id)).slice(0, limit);
  const characters = pending.reduce((sum, item) => sum + Array.from(item.text).length, 0);
  console.log(`Read & Spell plan: ${items.length} words total; ${pending.length} pending; ${characters} billable Khmer characters in this run.`);
  if (dryRun) return;
  for (const [index, item] of pending.entries()) {
    try {
      const outcome = await synthesize(item);
      if (outcome === "created") { report.created.push(item.id); created.add(item.id); }
      else { report.skipped.push(item.id); skipped.add(item.id); }
      saveReport();
      console.log(`${index + 1}/${pending.length} ${outcome}: ${item.id}`);
      if (outcome === "created" && index < pending.length - 1) await new Promise((resolve) => setTimeout(resolve, requestDelayMs));
    } catch (error) {
      report.errors.push({ id: item.id, error: error.message, at: new Date().toISOString() });
      saveReport();
      throw error;
    }
  }
  report.completedAt = new Date().toISOString();
  saveReport();
  console.log("Read & Spell Azure synthesis complete. Run audio:upload-read-spell-r2 to publish the local MP3s.");
})().catch((error) => { console.error(error.message); process.exit(1); });
