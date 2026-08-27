/**
 * content-data.ts
 * Single source of truth for all 6 learning modules.
 * Each category has: id, total lessons, and sub-categories with individual lessons.
 */

// ── Types ──────────────────────────────────────────────────────────────────

export type LessonType = "tracing" | "flashcard" | "audio" | "quiz" | "reading";

export interface Lesson {
  id: string;
  title: string;
  titleKh?: string;
  subtitle?: string;
  type: LessonType;
  isGuestAccessible: boolean; // can guest access this specific lesson?
  durationMinutes?: number;
}

export interface SubCategory {
  id: string;
  title: string;
  titleKh?: string;
  lessons: Lesson[];
  isGuestAccessible: boolean; // can guest access this whole sub-category?
}

export interface Category {
  id: string;
  titleKh: string;
  titleEn: string;
  description: string;
  icon: string; // lucide icon name
  subCategories: SubCategory[];
}

// ── 1. Khmer Script (alphabet + vowels) ───────────────────────────────────

export const khmerScriptCategory: Category = {
  id: "alphabet",
  titleKh: "អក្សរខ្មែរ",
  titleEn: "Khmer Script",
  description: "Letter tracing",
  icon: "pencil",
  subCategories: [
    {
      id: "consonants",
      title: "Consonants",
      titleKh: "ព្យញ្ជនៈ",
      isGuestAccessible: true,
      lessons: [
        {
          id: "alpha-k-ka",
          title: "ក (ka)",
          subtitle: "Initial stop / k",
          type: "tracing",
          isGuestAccessible: true,
          durationMinutes: 3,
        },
        {
          id: "alpha-k-kha",
          title: "ខ (kha)",
          subtitle: "Aspirated / kh",
          type: "tracing",
          isGuestAccessible: true,
          durationMinutes: 3,
        },
        {
          id: "alpha-k-ko",
          title: "គ (ko)",
          subtitle: "Voiced / g",
          type: "tracing",
          isGuestAccessible: true,
          durationMinutes: 3,
        },
        {
          id: "alpha-k-ngo",
          title: "ឃ (ngo)",
          subtitle: "Nasal / ng",
          type: "tracing",
          isGuestAccessible: true,
          durationMinutes: 3,
        },
        {
          id: "alpha-k-ca",
          title: "ង (ca)",
          subtitle: "Palatal / ng",
          type: "tracing",
          isGuestAccessible: true,
          durationMinutes: 3,
        },
        // Locked for guests (index >= 5)
        {
          id: "alpha-k-cha",
          title: "ច (cha)",
          subtitle: "Palatal stop / ch",
          type: "tracing",
          isGuestAccessible: false,
          durationMinutes: 3,
        },
        {
          id: "alpha-k-chha",
          title: "ឆ (chha)",
          subtitle: "Aspirated palatal",
          type: "tracing",
          isGuestAccessible: false,
          durationMinutes: 3,
        },
        {
          id: "alpha-k-ja",
          title: "ជ (ja)",
          subtitle: "Voiced palatal / j",
          type: "tracing",
          isGuestAccessible: false,
          durationMinutes: 3,
        },
        {
          id: "alpha-k-jha",
          title: "ឈ (jha)",
          subtitle: "Aspirated / jh",
          type: "tracing",
          isGuestAccessible: false,
          durationMinutes: 3,
        },
        {
          id: "alpha-k-nya",
          title: "ញ (nya)",
          subtitle: "Palatal nasal / ny",
          type: "tracing",
          isGuestAccessible: false,
          durationMinutes: 3,
        },
        {
          id: "alpha-k-da",
          title: "ដ (da)",
          subtitle: "Retroflex stop / d",
          type: "tracing",
          isGuestAccessible: false,
          durationMinutes: 3,
        },
        {
          id: "alpha-k-dha",
          title: "ឋ (dha)",
          subtitle: "Aspirated retroflex",
          type: "tracing",
          isGuestAccessible: false,
          durationMinutes: 3,
        },
      ],
    },
    {
      id: "vowels",
      title: "Vowels",
      titleKh: "ស្រៈ",
      isGuestAccessible: false,
      lessons: [
        {
          id: "alpha-v-a",
          title: "ា (aa)",
          subtitle: "Long a vowel",
          type: "tracing",
          isGuestAccessible: false,
          durationMinutes: 2,
        },
        {
          id: "alpha-v-i",
          title: "ិ (i)",
          subtitle: "Short i vowel",
          type: "tracing",
          isGuestAccessible: false,
          durationMinutes: 2,
        },
        {
          id: "alpha-v-ii",
          title: "ី (ii)",
          subtitle: "Long i vowel",
          type: "tracing",
          isGuestAccessible: false,
          durationMinutes: 2,
        },
        {
          id: "alpha-v-u",
          title: "ុ (u)",
          subtitle: "Short u vowel",
          type: "tracing",
          isGuestAccessible: false,
          durationMinutes: 2,
        },
        {
          id: "alpha-v-uu",
          title: "ូ (uu)",
          subtitle: "Long u vowel",
          type: "tracing",
          isGuestAccessible: false,
          durationMinutes: 2,
        },
        {
          id: "alpha-v-e",
          title: "ើ (eu)",
          subtitle: "Vowel eu",
          type: "tracing",
          isGuestAccessible: false,
          durationMinutes: 2,
        },
      ],
    },
  ],
};

