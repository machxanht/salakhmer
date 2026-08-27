const fs = require("fs");
const https = require("https");
const path = require("path");

const root = path.join(__dirname, "..");
if (typeof process.loadEnvFile === "function") process.loadEnvFile(path.join(root, ".env"));
const key = process.env.AZURE_TTS_API_KEY;
const region = process.env.AZURE_TTS_REGION;
const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, "azure-audio-manifest.json"), "utf8"),
);
const outputDir = path.join(root, "public", "audio", "azure");
const dryRun = process.argv.includes("--dry-run");
const requestedIds = process.argv
  .find((argument) => argument.startsWith("--ids="))
  ?.slice("--ids=".length)
  .split(",")
  .filter(Boolean);
const requestedManifest = requestedIds
  ? manifest.filter((item) => requestedIds.includes(item.id))
  : manifest;
const blockedItems = requestedManifest.filter(
  (item) => item.source !== "azure-tts" || item.reviewStatus !== "approved",
);
const selectedManifest = requestedManifest.filter(
  (item) => item.source === "azure-tts" && item.reviewStatus === "approved",
);

if (requestedIds && blockedItems.length > 0) {
  console.error(
    `Refusing Azure generation for ${blockedItems.map((item) => item.id).join(", ")}. ` +
      "These entries require approved native-speaker recordings.",
  );
  process.exit(1);
}
if (selectedManifest.length === 0) {
  console.log("No approved Azure TTS entries. Alphabet audio requires native-speaker recordings.");
  process.exit(0);
}
for (const item of selectedManifest) {
  if (!item.ttsText || !item.voice) {
    throw new Error(`${item.id}: approved Azure entries require ttsText and voice.`);
  }
}
const totalCharacters = selectedManifest.reduce(
  (total, item) => total + Array.from(item.ttsText).length,
  0,
);
console.log(
  `Approved Azure audio plan: ${selectedManifest.length} files, ${totalCharacters} Khmer characters.`,
);
if (dryRun) process.exit(0);
if (!key || !region) throw new Error("Azure key or region is missing.");
fs.mkdirSync(outputDir, { recursive: true });

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function synthesize(item) {
  const destination = path.join(outputDir, `${item.id}.mp3`);
  if (fs.existsSync(destination) && !process.argv.includes("--replace"))
    return Promise.resolve("skipped");
  // Playback speed is controlled only by the app. The manifest is the complete source of truth.
  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="km-KH"><voice name="${item.voice}">${escapeXml(item.ttsText)}</voice></speak>`;
  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: `${region}.tts.speech.microsoft.com`,
        path: "/cognitiveservices/v1",
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": "audio-24khz-96kbitrate-mono-mp3",
          "User-Agent": "SalaKhmer-Azure-Batch",
        },
      },
      (response) => {
        if (response.statusCode !== 200) {
          response.resume();
          reject(new Error(`${item.id}: Azure returned HTTP ${response.statusCode}`));
          return;
        }
        const file = fs.createWriteStream(destination);
        response.pipe(file);
        file.on("finish", () => file.close(() => resolve("created")));
        file.on("error", reject);
      },
    );
    request.on("error", reject);
    request.end(ssml);
  });
}

(async () => {
  for (const item of selectedManifest) {
    const result = await synthesize(item);
    console.log(`${result}: ${item.id}`);
    // Azure F0 allows 20 synthesis requests per minute. Keep a safe margin.
    if (result === "created") await new Promise((resolve) => setTimeout(resolve, 3_250));
  }
  console.log("Approved Azure alphabet batch complete.");
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
