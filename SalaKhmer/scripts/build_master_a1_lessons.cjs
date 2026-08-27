const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const queue = JSON.parse(fs.readFileSync(path.join(__dirname, "a1-master-5000-azure-queue.json"), "utf8"));
const dialogueById = new Map(queue.dialogues.map((dialogue) => [dialogue.dialogue_id, dialogue]));
const dialogueIds = queue.dialogues.map((dialogue) => dialogue.dialogue_id);
const lessonSize = 10;
const lessons = [];
function withoutArtificialIndex(value) {
  return String(value ?? "").replace(/\s+[0-9]+\s*$/, "").trim();
}

for (let index = 0; index < dialogueIds.length; index += lessonSize) {
  const ids = dialogueIds.slice(index, index + lessonSize);
  const dialogues = ids.map((id) => dialogueById.get(id));
  const content = queue.items
    .filter((item) => ids.includes(item.dialogueId))
    .sort((a, b) => a.dialogueId.localeCompare(b.dialogueId) || a.turnNumber - b.turnNumber)
    .map((item) => ({
      id: item.id,
      front: withoutArtificialIndex(item.khmer),
      back: withoutArtificialIndex(item.english),
      desc: withoutArtificialIndex(item.englishPhonetic),
      audioId: item.id,
    }));
  const number = String(lessons.length + 1).padStart(3, "0");
  lessons.push({
    id: `a1-master-set-${number}`,
    categoryId: "module_3",
    title: `A1 Dialogue Set ${number}`,
    description: dialogues.map((dialogue) => dialogue.title_en).join(" • "),
    xpReward: 50,
    type: "conversation",
    content,
  });
}

const destination = path.join(root, "src", "lib", "masterA1Dialogues.ts");
fs.writeFileSync(destination, `import type { LessonMock } from "./mock-lessons";\n\n/** Generated from the owner-supplied A1 master workbook. All content remains pending native review. */\nexport const MASTER_A1_DIALOGUE_LESSONS: LessonMock[] = ${JSON.stringify(lessons, null, 2)};\n`, "utf8");
console.log(`Created ${lessons.length} app lessons from ${queue.totalDialogues} dialogues: ${destination}`);
