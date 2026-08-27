const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = path.join(__dirname, "..");
const sourcePath = path.join(root, "src", "lib", "beginnerCambodiaCourse.ts");
const queuePath = path.join(__dirname, "daily-survival-audio-queue.json");
const reviewPagePath = path.join(root, "public", "daily-survival-audio-review.html");
const source = fs.readFileSync(sourcePath, "utf8");
const file = ts.createSourceFile(sourcePath, source, ts.ScriptTarget.Latest, true);

function textArgument(argument, label) {
  if (!argument || !ts.isStringLiteralLike(argument)) {
    throw new Error(`Expected a string for ${label}.`);
  }
  return argument.text;
}

function isNamedCall(node, name) {
  return ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === name;
}

const items = [];

function extractLesson(node) {
  if (!isNamedCall(node, "lesson")) return;
  const [lessonIdArgument, titleArgument, , cardsArgument] = node.arguments;
  if (!ts.isArrayLiteralExpression(cardsArgument)) return;
  const lessonId = textArgument(lessonIdArgument, "lesson id");
  const lessonTitle = textArgument(titleArgument, "lesson title");

  for (const cardNode of cardsArgument.elements) {
    if (!isNamedCall(cardNode, "card")) continue;
    const [idArgument, khmerArgument, englishArgument, , romanizationArgument] = cardNode.arguments;
    const id = textArgument(idArgument, "card id");
    const khmer = textArgument(khmerArgument, "Khmer text");
    const english = textArgument(englishArgument, "English translation");
    const romanization = textArgument(romanizationArgument, "romanization");
    items.push({
      id: `daily-${id}`,
      lessonId,
      lessonTitle,
      khmer,
      english,
      romanization,
      voice: "km-KH-SreymomNeural",
      outputKey: `daily-survival/${id}.mp3`,
      reviewStatus: "pending-khmer-text-review",
      audioStatus: "not-generated",
    });
  }
}

function visit(node) {
  extractLesson(node);
  ts.forEachChild(node, visit);
}

visit(file);
if (items.length === 0) throw new Error("No Daily Survival cards were found.");

const queue = {
  schemaVersion: 1,
  title: "SalaKhmer Daily Survival — Azure Audio Queue",
  language: "km-KH",
  source: "Original SalaKhmer course cards. English is the primary learner language.",
  generationRule:
    "Generate only items changed to approved-for-azure after Khmer text review. Azure is for complete words and sentences, never isolated alphabet letters.",
  createdAt: new Date().toISOString(),
  totalItems: items.length,
  items,
};

fs.writeFileSync(queuePath, `${JSON.stringify(queue, null, 2)}\n`, "utf8");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const rows = items
  .map(
    (item, index) => `
      <article class="card">
        <span class="number">${String(index + 1).padStart(2, "0")}</span>
        <p class="lesson">${escapeHtml(item.lessonTitle)}</p>
        <p class="khmer">${escapeHtml(item.khmer)}</p>
        <p class="english">${escapeHtml(item.english)}</p>
        <p class="romanization">${escapeHtml(item.romanization)}</p>
        <p class="id">${escapeHtml(item.id)}</p>
      </article>`,
  )
  .join("");

const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SalaKhmer — Daily Survival audio review</title>
    <style>
      :root { font-family: Inter, Arial, sans-serif; color: #3e2414; background: #fff9ed; }
      body { margin: 0; padding: 24px; }
      main { max-width: 980px; margin: 0 auto; }
      h1 { margin: 0; } p { line-height: 1.45; color: #725340; }
      .notice { margin: 18px 0; border: 1px solid #edcb87; border-radius: 14px; background: #fff4da; padding: 14px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
      .card { position: relative; border: 1px solid #ecd6aa; border-radius: 14px; background: #fff; padding: 15px; }
      .number { position: absolute; right: 12px; top: 11px; color: #9a785f; font-size: 12px; font-weight: 800; }
      .lesson { margin: 0 28px 10px 0; color: #9a785f; font-size: 12px; font-weight: 800; text-transform: uppercase; }
      .khmer { margin: 0; color: #3e2414; font-family: "Noto Sans Khmer", "Khmer OS", sans-serif; font-size: 27px; font-weight: 700; }
      .english { margin: 8px 0 0; color: #3e2414; font-weight: 700; }
      .romanization { margin: 4px 0 0; font-size: 13px; }
      .id { margin: 10px 0 0; color: #9a785f; font-size: 11px; }
    </style>
  </head>
  <body>
    <main>
      <h1>Daily Survival audio queue</h1>
      <p>${items.length} complete Khmer words and sentences. English is the primary learner language.</p>
      <div class="notice"><strong>Review before Azure:</strong> these are queued only. Azure MP3 generation starts after Khmer spelling and meaning are approved.</div>
      <section class="grid">${rows}</section>
    </main>
  </body>
</html>`;

fs.writeFileSync(reviewPagePath, page, "utf8");
console.log(`Created ${items.length}-item audio queue: ${queuePath}`);
console.log(`Created review page: ${reviewPagePath}`);
