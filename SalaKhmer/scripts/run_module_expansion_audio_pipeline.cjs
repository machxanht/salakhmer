/* Runs each approved module expansion sequentially, then promotes its completed MP3s to R2. */
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const root = path.join(__dirname, "..");
const manifests = [2, 3, 4, 5].map((moduleNumber) => `scripts/module-${moduleNumber}-expansion-v1-audio-manifest.json`);
const statePath = path.join(__dirname, "module-expansion-v1-pipeline-report.json");
const state = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, "utf8")) : { schemaVersion: 1, startedAt: new Date().toISOString(), modules: [], errors: [] };
function save() { state.updatedAt = new Date().toISOString(); fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8"); }
function run(script, manifest) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join("scripts", script), `--input=${manifest}`], { cwd: root, windowsHide: true, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`${script} exited ${code} for ${manifest}`)));
  });
}
(async () => {
  for (const manifest of manifests) {
    const moduleId = path.basename(manifest).match(/module-(\d)/)?.[1];
    const entry = state.modules.find((item) => item.manifest === manifest) ?? { manifest, moduleId, status: "pending" };
    if (!state.modules.includes(entry)) state.modules.push(entry);
    entry.status = "synthesizing"; save();
    await run("generate_module_expansion_azure_audio.cjs", manifest);
    entry.status = "uploading"; save();
    await run("upload_module_expansion_audio_to_r2.cjs", manifest);
    entry.status = "complete"; entry.completedAt = new Date().toISOString(); save();
  }
  state.completedAt = new Date().toISOString(); save();
  console.log("Module expansion Azure + R2 pipeline complete.");
})().catch((error) => { state.errors.push({ error: error.message, at: new Date().toISOString() }); save(); console.error(error.message); process.exit(1); });
