import { ContentCategory } from "./auth-access";
import syllabusData from "./contentSyllabus.json";
import { MASTER_A1_DIALOGUE_LESSONS } from "./masterA1Dialogues";
import type { LessonActivity } from "./lesson-activities";
import { validateLessons } from "./content-validator";
import {
  READ_AND_SPELL_INTRO_LESSONS,
  SPELLING_LESSONS,
  WRITING_FOUNDATION_LESSONS,
} from "./literacy-path";
import {
  EXPANDED_DIALOGUE_LESSONS,
  EXPANDED_REVIEW_LESSONS,
  EXPANDED_WRITING_LESSONS,
} from "./module-content-expansion";

export type LessonType = "flashcard" | "quiz" | "reading" | "conversation";

export interface LessonMock {
  id: string;
  categoryId: ContentCategory;
  title: string;
  description: string;
  xpReward: number;
  type: LessonType;
  khmerTitle?: string;
  /** Lightweight visual context for the conversation header (not a generated image). */
  scenarioIcon?: string;
  scenarioLabel?: string;
  content?: FlashcardContent[];
  /** Optional interactive activities; legacy lessons continue to use content. */
  activities?: LessonActivity[];
}

export interface FlashcardContent {
  id: string | number;
  front: string;
  back: string;
  desc: string;
  audioId: string;
  /** The recorded role, never inferred from the Khmer spelling itself. */
  speaker?: "female" | "male";
  speakerName?: string;
}

const REPEATABLE_DIALOGUE_DETAILS =
  /\b(?:Maya|Dara|Lina|Sokha|Nita|Adam|Chantou|Sovann|Bopa|Sam|Vanna|Arun|Sophal|Rith|Srey|Meng|Sreyneang|David|Phnom Penh|Siem Reap|Battambang|Kampot|Kep|Sihanoukville|Central Market|Orussey Market|Night Market|Riverside|School|Hotel|Hospital|Pharmacy|Coffee Shop|Restaurant|Airport|Train Station|Museum|Angkor Wat|Park|Office|Library|Bank|Post Office|Bakery|Fruit Stall|Bookstore|Clothing Store|Hair Salon)\b/gi;

