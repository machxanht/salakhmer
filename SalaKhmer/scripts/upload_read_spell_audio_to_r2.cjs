/* Safe, resumable uploader for the isolated Read & Spell audio prefix. */
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const root = path.join(__dirname, "..");
const sourceDirectory = path.join(root, "public", "audio", "read-spell-v1");
const workerDirectory = path.join(root, "cloudflare-worker");
const wrangler = path.join(root, "node_modules", "wrangler", "bin", "wrangler.js");
const statePath = path.join(__dirname, "read-spell-v1-r2-upload.json");
const bucket = "salakhmer-media-prod";
const prefix = "audio/read-spell-v1";
const concurrency = 4;
if (!fs.existsSync(sourceDirectory)) throw new Error("No Read & Spell audio directory exists yet.");
const files = fs.readdirSync(sourceDirectory).filter((file) => /^rs-[a-z0-9-]+-\d{3}\.mp3$/.test(file)).sort();
const state = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, "utf8")) : { version: 1, startedAt: new Date().toISOString(), uploaded: [], errors: [] };
const uploaded = new Set(state.uploaded);
function save() { state.updatedAt = new Date().toISOString(); fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8"); }
function upload(file) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [wrangler, "r2", "object", "put", `${bucket}/${prefix}/${file}`, "--file", path.join(sourceDirectory, file), "--remote"], { cwd: workerDirectory, windowsHide: true, stdio: "pipe" });
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", reject);
    child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`wrangler exited ${code}: ${stderr.trim()}`)));
  });
}
(async () => {
  const pending = files.filter((file) => !uploaded.has(file));
  console.log(`Read & Spell R2 plan: ${files.length} MP3s; ${uploaded.size} already uploaded; ${pending.length} pending.`);
  let cursor = 0;
  async function worker() {
    while (cursor < pending.length) {
      const file = pending[cursor++];
      try { await upload(file); state.uploaded.push(file); uploaded.add(file); save(); console.log(`${uploaded.size}/${files.length} uploaded ${file}`); }
      catch (error) { state.errors.push({ file, error: error.message, at: new Date().toISOString() }); save(); console.error(`FAILED ${file}: ${error.message}`); }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  state.completedAt = new Date().toISOString(); save();
  console.log(`Read & Spell R2 upload finished: ${uploaded.size}/${files.length}.`);
})();
