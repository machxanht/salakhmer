/*
 * Builds a review-first Azure TTS manifest for newly-added Module 2--6 content.
 *
 * This script never calls Azure and never edits lesson source.  Pass only the
 * newly-added content files so existing published audio is not re-queued:
 *   node scripts/collect_module_expansion_audio.cjs --module=3 --inputs=src/lib/new-dialogues.ts
 *
 * Each item has a stable ID derived from its source path plus Khmer text.  The
 * generator can therefore resume safely without replacing an MP3.  One-glyph
 * strings (alphabet characters / vowel signs) are deliberately excluded: this
 * queue is for complete Khmer words and sentences only.
 */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = path.join(__dirname, "..");
const moduleArgument = process.argv.find((value) => value.startsWith("--module="))?.slice(9);
const inputArgument = process.argv.find((value) => value.startsWith("--inputs="))?.slice(9);
const outputArgument = process.argv.find((value) => value.startsWith("--output="))?.slice(9);
const markApproved = process.argv.includes("--mark-approved");
const variableName = process.argv.find((value) => value.startsWith("--variable="))?.slice(11);
const tupleIndexArgument = process.argv.find((value) => value.startsWith("--tuple-index="))?.slice(14);
const tupleIndex = tupleIndexArgument === undefined ? undefined : Number(tupleIndexArgument);
const moduleId = `module_${moduleArgument}`;

if (!/^[2-6]$/.test(moduleArgument ?? "")) {
  throw new Error("Use --module=2, --module=3, --module=4, --module=5, or --module=6.");
}
if (!inputArgument) throw new Error("Use --inputs=path/to/new-content.ts[,another-file.json].");
if ((variableName === undefined) !== (tupleIndex === undefined)) {
  throw new Error("Use --variable=<source variable> and --tuple-index=<zero-based Khmer field> together, or neither.");
}
if (tupleIndex !== undefined && (!Number.isInteger(tupleIndex) || tupleIndex < 0)) {
  throw new Error("--tuple-index must be a non-negative integer.");
}

const inputs = inputArgument
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean)
  .map((value) => path.resolve(root, value));
const defaultBase = `module-${moduleArgument}-expansion-v1`;
const manifestPath = path.resolve(root, outputArgument ?? `scripts/${defaultBase}-audio-manifest.json`);
const reportPath = manifestPath.replace(/\.json$/, "-report.json");
const khmerCharacter = /[\u1780-\u17FF]/u;
const onlyKhmerAndPunctuation = /^[\u1780-\u17FF\s\u200b\u200c\u200d\u17d4\u17d5,.!?៖។ៗ០-៩]+$/u;

function normalizedKhmer(value) {
  return String(value).normalize("NFC").replace(/\s+/gu, " ").trim();
}

function isCompleteKhmerText(value) {
  const text = normalizedKhmer(value);
  const khmerCount = Array.from(text).filter((character) => khmerCharacter.test(character)).length;
  return khmerCount >= 2 && onlyKhmerAndPunctuation.test(text);
}

function stableId(relativePath, text) {
  const digest = crypto.createHash("sha256").update(`${relativePath}\n${text}`, "utf8").digest("hex").slice(0, 16);
  return `${defaultBase}-${digest}`;
}

function sourceLocation(sourceFile, node) {
  const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
  return `${path.relative(root, sourceFile.fileName).replaceAll("\\", "/")}:${position.line + 1}`;
}

function stringsFromTypeScript(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true);
  const result = [];
  function collectAllStrings(node) {
    if (ts.isStringLiteralLike(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const text = normalizedKhmer(node.text);
      if (isCompleteKhmerText(text)) result.push({ text, source: sourceLocation(sourceFile, node) });
    }
    ts.forEachChild(node, collectAllStrings);
  }
  function collectTupleStrings(node) {
    if (ts.isArrayLiteralExpression(node)) {
      const candidate = node.elements[tupleIndex];
      // Only accept literal tuple fields. This avoids taking nested arrays,
      // translations, options, and template text from the same source block.
      if (candidate && ts.isStringLiteralLike(candidate)) {
        const text = normalizedKhmer(candidate.text);
        if (isCompleteKhmerText(text)) result.push({ text, source: sourceLocation(sourceFile, candidate) });
        // This is a complete source tuple. Do not descend into its sibling
        // arrays (for example a review lesson's ordering tokens), which are
        // not independently playable audio prompts.
        return;
      }
      ts.forEachChild(node, collectTupleStrings);
      return;
    }
    ts.forEachChild(node, collectTupleStrings);
  }
  if (!variableName) {
    collectAllStrings(sourceFile);
    return result;
  }
  let found = false;
  function findVariable(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === variableName) {
      if (!node.initializer) throw new Error(`${variableName} has no initializer.`);
      found = true;
      collectTupleStrings(node.initializer);
      return;
    }
    ts.forEachChild(node, findVariable);
  }
  findVariable(sourceFile);
  if (!found) throw new Error(`Variable ${variableName} was not found in ${filePath}.`);
  return result;
}

