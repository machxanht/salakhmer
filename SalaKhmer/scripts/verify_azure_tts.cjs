const fs = require("fs");
const https = require("https");
const path = require("path");

const envPath = path.join(__dirname, "../.env");
if (typeof process.loadEnvFile === "function" && fs.existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

const key = process.env.AZURE_TTS_API_KEY;
const region = process.env.AZURE_TTS_REGION;
if (!key || !region) {
  console.error("Azure test skipped: key or region is missing.");
  process.exit(1);
}

const ssml = `<speak version="1.0" xml:lang="km-KH"><voice xml:lang="km-KH" name="km-KH-PisethNeural">សួស្តី</voice></speak>`;
const request = https.request(
  {
    hostname: `${region}.tts.speech.microsoft.com`,
    path: "/cognitiveservices/v1",
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-16khz-64kbitrate-mono-mp3",
      "User-Agent": "SalaKhmer-Azure-Verification",
    },
  },
  (response) => {
    let bytes = 0;
    response.on("data", (chunk) => {
      bytes += chunk.length;
    });
    response.on("end", () => {
      console.log(
        `Azure Khmer TTS test: HTTP ${response.statusCode}; ${bytes} audio bytes received.`,
      );
      process.exit(response.statusCode === 200 ? 0 : 1);
    });
  },
);

request.on("error", (error) => {
  console.error(`Azure Khmer TTS network error: ${error.message}`);
  process.exit(1);
});
request.end(ssml);
