import https from "https";
import fs from "fs";
import path from "path";

const words = [
  { id: "alpha-1-ka", text: "ក" },
  { id: "alpha-1-kha", text: "ខ" },
  { id: "alpha-1-ko", text: "គ" },
  { id: "alpha-1-kho", text: "ឃ" },
  { id: "alpha-1-ngo", text: "ង" },
];

const downloadAudio = (id, text) => {
  return new Promise((resolve, reject) => {
    const url = `https://translate.googleapis.com/translate_tts?ie=UTF-8&tl=km&client=gtx&q=${encodeURIComponent(text)}`;
    const dest = path.join(process.cwd(), "public", "audio", `${id}.mp3`);
    const file = fs.createWriteStream(dest);

    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`Downloaded: ${dest}`);
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        console.error(`Error downloading ${id}:`, err);
        reject(err);
      });
  });
};

async function run() {
  for (const word of words) {
    await downloadAudio(word.id, word.text);
  }
  console.log("All audio files downloaded.");
}

run();
