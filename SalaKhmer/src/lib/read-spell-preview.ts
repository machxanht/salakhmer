export type ReadSpellPreviewWord = {
  id: string;
  khmer: string;
  phonetic: string;
  english: string;
  image: string;
  exampleKhmer: string;
  examplePhonetic: string;
  exampleEnglish: string;
};

export const READ_SPELL_PREVIEW_TOPICS = {
  "topic-colors": {
    title: "Colors",
    description: "Learn useful Khmer color words through clear picture cards.",
    image: "/assets/read-spell/topic-colors/rs-colors-001.webp",
    words: [
      {
        id: "rs-colors-001",
        khmer: "ក្រហម",
        phonetic: "krahawm",
        english: "Red",
        image: "/assets/read-spell/topic-colors/rs-colors-001.webp",
        exampleKhmer: "អាវនេះមានពណ៌ក្រហម។",
        examplePhonetic: "Aav nih mean por krahawm.",
        exampleEnglish: "This shirt is red.",
      },
      {
        id: "rs-colors-002",
        khmer: "ខៀវ",
        phonetic: "khiev",
        english: "Blue",
        image: "/assets/read-spell/topic-colors/rs-colors-002.webp",
        exampleKhmer: "មេឃមានពណ៌ខៀវ។",
        examplePhonetic: "Mekh mean por khiev.",
        exampleEnglish: "The sky is blue.",
      },
      {
        id: "rs-colors-003",
        khmer: "លឿង",
        phonetic: "leang",
        english: "Yellow",
        image: "/assets/read-spell/topic-colors/rs-colors-003.webp",
        exampleKhmer: "ផ្លែចេកនេះមានពណ៌លឿង។",
        examplePhonetic: "Phlae chek nih mean por leang.",
        exampleEnglish: "This banana is yellow.",
      },
    ] satisfies ReadSpellPreviewWord[],
  },
} as const;

export type ReadSpellPreviewTopicId = keyof typeof READ_SPELL_PREVIEW_TOPICS;