// ── 2. Survival Phrases ───────────────────────────────────────────────────

export const survivalPhrasesCategory: Category = {
  id: "phrases",
  titleKh: "ប្រយោគ",
  titleEn: "Survival Phrases",
  description: "Travel Khmer",
  icon: "message-circle",
  subCategories: [
    {
      id: "greetings",
      title: "Greetings",
      titleKh: "ការស្វាគមន៍",
      isGuestAccessible: true,
      lessons: [
        {
          id: "ph-g-hello",
          title: "Hello / Goodbye",
          titleKh: "ជំរាបសួរ",
          type: "flashcard",
          isGuestAccessible: true,
          durationMinutes: 2,
        },
        {
          id: "ph-g-thank",
          title: "Thank you",
          titleKh: "អរគុណ",
          type: "flashcard",
          isGuestAccessible: true,
          durationMinutes: 2,
        },
        {
          id: "ph-g-sorry",
          title: "Sorry / Excuse me",
          titleKh: "សុំទោស",
          type: "flashcard",
          isGuestAccessible: true,
          durationMinutes: 2,
        },
        {
          id: "ph-g-name",
          title: "What's your name?",
          titleKh: "អ្នកឈ្មោះអ្វី?",
          type: "flashcard",
          isGuestAccessible: true,
          durationMinutes: 3,
        },
        {
          id: "ph-g-fine",
          title: "I'm fine",
          titleKh: "ខ្ញុំសុខសប្បាយ",
          type: "flashcard",
          isGuestAccessible: true,
          durationMinutes: 2,
        },
      ],
    },
    {
      id: "emergency",
      title: "Emergency / Travel",
      titleKh: "ការជ្រើសរើស",
      isGuestAccessible: true,
      lessons: [
        {
          id: "ph-e-help",
          title: "Help!",
          titleKh: "ជួយផង!",
          type: "flashcard",
          isGuestAccessible: true,
          durationMinutes: 1,
        },
        {
          id: "ph-e-hospital",
          title: "Hospital / Doctor",
          titleKh: "មន្ទីរពេទ្យ",
          type: "flashcard",
          isGuestAccessible: true,
          durationMinutes: 2,
        },
        {
          id: "ph-e-police",
          title: "Police",
          titleKh: "នគរបាល",
          type: "flashcard",
          isGuestAccessible: true,
          durationMinutes: 1,
        },
        {
          id: "ph-e-lost",
          title: "I am lost",
          titleKh: "ខ្ញុំវង្វេង",
          type: "flashcard",
          isGuestAccessible: true,
          durationMinutes: 2,
        },
        {
          id: "ph-e-toilet",
          title: "Where is the toilet?",
          titleKh: "បង្គន់នៅឯណា?",
          type: "flashcard",
          isGuestAccessible: true,
          durationMinutes: 2,
        },
      ],
    },
    {
      id: "food",
      title: "Food & Ordering",
      titleKh: "អាហារ",
      isGuestAccessible: false,
      lessons: [
        {
          id: "ph-f-water",
          title: "Water / Food",
          titleKh: "ទឹក/អាហារ",
          type: "flashcard",
          isGuestAccessible: false,
          durationMinutes: 2,
        },
        {
          id: "ph-f-rice",
          title: "Rice dishes",
          titleKh: "បាយ",
          type: "flashcard",
          isGuestAccessible: false,
          durationMinutes: 3,
        },
        {
          id: "ph-f-price",
          title: "How much?",
          titleKh: "ថ្លៃប៉ុន្មាន?",
          type: "flashcard",
          isGuestAccessible: false,
          durationMinutes: 2,
        },
        {
          id: "ph-f-spicy",
          title: "Not spicy please",
          titleKh: "មិនហៀរ",
          type: "flashcard",
          isGuestAccessible: false,
          durationMinutes: 2,
        },
      ],
    },
    {
      id: "transport",
      title: "Transport",
      titleKh: "ការធ្វើដំណើរ",
      isGuestAccessible: false,
      lessons: [
        {
          id: "ph-t-tuk",
          title: "Tuk-tuk / Taxi",
          titleKh: "តុកតុក",
          type: "flashcard",
          isGuestAccessible: false,
          durationMinutes: 2,
        },
        {
          id: "ph-t-where",
          title: "Where is...?",
          titleKh: "នៅឯណា?",
          type: "flashcard",
          isGuestAccessible: false,
          durationMinutes: 2,
        },
        {
          id: "ph-t-stop",
          title: "Stop here",
          titleKh: "ឈប់នៅទីនេះ",
          type: "flashcard",
          isGuestAccessible: false,
          durationMinutes: 1,
        },
        {
          id: "ph-t-far",
          title: "Is it far?",
          titleKh: "ឆ្ងាយទេ?",
          type: "flashcard",
          isGuestAccessible: false,
          durationMinutes: 2,
        },
      ],
    },
  ],
};

