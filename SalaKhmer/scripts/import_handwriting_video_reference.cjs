/*
 * Imports owner-supplied handwriting videos as PRIVATE reference material.
 *
 * It deliberately writes only inside .reference/ (never public/), so MP4s
 * cannot be served by the web app or included in the production build.
 * Each record is a source map for one future, independently-reviewed SVG.
 */
const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");

const zipFile = process.argv[2];
if (!zipFile || !fs.existsSync(zipFile)) {
  throw new Error("Usage: node scripts/import_handwriting_video_reference.cjs <Downloads.zip>");
}

const root = path.resolve(".reference", "handwriting-videos");
fs.mkdirSync(root, { recursive: true });

function sourceLabel(filename) {
  const quoted = filename.match(/[＂"«]([^＂"»]+)[＂"»]/u)?.[1];
  if (quoted) return quoted.trim();
  const independent = filename.match(/^លំនាំសរសេរ\s+([ក-៿]+)/u)?.[1];
  return independent?.trim() ?? null;
}

function groupFor(filename) {
  if (filename.includes("ទាំង ២៣តួ")) return "overview";
  if (filename.includes("How to write")) return "consonant";
  if (filename.includes("ស្រៈ")) return "dependent-vowel";
  return "independent-vowel";
}

const zip = new AdmZip(zipFile);
const records = zip
  .getEntries()
  .filter((entry) => !entry.isDirectory && entry.entryName.toLowerCase().endsWith(".mp4"))
  .map((entry) => {
    const sourceName = entry.entryName;
    const label = sourceLabel(sourceName) ?? (sourceName.includes("ទាំង ២៣តួ") ? "ស្រៈនិស្ស័យទាំង ២៣តួ" : null);
    const stableId = sourceName.match(/\[([^\]]+)\]\.mp4$/)?.[1] ?? Buffer.from(sourceName).toString("hex").slice(0, 12);
    const destination = `${stableId}.mp4`;
    const output = path.join(root, destination);
    if (!fs.existsSync(output)) fs.writeFileSync(output, entry.getData());
    return {
      id: stableId,
      label,
      group: groupFor(sourceName),
      sourceName,
      privateReferencePath: path.posix.join(".reference/handwriting-videos", destination),
      status: "needs-owner-review",
      svgStatus: "not-started",
      instruction: "Inspect the lower writing animation only. Do not copy thumbnail, title, Subscribe text, frames, or video into the app.",
    };
  })
  .sort((a, b) => a.sourceName.localeCompare(b.sourceName, "km"));

fs.writeFileSync(
  path.join(root, "manifest.json"),
  `${JSON.stringify({ version: 1, importedAt: new Date().toISOString(), records }, null, 2)}\n`,
);

const totals = records.reduce((all, record) => {
  all[record.group] = (all[record.group] || 0) + 1;
  return all;
}, {});
console.log(`Imported ${records.length} private reference videos.`);
console.log(totals);
