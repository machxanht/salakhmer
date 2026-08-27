import syllabusData from "./contentSyllabus.json";
import type { ContentCategory } from "./auth-access";
import type { LessonActivity } from "./lesson-activities";
import type { FlashcardContent, LessonMock } from "./mock-lessons";

type SyllabusItem = {
  id?: string;
  text?: string;
  word?: string;
  meaning?: string;
  phonetic?: string;
};

type Syllabus = { modules: { data: SyllabusItem[] }[] };

const modules = (syllabusData as Syllabus).modules;
const alphabetItems = modules[0]?.data ?? [];
const consonants = alphabetItems.slice(0, 33);
const dependentVowels = alphabetItems.slice(33);
const wordItems = modules[1]?.data ?? [];

function chunks<T>(items: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size),
  );
}

function letterCards(items: SyllabusItem[]): FlashcardContent[] {
  return items.map((item, index) => ({
    id: item.id ?? index + 1,
    front: item.text ?? "",
    back: item.meaning ?? "Khmer letter",
    desc: item.phonetic ?? "Listen, identify the letter, then trace it on paper.",
    audioId: item.id ?? `letter-${index + 1}`,
  }));
}

function wordCards(items: SyllabusItem[]): FlashcardContent[] {
  return items.map((item, index) => ({
    id: item.id ?? index + 1,
    front: item.word ?? "",
    back: item.meaning ?? "Word meaning",
    desc: "Read the whole word, then identify its letters and vowel marks.",
    audioId: item.id ?? `word-${index + 1}`,
  }));
}

function readingLesson(
  id: string,
  title: string,
  description: string,
  items: SyllabusItem[],
): LessonMock {
  return {
    id,
    categoryId: "module_1",
    title,
    description,
    xpReward: 20,
    type: "flashcard",
    content: letterCards(items),
  };
}

/**
 * Based on the two source books: script foundations first, then sound/spelling,
 * then word reading. No Khmer strings are invented here.
 */
export const READING_FOUNDATION_LESSONS: LessonMock[] = [
  ...chunks(consonants, 11).map((items, index) =>
    readingLesson(
      `read-consonants-${index + 1}`,
      `Read Khmer consonants ${index * 11 + 1}-${index * 11 + items.length}`,
      "Learn the letter shape, its named sound, and its place in the Khmer consonant system.",
      items,
    ),
  ),
  ...chunks(dependentVowels, 8).map((items, index) =>
    readingLesson(
      `read-vowels-${index + 1}`,
      `Read dependent vowels ${index * 8 + 1}-${index * 8 + items.length}`,
      "Notice where each vowel sits around a consonant: before, above, below, or after it.",
      items,
    ),
  ),
  ...chunks(wordItems.slice(0, 15), 5).map((items, index) => ({
    id: `read-first-words-${index + 1}`,
    categoryId: "module_1" as const,
    title: `Read your first Khmer words ${index + 1}`,
    description: "Move from individual letters to complete, useful words.",
    xpReward: 25,
    type: "flashcard" as const,
    content: wordCards(items),
  })),
  {
    id: "read-original-lina-school",
    categoryId: "module_1",
    title: "Read a tiny story: Lina at school",
    description:
      "An original SalaKhmer micro-story. Read the two sentences, then answer one question.",
    xpReward: 30,
    type: "reading",
    activities: [
      {
        type: "flashcard",
        cards: [
          {
            id: "lina-school-text",
            front: "លីណានៅសាលា។\nលីណាមានសៀវភៅ។",
            back: "Lina is at school. Lina has a book.",
            desc: "Read slowly. Notice the repeated name and the final Khmer full stop (។).",
            audioId: "reading-lina-school",
          },
        ],
      },
      {
        type: "multipleChoice",
        prompt: "Where is Lina?",
        options: ["At school", "At home", "At the market"],
        answer: "At school",
      },
    ],
  },
  {
    id: "read-original-dara-cat",
    categoryId: "module_1",
    title: "Read a tiny story: Dara and a cat",
    description: "An original SalaKhmer micro-story with familiar home vocabulary.",
    xpReward: 30,
    type: "reading",
    activities: [
      {
        type: "flashcard",
        cards: [
          {
            id: "dara-cat-text",
            front: "ដារានៅផ្ទះ។\nដារាមានឆ្មា។",
            back: "Dara is at home. Dara has a cat.",
            desc: "Read each sentence once, then read both sentences together.",
            audioId: "reading-dara-cat",
          },
        ],
      },
      {
        type: "multipleChoice",
        prompt: "What animal does Dara have?",
        options: ["A cat", "A dog", "A fish"],
        answer: "A cat",
      },
    ],
  },
  {
    id: "read-original-maly-market",
    categoryId: "module_1",
    title: "Read a tiny story: Maly goes shopping",
    description:
      "An original SalaKhmer micro-story that connects reading to everyday food vocabulary.",
    xpReward: 30,
    type: "reading",
    activities: [
      {
        type: "flashcard",
        cards: [
          {
            id: "maly-market-text",
            front: "មាលាទៅផ្សារ។\nមាលាទិញទឹក និងបាយ។",
            back: "Maly goes to the market. Maly buys water and rice.",
            desc: "Find the two things Maly buys before you flip the card.",
            audioId: "reading-maly-market",
          },
        ],
      },
      {
        type: "multipleChoice",
        prompt: "What does Maly buy?",
        options: ["Water and rice", "A book and a pen", "A cat and a dog"],
        answer: "Water and rice",
      },
    ],
  },
];

