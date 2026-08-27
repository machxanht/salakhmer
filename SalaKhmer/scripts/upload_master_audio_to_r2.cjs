const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const root = path.join(__dirname, "..");
const sourceDirectory = path.join(root, "public", "audio", "a1-master-5000");
const workerDirectory = path.join(root, "cloudflare-worker");
const wrangler = path.join(root, "node_modules", "wrangler", "bin", "wrangler.js");
const statePath = path.join(__dirname, "a1-master-5000-r2-upload.json");
const bucket = "salakhmer-media-prod";
const remotePrefix = "audio/a1-master-5000";
const concurrency = 6;

const files = fs.readdirSync(sourceDirectory).filter((file) => file.endsWith(".mp3")).sort();
const state = fs.existsSync(statePath)
  ? JSON.parse(fs.readFileSync(statePath, "utf8"))
  : { startedAt: new Date().toISOString(), uploaded: [], errors: [] };
const completed = new Set(state.uploaded);
function save() { fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`); }

function upload(file) {
  const localPath = path.join(sourceDirectory, file);
  const objectKey = `${bucket}/${remotePrefix}/${file}`;
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [wrangler, "r2", "object", "put", objectKey, "--file", localPath, "--remote"], {
      cwd: workerDirectory,
      windowsHide: true,
      stdio: "ignore",
    });
    child.on("error", reject);
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`wrangler exited ${code}`))));
  });
}

(async () => {
  const pending = files.filter((file) => !completed.has(file));
  console.log(`R2 plan: ${files.length} MP3s; ${completed.size} already uploaded; ${pending.length} pending.`);
  let cursor = 0;
  async function worker() {
    while (cursor < pending.length) {
      const file = pending[cursor++];
      try {
        await upload(file);
        state.uploaded.push(file);
        completed.add(file);
        save();
        console.log(`${completed.size}/${files.length} uploaded ${file}`);
      } catch (error) {
        state.errors.push({ file, error: error.message, at: new Date().toISOString() });
        save();
        console.error(`FAILED ${file}: ${error.message}`);
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  state.completedAt = new Date().toISOString();
  save();
  console.log(`R2 upload complete: ${completed.size}/${files.length}.`);
})();
