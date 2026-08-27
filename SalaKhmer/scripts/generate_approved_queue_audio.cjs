const fs = require("fs");
const https = require("https");
const path = require("path");

const root = path.join(__dirname, "..");
if (typeof process.loadEnvFile === "function") process.loadEnvFile(path.join(root, ".env"));

const inputArgument = process.argv.find((argument) => argument.startsWith("--input="));
const inputPath = inputArgument
  ? path.resolve(root, inputArgument.slice("--input=".length))
  : path.join(__dirname, "daily-survival-dialogue-audio-queue.json");
const maximumCharacters = Number(
  process.argv.find((argument) => argument.startsWith("--max-characters="))?.slice("--max-characters=".length) ?? 450000,
);
const dryRun = process.argv.includes("--dry-run");
const replace = process.argv.includes("--replace");
const key = process.env.AZURE_TTS_API_KEY;
const region = process.env.AZURE_TTS_REGION;
const queue = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const items = queue.items ?? [];
const selected = items.filter((item) => item.reviewStatus === "approved-for-azure");
const totalCharacters = selected.reduce((total, item) => total + Array.from(item.khmer).length, 0);

if (!Number.isFinite(maximumCharacters) || maximumCharacters < 1) throw new Error("--max-characters must be a positive number.");
if (totalCharacters > maximumCharacters) {
  throw new Error(`Refusing to generate ${totalCharacters} characters; safe batch ceiling is ${maximumCharacters}.`);
}
console.log(`Approved audio plan: ${selected.length} files, ${totalCharacters} Khmer characters, ceiling ${maximumCharacters}.`);
if (!selected.length || dryRun) process.exit(0);
if (!key || !region) throw new Error("Azure key or region is missing.");

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

function synthesize(item) {
  const destination = path.join(root, "public", "audio", item.outputKey);
  if (fs.existsSync(destination) && !replace) return Promise.resolve("skipped");
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const temporaryDestination = `${destination}.tmp`;
  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="km-KH"><voice name="${item.voice ?? "km-KH-SreymomNeural"}">${escapeXml(item.khmer)}</voice></speak>`;
  return new Promise((resolve, reject) => {
    const request = https.request({
      hostname: `${region}.tts.speech.microsoft.com`, path: "/cognitiveservices/v1", method: "POST",
      headers: { "Ocp-Apim-Subscription-Key": key, "Content-Type": "application/ssml+xml; charset=utf-8", "X-Microsoft-OutputFormat": "audio-24khz-96kbitrate-mono-mp3", "User-Agent": "SalaKhmer-Reviewed-Queue" },
    }, (response) => {
      if (response.statusCode !== 200) { response.resume(); reject(new Error(`${item.id}: Azure returned HTTP ${response.statusCode}`)); return; }
      const file = fs.createWriteStream(temporaryDestination);
      response.pipe(file);
      file.on("finish", () => file.close(() => { fs.renameSync(temporaryDestination, destination); resolve("created"); }));
      file.on("error", reject);
    });
    request.on("error", reject);
    request.end(ssml);
  });
}

(async () => {
  for (const item of selected) {
    const result = await synthesize(item);
    console.log(`${result}: ${item.id}`);
    if (result === "created") await new Promise((resolve) => setTimeout(resolve, 3250));
  }
  console.log("Reviewed queue audio generation complete.");
})().catch((error) => { console.error(error.message); process.exit(1); });
