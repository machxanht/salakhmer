/**
 * clean_greetings_audio.cjs
 * Cleans up wrong greeting audio mappings.
 * Strategy:
 *   - Remove BAD mappings (wrong audio for the phrase)
 *   - Add CORRECT mappings found manually
 *   - Leave unmatched entries out (so Google TTS handles them correctly)
 */
const fs = require("fs");

const configPath = "src/lib/audioAssetsConfig.json";
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

// IDs to REMOVE (wrong audio mapped to wrong phrase)
const BAD_IDS = [
  "g1-2", // ជម្រាបសួរ → Pchum Ben (WRONG)
  "g2-1", // លាហើយ → check bill please (WRONG)
  "g2-2", // ជម្រាបលា → Pchum Ben (WRONG)
  "g3-3", // យ៉ាងម៉េចហើយ? → mechanism/engine (WRONG)
  "g4-3", // ខ្ញុំមិនសូវស្រួលខ្លួនទេ → minute (WRONG)
  "g5-3", // សូមទោស → handsome (WRONG)
  "g5-4", // មិនអីទេ → minute (WRONG)
  "g5-5", // សូមមេត្តា → handsome (WRONG)
  "g6-2", // ខ្ញុំមកពី... → don't smoke (WRONG)
  "g7-2", // ខ្ញុំអាយុ...ឆ្នាំ → cold (WRONG)
  "g8-2", // ពីរ → thief (WRONG)
  "g8-3", // បី → "in order to" (WRONG)
  "g9-1", // បាទ → debate/negotiate (WRONG)
  "g9-2", // ចាស → old/mature (ចាស ≠ ចាស់, different word)
  "g9-3", // ទេ → country (WRONG)
  "g9-5", // មិនដឹងទេ → minute (WRONG)
  "g10-1", // សូមជួយខ្ញុំផង → together/assist (WRONG)
  "g10-2", // ខ្ញុំមិនយល់ទេ → minute (WRONG)
];

// Remove bad mappings
for (const id of BAD_IDS) {
  if (config[id]) {
    console.log(
      `❌ Removing bad mapping: ${id} "${config[id].text_khmer}" → ${config[id].audio_url}`,
    );
    delete config[id];
  }
}

// CORRECT mappings to ADD based on exact file search
const CORRECT_MAPPINGS = [
  // Numbers - found correct files
  { id: "g8-2", khmer: "ពីរ", latin: "Pir (Hai)", audio: "/audio/anki/two.mp3" },
  { id: "g8-3", khmer: "បី", latin: "Bei (Ba)", audio: "/audio/anki/three.mp3" },
  // Yes/No
  { id: "g9-1", khmer: "បាទ", latin: "Bat (Vâng - Nam)", audio: "/audio/anki/yes male.mp3" },
  { id: "g9-2", khmer: "ចាស", latin: "Chas (Vâng - Nữ)", audio: "/audio/anki/yes female.mp3" },
  { id: "g9-3", khmer: "ទេ", latin: "Te (Không)", audio: "/audio/anki/no.mp3" },
  // Sorry / Please
  { id: "g5-3", khmer: "សូមទោស", latin: "Som tos (Xin lỗi)", audio: "/audio/anki/sorry.mp3" },
  {
    id: "g5-5",
    khmer: "សូមមេត្តា",
    latin: "Som metta (Vui lòng)",
    audio: "/audio/anki/please.mp3",
  },
];

for (const m of CORRECT_MAPPINGS) {
  console.log(`✅ Adding correct: ${m.id} "${m.khmer}" → ${m.audio}`);
  config[m.id] = {
    id: m.id,
    text_khmer: m.khmer,
    text_english: m.latin,
    audio_url: m.audio,
    license_type: "Local Anki",
  };
}

fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");

// Print final summary
const greetKeys = Object.keys(config).filter((k) => k.startsWith("g"));
console.log(`\n✅ Final greeting audio mappings (${greetKeys.length} total):`);
for (const k of greetKeys.sort()) {
  console.log(`  ${k}: "${config[k].text_khmer}" → ${config[k].audio_url}`);
}
