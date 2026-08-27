/* Uploads only completed module-expansion MP3s listed by a manifest to R2. */
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const root = path.join(__dirname, "..");
const inputArgument = process.argv.find((value) => value.startsWith("--input="))?.slice(8);
const overwrite = process.argv.includes("--overwrite");
if (!inputArgument) throw new Error("Use --input=scripts/module-N-expansion-v1-audio-manifest.json.");
const manifestPath = path.resolve(root, inputArgument);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const bucket = "salakhmer-media-prod";
const workerDirectory = path.join(root, "cloudflare-worker");
const wrangler = path.join(root, "node_modules", "wrangler", "bin", "wrangler.js");
const statePath = manifestPath.replace(/\.json$/, "-r2-upload.json");
const files = (manifest.items ?? [])
  .filter((item) => item.reviewStatus === "approved-for-azure")
  .map((item) => ({ id: item.id, outputKey: item.outputKey, localPath: path.resolve(root, "public", "audio", item.outputKey) }))
  .filter((item) => fs.existsSync(item.localPath) && fs.statSync(item.localPath).size > 0);
const state = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, "utf8")) : { schemaVersion: 1, startedAt: new Date().toISOString(), uploaded: [], errors: [] };
const uploaded = new Set(state.uploaded);
function save() { state.updatedAt = new Date().toISOString(); state.completedCount = uploaded.size; fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8"); }
function put(item) {
  return new Promise((resolve, reject) => {
    const objectKey = `${bucket}/audio/${item.outputKey}`;
    const child = spawn(process.execPath, [wrangler, "r2", "object", "put", objectKey, "--file", item.localPath, "--remote"], { cwd: workerDirectory, windowsHide: true, stdio: "ignore" });
    child.on("error", reject);
    child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`wrangler exited ${code}`)));
  });
}
(async () => {
const pending = overwrite ? files : files.filter((item) => !uploaded.has(item.id));
  console.log(`Module expansion R2 plan: ${files.length} local MP3s; ${uploaded.size} already uploaded; ${pending.length} pending.`);
  for (const [index, item] of pending.entries()) {
    try { await put(item); state.uploaded.push(item.id); uploaded.add(item.id); save(); console.log(`${index + 1}/${pending.length} uploaded: ${item.id}`); }
    catch (error) { state.errors.push({ id: item.id, error: error.message, at: new Date().toISOString() }); save(); throw error; }
  }
  state.completedAt = new Date().toISOString(); save();
  console.log(`Module expansion R2 upload complete: ${uploaded.size}/${files.length}.`);
})().catch((error) => { console.error(error.message); process.exit(1); });
