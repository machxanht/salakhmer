const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const queuePath = path.join(__dirname, "daily-survival-dialogue-audio-queue.json");
const reviewPagePath = path.join(root, "public", "daily-survival-dialogues-review.html");

// These 20 turns deliberately reuse the Khmer text the owner just approved in
// the Daily Survival batch.  This changes the learning experience from isolated
// flashcards into short, connected situations without inventing unreviewed text.
const dialogues = [
  {
    id: "dialogue-01-first-meeting",
    title: "Meeting someone",
    situation: "Maya meets Dara for the first time.",
    turns: [
      ["Maya", "តើអ្នកឈ្មោះអ្វី?", "What is your name?", "neak chmuoh avei"],
      ["Dara", "ខ្ញុំឈ្មោះ...", "My name is...", "khnhom chmuoh"],
      ["Maya", "ខ្ញុំមកពី...", "I am from...", "khnhom mok pi"],
      ["Dara", "ខ្ញុំជាជនបរទេស", "I am a foreigner", "khnhom chea chun borotes"],
      ["Maya", "រីករាយដែលបានស្គាល់អ្នក", "Nice to meet you", "rik-reay del ban skoa neak"],
    ],
  },
  {
    id: "dialogue-02-polite-hello",
    title: "A polite hello",
    situation: "Dara greets an older neighbour respectfully.",
    turns: [
      ["Dara", "ជំរាបសួរ", "Hello (formal)", "chom-reap-sou"],
      ["Neighbour", "សួស្តី", "Hello / hi", "sous-dei"],
      ["Dara", "សូមទោស", "Sorry / excuse me", "som-toh"],
      ["Neighbour", "អរគុណ", "Thank you", "aw-kun"],
      ["Dara", "លាហើយ", "Goodbye", "lea-haeuy"],
    ],
  },
  {
    id: "dialogue-03-new-friend",
    title: "Making a new friend",
    situation: "Two people exchange a little information after meeting.",
    turns: [
      ["Maya", "ខ្ញុំមកពី...", "I am from...", "khnhom mok pi"],
      ["Dara", "រីករាយដែលបានស្គាល់អ្នក", "Nice to meet you", "rik-reay del ban skoa neak"],
      ["Maya", "ខ្ញុំឈ្មោះ...", "My name is...", "khnhom chmuoh"],
      ["Dara", "តើអ្នកឈ្មោះអ្វី?", "What is your name?", "neak chmuoh avei"],
      ["Maya", "អរគុណ", "Thank you", "aw-kun"],
    ],
  },
  {
    id: "dialogue-04-market-price",
    title: "Asking a market price",
    situation: "Maya asks a vendor about an item.",
    turns: [
      ["Maya", "ថ្លៃប៉ុន្មាន?", "How much does it cost?", "tlai pon-man"],
      ["Maya", "ថ្លៃពេក", "Too expensive", "tlai pek"],
      ["Maya", "សូមបញ្ចុះតម្លៃបានទេ?", "Can you lower the price?", "som banchoh domlai ban te"],
      ["Vendor", "មួយ", "One", "muoy"],
      ["Maya", "ពីរ", "Two", "pi"],
    ],
  },
  {
    id: "dialogue-05-market-size",
    title: "Finding the right size",
    situation: "Maya is shopping for clothing.",
    turns: [
      ["Maya", "មានទំហំតូចជាងនេះទេ?", "Do you have a smaller size?", "mean tomhom touch cheang nih te"],
      ["Maya", "ខ្ញុំយកមួយនេះ", "I will take this one", "khnhom yok muoy nih"],
      ["Vendor", "មានពណ៌ផ្សេងទៀតទេ?", "Do you have another color?", "mean por pseng tiet te"],
      ["Maya", "ខ្ញុំមើលសិន", "I will look first", "khnhom merl sen"],
      ["Maya", "ខ្ញុំចង់ទិញ...", "I want to buy...", "khnhom chong tɨnh"],
    ],
  },
  {
    id: "dialogue-06-looking-first",
    title: "Looking before buying",
    situation: "A vendor offers help; Maya is still deciding.",
    turns: [
      ["Vendor", "មានពណ៌ផ្សេងទៀតទេ?", "Do you have another color?", "mean por pseng tiet te"],
      ["Maya", "ខ្ញុំមើលសិន", "I will look first", "khnhom merl sen"],
      ["Maya", "មានទំហំតូចជាងនេះទេ?", "Do you have a smaller size?", "mean tomhom touch cheang nih te"],
      ["Vendor", "ថ្លៃប៉ុន្មាន?", "How much does it cost?", "tlai pon-man"],
      ["Maya", "ខ្ញុំយកមួយនេះ", "I will take this one", "khnhom yok muoy nih"],
    ],
  },
  {
    id: "dialogue-07-ordering-food",
    title: "Ordering at a restaurant",
    situation: "Maya is ready to choose food.",
    turns: [
      ["Maya", "សូមមើលម៉ឺនុយ", "Please show me the menu", "som merl menu"],
      ["Maya", "ខ្ញុំចង់បាន...", "I would like...", "khnhom chong ban"],
      ["Maya", "មិនហឹរទេ សូមអរគុណ", "Not spicy, please", "min heur te som aw-kun"],
      ["Server", "សូមទឹកមួយកែវ", "A glass of water, please", "som tɨk muoy kaev"],
      ["Maya", "សូមគិតលុយ", "The bill, please", "som ket luy"],
    ],
  },
  {
    id: "dialogue-08-restaurant-request",
    title: "A simple food request",
    situation: "Maya asks for a mild meal and water.",
    turns: [
      ["Maya", "មិនហឹរទេ សូមអរគុណ", "Not spicy, please", "min heur te som aw-kun"],
      ["Maya", "សូមទឹកមួយកែវ", "A glass of water, please", "som tɨk muoy kaev"],
      ["Server", "សូមមើលម៉ឺនុយ", "Please show me the menu", "som merl menu"],
      ["Maya", "ខ្ញុំចង់បាន...", "I would like...", "khnhom chong ban"],
      ["Maya", "សូមគិតលុយ", "The bill, please", "som ket luy"],
    ],
  },
  {
    id: "dialogue-09-tuk-tuk",
    title: "Taking a tuk-tuk",
    situation: "Maya asks a driver for a ride.",
    turns: [
      ["Maya", "ខ្ញុំចង់ទៅ...", "I want to go to...", "khnhom chong tov"],
      ["Maya", "ទៅផ្សារនេះថ្លៃប៉ុន្មាន?", "How much to this market?", "tov psar nih tlai pon-man"],
      ["Driver", "បត់ស្តាំ", "Turn right", "bot sdam"],
      ["Driver", "បត់ឆ្វេង", "Turn left", "bot chhveng"],
      ["Maya", "សូមឈប់នៅទីនេះ", "Please stop here", "som chhob nov ti nih"],
    ],
  },
  {
    id: "dialogue-10-buying-a-sim",
    title: "Buying a SIM card",
    situation: "Maya arrives at a phone shop.",
    turns: [
      ["Maya", "ខ្ញុំចង់ទិញស៊ីមកាត", "I want to buy a SIM card", "khnhom chong tɨnh sim kat"],
      ["Maya", "មានអ៊ីនធឺណិតទេ?", "Does it include internet?", "mean internet te"],
      ["Shop assistant", "សូមជួយចុះឈ្មោះឲ្យខ្ញុំ", "Please help me register it", "som chuoy choh chhmoh aoy khnhom"],
      ["Maya", "លេខទូរសព្ទរបស់ខ្ញុំគឺ...", "My phone number is...", "lek torosap robos khnhom ku"],
      ["Maya", "សេវាមិនដំណើរការ", "The service is not working", "seva min damnaerka"],
    ],
  },
];

