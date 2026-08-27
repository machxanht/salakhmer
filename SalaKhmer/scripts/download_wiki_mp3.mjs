import https from "https";
import fs from "fs";
import path from "path";

const words = [
  {
    id: "alpha-1-ka",
    url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/dd/Km-ka.ogg/Km-ka.ogg.mp3",
  },
  {
    id: "alpha-1-kha",
    url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/91/Km-kha.ogg/Km-kha.ogg.mp3",
  },
  {
    id: "alpha-1-ko",
    url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/86/Km-ko.ogg/Km-ko.ogg.mp3",
  },
  {
    id: "alpha-1-kho",
    url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/1/11/Km-kho.ogg/Km-kho.ogg.mp3",
  },
  {
    id: "alpha-1-ngo",
    url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b5/Km-ngo.ogg/Km-ngo.ogg.mp3",
  },
];

const downloadAudio = (id, url) => {
  return new Promise((resolve, reject) => {
    const dest = path.join(process.cwd(), "public", "audio", `${id}.mp3`);
    const file = fs.createWriteStream(dest);

    https
      .get(url, (response) => {
        // If 404, we reject
        if (response.statusCode >= 400) {
          console.error(`Failed to download ${id}: HTTP ${response.statusCode}`);
          return reject(new Error(`HTTP ${response.statusCode}`));
        }
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
    try {
      await downloadAudio(word.id, word.url);
    } catch (e) {
      console.error("Failed to download Wiki MP3:", e);
    }
  }
  console.log("Finished downloading Wikipedia MP3s.");
}

run();
