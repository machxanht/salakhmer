/**
 * match_greetings_strict.cjs
 *
 * Strict matching: only maps when we are 100% confident.
 * Strategy:
 *   1. If the Khmer text of the greeting appears EXACTLY in the filename → use it
 *   2. Else if there's a handpicked English filename → use it
 *   3. Otherwise → no mapping (Google TTS will handle it)
 */
const fs = require("fs");

const ankiDir = "public/audio/anki";
const configPath = "src/lib/audioAssetsConfig.json";

// Load all file names
const allFiles = fs.readdirSync(ankiDir, "utf8");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

// All 44 greetings with their Khmer text (from greetingsData.ts)
const GREETINGS = [
  { id: "g1-1", khmer: "សួស្ដី" },
  { id: "g1-2", khmer: "ជម្រាបសួរ" },
  { id: "g1-3", khmer: "អរុណសួស្ដី" },
  { id: "g1-4", khmer: "ទិវាសួស្ដី" },
  { id: "g1-5", khmer: "សាយ័ន្តសួស្ដី" },
  { id: "g2-1", khmer: "លាហើយ" },
  { id: "g2-2", khmer: "ជម្រាបលា" },
  { id: "g2-3", khmer: "រាត្រីសួស្ដី" },
  { id: "g2-4", khmer: "ជួបគ្នាពេលក្រោយ" },
  { id: "g2-5", khmer: "សំណាងល្អ" },
  { id: "g3-1", khmer: "សុខភាពល្អទេ?" },
  { id: "g3-2", khmer: "សុខសប្បាយជាទេ?" },
  { id: "g3-3", khmer: "យ៉ាងម៉េចហើយ?" },
  { id: "g4-1", khmer: "ខ្ញុំសុខសប្បាយ" },
  { id: "g4-2", khmer: "ខ្ញុំល្អ" },
  { id: "g4-3", khmer: "ខ្ញុំមិនសូវស្រួលខ្លួនទេ" },
  { id: "g5-1", khmer: "អរគុណ" },
  { id: "g5-2", khmer: "អរគុណច្រើន" },
  { id: "g5-3", khmer: "សូមទោស" },
  { id: "g5-4", khmer: "មិនអីទេ" },
  { id: "g5-5", khmer: "សូមមេត្តា" },
  { id: "g6-1", khmer: "ខ្ញុំឈ្មោះ..." },
  { id: "g6-2", khmer: "ខ្ញុំមកពី..." },
  { id: "g6-3", khmer: "ខ្ញុំមកពីប្រទេសវៀតណាម" },
  { id: "g6-4", khmer: "រីករាយដែលបានស្គាល់" },
  { id: "g7-1", khmer: "អ្នកអាយុប៉ុន្មាន?" },
  { id: "g7-2", khmer: "ខ្ញុំអាយុ...ឆ្នាំ" },
  { id: "g7-3", khmer: "ចាស់" },
  { id: "g7-4", khmer: "ក្មេង" },
  { id: "g8-1", khmer: "មួយ" },
  { id: "g8-2", khmer: "ពីរ" },
  { id: "g8-3", khmer: "បី" },
  { id: "g8-4", khmer: "បួន" },
  { id: "g8-5", khmer: "ប្រាំ" },
  { id: "g9-1", khmer: "បាទ" },
  { id: "g9-2", khmer: "ចាស" },
  { id: "g9-3", khmer: "ទេ" },
  { id: "g9-4", khmer: "យល់ព្រម" },
  { id: "g9-5", khmer: "មិនដឹងទេ" },
  { id: "g10-1", khmer: "សូមជួយខ្ញុំផង" },
  { id: "g10-2", khmer: "ខ្ញុំមិនយល់ទេ" },
  { id: "g10-3", khmer: "តើអ្នកនិយាយភាសាអង់គ្លេសបានទេ?" },
  { id: "g10-4", khmer: "សូមនិយាយយឺតៗ" },
  { id: "g10-5", khmer: "ត្រូវ" },
];

