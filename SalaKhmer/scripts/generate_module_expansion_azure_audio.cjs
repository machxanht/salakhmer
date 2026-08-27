/*
 * Resumable Azure TTS generator for reviewed Module 2--6 expansion manifests.
 * It refuses unreviewed text, writes atomically, does not replace files by
 * default, and does not upload to R2. Azure credentials remain in .env only.
 */
const fs = require("fs");
const https = require("https");
const path = require("path");

const root = path.join(__dirname, "..");
if (typeof process.loadEnvFile === "function") process.loadEnvFile(path.join(root, ".env"));
const inputArgument = process.argv.find((value) => value.startsWith("--input="))?.slice(8);
const dryRun = process.argv.includes("--dry-run");
const overwrite = process.argv.includes("--overwrite");
const maximumCharacters = Number(process.argv.find((value) => value.startsWith("--max-characters="))?.slice(17) ?? 450000);
if (!inputArgument) throw new Error("Use --input=scripts/module-N-expansion-v1-audio-manifest.json.");
if (!Number.isFinite(maximumCharacters) || maximumCharacters < 1) throw new Error("--max-characters must be positive.");
const manifestPath = path.resolve(root, inputArgument);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const selected = (manifest.items ?? []).filter((item) => item.reviewStatus === "approved-for-azure");
const blocked = (manifest.items ?? []).filter((item) => item.reviewStatus !== "approved-for-azure");
const characters = selected.reduce((total, item) => total + Array.from(String(item.khmer ?? "")).length, 0);
if (!selected.length) throw new Error("No approved-for-azure items. This protects unreviewed Khmer text.");
if (characters > maximumCharacters) throw new Error(`Refusing ${characters} characters; ceiling is ${maximumCharacters}.`);
if (selected.some((item) => !item.id || !item.khmer || !item.outputKey || !item.voice)) throw new Error("Manifest has an incomplete approved item.");
console.log(`Module expansion audio plan: ${selected.length} approved files; ${characters} Khmer characters; ${blocked.length} unreviewed items excluded.`);
if (dryRun) process.exit(0);
const key = process.env.AZURE_TTS_API_KEY;
const region = process.env.AZURE_TTS_REGION;
if (!key || !region) throw new Error("Azure TTS secret is missing.");
const reportPath = manifestPath.replace(/\.json$/, "-azure-report.json");
const report = fs.existsSync(reportPath) ? JSON.parse(fs.readFileSync(reportPath, "utf8")) : { schemaVersion: 1, startedAt: new Date().toISOString(), created: [], skipped: [], errors: [] };
const created = new Set(report.created);
const skipped = new Set(report.skipped);
function save() { report.completedCount = created.size + skipped.size; report.updatedAt = new Date().toISOString(); fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8"); }
function escapeXml(value) { return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;"); }
function synthesize(item, attempt = 1) {
  const destination = path.resolve(root, "public", "audio", item.outputKey);
  const audioRoot = path.resolve(root, "public", "audio") + path.sep;
  if (!destination.startsWith(audioRoot)) throw new Error(`${item.id}: unsafe outputKey.`);
  if (!overwrite && fs.existsSync(destination) && fs.statSync(destination).size > 0) return Promise.resolve("skipped");
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const temporary = `${destination}.tmp`;
  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="km-KH"><voice name="${item.voice}">${escapeXml(item.khmer)}</voice></speak>`;
  return new Promise((resolve, reject) => {
    const request = https.request({ hostname: `${region}.tts.speech.microsoft.com`, path: "/cognitiveservices/v1", method: "POST", headers: { "Ocp-Apim-Subscription-Key": key, "Content-Type": "application/ssml+xml; charset=utf-8", "X-Microsoft-OutputFormat": "audio-24khz-96kbitrate-mono-mp3", "User-Agent": "SalaKhmer-Module-Expansion" } }, (response) => {
      if (response.statusCode !== 200) { const status = response.statusCode; response.resume(); if (status === 429 && attempt <= 8) { const wait = Math.min(120000, 30000 * 2 ** (attempt - 1)); console.log(`${item.id}: throttled; retry ${attempt}/8 in ${Math.round(wait / 1000)}s.`); setTimeout(() => synthesize(item, attempt + 1).then(resolve, reject), wait); return; } reject(new Error(`${item.id}: Azure HTTP ${status}`)); return; }
      const file = fs.createWriteStream(temporary); response.pipe(file);
      file.on("finish", () => file.close(() => { fs.renameSync(temporary, destination); resolve("created"); })); file.on("error", reject);
    });
    request.on("error", reject); request.end(ssml);
  });
}
(async () => {
  const pending = overwrite ? selected : selected.filter((item) => !created.has(item.id) && !skipped.has(item.id));
  for (const [index, item] of pending.entries()) {
    try { const outcome = await synthesize(item); report[outcome].push(item.id); (outcome === "created" ? created : skipped).add(item.id); save(); console.log(`${index + 1}/${pending.length} ${outcome}: ${item.id}`); if (outcome === "created" && index < pending.length - 1) await new Promise((resolve) => setTimeout(resolve, 3250)); }
    catch (error) { report.errors.push({ id: item.id, error: error.message, at: new Date().toISOString() }); save(); throw error; }
  }
  report.completedAt = new Date().toISOString(); save(); console.log("Module expansion audio complete locally. No R2 upload was performed.");
})().catch((error) => { console.error(error.message); process.exit(1); });
