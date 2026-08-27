/*
 * Imports the SalaKhmer Read & Spell workbook into a small JSON catalog used by the app.
 * Usage: node scripts/import_read_spell_workbook.cjs <workbook.xlsx>
 */
const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");

const source = process.argv[2];
if (!source) throw new Error("Usage: node scripts/import_read_spell_workbook.cjs <workbook.xlsx>");

const zip = new AdmZip(source);
const sheetXml = (name) => zip.readAsText(zip.getEntry(`xl/worksheets/${name}.xml`));

function decode(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}

function rowsFromXml(xml) {
  return [...xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)].map(([, row]) =>
    [...row.matchAll(/<c\b[^>]*>([\s\S]*?)<\/c>/g)].map(([, cell]) => {
      const inline = cell.match(/<is><t[^>]*>([\s\S]*?)<\/t><\/is>/);
      const value = cell.match(/<v>([\s\S]*?)<\/v>/);
      return decode((inline?.[1] ?? value?.[1] ?? "").replace(/<[^>]+>/g, ""));
    }),
  );
}

function objectsFromSheet(name) {
  const [header, ...rows] = rowsFromXml(sheetXml(name));
  return rows.map((row) => Object.fromEntries(header.map((key, index) => [key, row[index] ?? ""])));
}

const topics = objectsFromSheet("sheet1").map((topic) => ({
  ...topic,
  topic_order: Number(topic.topic_order),
  estimated_minutes: Number(topic.estimated_minutes),
}));
const vocabulary = objectsFromSheet("sheet2").map((word) => ({
  ...word,
  word_order: Number(word.word_order),
  image_path: `/${word.image_filename}`,
}));

if (topics.length !== 20 || vocabulary.length !== 300) {
  throw new Error(`Unexpected workbook shape: ${topics.length} topics and ${vocabulary.length} words.`);
}

const countByTopic = vocabulary.reduce((counts, word) => {
  counts[word.topic_id] = (counts[word.topic_id] ?? 0) + 1;
  return counts;
}, {});
if (topics.some((topic) => countByTopic[topic.topic_id] !== 15)) {
  throw new Error("Every topic must contain exactly 15 vocabulary items.");
}

const targetDir = path.resolve(__dirname, "../src/lib/generated");
fs.mkdirSync(targetDir, { recursive: true });
fs.writeFileSync(
  path.join(targetDir, "read-spell-catalog.json"),
  `${JSON.stringify({ topics, vocabulary }, null, 2)}\n`,
  "utf8",
);
console.log(`Imported ${topics.length} topics and ${vocabulary.length} vocabulary cards.`);