function stringsFromJson(filePath) {
  const result = [];
  const relativePath = path.relative(root, filePath).replaceAll("\\", "/");
  const visit = (value, pointer) => {
    if (typeof value === "string") {
      const text = normalizedKhmer(value);
      if (isCompleteKhmerText(text)) result.push({ text, source: `${relativePath}#${pointer}` });
      return;
    }
    if (Array.isArray(value)) value.forEach((item, index) => visit(item, `${pointer}/${index}`));
    else if (value && typeof value === "object") Object.entries(value).forEach(([key, item]) => visit(item, `${pointer}/${key}`));
  };
  visit(JSON.parse(fs.readFileSync(filePath, "utf8")), "");
  return result;
}

const discovered = [];
for (const filePath of inputs) {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) throw new Error(`Input does not exist: ${filePath}`);
  if (/\.json$/i.test(filePath)) discovered.push(...stringsFromJson(filePath));
  else if (/\.[cm]?[jt]sx?$/i.test(filePath)) discovered.push(...stringsFromTypeScript(filePath));
  else throw new Error(`Unsupported input type: ${filePath}. Use .ts/.tsx/.js/.jsx/.json only.`);
}

const byText = new Map();
for (const entry of discovered) {
  const existing = byText.get(entry.text);
  if (existing) existing.sources.push(entry.source);
  else byText.set(entry.text, { ...entry, sources: [entry.source] });
}
const items = [...byText.values()]
  .map(({ text, sources }) => {
    const sourcePath = sources[0].split(":")[0].split("#")[0];
    const id = stableId(sourcePath, text);
    return {
      id,
      moduleId,
      khmer: text,
      voice: "km-KH-SreymomNeural",
      outputKey: `module-expansion-v1/${moduleId}/${id}.mp3`,
      // This switch is intentionally explicit: normal collection remains
      // review-only. The owner may use it only after a content handoff has
      // confirmed the exact input file is final.
      reviewStatus: markApproved ? "approved-for-azure" : "pending-khmer-text-review",
      audioStatus: "not-generated",
      sources,
    };
  })
  .sort((left, right) => left.id.localeCompare(right.id));
const totalCharacters = items.reduce((total, item) => total + Array.from(item.khmer).length, 0);
const manifest = {
  schemaVersion: 1,
  createdAt: new Date().toISOString(),
  moduleId,
  inputs: inputs.map((filePath) => path.relative(root, filePath).replaceAll("\\", "/")),
  sourceSelection: variableName ? { variableName, tupleIndex } : "all eligible Khmer strings",
  generationRule: "Review Khmer text first. Generate only items marked approved-for-azure. Complete Khmer words and sentences only; no isolated alphabet characters or vowel signs.",
  outputPrefix: `audio/module-expansion-v1/${moduleId}/`,
  totalDiscoveredStrings: discovered.length,
  uniqueSynthesizableItems: items.length,
  estimatedAzureCharacters: totalCharacters,
  items,
};
fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
fs.writeFileSync(reportPath, `${JSON.stringify({
  schemaVersion: 1,
  createdAt: manifest.createdAt,
  manifest: path.relative(root, manifestPath).replaceAll("\\", "/"),
  moduleId,
  inputs: manifest.inputs,
  totalDiscoveredStrings: discovered.length,
  uniqueSynthesizableItems: items.length,
  estimatedAzureCharacters: totalCharacters,
  excluded: "One-glyph / non-Khmer / mixed-language strings are excluded by design.",
  nextStep: markApproved
    ? "Approved manifest ready. Run audio:module-expansion with --input=<manifest>."
    : "Set selected manifest items to reviewStatus=approved-for-azure, then run audio:module-expansion with --input=<manifest>.",
}, null, 2)}\n`, "utf8");
console.log(`Module ${moduleArgument} audio manifest: ${items.length} unique Khmer items; ${totalCharacters} estimated Azure characters.`);
console.log(`Manifest: ${path.relative(root, manifestPath)}`);
console.log(`Report: ${path.relative(root, reportPath)}`);
