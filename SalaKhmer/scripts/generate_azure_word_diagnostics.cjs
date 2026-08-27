const fs = require("fs");
const https = require("https");
const path = require("path");

const root = path.join(__dirname, "..");
if (typeof process.loadEnvFile === "function") process.loadEnvFile(path.join(root, ".env"));

const key = process.env.AZURE_TTS_API_KEY;
const region = process.env.AZURE_TTS_REGION;
if (!key || !region) throw new Error("Azure key or region is missing.");

const samples = [
  { id: "01-hello", text: "សួស្តី", english: "Hello" },
  { id: "02-thank-you", text: "អរគុណ", english: "Thank you" },
  { id: "03-yes-male", text: "បាទ", english: "Yes (male speaker)" },
  { id: "04-yes-female", text: "ចាស", english: "Yes (female speaker)" },
  { id: "05-my-name-is-sara", text: "ខ្ញុំឈ្មោះ សារ៉ា", english: "My name is Sara" },
  { id: "06-how-are-you", text: "តើអ្នកសុខសប្បាយទេ?", english: "How are you?" },
];

const outputDir = path.join(root, "public", "audio", "azure-word-test");
fs.mkdirSync(outputDir, { recursive: true });

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function synthesize(sample) {
  const destination = path.join(outputDir, `${sample.id}.mp3`);
  const temporaryDestination = `${destination}.tmp`;
  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="km-KH"><voice name="km-KH-SreymomNeural">${escapeXml(sample.text)}</voice></speak>`;

  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: `${region}.tts.speech.microsoft.com`,
        path: "/cognitiveservices/v1",
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Content-Type": "application/ssml+xml; charset=utf-8",
          "X-Microsoft-OutputFormat": "audio-24khz-96kbitrate-mono-mp3",
          "User-Agent": "SalaKhmer-Azure-Word-Diagnostic",
        },
      },
      (response) => {
        if (response.statusCode !== 200) {
          response.resume();
          reject(new Error(`${sample.id}: Azure returned HTTP ${response.statusCode}`));
          return;
        }
        const stream = fs.createWriteStream(temporaryDestination);
        response.pipe(stream);
        stream.on("finish", () =>
          stream.close(() => {
            fs.renameSync(temporaryDestination, destination);
            resolve();
          }),
        );
        stream.on("error", reject);
      },
    );
    request.on("error", reject);
    request.end(ssml);
  });
}

(async () => {
  for (const sample of samples) {
    await synthesize(sample);
    console.log(`created: ${sample.id} — ${sample.english}`);
    await new Promise((resolve) => setTimeout(resolve, 3250));
  }
  console.log("Azure Khmer word diagnostic files are ready.");
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