const items = dialogues.flatMap((dialogue) =>
  dialogue.turns.map(([speaker, khmer, english, romanization], index) => ({
    id: `${dialogue.id}-turn-${String(index + 1).padStart(2, "0")}`,
    dialogueId: dialogue.id,
    dialogueTitle: dialogue.title,
    speaker,
    khmer,
    english,
    romanization,
    voice: "km-KH-SreymomNeural",
    outputKey: `daily-survival-dialogues/${dialogue.id}-turn-${String(index + 1).padStart(2, "0")}.mp3`,
    reviewStatus: "pending-khmer-text-review",
    audioStatus: "not-generated",
  })),
);

fs.writeFileSync(
  queuePath,
  `${JSON.stringify({
    schemaVersion: 1,
    title: "SalaKhmer Daily Survival Dialogues — Azure Audio Queue",
    language: "km-KH",
    generationRule: "Create Azure audio only after Khmer text review. Generate each turn separately so speakers and playback speed remain controllable in Android, iOS, and web.",
    totalDialogues: dialogues.length,
    totalTurns: items.length,
    dialogues,
    items,
  }, null, 2)}\n`,
  "utf8",
);

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

const dialogueMarkup = dialogues.map((dialogue, dialogueIndex) => `
  <article class="dialogue">
    <p class="number">Dialogue ${String(dialogueIndex + 1).padStart(2, "0")}</p>
    <h2>${escapeHtml(dialogue.title)}</h2>
    <p class="situation">${escapeHtml(dialogue.situation)}</p>
    <div class="turns">${dialogue.turns.map(([speaker, khmer, english, romanization]) => `
      <section class="turn">
        <p class="speaker">${escapeHtml(speaker)}</p>
        <p class="khmer">${escapeHtml(khmer)}</p>
        <p class="english">${escapeHtml(english)}</p>
        <p class="romanization">${escapeHtml(romanization)}</p>
      </section>`).join("")}</div>
  </article>`).join("");

fs.writeFileSync(reviewPagePath, `<!doctype html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>SalaKhmer — Daily Survival Dialogues</title><style>
:root{font-family:Inter,Arial,sans-serif;color:#3e2414;background:#fff9ed}body{margin:0;padding:24px}main{max-width:760px;margin:auto}h1,h2{margin:0}p{line-height:1.45}.notice,.dialogue{border:1px solid #ecd6aa;border-radius:16px;background:#fff;padding:18px;margin:14px 0}.notice{background:#fff4da}.number,.speaker{font-size:12px;font-weight:800;text-transform:uppercase;color:#9a785f;margin:0 0 6px}.situation{margin:8px 0 14px;color:#725340}.turns{display:grid;gap:10px}.turn{border-left:4px solid #f5ab1b;background:#fffaf1;padding:10px 12px;border-radius:0 10px 10px 0}.khmer{font-family:"Noto Sans Khmer","Khmer OS",sans-serif;font-size:25px;font-weight:700;margin:0}.english{font-weight:700;margin:6px 0 0}.romanization{margin:2px 0 0;color:#725340;font-size:13px}@media(max-width:560px){body{padding:14px}}
</style></head><body><main><h1>Daily Survival Dialogues</h1><p>${items.length} connected Khmer lines in ${dialogues.length} everyday situations. English is the primary learning language.</p><div class="notice"><strong>Before Azure:</strong> review the Khmer spelling and meaning once. Each turn will become a separate MP3, so the app can replay a line slowly at 0.6×, normal 1×, or 1.25×.</div>${dialogueMarkup}</main></body></html>`, "utf8");

console.log(`Created ${dialogues.length} dialogues / ${items.length} turns: ${queuePath}`);
console.log(`Created review page: ${reviewPagePath}`);
