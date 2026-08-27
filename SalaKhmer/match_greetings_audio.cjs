const fs = require("fs");
const path = require("path");

const dataFile = fs.readFileSync("src/lib/khmerGreetingData.ts", "utf8");
const lines = dataFile.split("\n");

const greetings = [];
for (const line of lines) {
  const match = line.match(/{ id: "(g[0-9]+-[0-9]+)", khmer: "(.*?)", latin: "(.*?)"/);
  if (match) {
    greetings.push({
      id: match[1],
      khmer: match[2],
      latin: match[3],
    });
  }
}

const audioDir = "public/audio/anki";
const audioFiles = fs.readdirSync(audioDir);

const configPath = "src/lib/audioAssetsConfig.json";
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

let matchCount = 0;

for (const g of greetings) {
  let bestMatch = null;
  let maxScore = 0;

  const kText = g.khmer.toLowerCase().trim();
  const lText = g.latin
    .split("(")[0]
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, ""); // e.g. "suosdey"

  // Exact match
  const exactMatch = audioFiles.find((f) => {
    const lowerF = f.toLowerCase();
    return lowerF === `${kText}.mp3` || lowerF === `${lText}.mp3`;
  });

  if (exactMatch) {
    bestMatch = exactMatch;
  } else {
    // Partial match
    const lWords = lText.split(" ").filter((w) => w.length > 2);
    for (const f of audioFiles) {
      const lowerF = f.toLowerCase();
      let score = 0;
      if (lowerF.includes(kText)) score += 10;
      if (lText.length > 3 && lowerF.includes(lText)) score += 10;
      for (const w of lWords) {
        if (lowerF.includes(w)) score += 1;
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = f;
      }
    }
  }

  if ((bestMatch && maxScore > 0) || exactMatch) {
    console.log(`Matched ${g.id} ("${g.khmer}", "${lText}") with: ${bestMatch}`);
    config[g.id] = {
      id: g.id,
      text_khmer: g.khmer,
      text_english: g.latin,
      audio_url: `/audio/anki/${bestMatch}`,
      license_type: "Local Anki",
    };
    matchCount++;
  } else {
    console.log(`No match for ${g.id} ("${g.khmer}")`);
  }
}

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log(`Matched ${matchCount}/${greetings.length} greetings.`);