/** Whole-word reading belongs with spelling, not with the character reference. */
export const READ_AND_SPELL_INTRO_LESSONS: LessonMock[] = READING_FOUNDATION_LESSONS
  .filter((lesson) => lesson.id.startsWith("read-first-words-") || lesson.id.startsWith("read-original-"))
  .map((lesson) => ({ ...lesson, categoryId: "module_2" as const }));

function spellingActivities(items: SyllabusItem[]): LessonActivity[] {
  const cards = wordCards(items);
  return cards.map((card, index) => {
    const options = [card.front];
    for (let offset = 1; options.length < Math.min(4, cards.length); offset += 1) {
      const option = cards[(index + offset) % cards.length]?.front;
      if (option && !options.includes(option)) options.push(option);
    }
    return {
      type: "multipleChoice",
      prompt: `Choose the Khmer spelling for "${card.back}".`,
      options: options.sort((left, right) => left.localeCompare(right)),
      answer: card.front,
    };
  });
}

/** Word practice follows the A1 pattern: see/read first, then choose the spelling. */
export const SPELLING_LESSONS: LessonMock[] = chunks(wordItems, 10).map((items, index) => ({
  id: `spell-words-${index + 1}`,
  categoryId: "module_2",
  title: `Spell and read words ${index + 1}`,
  description:
    "Read each word carefully, notice its letters and vowel marks, then choose its spelling.",
  xpReward: 25,
  type: "quiz",
  content: wordCards(items),
  activities: spellingActivities(items),
}));

/** A separate writing route, ordered from basic letter forms to vowel marks. */
export const WRITING_FOUNDATION_LESSONS: LessonMock[] = [
  ...chunks(consonants, 8).map((items, index) => ({
    id: `write-consonants-${index + 1}`,
    categoryId: "module_4" as const,
    title: `Write Khmer consonants ${index + 1}`,
    description: "Study the letter form, trace it slowly, then write it independently on paper.",
    xpReward: 20,
    type: "flashcard" as const,
    content: letterCards(items),
  })),
  ...chunks(dependentVowels, 8).map((items, index) => ({
    id: `write-vowels-${index + 1}`,
    categoryId: "module_4" as const,
    title: `Write dependent vowels ${index + 1}`,
    description:
      "Practice the vowel's position around a base consonant before reading it in a word.",
    xpReward: 20,
    type: "flashcard" as const,
    content: letterCards(items),
  })),
];

export const LITERACY_PATH_SUMMARY: {
  categoryId: ContentCategory;
  source: string;
  outcome: string;
}[] = [
  {
    categoryId: "module_1",
    source: "Khmer, Learn: consonants, vowel placement, and script rules",
    outcome: "Recognise letters and begin reading whole words",
  },
  {
    categoryId: "module_2",
    source: "SGK A1: repeat, read, and choose the correct written word",
    outcome: "Spell familiar Khmer words accurately",
  },
  {
    categoryId: "module_4",
    source: "SGK A1: guided letter-form practice",
    outcome: "Build controlled Khmer handwriting before free writing",
  },
];
