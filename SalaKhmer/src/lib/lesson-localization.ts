import type { KhmerCharacter } from "@/lib/khmerAlphabetData";
import type { Locale } from "@/lib/i18n";

/**
 * Locale-owned lesson data. Khmer script and romanisation are stable learning
 * data; explanatory prose belongs here rather than in the alphabet database.
 */
type CharacterCopy = { phonetic?: string; hint?: string };

const independentVowelCopy: Record<Locale, Record<string, CharacterCopy>> = {
  en: {
    "iv-01": { phonetic: "I / Ih", hint: "Like 'i' in 'it'" },
    "iv-02": { phonetic: "Ee", hint: "Like 'ee' in 'see'" },
    "iv-03": { phonetic: "U", hint: "Like 'u' in 'put'" },
    "iv-04": { phonetic: "Uu", hint: "Like 'oo' in 'boot'" },
    "iv-05": { phonetic: "Oo", hint: "Like 'oo' in 'cool'" },
    "iv-06": { phonetic: "Ov / Au", hint: "Like 'oh' blending into 'v', or 'ow'" },
    "iv-07": { phonetic: "Rue", hint: "Like 'rue' with a rolled R" },
    "iv-08": { phonetic: "Ruee", hint: "Long 'rue', heavily rolled R" },
    "iv-09": { phonetic: "Lue", hint: "Like 'loo'" },
    "iv-10": { phonetic: "Luee", hint: "Long 'loo'" },
    "iv-11": { phonetic: "Eh / Ae", hint: "Like 'ai' in 'air'" },
    "iv-12": { phonetic: "Ai", hint: "Like 'i' in 'hi'" },
    "iv-13": { phonetic: "O", hint: "Like 'o' in 'so'" },
    "iv-14": { phonetic: "Aoy / Ao", hint: "Like 'oy' in 'boy'" },
    "iv-15": { phonetic: "Au", hint: "Like 'ow' in 'cow'" },
  },
  vi: {
    "iv-01": { phonetic: "I / Ih", hint: "Giống âm 'i' trong 'it'" },
    "iv-02": { phonetic: "Ee", hint: "Giống âm 'ee' trong 'see'" },
    "iv-03": { phonetic: "U", hint: "Giống âm 'u' trong 'put'" },
    "iv-04": { phonetic: "Uu", hint: "Giống âm 'oo' trong 'boot'" },
    "iv-05": { phonetic: "Oo", hint: "Giống âm 'oo' trong 'cool'" },
    "iv-06": { phonetic: "Ov / Au", hint: "Giống 'oh' lướt sang 'v', hoặc 'ow'" },
    "iv-07": { phonetic: "Rue", hint: "Giống 'rue' với âm R rung" },
    "iv-08": { phonetic: "Ruee", hint: "Âm 'rue' dài, R rung rõ" },
    "iv-09": { phonetic: "Lue", hint: "Giống 'loo'" },
    "iv-10": { phonetic: "Luee", hint: "Âm 'loo' dài" },
    "iv-11": { phonetic: "Eh / Ae", hint: "Giống 'ai' trong 'air'" },
    "iv-12": { phonetic: "Ai", hint: "Giống 'i' trong 'hi'" },
    "iv-13": { phonetic: "O", hint: "Giống 'o' trong 'so'" },
    "iv-14": { phonetic: "Aoy / Ao", hint: "Giống 'oy' trong 'boy'" },
    "iv-15": { phonetic: "Au", hint: "Giống 'ow' trong 'cow'" },
  },
  zh: {},
  fr: {},
};

/** Resolves display prose without ever changing Khmer audio payload/script. */
export function getAlphabetCharacterCopy(character: KhmerCharacter, locale: Locale): CharacterCopy {
  const localized = independentVowelCopy[locale][character.id];
  return localized ?? independentVowelCopy.en[character.id] ?? {
    phonetic: character.phonetic ?? character.learnerReading ?? character.latin,
    hint: character.englishHint,
  };
}

export const alphabetLessonTitleKey: Record<string, string> = {
  "alpha-l1": "alphabetLevel1Title",
  "alpha-l2": "alphabetLevel2Title",
  "alpha-l3": "alphabetLevel3Title",
  "alpha-l4": "alphabetLevel4Title",
  "alpha-l5": "alphabetLevel5Title",
  "alpha-l6": "alphabetLevel6Title",
};
