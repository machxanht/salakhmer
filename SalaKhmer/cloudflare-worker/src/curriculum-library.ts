/**
 * Curated, paraphrased tutor material derived from the owner's reference PDFs.
 * This is teaching guidance, not a reproduction of pages or dialogues.
 * Keep additions reviewable and attribute their source family in `source`.
 */
type CurriculumCard = {
  id: string;
  level: string;
  topics: string[];
  keywords: string[];
  source: "Learn Khmer" | "SGK Tap Doc A1" | "Khmer handwriting reference" | "SalaKhmer editorial" | "Basic Khmer (MSU, CC BY 4.0)";
  facts: string[];
};

const CARDS: readonly CurriculumCard[] = [
  {
    id: "script-overview", level: "Script Basics", source: "Learn Khmer",
    topics: ["alphabet", "consonants", "script"],
    keywords: ["alphabet", "script", "consonant", "letter", "b\u1ea3ng ch\u1eef", "ch\u1eef c\u00e1i", "\u1796\u17d2\u1799\u1789\u17d2\u1787\u1793\u17c8"],
    facts: ["SalaKhmer teaches the 33 consonant letters through two learner-facing series: A-series first, then O-series.", "Teach recognition and listening before asking a beginner to decode a full word.", "Use the app's approved learner cues rather than IPA unless the learner explicitly requests linguistic notation."],
  },
  {
    id: "series-contrast", level: "Levels 1-2", source: "SalaKhmer editorial",
    topics: ["A-series", "O-series", "sound comparison"],
    keywords: ["a-series", "o-series", "series", "gi\u1ecdng a", "gi\u1ecdng o", "k-aw", "k-o"],
    facts: ["Level 1 uses the learner cue ending -aw; Level 2 uses the learner cue ending -o.", "A learner cue is an English-friendly memory aid, not a complete phonetic description.", "When comparing letters, name the visible character and its level before giving a practice suggestion."],
  },
  {
    id: "aspiration", level: "Levels 1-2", source: "SalaKhmer editorial",
    topics: ["aspiration", "listening"],
    keywords: ["aspirated", "puff", "b\u1eadt h\u01a1i", "kh", "chh", "ph"],
    facts: ["An aspirated learner cue means a noticeable release of air after the consonant.", "Do not write Khmer P-as-p-h as English 'ph' without explaining that English readers may mistake it for /f/.", "Use listening comparison before requiring the learner to produce the contrast."],
  },
  {
    id: "coeng", level: "Level 3", source: "Learn Khmer",
    topics: ["sub-consonants", "clusters", "word building"],
    keywords: ["coeng", "sub-consonant", "subconsonant", "\u1787\u17be\u1784\u17a2\u1780\u17d2\u179f\u179a", "ph\u1ee5 \u00e2m ch\u00e2n"],
    facts: ["A coeng form is a smaller consonant form used below a main consonant when Khmer builds a word.", "Teach the learner to identify the main consonant first, then notice the smaller form below it.", "Do not call coeng forms independent consonants."],
  },
  {
    id: "vowel-layout", level: "Level 4", source: "Learn Khmer",
    topics: ["dependent vowels", "vowel placement"],
    keywords: ["dependent vowel", "vowel sign", "\u179f\u17d2\u179a\u17c8\u1795\u17d2\u179a\u17b9\u179f\u1799\u17d0\u178f", "nguy\u00ean \u00e2m ph\u1ee5 thu\u1ed9c"],
    facts: ["Dependent vowel signs are read with a consonant context; they may appear before, above, below, or after the main consonant.", "In SalaKhmer, compare the A-series and O-series classroom cue for the same vowel sign.", "Never present a dependent vowel mark as a complete ordinary Khmer word by itself."],
  },
  {
    id: "independent-vowels", level: "Level 5", source: "Learn Khmer",
    topics: ["independent vowels"],
    keywords: ["independent vowel", "\u179f\u17d2\u179a\u17c8\u1796\u17c1\u1789\u178f\u17bd", "nguy\u00ean \u00e2m \u0111\u1ed9c l\u1eadp"],
    facts: ["An independent vowel can stand on its own; SalaKhmer teaches its 15 approved characters in Level 5.", "Contrast an independent vowel with a dependent vowel by whether it needs a consonant context in the lesson.", "If a user supplies a particular character, answer with that character first and then its approved app cue."],
  },
  {
    id: "diacritics", level: "Later Script Basics", source: "Learn Khmer",
    topics: ["diacritics", "spelling"],
    keywords: ["diacritic", "mark", "d\u1ea5u", "bantaq", "reahmuk", "triisap"],
    facts: ["Khmer spelling uses marks that can affect how a syllable is read.", "Teach a mark inside a real reviewed word rather than inventing a reading for an isolated symbol.", "When an exact rule is not in approved SalaKhmer data, ask for the word or explain that the app has not reviewed that rule yet."],
  },
  {
    id: "reading-bridge", level: "Read & Spell", source: "SalaKhmer editorial",
    topics: ["reading bridge", "beginner spelling"],
    keywords: ["reading bridge", "bridge", "\u0111\u00e1nh v\u1ea7n", "spell", "sala khmer bridge"],
    facts: ["The SalaKhmer Reading Bridge joins familiar sound blocks to help a beginner start reading.", "It is a beginner aid, not a complete or exact Khmer spelling system.", "Show the normal guided spelling separately from the bridge result."],
  },
  {
    id: "politeness", level: "Listen & Speak", source: "Learn Khmer",
    topics: ["politeness", "responses", "social context"],
    keywords: ["polite", "politeness", "baat", "caah", "\u1794\u17b6\u1791", "\u1785\u17b6\u179f", "l\u1ecbch s\u1ef1"],
    facts: ["Khmer dialogue changes with social relationship and politeness.", "SalaKhmer uses \u1794\u17b6\u1791 as a common polite response particle for a male speaker and \u1785\u17b6\u179f for a female speaker in its beginner dialogues.", "Teach the response as part of a full situation, not as an interchangeable English yes."],
  },
  {
    id: "greetings", level: "Listen & Speak", source: "Learn Khmer",
    topics: ["greetings", "conversation"],
    keywords: ["hello", "greeting", "how are you", "\u179f\u17bd\u179f\u17d2\u178f\u17b8", "xin ch\u00e0o", "ch\u00e0o h\u1ecfi"],
    facts: ["A greeting is taught as a short exchange: greeting, answer, and an appropriate polite response.", "Everyday Khmer greetings vary by formality and relationship, so avoid claiming one sentence fits every situation.", "For practice, keep the first dialogue short and repeatable before introducing a longer role-play."],
  },
  {
    id: "questions", level: "Listen & Speak", source: "Learn Khmer",
    topics: ["questions", "conversation patterns"],
    keywords: ["question", "where", "what", "who", "when", "why", "c\u00e2u h\u1ecfi", "\u179f\u17bd\u179a"],
    facts: ["Teach question words inside a useful exchange instead of as an unconnected vocabulary list.", "A learner should first recognise the question intent, then answer with one short complete response.", "When teaching a new pattern, vary the situation rather than repeating the same dialogue with only a changed noun."],
  },
  {
    id: "numbers-and-prices", level: "Level 6 + practical dialogue", source: "Learn Khmer",
    topics: ["numbers", "prices", "market"],
    keywords: ["number", "numeral", "price", "market", "riel", "s\u1ed1", "gi\u00e1", "ch\u1ee3"],
    facts: ["Level 6 introduces Khmer digits and larger approved number examples.", "Price practice should pair a number with a real purchase situation and a polite follow-up, not a bare list of numbers.", "Read digits carefully before teaching a full price expression."],
  },
  {
    id: "directions", level: "Practical conversation", source: "Learn Khmer",
    topics: ["directions", "travel"],
    keywords: ["direction", "left", "right", "street", "market", "hotel", "\u0111\u01b0\u1eddng", "kh\u00e1ch s\u1ea1n"],
    facts: ["Direction practice works best as a sequence: ask where a place is, hear one or two directions, then confirm understanding.", "Use short location-based dialogues before longer travel scenarios.", "Do not invent a location or route if the lesson data does not provide it."],
  },
  {
    id: "time-and-appointments", level: "Practical conversation", source: "Learn Khmer",
    topics: ["time", "appointments"],
    keywords: ["time", "clock", "appointment", "today", "tomorrow", "gi\u1edd", "h\u1eb9n"],
    facts: ["Teach time expressions through a practical purpose such as meeting, travel, or an appointment.", "Let the learner identify the time first, then practise a compact question-and-answer pair.", "Use reviewed dialogue wording for exact grammar and pronunciation examples."],
  },
  {
    id: "handwriting", level: "Handwriting", source: "Khmer handwriting reference",
    topics: ["writing", "stroke order", "tracing"],
    keywords: ["write", "handwriting", "stroke", "trace", "vi\u1ebft", "n\u00e9t"],
    facts: ["Handwriting practice should focus on one character at a time, with a model and a separate tracing space.", "Stroke-order animations are published only after the owner reviews the matching character source.", "Do not state an unreviewed animation path as the authoritative native stroke order."],
  },
  {
    id: "identity-and-introductions", level: "Practical conversation", source: "Basic Khmer (MSU, CC BY 4.0)",
    topics: ["name", "identity", "introductions"],
    keywords: ["name", "introduce", "introduction", "who are you", "t\u00ean", "gi\u1edbi thi\u1ec7u"],
    facts: ["Begin practical speaking with name and identity exchanges before adding longer personal details.", "A good beginner drill is: hear a question, answer with one short fact, then return a simple question.", "Keep names and personal examples varied so conversations are not templated repetitions."],
  },
  {
    id: "work-and-study", level: "Practical conversation", source: "Basic Khmer (MSU, CC BY 4.0)",
    topics: ["work", "study", "daily identity"],
    keywords: ["job", "work", "study", "student", "teacher", "ngh\u1ec1", "c\u00f4ng vi\u1ec7c", "h\u1ecdc sinh"],
    facts: ["Teach work or study questions as context-sensitive introductions, not as a test of a learner's private information.", "A beginner response should be short, clear, and paired with listening practice.", "Use the app's reviewed dialogues for exact Khmer wording."],
  },
  {
    id: "family", level: "Practical conversation", source: "Basic Khmer (MSU, CC BY 4.0)",
    topics: ["family", "relationships", "counting"],
    keywords: ["family", "sibling", "mother", "father", "brother", "sister", "gia \u0111\u00ecnh", "anh ch\u1ecb em"],
    facts: ["Family topics are useful for introducing people, relationship words, and small numbers together.", "Start with one relationship word and one person before asking the learner to describe a full family.", "Avoid assuming family structure; let dialogue roles stay fictional or optional."],
  },
  {
    id: "dates-and-life-events", level: "Practical conversation", source: "Basic Khmer (MSU, CC BY 4.0)",
    topics: ["dates", "past events", "birthdays"],
    keywords: ["born", "birthday", "year", "date", "past", "n\u0103m sinh", "ng\u00e0y sinh", "qu\u00e1 kh\u1ee9"],
    facts: ["Teach dates from digits and time words the learner already knows.", "For a past-event question, first make the time reference clear, then add one action.", "Use neutral example dates rather than asking users to reveal private information."],
  },
  {
    id: "travel-and-visiting", level: "Practical conversation", source: "Basic Khmer (MSU, CC BY 4.0)",
    topics: ["travel", "visiting", "Cambodia"],
    keywords: ["travel", "visit", "cambodia", "go", "trip", "du l\u1ecbch", "\u0111i"],
    facts: ["Travel practice should connect destination, time, and purpose in small steps.", "Teach a learner to understand the destination first, then the time, then the reason for travel.", "Pair travel language with Cambodia Guide context when the learner asks about real-life use."],
  },
  {
    id: "goals-and-plans", level: "Practical conversation", source: "Basic Khmer (MSU, CC BY 4.0)",
    topics: ["plans", "goals", "future"],
    keywords: ["want", "plan", "future", "goal", "teacher", "mu\u1ed1n", "d\u1ef1 \u0111\u1ecbnh"],
    facts: ["Teach a plan by linking a simple intention with one action.", "Do not claim that an English future-tense pattern maps one-to-one onto Khmer; rely on reviewed examples for exact wording.", "Ask the learner whether they want a formal or casual practice dialogue when context matters."],
  },
  {
    id: "meetings-and-availability", level: "Practical conversation", source: "Basic Khmer (MSU, CC BY 4.0)",
    topics: ["meeting", "availability", "appointment"],
    keywords: ["meet", "available", "appointment", "today", "r\u1ea3nh", "g\u1eb7p", "h\u1eb9n"],
    facts: ["An appointment exchange needs a person, a time, and a confirmation step.", "Teach a learner to ask, understand the answer, and confirm the agreed time.", "Use audio for each turn so the learner hears both speakers and not one repeated voice."],
  },
];

const CORE_CARD_IDS = new Set(["script-overview", "series-contrast", "vowel-layout", "reading-bridge", "politeness"]);

export function curriculumContextFor(message: string) {
  const normalized = message.toLocaleLowerCase();
  const ranked = CARDS.map((card) => ({
    card,
    score: card.keywords.reduce((score, keyword) => score + (normalized.includes(keyword.toLocaleLowerCase()) ? 1 : 0), 0),
  }))
    .filter(({ score, card }) => score > 0 || CORE_CARD_IDS.has(card.id))
    .sort((a, b) => b.score - a.score || a.card.id.localeCompare(b.card.id))
    .slice(0, 7)
    .map(({ card }) => `[${card.level}] ${card.topics.join(", ")}\n${card.facts.map((fact) => `- ${fact}`).join("\n")}`)
    .join("\n\n");

  return `CURATED TUTOR CARDS (paraphrased, approved teaching guidance):\n${ranked}`;
}

export const CURRICULUM_LIBRARY_CARD_COUNT = CARDS.length;
