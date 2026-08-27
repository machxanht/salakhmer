/*
 * Builds a narrow re-voice manifest for the male turns of the later Module 3
 * conversations. It preserves the existing stable R2 object keys, so the app
 * does not need a deployment or an audio URL migration.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const sourcePath = path.join(root, "src", "lib", "module-content-expansion.ts");
const sourceLines = fs.readFileSync(sourcePath, "utf8").split(/\r?\n/);
const inputPath = path.join(__dirname, "module-3-expansion-v1-audio-manifest.json");
const outputPath = path.join(__dirname, "module-3-expansion-male-revoice-manifest.json");
const original = JSON.parse(fs.readFileSync(inputPath, "utf8"));

let inDialogueSeeds = false;
let inTurns = false;
let turnIndex = 0;
const voiceForSource = new Map();

for (const [index, line] of sourceLines.entries()) {
  if (line.includes("const dialogueSeeds")) inDialogueSeeds = true;
  if (!inDialogueSeeds) continue;
  if (line.match(/^\s*turns:\s*\[/)) { inTurns = true; turnIndex = 0; continue; }
  if (inTurns && line.match(/^\s*\],\s*$/)) { inTurns = false; continue; }
  if (inTurns && line.match(/^\s*\[\s*["']/)) {
    const lineNumber = index + 1;
    voiceForSource.set(`src/lib/module-content-expansion.ts:${lineNumber}`, turnIndex % 2 === 0 ? "km-KH-SreymomNeural" : "km-KH-PisethNeural");
    turnIndex += 1;
  }
}

const items = original.items
  .filter((item) => item.sources?.some((source) => voiceForSource.get(source) === "km-KH-PisethNeural"))
  .map((item) => ({ ...item, voice: "km-KH-PisethNeural", reviewStatus: "approved-for-azure", audioStatus: "revoice-pending" }));

if (!items.length) throw new Error("No male dialogue turns were found. Source structure changed; do not generate audio.");
const manifest = {
  schemaVersion: 1,
  createdAt: new Date().toISOString(),
  moduleId: "module_3",
  purpose: "Replace only alternating male dialogue turns with km-KH-PisethNeural; stable keys match existing learner audio URLs.",
  items,
};
fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Created ${items.length} male-turn revoice records: ${path.relative(root, outputPath)}`);