// ── 3. Grammar ────────────────────────────────────────────────────────────

export const grammarCategory: Category = {
  id: "grammar",
  titleKh: "វេយ្យាករណ៍",
  titleEn: "Grammar",
  description: "Building blocks",
  icon: "book-open",
  subCategories: [
    {
      id: "sentence-structure",
      title: "Sentence Structure",
      titleKh: "រចនាសម្ព័ន្ធប្រយោគ",
      isGuestAccessible: false,
      lessons: [
        {
          id: "gr-s-basic",
          title: "Subject-Verb-Object",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "gr-s-neg",
          title: "Negation with មិន...ទេ",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "gr-s-question",
          title: "Question words",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "gr-s-tense",
          title: "Time markers (past/future)",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 6,
        },
        {
          id: "gr-s-particle",
          title: "Sentence particles",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "gr-s-relative",
          title: "Relative clauses",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 7,
        },
      ],
    },
    {
      id: "classifiers",
      title: "Classifiers & Counters",
      titleKh: "ប្រមាណបត្រ",
      isGuestAccessible: false,
      lessons: [
        {
          id: "gr-c-noun",
          title: "Noun classifiers",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "gr-c-num",
          title: "Numbers 1-100",
          type: "flashcard",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
        {
          id: "gr-c-ord",
          title: "Ordinal numbers",
          type: "flashcard",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
        {
          id: "gr-c-measure",
          title: "Measurement words",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
      ],
    },
    {
      id: "verbs",
      title: "Verbs & Adjectives",
      titleKh: "ক্রিয়া",
      isGuestAccessible: false,
      lessons: [
        {
          id: "gr-v-base",
          title: "Base verbs",
          type: "flashcard",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
        {
          id: "gr-v-adj",
          title: "Common adjectives",
          type: "flashcard",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
        {
          id: "gr-v-compare",
          title: "Comparatives",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "gr-v-causative",
          title: "Causative verbs",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 6,
        },
      ],
    },
    {
      id: "pronouns",
      title: "Pronouns & Honorifics",
      titleKh: "ស្នប់",
      isGuestAccessible: false,
      lessons: [
        {
          id: "gr-p-1st",
          title: "1st person (ខ្ញុំ / យើង)",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
        {
          id: "gr-p-2nd",
          title: "2nd person forms",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "gr-p-honor",
          title: "Royal honorifics",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 6,
        },
        {
          id: "gr-p-3rd",
          title: "3rd person forms",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
      ],
    },
  ],
};

// ── 4. Conversations ──────────────────────────────────────────────────────

export const conversationsCategory: Category = {
  id: "conversations",
  titleKh: "ការសន្ទនា",
  titleEn: "Conversations",
  description: "Audio dialogue",
  icon: "mic",
  subCategories: [
    {
      id: "market",
      title: "At the Market",
      titleKh: "នៅផ្សារ",
      isGuestAccessible: false,
      lessons: [
        {
          id: "conv-m-intro",
          title: "Bargaining at the market",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "conv-m-price",
          title: "Asking for the price",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
        {
          id: "conv-m-choose",
          title: "Choosing items",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
        {
          id: "conv-m-pay",
          title: "Paying & change",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
      ],
    },
    {
      id: "restaurant",
      title: "At the Restaurant",
      titleKh: "នៅភោជនីយដ្ឋាន",
      isGuestAccessible: false,
      lessons: [
        {
          id: "conv-r-order",
          title: "Ordering food",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "conv-r-dietary",
          title: "Dietary requirements",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
        {
          id: "conv-r-bill",
          title: "Asking for the bill",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 3,
        },
        {
          id: "conv-r-review",
          title: "Complimenting food",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 3,
        },
      ],
    },
    {
      id: "hotel",
      title: "At the Hotel",
      titleKh: "នៅសណ្ឋាគារ",
      isGuestAccessible: false,
      lessons: [
        {
          id: "conv-h-checkin",
          title: "Check-in conversation",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "conv-h-request",
          title: "Making requests",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
        {
          id: "conv-h-issue",
          title: "Reporting a problem",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
        {
          id: "conv-h-checkout",
          title: "Check-out conversation",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
      ],
    },
    {
      id: "directions",
      title: "Asking for Directions",
      titleKh: "ផ្លូវ",
      isGuestAccessible: false,
      lessons: [
        {
          id: "conv-d-where",
          title: "Where is...?",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
        {
          id: "conv-d-turn",
          title: "Turn left/right",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 3,
        },
        {
          id: "conv-d-dist",
          title: "How far away?",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 3,
        },
        {
          id: "conv-d-land",
          title: "Using landmarks",
          type: "audio",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
      ],
    },
  ],
};

// ── 5. Cultural Insights ──────────────────────────────────────────────────

export const culturalInsightsCategory: Category = {
  id: "culture",
  titleKh: "វប្បធម៌",
  titleEn: "Cultural Insights",
  description: "Angkor & folklore",
  icon: "landmark",
  subCategories: [
    {
      id: "temples",
      title: "Temples & History",
      titleKh: "ប្រាសាទ",
      isGuestAccessible: false,
      lessons: [
        {
          id: "cult-t-angkor",
          title: "Angkor Wat",
          titleKh: "អង្គរវត្ត",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 6,
        },
        {
          id: "cult-t-bayon",
          title: "Bayon Temple",
          titleKh: "ប្រាសាទបាយ័ន",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "cult-t-taprohm",
          title: "Ta Prohm Ruins",
          titleKh: "ប្រាសាទតាព្រហ្ម",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
      ],
    },
    {
      id: "festivals",
      title: "Festivals & Ceremonies",
      titleKh: "ពិធីបុណ្យ",
      isGuestAccessible: false,
      lessons: [
        {
          id: "cult-f-khmer-new",
          title: "Khmer New Year",
          titleKh: "ចូលឆ្នាំខ្មែរ",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "cult-f-water",
          title: "Water Festival",
          titleKh: "បុណ្យអុំទូក",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "cult-f-pchum",
          title: "Pchum Ben",
          titleKh: "ភ្ជុំបិណ្ឌ",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
      ],
    },
    {
      id: "customs",
      title: "Customs & Etiquette",
      titleKh: "ទំនៀមមួល",
      isGuestAccessible: false,
      lessons: [
        {
          id: "cult-c-sampeah",
          title: "Sampeah (greeting bow)",
          titleKh: "សំពះ",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
        {
          id: "cult-c-dress",
          title: "Dress codes at temples",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
        {
          id: "cult-c-head",
          title: "Head & feet etiquette",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
        {
          id: "cult-c-gift",
          title: "Gift giving customs",
          type: "reading",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
      ],
    },
  ],
};

// ── 6. Vocab Quizzes ──────────────────────────────────────────────────────

export const vocabQuizzesCategory: Category = {
  id: "quizzes",
  titleKh: "ល្បែងទស្សន",
  titleEn: "Vocab Quizzes",
  description: "Flashcard games",
  icon: "zap",
  subCategories: [
    {
      id: "flashcards-basic",
      title: "Basic Flashcards",
      titleKh: "ស្លាកសំណួរ",
      isGuestAccessible: true, // Guests get 1 daily quiz
      lessons: [
        {
          id: "qz-f-daily",
          title: "Daily Starter Quiz",
          type: "quiz",
          isGuestAccessible: true,
          durationMinutes: 5,
        },
        {
          id: "qz-f-alpha1",
          title: "Alphabet Round 1",
          type: "quiz",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "qz-f-alpha2",
          title: "Alphabet Round 2",
          type: "quiz",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "qz-f-phrase1",
          title: "Phrases Round 1",
          type: "quiz",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
        {
          id: "qz-f-phrase2",
          title: "Phrases Round 2",
          type: "quiz",
          isGuestAccessible: false,
          durationMinutes: 5,
        },
      ],
    },
    {
      id: "matching",
      title: "Matching Games",
      titleKh: "ហ្គេមមូនអ",
      isGuestAccessible: false,
      lessons: [
        {
          id: "qz-m-script1",
          title: "Script Match: Consonants",
          type: "quiz",
          isGuestAccessible: false,
          durationMinutes: 6,
        },
        {
          id: "qz-m-script2",
          title: "Script Match: Vowels",
          type: "quiz",
          isGuestAccessible: false,
          durationMinutes: 6,
        },
        {
          id: "qz-m-vocab1",
          title: "Vocabulary Match: Food",
          type: "quiz",
          isGuestAccessible: false,
          durationMinutes: 6,
        },
        {
          id: "qz-m-vocab2",
          title: "Vocabulary Match: Travel",
          type: "quiz",
          isGuestAccessible: false,
          durationMinutes: 6,
        },
        {
          id: "qz-m-vocab3",
          title: "Vocabulary Match: People",
          type: "quiz",
          isGuestAccessible: false,
          durationMinutes: 6,
        },
      ],
    },
    {
      id: "speed-round",
      title: "Speed Rounds",
      titleKh: "ល្បឿន",
      isGuestAccessible: false,
      lessons: [
        {
          id: "qz-s-60sec",
          title: "60-Second Challenge",
          type: "quiz",
          isGuestAccessible: false,
          durationMinutes: 1,
        },
        {
          id: "qz-s-audio",
          title: "Audio Recognition Sprint",
          type: "quiz",
          isGuestAccessible: false,
          durationMinutes: 3,
        },
        {
          id: "qz-s-write",
          title: "Writing Speed Round",
          type: "quiz",
          isGuestAccessible: false,
          durationMinutes: 4,
        },
      ],
    },
    {
      id: "review",
      title: "Review & Mastery",
      titleKh: "ការពិនិត្យ",
      isGuestAccessible: false,
      lessons: [
        {
          id: "qz-r-week",
          title: "Weekly Review",
          type: "quiz",
          isGuestAccessible: false,
          durationMinutes: 8,
        },
        {
          id: "qz-r-month",
          title: "Monthly Mastery Test",
          type: "quiz",
          isGuestAccessible: false,
          durationMinutes: 15,
        },
        {
          id: "qz-r-hard",
          title: "Hard Mode Challenge",
          type: "quiz",
          isGuestAccessible: false,
          durationMinutes: 10,
        },
      ],
    },
  ],
};

// ── Registry ──────────────────────────────────────────────────────────────

export const ALL_CATEGORIES: Category[] = [
  khmerScriptCategory,
  survivalPhrasesCategory,
  grammarCategory,
  conversationsCategory,
  culturalInsightsCategory,
  vocabQuizzesCategory,
];

/** Get total lessons in a category */
export function getTotalLessons(category: Category): number {
  return category.subCategories.reduce((acc, sub) => acc + sub.lessons.length, 0);
}

/** Get total lessons accessible to guest in a category */
export function getGuestAccessibleLessons(category: Category): number {
  return category.subCategories
    .filter((s) => s.isGuestAccessible)
    .reduce((acc, sub) => acc + sub.lessons.filter((l) => l.isGuestAccessible).length, 0);
}

/** Get all lessons as a flat array for a category */
export function getFlatLessons(category: Category): Array<Lesson & { subCategoryId: string }> {
  return category.subCategories.flatMap((sub) =>
    sub.lessons.map((l) => ({ ...l, subCategoryId: sub.id })),
  );
}
