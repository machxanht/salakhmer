export type LearningGlossaryEntry = {
  khmer: string;
  translations: { en: string; vi: string; zh: string; fr: string };
  explanation: { en: string; vi: string; zh: string; fr: string };
  relatedLevel: "level_1" | "level_2" | "level_3" | "level_4" | "level_5" | "level_6";
};

/**
 * Hand-reviewed learning terms. They bypass machine translation so a grammar
 * term always has the same meaning in the dictionary and in the assistant.
 */
export const LEARNING_GLOSSARY: readonly LearningGlossaryEntry[] = [
  {
    khmer: "\u179f\u17d2\u179a\u17c8\u1796\u17c1\u1789\u178f\u17bd",
    translations: { en: "Independent vowel", vi: "Nguy\u00ean \u00e2m \u0111\u1ed9c l\u1eadp", zh: "\u72ec\u7acb\u5143\u97f3", fr: "Voyelle ind\u00e9pendante" },
    explanation: {
      en: "A vowel that can stand on its own. In SalaKhmer, these are introduced in Level 5.",
      vi: "Nguy\u00ean \u00e2m c\u00f3 th\u1ec3 \u0111\u1ee9ng ri\u00eang. Trong SalaKhmer, nh\u00f3m n\u00e0y \u0111\u01b0\u1ee3c h\u1ecdc \u1edf C\u1ea5p 5.",
      zh: "\u53ef\u4ee5\u72ec\u7acb\u51fa\u73b0\u7684\u5143\u97f3\u3002\u5728 SalaKhmer \u4e2d\uff0c\u8fd9\u4e00\u7ec4\u5728\u7b2c 5 \u7ea7\u5b66\u4e60\u3002",
      fr: "Une voyelle qui peut appara\u00eetre seule. Dans SalaKhmer, ce groupe est \u00e9tudi\u00e9 au niveau 5.",
    },
    relatedLevel: "level_5",
  },
  {
    khmer: "\u1796\u17d2\u1799\u1789\u17d2\u1787\u1793\u17c8",
    translations: { en: "Consonant", vi: "Ph\u1ee5 \u00e2m", zh: "\u8f85\u97f3", fr: "Consonne" },
    explanation: {
      en: "A consonant letter. SalaKhmer introduces A-series consonants in Level 1 and O-series consonants in Level 2.",
      vi: "M\u1ed9t ch\u1eef ph\u1ee5 \u00e2m. SalaKhmer h\u1ecdc ph\u1ee5 \u00e2m nh\u00f3m A \u1edf C\u1ea5p 1 v\u00e0 nh\u00f3m O \u1edf C\u1ea5p 2.",
      zh: "\u8f85\u97f3\u5b57\u6bcd\u3002SalaKhmer \u5728\u7b2c 1 \u7ea7\u5b66\u4e60 A \u7ec4\u8f85\u97f3\uff0c\u5728\u7b2c 2 \u7ea7\u5b66\u4e60 O \u7ec4\u8f85\u97f3\u3002",
      fr: "Une lettre consonne. SalaKhmer pr\u00e9sente la s\u00e9rie A au niveau 1 et la s\u00e9rie O au niveau 2.",
    },
    relatedLevel: "level_1",
  },
  {
    khmer: "\u179f\u17d2\u179a\u17c8",
    translations: { en: "Vowel", vi: "Nguy\u00ean \u00e2m", zh: "\u5143\u97f3", fr: "Voyelle" },
    explanation: {
      en: "A vowel. SalaKhmer separates dependent vowels in Level 4 from independent vowels in Level 5.",
      vi: "Nguy\u00ean \u00e2m. SalaKhmer ph\u00e2n bi\u1ec7t nguy\u00ean \u00e2m ph\u1ee5 thu\u1ed9c \u1edf C\u1ea5p 4 v\u00e0 nguy\u00ean \u00e2m \u0111\u1ed9c l\u1eadp \u1edf C\u1ea5p 5.",
      zh: "\u5143\u97f3\u3002SalaKhmer \u5c06\u7b2c 4 \u7ea7\u7684\u4f9d\u8d56\u5143\u97f3\u4e0e\u7b2c 5 \u7ea7\u7684\u72ec\u7acb\u5143\u97f3\u5206\u5f00\u5b66\u4e60\u3002",
      fr: "Une voyelle. SalaKhmer distingue les voyelles d\u00e9pendantes du niveau 4 et les voyelles ind\u00e9pendantes du niveau 5.",
    },
    relatedLevel: "level_4",
  },
  {
    khmer: "\u1787\u17be\u1784\u17a2\u1780\u17d2\u179f\u179a",
    translations: { en: "Sub-consonant / coeng form", vi: "Ph\u1ee5 \u00e2m ch\u00e2n / d\u1ea1ng coeng", zh: "\u4e0b\u6807\u8f85\u97f3 / coeng \u5f62\u5f0f", fr: "Sous-consonne / forme coeng" },
    explanation: {
      en: "A smaller consonant form used below a main consonant in Khmer word building. SalaKhmer introduces these in Level 3.",
      vi: "D\u1ea1ng ph\u1ee5 \u00e2m nh\u1ecf \u0111\u1eb7t d\u01b0\u1edbi ph\u1ee5 \u00e2m ch\u00ednh khi t\u1ea1o t\u1eeb Khmer. SalaKhmer h\u1ecdc nh\u00f3m n\u00e0y \u1edf C\u1ea5p 3.",
      zh: "\u5728\u9ad8\u68c9\u8bed\u6784\u8bcd\u65f6\u7f6e\u4e8e\u4e3b\u8f85\u97f3\u4e0b\u65b9\u7684\u8f83\u5c0f\u8f85\u97f3\u5f62\u5f0f\u3002SalaKhmer \u5728\u7b2c 3 \u7ea7\u5b66\u4e60\u3002",
      fr: "Une forme consonantique r\u00e9duite plac\u00e9e sous une consonne principale dans les mots khmers. SalaKhmer la pr\u00e9sente au niveau 3.",
    },
    relatedLevel: "level_3",
  },
  {
    khmer: "\u179b\u17c1\u1781\u1781\u17d2\u1798\u17c2\u179a",
    translations: { en: "Khmer numerals", vi: "S\u1ed1 Khmer", zh: "\u9ad8\u68c9\u6570\u5b57", fr: "Chiffres khmers" },
    explanation: {
      en: "The Khmer number symbols from 0 to 9 and larger counting examples. They are introduced in Level 6.",
      vi: "C\u00e1c k\u00fd hi\u1ec7u s\u1ed1 Khmer t\u1eeb 0 \u0111\u1ebfn 9 v\u00e0 v\u00ed d\u1ee5 s\u1ed1 l\u1edbn h\u01a1n. Nh\u00f3m n\u00e0y \u0111\u01b0\u1ee3c h\u1ecdc \u1edf C\u1ea5p 6.",
      zh: "\u4ece 0 \u5230 9 \u7684\u9ad8\u68c9\u6570\u5b57\u7b26\u53f7\u53ca\u8f83\u5927\u6570\u5b57\u793a\u4f8b\u3002\u5728\u7b2c 6 \u7ea7\u5b66\u4e60\u3002",
      fr: "Les symboles num\u00e9riques khmers de 0 \u00e0 9 et des exemples de nombres plus grands. Ils sont pr\u00e9sent\u00e9s au niveau 6.",
    },
    relatedLevel: "level_6",
  },
] as const;

export function findLearningGlossaryEntry(text: string) {
  const normalized = text.normalize("NFC").trim().replace(/\s+/gu, " ");
  return LEARNING_GLOSSARY.find((entry) => entry.khmer === normalized) ?? null;
}

export const LEARNING_GLOSSARY_CONTEXT = LEARNING_GLOSSARY.map((entry) =>
  `${entry.khmer} | EN: ${entry.translations.en} | VI: ${entry.translations.vi} | ZH: ${entry.translations.zh} | FR: ${entry.translations.fr}. ${entry.explanation.en}`,
).join("\n");
