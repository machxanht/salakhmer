const fs = require("fs");
const https = require("https");
const path = require("path");

const root = path.join(__dirname, "..");
if (typeof process.loadEnvFile === "function") process.loadEnvFile(path.join(root, ".env"));
const queueArgument = process.argv.find((argument) => argument.startsWith("--queue="))?.slice("--queue=".length);
const queuePath = queueArgument ? path.resolve(root, queueArgument) : path.join(__dirname, "a1-batch-001-azure-queue.json");
const reportPath = queuePath.replace(/-azure-queue\.json$/, "-azure-report.json");
const dryRun = process.argv.includes("--dry-run");
const key = process.env.AZURE_TTS_API_KEY;
const region = process.env.AZURE_TTS_REGION;
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
// Gemini added a purely artificial dialogue index (for example: "...។ 136")
// to many rows. It is metadata, not spoken Khmer; remove it before synthesis.
function withoutArtificialIndex(value) {
  return String(value ?? "").replace(/\s+[0-9]+\s*$/, "").trim();
}
for (const item of queue.items) item.khmer = withoutArtificialIndex(item.khmer);
const uniqueItems = queue.items.filter((item) => !item.audioReuseOf);
const maxCharacters = 450000;
const totalCharacters = uniqueItems.reduce((sum, item) => sum + Array.from(item.khmer).length, 0);
if (totalCharacters > maxCharacters) throw new Error(`Batch is ${totalCharacters} characters, over the safe F0 limit of ${maxCharacters}.`);
if (queue.validationIssues.some((issue) => issue.issue !== "phonetic_noncompliant")) throw new Error("Refusing audio generation: workbook has blocking validation issues.");
if (!key || !region) throw new Error("Azure TTS secret is missing.");

const report = fs.existsSync(reportPath) ? JSON.parse(fs.readFileSync(reportPath, "utf8")) : { startedAt: new Date().toISOString(), created: [], skipped: [], errors: [] };
function saveReport() {
  const made = new Set(report.created);
  report.synthesizedKhmerCharacters = uniqueItems
    .filter((item) => made.has(item.id))
    .reduce((sum, item) => sum + Array.from(item.khmer).length, 0);
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}
function escapeXml(value) { return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;"); }
function createAudio(item, attempt = 1) {
  const destination = path.join(root, "public", "audio", item.outputKey);
  if (fs.existsSync(destination)) return Promise.resolve("skipped");
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const temporary = `${destination}.tmp`;
  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="km-KH"><voice name="${item.voice}">${escapeXml(item.khmer)}</voice></speak>`;
  return new Promise((resolve, reject) => {
    const request = https.request({ hostname: `${region}.tts.speech.microsoft.com`, path: "/cognitiveservices/v1", method: "POST", headers: { "Ocp-Apim-Subscription-Key": key, "Content-Type": "application/ssml+xml; charset=utf-8", "X-Microsoft-OutputFormat": "audio-24khz-96kbitrate-mono-mp3", "User-Agent": "SalaKhmer-A1-Batch" } }, (response) => {
      if (response.statusCode !== 200) {
        const statusCode = response.statusCode;
        response.resume();
        if (statusCode === 429 && attempt <= 8) {
          const waitMs = Math.min(120000, 30000 * 2 ** (attempt - 1));
          console.log(`Azure throttled ${item.id}; retry ${attempt}/8 after ${Math.round(waitMs / 1000)} seconds.`);
          setTimeout(() => createAudio(item, attempt + 1).then(resolve, reject), waitMs);
          return;
        }
        reject(new Error(`Azure HTTP ${statusCode}`));
        return;
      }
      const file = fs.createWriteStream(temporary); response.pipe(file);
      file.on("finish", () => file.close(() => { fs.renameSync(temporary, destination); resolve("created"); })); file.on("error", reject);
    });
    request.on("error", reject); request.end(ssml);
  });
}
(async () => {
  console.log(`Plan: ${uniqueItems.length} unique files / ${totalCharacters} Khmer characters.`);
  if (dryRun) return;
  for (const [index, item] of uniqueItems.entries()) {
    try { const outcome = await createAudio(item); report[outcome].push(item.id); saveReport(); console.log(`${index + 1}/${uniqueItems.length} ${outcome}: ${item.id}`); if (outcome === "created") await new Promise((resolve) => setTimeout(resolve, 3250)); }
    catch (error) { report.errors.push({ id: item.id, error: error.message }); saveReport(); throw error; }
  }
  report.completedAt = new Date().toISOString(); saveReport(); console.log("A1 batch audio completed. It remains unpublished pending native Khmer review.");
})().catch((error) => { console.error(error.message); process.exit(1); });