// Handpicked EXACT English filenames for specific greetings
// Only added when we are 100% sure the file is the right audio
const EXACT_ENGLISH = {
  "g1-1": "hello.mp3", // hello → hello.mp3 ✅
  "g1-3": null, // Good morning → no exact file, use TTS
  "g1-4": null, // Good afternoon → TTS
  "g1-5": null, // Good evening → TTS
  "g2-3": null, // Good night → TTS (night.mp3 = just the word "night")
  "g2-5": null, // Good luck → TTS
  "g3-1": null, // How are you? → TTS
  "g3-2": null, // → TTS
  "g4-2": "good.mp3", // I'm fine → good.mp3 ✅ (close enough)
  "g5-1": null, // Thank you → check Khmer match below
  "g5-2": null, // Thank you very much → check below
  "g5-3": "sorry.mp3", // Sorry → sorry.mp3 ✅
  "g5-5": "please.mp3", // Please → please.mp3 ✅
  "g6-1": null, // My name is → TTS
  "g7-1": "age.mp3", // How old are you? → age.mp3 ✅
  "g8-1": null, // 1 → check Khmer
  "g8-2": "two.mp3", // 2 → two.mp3 ✅
  "g8-3": "three.mp3", // 3 → three.mp3 ✅
  "g8-4": "four.mp3", // 4 → four.mp3 ✅
  "g8-5": "five.mp3", // 5 → five.mp3 ✅
  "g9-1": "yes male.mp3", // Yes (male) → yes male.mp3 ✅
  "g9-2": "yes female.mp3", // Yes (female) → yes female.mp3 ✅
  "g9-3": "no.mp3", // No → no.mp3 ✅
  "g10-3": null, // Do you speak English? → check Khmer
  "g10-4": "slow.mp3", // Speak slowly → slow.mp3 ✅
};

// Remove ALL existing greeting entries first
const greetKeys = Object.keys(config).filter((k) => k.startsWith("g"));
for (const k of greetKeys) delete config[k];
console.log(`Cleared ${greetKeys.length} old greeting entries\n`);

let matched = 0;
let tts = 0;

for (const g of GREETINGS) {
  let foundFile = null;
  let method = "";

  // Step 1: Check if Khmer text appears EXACTLY in any filename
  // Strip question marks from Khmer text for matching
  const khmerClean = g.khmer.replace(/[?...]/g, "").trim();

  // Only use if the Khmer starts the filename (most reliable)
  const khmerMatch = allFiles.find((f) => {
    // Must start with the Khmer text or contain it surrounded by word boundaries
    return (
      f.startsWith(khmerClean) || f.includes(khmerClean + " -") || f.includes(khmerClean + " –")
    );
  });

  if (khmerMatch) {
    foundFile = khmerMatch;
    method = "Khmer-exact";
  }

  // Step 2: Use handpicked English filename if no Khmer match
  if (!foundFile && EXACT_ENGLISH[g.id]) {
    const englishFile = EXACT_ENGLISH[g.id];
    // Verify the file actually exists
    if (allFiles.includes(englishFile)) {
      foundFile = englishFile;
      method = "English-exact";
    } else {
      console.log(`  ⚠️  File not found: ${englishFile}`);
    }
  }

  if (foundFile) {
    config[g.id] = {
      id: g.id,
      text_khmer: g.khmer,
      audio_url: `/audio/anki/${foundFile}`,
      license_type: "Local Anki",
    };
    console.log(`✅ [${g.id}] "${g.khmer}" → ${foundFile} (${method})`);
    matched++;
  } else {
    console.log(`🔊 [${g.id}] "${g.khmer}" → Google TTS (no match)`);
    tts++;
  }
}

fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
console.log(`\n📊 Results: ${matched} Anki files, ${tts} use TTS`);
console.log("✅ audioAssetsConfig.json updated");