function dialogueFingerprint(cards: FlashcardContent[]): string {
  return cards
    .map((card) =>
      card.back
        .toLowerCase()
        .replace(REPEATABLE_DIALOGUE_DETAILS, "[variable]")
        .replace(/[.,!?]/g, "")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .join(" | ");
}

/** Turns the imported 50-line bundles into learner-sized, non-repetitive dialogues. */
function buildCuratedA1Dialogues(): LessonMock[] {
  const seen = new Set<string>();
  const seenIntents = new Set<string>();
  const dialogues: LessonMock[] = [];

  for (const source of MASTER_A1_DIALOGUE_LESSONS) {
    const lines = source.content ?? [];
    for (let start = 0; start + 4 < lines.length; start += 5) {
      const conversation = lines.slice(start, start + 5);
      const fingerprint = dialogueFingerprint(conversation);
      if (seen.has(fingerprint)) continue;
      seen.add(fingerprint);

      const sourceTitle = source.description.split(" • ")[start / 5]?.replace(/\s#\d+$/, "");
      // The supplied workbook changes locations, names, and products many times.
      // Those variations are source material, not separate learner lessons.
      const intent = (sourceTitle ?? "")
        .replace(/\s#\d+$/, "")
        .replace(/\s+(?:at|near|to|for)\s+.+$/i, "")
        .trim()
        .toLowerCase();
      if (intent && seenIntents.has(intent)) continue;
      const number = String(dialogues.length + 1).padStart(3, "0");
      if (intent) seenIntents.add(intent);
      dialogues.push({
        id: `a1-dialogue-${number}`,
        categoryId: "module_3",
        title: sourceTitle || `A1 conversation ${number}`,
        description: "A five-line everyday Khmer conversation. Listen line by line or play it all.",
        xpReward: 15,
        type: "conversation",
        content: conversation,
      });
    }
  }
  return dialogues;
}

export const CURATED_A1_DIALOGUES = buildCuratedA1Dialogues();

// Keep the genuine starter and travel/survival lessons. The 15 old ordering
// cards in the middle are the same restaurant script with nouns swapped, so
// they are intentionally not exposed as separate lessons. Their source and
// R2 audio remain untouched as backup material.
const RELEASED_STARTER_DIALOGUES = CURATED_A1_DIALOGUES.filter(
  (_lesson, index) => index < 6 || index >= 21,
);

type SyllabusCard = {
  text?: string;
  word?: string;
  khmer?: string;
  char?: string;
  title?: string;
  meaning?: string;
  english?: string;
  guide?: string;
  content_vi?: string;
  correct?: string | string[];
  phonetic?: string;
  breakdown?: string;
  latin?: string;
  content_en?: string;
  options?: string[];
  audio?: string;
  q_audio?: string;
  q_text?: string;
  type?: "listening" | "reading" | "writing";
  scrambled?: string[];
  id?: string;
};

type Syllabus = { modules: { data: SyllabusCard[] }[] };

const generateLessonsForCategory = (
  categoryId: ContentCategory,
  cards: SyllabusCard[],
  chunkSize: number = 10,
): LessonMock[] => {
  if (!cards || cards.length === 0) return [];

  const lessons: LessonMock[] = [];
  let lessonIndex = 1;

  for (let i = 0; i < cards.length; i += chunkSize) {
    const chunk = cards.slice(i, i + chunkSize);
    const first = chunk[0];
    if (!first) continue;
    lessons.push({
      id: `${categoryId}-${lessonIndex}`,
      categoryId,
      title: `Lesson ${lessonIndex}`,
      khmerTitle: first.text || first.word || first.khmer || first.char || first.title || "",
      description: `Learn ${chunk.length} new items`,
      xpReward: 10 + chunk.length,
      type: "flashcard",
      content: chunk.map((c, idx) => ({
        id: idx + 1,
        front: c.text || c.word || c.khmer || c.char || c.title || "Untitled item",
        back:
          c.meaning || c.english || c.guide || c.content_en || c.correct || "Meaning unavailable",
        desc:
          c.phonetic ||
          c.breakdown ||
          c.latin ||
          c.content_en ||
          (c.options ? c.options.join(", ") : "SalaKhmer"),
        audioId: c.audio || c.q_audio || c.id || `card-${idx + 1}`,
      })),
    });
    lessonIndex++;
  }
  return lessons;
};

/** Converts the assessment source into real interactive tests instead of generic flashcards. */
const generateAssessmentLessons = (cards: SyllabusCard[]): LessonMock[] => {
  const lessons: LessonMock[] = [];

  for (let start = 0; start < cards.length; start += 10) {
    const chunk = cards.slice(start, start + 10);
    const activities: LessonActivity[] = chunk.flatMap((card) => {
      if (card.type === "listening" && card.options && card.correct) {
        return [
          {
            type: "audioChoice",
            prompt: "Listen and choose what you hear.",
            audioId: card.q_audio ?? card.id ?? "assessment-audio",
            audioText: card.correct,
            options: card.options,
            answer: card.correct,
          },
        ];
      }
      if (card.type === "writing" && card.scrambled && Array.isArray(card.correct)) {
        return [{ type: "ordering", items: card.scrambled, answer: card.correct }];
      }
      if (
        card.type === "reading" &&
        card.q_text &&
        card.options &&
        typeof card.correct === "string"
      ) {
        return [
          {
            type: "multipleChoice",
            prompt: `Read “${card.q_text}”. What does it mean?`,
            options: card.options,
            answer: card.correct,
          },
        ];
      }
      return [];
    });

    if (activities.length === 0) continue;
    lessons.push({
      id: `assessment-${lessons.length + 1}`,
      categoryId: "module_5",
      title: `Mixed skills test ${lessons.length + 1}`,
      description: "A mixed check of listening, reading, and sentence building.",
      xpReward: 35,
      type: "quiz",
      activities,
    });
  }

  return lessons;
};

/** Vocabulary reference used by varied review sessions, not one-card quizzes. */
const REVIEW_SEEDS = [
  ["Greetings", "សួស្តី", "Hello"], ["Thanks", "អរគុណ", "Thank you"], ["Apology", "សុំទោស", "Sorry"],
  ["Goodbye", "លាហើយ", "Goodbye"], ["Yes", "បាទ", "Yes (male speaker)"], ["Yes", "ចាស", "Yes (female speaker)"],
  ["One", "មួយ", "One"], ["Two", "ពីរ", "Two"], ["Three", "បី", "Three"], ["Four", "បួន", "Four"],
  ["Five", "ប្រាំ", "Five"], ["Water", "ទឹក", "Water"], ["Rice", "បាយ", "Rice"], ["Food", "ម្ហូប", "Food"],
  ["Market", "ផ្សារ", "Market"], ["Price", "ថ្លៃ", "Price"], ["How much?", "ថ្លៃប៉ុន្មាន?", "How much is it?"],
  ["Friend", "មិត្តភក្តិ", "Friend"], ["Family", "គ្រួសារ", "Family"], ["Home", "ផ្ទះ", "Home"],
  ["School", "សាលា", "School"], ["Book", "សៀវភៅ", "Book"], ["Teacher", "គ្រូ", "Teacher"],
  ["Morning", "ព្រឹក", "Morning"], ["Evening", "ល្ងាច", "Evening"], ["Today", "ថ្ងៃនេះ", "Today"],
  ["Red", "ក្រហម", "Red"], ["Blue", "ខៀវ", "Blue"], ["Green", "បៃតង", "Green"], ["Yellow", "លឿង", "Yellow"],
] as const;

/**
 * The old implementation created 30 near-identical multiple-choice cards.
 * These checkpoints use matching, sentence ordering, and one recall question
 * around a real learning theme instead.
 */
const REVIEW_TRACKS = [
  { title: "Greetings & politeness", description: "Match greetings, respond naturally, then build a short introduction.", indices: [0, 1, 2, 3] },
  { title: "People & home", description: "Review people, family, and places with a mix of recall and sentence order.", indices: [17, 18, 19, 20] },
  { title: "Numbers & money", description: "Connect Khmer numbers and price vocabulary before choosing a useful phrase.", indices: [6, 7, 8, 15] },
  { title: "Food & market", description: "Recognise food words, arrange a polite request, and check a market response.", indices: [11, 12, 13, 14] },
  { title: "School & daily life", description: "Use common daily nouns in a varied reading-and-ordering review.", indices: [20, 21, 22, 23] },
  { title: "Time & colour", description: "Review time-of-day and colour vocabulary with matching and a quick choice.", indices: [24, 25, 26, 27] },
  { title: "Colour follow-up", description: "A different colour set with fresh choices, not the same question repeated.", indices: [28, 29, 4, 5] },
] as const;

function buildLegacyCoreReviewLessons(): LessonMock[] {
  return REVIEW_TRACKS.map((track, index) => {
    const words = track.indices.map((seedIndex) => REVIEW_SEEDS[seedIndex]);
    const [first, second, third, fourth] = words;
    if (!first || !second || !third || !fourth) return null;
    const sentence = index % 2 === 0 ? ["ខ្ញុំ", "ចូលចិត្ត", first[1]] : ["នេះ", "ជា", first[1]];
    const scrambled = index % 2 === 0 ? [first[1], "ខ្ញុំ", "ចូលចិត្ត"] : [first[1], "ជា", "នេះ"];
    return {
      id: `core-review-${String(index + 1).padStart(2, "0")}`,
      categoryId: "module_5",
      title: `Review · ${track.title}`,
      khmerTitle: first[1],
      description: track.description,
      xpReward: 30,
      type: "quiz",
      activities: [
        {
          type: "matching",
          pairs: [
            { left: first[1], right: first[2] },
            { left: second[1], right: second[2] },
            { left: third[1], right: third[2] },
          ],
        },
        { type: "ordering", items: scrambled, answer: sentence },
        {
          type: "multipleChoice",
          prompt: `Which Khmer word means “${fourth[2]}”?`,
          options: [fourth[1], first[1], second[1]],
          answer: fourth[1],
        },
      ],
    } satisfies LessonMock;
  }).filter((lesson): lesson is LessonMock => lesson !== null);
}

/**
 * Thirty deliberately different checkpoints. The same situation is tested in
 * different skills: listening discrimination, reading bridge, sentence build,
 * dialogue comprehension, error repair, and gentle timed recall.
 */
const REVIEW_SCENARIOS = [
  { title: "Meeting someone", description: "Greet, introduce yourself, and choose a polite reply.", indices: [0, 1, 2, 3], sentence: ["ខ្ញុំ", "ចូលចិត្ត", "សួស្តី"], bridge: "ស (S) + ួ (UO) + ស (S) + ្ត (T) + ី (EI) → SUOSTEI" },
  { title: "At home", description: "Recognise family and home words in a short everyday exchange.", indices: [17, 18, 19, 20], sentence: ["នេះ", "ជា", "ផ្ទះ"], bridge: "ផ (PH) + ្ទ (T) + ះ (EH) → PTEAH" },
  { title: "Counting money", description: "Hear numbers, read a price word, and respond with the right meaning.", indices: [6, 7, 8, 15], sentence: ["នេះ", "ជា", "តម្លៃ"], bridge: "ត (T) + ម (M) + ្លៃ (LAI) → TAMLai" },
  { title: "Buying food", description: "Use food and market vocabulary to make a simple request.", indices: [11, 12, 13, 14], sentence: ["ខ្ញុំ", "ចូលចិត្ត", "បាយ"], bridge: "ប (B) + ា (A) + យ (Y) → BAY" },
  { title: "At school", description: "Read common school words and choose a useful classroom response.", indices: [20, 21, 22, 23], sentence: ["នេះ", "ជា", "សៀវភៅ"], bridge: "ស (S) + ៀ (IE) + វ (V) + ភៅ (PHAO) → SIEVPHOV" },
  { title: "Morning plans", description: "Connect time words with a natural daily plan.", indices: [23, 24, 25, 0], sentence: ["ថ្ងៃនេះ", "ជា", "ព្រឹក"], bridge: "ព (P) + ្រឹ (RUE) + ក (K) → PRUEK" },
  { title: "Choosing colours", description: "Discriminate colour words and build a short description.", indices: [26, 27, 28, 29], sentence: ["នេះ", "ជា", "ក្រហម"], bridge: "ក (K) + ្រ (R) + ហ (H) + ម (M) → KRAHOM" },
  { title: "Polite answers", description: "Choose the correct male or female polite response in context.", indices: [4, 5, 0, 1], sentence: ["ចាស", "អរគុណ"], bridge: "ច (CH) + ា (A) + ស (S) → CHAS" },
  { title: "Market question", description: "Follow a short market exchange and repair an incorrect reply.", indices: [14, 15, 6, 7], sentence: ["តម្លៃ", "ប៉ុន្មាន"], bridge: "ប (B) + ៉ុ (O) + ន (N) + ្មា (MA) + ន (N) → PONMAN" },
  { title: "Daily essentials", description: "Mix water, rice, food, and home vocabulary in a practical check.", indices: [11, 12, 13, 19], sentence: ["ខ្ញុំ", "ចូលចិត្ត", "ទឹក"], bridge: "ទ (T) + ឹ (EU) + ក (K) → TEUK" },
] as const;

function buildCoreReviewLessons(): LessonMock[] {
  const modes = ["Listening & bridge", "Dialogue repair", "Mixed speed review"] as const;
  return REVIEW_SCENARIOS.flatMap((scenario, scenarioIndex) => {
    const words = scenario.indices.map((seedIndex) => REVIEW_SEEDS[seedIndex]);
    const [first, second, third, fourth] = words;
    if (!first || !second || !third || !fourth) return [];
    return modes.map((mode, modeIndex) => {
      const id = `review-${String(scenarioIndex * 3 + modeIndex + 1).padStart(2, "0")}`;
      const shared = { id, categoryId: "module_5" as const, title: `${scenario.title} · ${mode}`, khmerTitle: first[1], description: scenario.description, xpReward: 35, type: "quiz" as const };
      if (modeIndex === 0) return {
        ...shared,
        activities: [
          { type: "audioChoice" as const, prompt: "Listen. Which word did you hear?", audioId: `${id}-listen`, audioText: first[1], options: [first[1], second[1], third[1]], answer: first[1] },
          { type: "matching" as const, pairs: [{ left: first[1], right: first[2] }, { left: second[1], right: second[2] }, { left: third[1], right: third[2] }] },
          { type: "ordering" as const, items: [...scenario.sentence].reverse(), answer: [...scenario.sentence] },
          { type: "multipleChoice" as const, prompt: `Reading bridge: ${scenario.bridge}. Which final reading is closest to the bridge?`, options: [first[2], second[2], third[2]], answer: first[2] },
        ],
      } satisfies LessonMock;
      if (modeIndex === 1) return {
        ...shared,
        activities: [
          { type: "multipleChoice" as const, prompt: `A shopkeeper says “${first[1]}”. What is the best meaning?`, options: [first[2], second[2], third[2]], answer: first[2] },
          { type: "errorRepair" as const, prompt: "Repair this learner note.", sentence: `${first[1]} = ${second[2]}`, options: [`${first[1]} = ${first[2]}`, `${second[1]} = ${second[2]}`, `${third[1]} = ${third[2]}`], answer: `${first[1]} = ${first[2]}`, explanation: "Match the Khmer word to its actual English meaning before replying." },
          { type: "timedChoice" as const, prompt: `Quick reply: which Khmer word means “${fourth[2]}”?`, options: [fourth[1], first[1], second[1]], answer: fourth[1], seconds: 12 },
          { type: "matching" as const, pairs: [{ left: second[1], right: second[2] }, { left: third[1], right: third[2] }, { left: fourth[1], right: fourth[2] }] },
        ],
      } satisfies LessonMock;
      return {
        ...shared,
        activities: [
          { type: "timedChoice" as const, prompt: `Quick recall: choose “${third[2]}”.`, options: [first[1], third[1], fourth[1]], answer: third[1], seconds: 10 },
          { type: "audioChoice" as const, prompt: "Listen to the reply, then choose it.", audioId: `${id}-reply`, audioText: fourth[1], options: [second[1], third[1], fourth[1]], answer: fourth[1] },
          { type: "ordering" as const, items: [scenario.sentence[1], scenario.sentence[2], scenario.sentence[0]], answer: [...scenario.sentence] },
          { type: "errorRepair" as const, prompt: "Fix the reading bridge result.", sentence: `${scenario.bridge} → ${second[2]}`, options: [`${scenario.bridge} → ${first[2]}`, `${scenario.bridge} → ${third[2]}`, `${scenario.bridge} → ${fourth[2]}`], answer: `${scenario.bridge} → ${first[2]}`, explanation: "The bridge is a beginner aid. Confirm the final word with its standard meaning." },
        ],
      } satisfies LessonMock;
    });
  });
}

export const MOCK_LESSONS: Record<ContentCategory, LessonMock[]> = {
  // Module 1 is the interactive character reference (AlphabetGrid), not a
  // second list of the same consonant/vowel cards.
  module_1: [],
  module_2: [...READ_AND_SPELL_INTRO_LESSONS, ...SPELLING_LESSONS],
  // Preserve the released starter conversations, then use the authored,
  // non-repetitive scenarios. Do not expose the old noun-swap workbook run.
  module_3: [...RELEASED_STARTER_DIALOGUES, ...EXPANDED_DIALOGUE_LESSONS],
  /* Legacy mixed quiz/flashcard content kept temporarily as source history:
  module_3: [
    {
      id: "greetings-intro-practice",
      categoryId: "module_3",
      title: "Greetings & introductions practice",
      khmerTitle: "ការសួរស្តី និងការណែនាំខ្លួន",
      description: "A 10-question practice session generated from the core greeting phrases.",
      xpReward: 25,
      type: "quiz",
      activities: getGreetingsIntroductionPracticeSet(),
    },
    ...beginnerCambodiaLessons.slice(2).map((sourceLesson) => ({
      id: `${sourceLesson.id}-practice`,
      categoryId: "module_3" as const,
      title: `Practice: ${sourceLesson.title}`,
      description: `A 10-question practice session based on the phrases in ${sourceLesson.title}.`,
      xpReward: 25,
      type: "quiz" as const,
      activities: createPracticeSet(sourceLesson.content ?? []),
    })),
    {
      id: "dialogue-checkpoint-1",
      categoryId: "module_3",
      title: "Quick dialogue: Greetings",
      khmerTitle: "ការសន្ទនាខ្លី",
      description: "Choose suitable responses in everyday situations.",
      xpReward: 30,
      type: "conversation",
      activities: [
        {
          type: "audioChoice",
          prompt: "Listen and choose the correct greeting.",
          audioId: "g1-1",
          audioText: "សួស្តី",
          options: ["សួស្តី", "អរគុណ", "លាហើយ"],
          answer: "សួស្តី",
        },
        {
          type: "multipleChoice",
          prompt: "Someone says សួស្តី. How should you respond?",
          options: ["សួស្តី", "សូមគិតលុយ", "ថ្លៃពេក"],
          answer: "សួស្តី",
        },
        {
          type: "multipleChoice",
          prompt: "Which phrase means ‘Thank you’?",
          options: ["សុំទោស", "អរគុណ", "លាហើយ"],
          answer: "អរគុណ",
        },
        {
          type: "multipleChoice",
          prompt: "You are about to leave. Choose ‘Goodbye’.",
          options: ["លាហើយ", "ជំរាបសួរ", "ខ្ញុំឈ្មោះ"],
          answer: "លាហើយ",
        },
        {
          type: "matching",
          pairs: [
            { left: "សួស្តី", right: "Hello" },
            { left: "អរគុណ", right: "Thank you" },
            { left: "លាហើយ", right: "Goodbye" },
          ],
        },
        {
          type: "ordering",
          items: ["ខ្ញុំ", "ឈ្មោះ", "លីន"],
          answer: ["ខ្ញុំ", "ឈ្មោះ", "លីន"],
        },
      ],
    },
    ...beginnerCambodiaLessons,
    ...MASTER_A1_DIALOGUE_LESSONS,
  ], */
  module_4: [...WRITING_FOUNDATION_LESSONS, ...EXPANDED_WRITING_LESSONS],
  module_5: [
    {
      id: "assessment-starter",
      categoryId: "module_5",
      title: "Starter assessment",
      khmerTitle: "តេស្តកម្រិតដំបូង",
      description: "Quickly assess Khmer vocabulary and recall.",
      xpReward: 40,
      type: "quiz",
      activities: [
        {
          type: "audioChoice",
          prompt: "Listen and choose the correct word.",
          audioId: "g5-1",
          audioText: "អរគុណ",
          options: ["អរគុណ", "សុំទោស", "លាហើយ"],
          answer: "អរគុណ",
        },
        {
          type: "multipleChoice",
          prompt: "What does សួស្តី mean?",
          options: ["Hello", "Thank you", "Sorry"],
          answer: "Hello",
        },
        {
          type: "multipleChoice",
          prompt: "Choose the Khmer phrase for ‘Sorry’.",
          options: ["អរគុណ", "សុំទោស", "លាហើយ"],
          answer: "សុំទោស",
        },
        {
          type: "multipleChoice",
          prompt: "What does ថ្លៃប៉ុន្មាន? ask?",
          options: ["Your name", "How much it costs", "Where the restroom is"],
          answer: "How much it costs",
        },
        {
          type: "matching",
          pairs: [
            { left: "មួយ", right: "One" },
            { left: "ពីរ", right: "Two" },
            { left: "បី", right: "Three" },
          ],
        },
        {
          type: "ordering",
          items: ["សូម", "គិត", "លុយ"],
          answer: ["សូម", "គិត", "លុយ"],
        },
        {
          type: "writing",
          character: "ក",
          strokes: ["main body", "right hook", "finishing stroke"],
        },
      ],
    },
    ...buildCoreReviewLessons(),
    ...EXPANDED_REVIEW_LESSONS,
  ],
  module_6: generateLessonsForCategory(
    "module_6",
    (syllabusData as Syllabus).modules[5]?.data ?? [],
  ),
};

// Keep validation available to content authors without polluting the learner's
// browser console during ordinary local testing.
if (import.meta.env.DEV && import.meta.env.VITE_CONTENT_DEBUG === "true") {
  const issues = validateLessons(Object.values(MOCK_LESSONS).flat());
  if (issues.length > 0) console.warn("SalaKhmer content validation issues", issues);
}

export const CATEGORY_INFO: Record<
  ContentCategory,
  { title: string; kh: string; toneClass: string; icon: string; bgGradient: string }
> = {
  module_1: {
    title: "SCRIPT BASICS",
    kh: "អក្ខរក្រម",
    toneClass: "text-ruby-foreground",
    icon: "ក",
    bgGradient: "bg-ruby",
  },
  module_2: {
    title: "READ & SPELL",
    kh: "ប្រកប",
    toneClass: "text-jade-foreground",
    icon: "💬",
    bgGradient: "bg-jade",
  },
  module_3: {
    title: "LISTEN & SPEAK",
    kh: "ការសន្ទនា",
    toneClass: "text-royal-foreground",
    icon: "📚",
    bgGradient: "bg-royal",
  },
  module_4: {
    title: "HANDWRITING",
    kh: "សរសេរ",
    toneClass: "text-gold-foreground",
    icon: "✍",
    bgGradient: "bg-gold",
  },
  module_5: {
    title: "REVIEW & TEST",
    kh: "ការធ្វើតេស្ត",
    toneClass: "text-ruby-foreground",
    icon: "📝",
    bgGradient: "bg-ruby",
  },
  module_6: {
    title: "CAMBODIA GUIDE",
    kh: "សៀវភៅណែនាំ",
    toneClass: "text-jade-foreground",
    icon: "🛕",
    bgGradient: "bg-jade",
  },
};
