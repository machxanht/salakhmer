import https from "https";
import fs from "fs";
import path from "path";

const words = [
  { id: "alpha-1-ka", url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Km-ka.ogg" },
  { id: "alpha-1-kha", url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Km-kha.ogg" },
  { id: "alpha-1-ko", url: "https://upload.wikimedia.org/wikipedia/commons/8/86/Km-ko.ogg" },
  { id: "alpha-1-kho", url: "https://upload.wikimedia.org/wikipedia/commons/1/11/Km-kho.ogg" },
  { id: "alpha-1-ngo", url: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Km-ngo.ogg" },
];

const downloadAudio = (id, url) => {
  return new Promise((resolve, reject) => {
    const dest = path.join(process.cwd(), "public", "audio", `${id}.ogg`);
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
    await downloadAudio(word.id, word.url);
  }
  console.log("All Wikipedia audio files downloaded.");
}

run();
