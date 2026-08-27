/**
 * fix_greetings_audio.cjs
 * Scans ALL anki audio files and maps them to greeting data entries.
 * Uses Unicode-safe reading via Node.js Buffer.
 */
const fs = require("fs");
const path = require("path");

const audioDir = path.join(__dirname, "public/audio/anki");
const configPath = path.join(__dirname, "src/lib/audioAssetsConfig.json");

// Read all audio files with proper encoding
const audioFiles = fs.readdirSync(audioDir, { encoding: "utf8" });

console.log(`Total audio files: ${audioFiles.length}`);

// Read existing config
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

// All greeting phrases we want to match
const greetingMappings = [
  // Lesson 1: Chào hỏi cơ bản
  {
    id: "g1-1",
    khmer: "សួស្ដី",
    latin: "suosdey",
    keywords: ["suosdey", "hello", "hi", "greeting"],
  },
  {
    id: "g1-2",
    khmer: "ជម្រាបសួរ",
    latin: "chum reap sour",
    keywords: ["chum", "reap", "sour", "formal"],
  },
  { id: "g1-3", khmer: "អរុណសួស្ដី", latin: "arun suosdey", keywords: ["arun", "morning"] },
  {
    id: "g1-4",
    khmer: "ទិវាសួស្ដី",
    latin: "tivea suosdey",
    keywords: ["tivea", "afternoon", "daytime"],
  },
  {
    id: "g1-5",
    khmer: "សាយ័ន្តសួស្ដី",
    latin: "sayan suosdey",
    keywords: ["sayan", "evening", "night"],
  },
  // Lesson 2: Tạm biệt
  { id: "g2-1", khmer: "លាហើយ", latin: "lea hey", keywords: ["lea", "bye", "goodbye"] },
  {
    id: "g2-2",
    khmer: "ជម្រាបលា",
    latin: "chum reap lea",
    keywords: ["chum", "lea", "formal", "goodbye"],
  },
  {
    id: "g2-3",
    khmer: "រាត្រីសួស្ដី",
    latin: "reatrey suosdey",
    keywords: ["reatrey", "night", "goodnight"],
  },
  {
    id: "g2-4",
    khmer: "ជួបគ្នាពេលក្រោយ",
    latin: "chuob knea pel kraoy",
    keywords: ["chuob", "knea", "meet", "see you"],
  },
  {
    id: "g2-5",
    khmer: "សំណាងល្អ",
    latin: "somnang laor",
    keywords: ["somnang", "luck", "good luck"],
  },
  // Lesson 3: Hỏi thăm sức khỏe
  {
    id: "g3-1",
    khmer: "សុខភាពល្អទេ?",
    latin: "sokhaphiap laor te",
    keywords: ["sokhaphiap", "health", "ok"],
  },
  {
    id: "g3-2",
    khmer: "សុខសប្បាយជាទេ?",
    latin: "sok sabay chea te",
    keywords: ["sok", "sabay", "happy", "ok"],
  },
  { id: "g3-3", khmer: "យ៉ាងម៉េចហើយ?", latin: "yang mech hey", keywords: ["yang", "mech", "how"] },
  // Lesson 4: Trả lời sức khỏe
  {
    id: "g4-1",
    khmer: "ខ្ញុំសុខសប្បាយ",
    latin: "knhom sok sabay",
    keywords: ["knhom", "sok", "sabay", "fine"],
  },
  {
    id: "g4-2",
    khmer: "ខ្ញុំល្អ",
    latin: "knhom laor",
    keywords: ["knhom", "laor", "good", "i am"],
  },
  {
    id: "g4-3",
    khmer: "ខ្ញុំមិនសូវស្រួលខ្លួនទេ",
    latin: "knhom min sov sruol",
    keywords: ["min", "sov", "sruol", "not well", "sick"],
  },
  // Lesson 5: Cảm ơn & Xin lỗi
  { id: "g5-1", khmer: "អរគុណ", latin: "orkun", keywords: ["orkun", "thank", "thanks"] },
  {
    id: "g5-2",
    khmer: "អរគុណច្រើន",
    latin: "orkun chraen",
    keywords: ["orkun", "thank", "very much", "much"],
  },
  { id: "g5-3", khmer: "សូមទោស", latin: "som tos", keywords: ["som", "tos", "sorry", "excuse"] },
  { id: "g5-4", khmer: "មិនអីទេ", latin: "min ey te", keywords: ["min", "ey", "ok", "no problem"] },
  { id: "g5-5", khmer: "សូមមេត្តា", latin: "som metta", keywords: ["som", "metta", "please"] },
  // Lesson 6: Giới thiệu bản thân
  {
    id: "g6-1",
    khmer: "ខ្ញុំឈ្មោះ...",
    latin: "knhom chhmoh",
    keywords: ["knhom", "chhmoh", "name", "my name"],
  },
  {
    id: "g6-2",
    khmer: "ខ្ញុំមកពី...",
    latin: "knhom mok pi",
    keywords: ["knhom", "mok", "pi", "from", "come from"],
  },
  {
    id: "g6-3",
    khmer: "ខ្ញុំមកពីប្រទេសវៀតណាម",
    latin: "knhom mok pi brates vietnam",
    keywords: ["vietnam", "viet", "from"],
  },
  {
    id: "g6-4",
    khmer: "រីករាយដែលបានស្គាល់",
    latin: "rik reay del ban skoal",
    keywords: ["rik", "reay", "nice", "meet", "pleased"],
  },
  // Lesson 7: Hỏi tuổi
  {
    id: "g7-1",
    khmer: "អ្នកអាយុប៉ុន្មាន?",
    latin: "neak ayu ponman",
    keywords: ["ayu", "ponman", "age", "how old"],
  },
  {
    id: "g7-2",
    khmer: "ខ្ញុំអាយុ...ឆ្នាំ",
    latin: "knhom ayu...chhnham",
    keywords: ["ayu", "chhnham", "years", "old"],
  },
  { id: "g7-3", khmer: "ចាស់", latin: "chah", keywords: ["old", "mature", "aged"] },
  { id: "g7-4", khmer: "ក្មេង", latin: "kmeng", keywords: ["young", "child", "kmeng"] },
  // Lesson 8: Số đếm 1-10
  { id: "g8-1", khmer: "មួយ", latin: "muoy", keywords: ["muoy", "one", "1"] },
  { id: "g8-2", khmer: "ពីរ", latin: "pir", keywords: ["pir", "two", "2"] },
  { id: "g8-3", khmer: "បី", latin: "bei", keywords: ["bei", "three", "3"] },
  { id: "g8-4", khmer: "បួន", latin: "buan", keywords: ["buan", "four", "4"] },
  { id: "g8-5", khmer: "ប្រាំ", latin: "pram", keywords: ["pram", "five", "5"] },
  // Lesson 9: Đồng ý / Từ chối
  { id: "g9-1", khmer: "បាទ", latin: "bat", keywords: ["bat", "yes", "male"] },
  { id: "g9-2", khmer: "ចាស", latin: "chas", keywords: ["chas", "yes", "female"] },
  { id: "g9-3", khmer: "ទេ", latin: "te", keywords: ["te", "no", "not"] },
  {
    id: "g9-4",
    khmer: "យល់ព្រម",
    latin: "yol prom",
    keywords: ["yol", "prom", "agree", "ok", "promise"],
  },
  {
    id: "g9-5",
    khmer: "មិនដឹងទេ",
    latin: "min doeng te",
    keywords: ["min", "doeng", "know", "don't"],
  },
  // Lesson 10: Xin phép & Giúp đỡ
  {
    id: "g10-1",
    khmer: "សូមជួយខ្ញុំផង",
    latin: "som chuoy knhom phong",
    keywords: ["chuoy", "help", "assist"],
  },
  {
    id: "g10-2",
    khmer: "ខ្ញុំមិនយល់ទេ",
    latin: "knhom min yol te",
    keywords: ["min", "yol", "understand", "not"],
  },
  {
    id: "g10-3",
    khmer: "តើអ្នកនិយាយភាសាអង់គ្លេសបានទេ?",
    latin: "tael neak niyay phiasa angkles ban te",
    keywords: ["english", "angkles", "speak", "language"],
  },
  {
    id: "g10-4",
    khmer: "សូមនិយាយយឺតៗ",
    latin: "som niyay yuet yuet",
    keywords: ["yuet", "slow", "slowly", "speak"],
  },
  { id: "g10-5", khmer: "ត្រូវ", latin: "trouv", keywords: ["trouv", "correct", "right", "yes"] },
];

let matchCount = 0;
let totalMatched = 0;

for (const g of greetingMappings) {
  // 1. Try exact Khmer match in filename
  let matched = audioFiles.find((f) => f.includes(g.khmer));

  if (!matched) {
    // 2. Try keyword match (case-insensitive in latin/english part)
    const lowerFiles = audioFiles.map((f) => ({ original: f, lower: f.toLowerCase() }));
    for (const kw of g.keywords) {
      const kwLower = kw.toLowerCase();
      const found = lowerFiles.find((f) => f.lower.includes(kwLower));
      if (found) {
        matched = found.original;
        break;
      }
    }
  }

  if (matched) {
    const audioUrl = `/audio/anki/${matched}`;
    console.log(`✅ ${g.id} "${g.khmer}" → ${matched}`);
    config[g.id] = {
      id: g.id,
      text_khmer: g.khmer,
      text_english: g.latin,
      audio_url: audioUrl,
      license_type: "Local Anki",
    };
    matchCount++;
  } else {
    console.log(`❌ ${g.id} "${g.khmer}" → NO MATCH`);
  }
  totalMatched++;
}

fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
console.log(`\nDone: ${matchCount}/${totalMatched} matched and saved to audioAssetsConfig.json`);
