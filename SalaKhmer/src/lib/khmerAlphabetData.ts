export type ConsonantSeries = "A" | "O" | "N/A";

export interface KhmerCharacter {
  id: string;
  khmer: string;
  latin: string;
  series?: ConsonantSeries;
  /** Stable, dictionary-style spelling used consistently throughout the app. */
  romanization?: string;
  /** Plain-English reading cue. Audio remains the source of truth. */
  learnerReading?: string;
  /** Alias retained for exported JSON/content consumers. */
  phonetic?: string;
  /** A short English articulation hint; never IPA. */
  englishHint?: string;
  englishRhyme?: string;
  isAspirated?: boolean;
  description?: string;
  aSeriesSound?: string;
  oSeriesSound?: string;
  /** Khmer text sent to TTS when the visible glyph is not pronounceable alone. */
  ttsText?: string;
  ttsTextA?: string;
  ttsTextO?: string;
}

type ConsonantPhonetics = Pick<
  KhmerCharacter,
  "romanization" | "learnerReading" | "englishHint" | "isAspirated"
>;

const FIRST_SERIES_HINT = "Rhyme the ending with ‘aw’ in ‘law’.";
const SECOND_SERIES_HINT = "Rhyme the ending with ‘o’ in ‘go’.";
const ASPIRATED = " Release it with a clear puff of air.";

const CONSONANT_PHONETICS: Record<string, ConsonantPhonetics> = {
  "c-ka": {
    romanization: "k",
    learnerReading: "K-aw",
    englishHint: FIRST_SERIES_HINT,
    isAspirated: false,
  },
  "c-kha": {
    romanization: "kh",
    learnerReading: "K-aw",
    englishHint: `Start with K.${ASPIRATED}${FIRST_SERIES_HINT}`,
    isAspirated: true,
  },
  "c-cha": {
    romanization: "ch",
    learnerReading: "Ch-aw",
    englishHint: `Start as in ‘chair’. ${FIRST_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-chha": {
    romanization: "chh",
    learnerReading: "Ch-aw",
    englishHint: `Start as in ‘chair’.${ASPIRATED}${FIRST_SERIES_HINT}`,
    isAspirated: true,
  },
  "c-da": {
    romanization: "d",
    learnerReading: "D-aw",
    englishHint: `Start with D. ${FIRST_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-tha1": {
    romanization: "th",
    learnerReading: "T-aw",
    englishHint: `Start with T, not English ‘th’. ${FIRST_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-na1": {
    romanization: "n",
    learnerReading: "N-aw",
    englishHint: `Start with N. ${FIRST_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-ta": {
    romanization: "t",
    learnerReading: "T-aw",
    englishHint: `Start with T. ${FIRST_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-tha2": {
    romanization: "th",
    learnerReading: "T-aw",
    englishHint: `Start with T, not English ‘th’.${ASPIRATED}${FIRST_SERIES_HINT}`,
    isAspirated: true,
  },
  "c-ba": {
    romanization: "b",
    learnerReading: "B-aw",
    englishHint: `Start with B. ${FIRST_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-pha": {
    romanization: "ph",
    learnerReading: "P-aw",
    englishHint: `Start with P, never F.${ASPIRATED}${FIRST_SERIES_HINT}`,
    isAspirated: true,
  },
  "c-sa": {
    romanization: "s",
    learnerReading: "S-aw",
    englishHint: `Start with S. ${FIRST_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-ha": {
    romanization: "h",
    learnerReading: "H-aw",
    englishHint: `Start with H. ${FIRST_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-la": {
    romanization: "l",
    learnerReading: "L-aw",
    englishHint: `Start with L. ${FIRST_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-a": {
    romanization: "’",
    learnerReading: "Aw",
    englishHint: `A vowel carrier; begin directly with the vowel. ${FIRST_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-ko": {
    romanization: "k",
    learnerReading: "K-o",
    englishHint: SECOND_SERIES_HINT,
    isAspirated: false,
  },
  "c-kho": {
    romanization: "kh",
    learnerReading: "K-o",
    englishHint: `Start with K.${ASPIRATED}${SECOND_SERIES_HINT}`,
    isAspirated: true,
  },
  "c-ngo": {
    romanization: "ng",
    learnerReading: "Ng-o",
    englishHint: `Start with ng in ‘singer’. ${SECOND_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-cho": {
    romanization: "ch",
    learnerReading: "Ch-o",
    englishHint: `Start as in ‘chair’. ${SECOND_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-chho": {
    romanization: "chh",
    learnerReading: "Ch-o",
    englishHint: `Start as in ‘chair’.${ASPIRATED}${SECOND_SERIES_HINT}`,
    isAspirated: true,
  },
  "c-nho": {
    romanization: "nh",
    learnerReading: "Ny-o",
    englishHint: `Start with ny in ‘canyon’. ${SECOND_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-do": {
    romanization: "d",
    learnerReading: "D-o",
    englishHint: `Start with D. ${SECOND_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-tho1": {
    romanization: "th",
    learnerReading: "T-o",
    englishHint: `Start with T, not English ‘th’. ${SECOND_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-to": {
    romanization: "t",
    learnerReading: "T-o",
    englishHint: `Start with T. ${SECOND_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-tho2": {
    romanization: "th",
    learnerReading: "T-o",
    englishHint: `Start with T, not English ‘th’.${ASPIRATED}${SECOND_SERIES_HINT}`,
    isAspirated: true,
  },
  "c-no": {
    romanization: "n",
    learnerReading: "N-o",
    englishHint: `Start with N. ${SECOND_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-po": {
    romanization: "p",
    learnerReading: "P-o",
    englishHint: `Start with P. ${SECOND_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-pho": {
    romanization: "ph",
    learnerReading: "P-o",
    englishHint: `Start with P, never F.${ASPIRATED}${SECOND_SERIES_HINT}`,
    isAspirated: true,
  },
  "c-mo": {
    romanization: "m",
    learnerReading: "M-o",
    englishHint: `Start with M. ${SECOND_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-yo": {
    romanization: "y",
    learnerReading: "Y-o",
    englishHint: `Start with Y in ‘yes’. ${SECOND_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-ro": {
    romanization: "r",
    learnerReading: "R-o",
    englishHint: `Use a light tapped R. ${SECOND_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-lo": {
    romanization: "l",
    learnerReading: "L-o",
    englishHint: `Start with L. ${SECOND_SERIES_HINT}`,
    isAspirated: false,
  },
  "c-vo": {
    romanization: "v",
    learnerReading: "V-o",
    englishHint: `Start with V. ${SECOND_SERIES_HINT}`,
    isAspirated: false,
  },
};

function enrichConsonant(character: KhmerCharacter): KhmerCharacter {
  const guide = CONSONANT_PHONETICS[character.id];
  return {
    ...character,
    ...guide,
    phonetic: guide.learnerReading,
    englishRhyme:
      character.series === "A"
        ? "ending sounds like ‘aw’ in ‘law’"
        : "ending sounds like ‘o’ in ‘go’",
  };
}

export const LEVEL_1_CONSONANTS_A: KhmerCharacter[] = [
  { id: "c-ka", khmer: "ក", latin: "Ka", series: "A" },
  { id: "c-kha", khmer: "ខ", latin: "Kha", series: "A" },
  { id: "c-cha", khmer: "ច", latin: "Cha", series: "A" },
  { id: "c-chha", khmer: "ឆ", latin: "Chha", series: "A" },
  { id: "c-da", khmer: "ដ", latin: "Da", series: "A" },
  { id: "c-tha1", khmer: "ឋ", latin: "Tha", series: "A" },
  { id: "c-na1", khmer: "ណ", latin: "Na", series: "A" },
  { id: "c-ta", khmer: "ត", latin: "Ta", series: "A" },
  { id: "c-tha2", khmer: "ថ", latin: "Tha", series: "A" },
  { id: "c-ba", khmer: "ប", latin: "Ba", series: "A" },
  { id: "c-pha", khmer: "ផ", latin: "Pha", series: "A" },
  { id: "c-sa", khmer: "ស", latin: "Sa", series: "A" },
  { id: "c-ha", khmer: "ហ", latin: "Ha", series: "A" },
  { id: "c-la", khmer: "ឡ", latin: "Lo", series: "A" },
  { id: "c-a", khmer: "អ", latin: "Aw", series: "A" },
].map(enrichConsonant);

export const LEVEL_2_CONSONANTS_O: KhmerCharacter[] = [
  { id: "c-ko", khmer: "គ", latin: "Ko", series: "O" },
  { id: "c-kho", khmer: "ឃ", latin: "Kho", series: "O" },
  { id: "c-ngo", khmer: "ង", latin: "Nga", series: "O" },
  { id: "c-cho", khmer: "ជ", latin: "Cho", series: "O" },
  { id: "c-chho", khmer: "ឈ", latin: "Chho", series: "O" },
  { id: "c-nho", khmer: "ញ", latin: "Nha", series: "O" },
  { id: "c-do", khmer: "ឌ", latin: "Do", series: "O" },
  { id: "c-tho1", khmer: "ឍ", latin: "Tho", series: "O" },
  { id: "c-to", khmer: "ទ", latin: "To", series: "O" },
  { id: "c-tho2", khmer: "ធ", latin: "Tho", series: "O" },
  { id: "c-no", khmer: "ន", latin: "No", series: "O" },
  { id: "c-po", khmer: "ព", latin: "Po", series: "O" },
  { id: "c-pho", khmer: "ភ", latin: "Pho", series: "O" },
  { id: "c-mo", khmer: "ម", latin: "Mo", series: "O" },
  { id: "c-yo", khmer: "យ", latin: "Yo", series: "O" },
  { id: "c-ro", khmer: "រ", latin: "Ro", series: "O" },
  { id: "c-lo", khmer: "ល", latin: "Lo", series: "O" },
  { id: "c-vo", khmer: "វ", latin: "Vo", series: "O" },
].map(enrichConsonant);

/** The complete, app-wide consonant source of truth for romanization and pronunciation UI. */
export const khmerAlphabets: KhmerCharacter[] = [...LEVEL_1_CONSONANTS_A, ...LEVEL_2_CONSONANTS_O];

export const LEVEL_3_SUB_CONSONANTS: KhmerCharacter[] = [
  { id: "sub-ka", khmer: "្ក", latin: "Coeng Ka" },
  { id: "sub-kha", khmer: "្ខ", latin: "Coeng Kha" },
  { id: "sub-ko", khmer: "្គ", latin: "Coeng Ko" },
  { id: "sub-kho", khmer: "្ឃ", latin: "Coeng Kho" },
  { id: "sub-ngo", khmer: "្ង", latin: "Coeng Nga" },
  { id: "sub-cha", khmer: "្ច", latin: "Coeng Cha" },
  { id: "sub-chha", khmer: "្ឆ", latin: "Coeng Chha" },
  { id: "sub-cho", khmer: "្ជ", latin: "Coeng Cho" },
  { id: "sub-chho", khmer: "្ឈ", latin: "Coeng Chho" },
  { id: "sub-nho", khmer: "្ញ", latin: "Coeng Nha" },
  { id: "sub-da", khmer: "្ដ", latin: "Coeng Da" },
  { id: "sub-tha1", khmer: "្ឋ", latin: "Coeng Tha" },
  { id: "sub-do", khmer: "្ឌ", latin: "Coeng Do" },
  { id: "sub-tho1", khmer: "្ឍ", latin: "Coeng Tho" },
  { id: "sub-na", khmer: "្ណ", latin: "Coeng Na" },
  { id: "sub-ta", khmer: "្ត", latin: "Coeng Ta" },
  { id: "sub-tha2", khmer: "្ថ", latin: "Coeng Tha" },
  { id: "sub-to", khmer: "្ទ", latin: "Coeng To" },
  { id: "sub-tho2", khmer: "្ធ", latin: "Coeng Tho" },
  { id: "sub-no", khmer: "្ន", latin: "Coeng No" },
  { id: "sub-ba", khmer: "្ប", latin: "Coeng Ba" },
  { id: "sub-pha", khmer: "្ផ", latin: "Coeng Pha" },
  { id: "sub-po", khmer: "្ព", latin: "Coeng Po" },
  { id: "sub-pho", khmer: "្ភ", latin: "Coeng Pho" },
  { id: "sub-mo", khmer: "្ម", latin: "Coeng Mo" },
  { id: "sub-yo", khmer: "្យ", latin: "Coeng Yo" },
  { id: "sub-ro", khmer: "្រ", latin: "Coeng Ro" },
  { id: "sub-lo", khmer: "្ល", latin: "Coeng Lo" },
  { id: "sub-vo", khmer: "្វ", latin: "Coeng Vo" },
  { id: "sub-sa", khmer: "្ស", latin: "Coeng Sa" },
  { id: "sub-ha", khmer: "្ហ", latin: "Coeng Ha" },
  { id: "sub-a", khmer: "្អ", latin: "Coeng Aw" },
];

export const LEVEL_4_DEPENDENT_VOWELS: KhmerCharacter[] = [
  { id: "v-aa", khmer: "ា", latin: "aa", aSeriesSound: "ah", oSeriesSound: "ear" },
  { id: "v-i", khmer: "ិ", latin: "i", aSeriesSound: "ih", oSeriesSound: "ee" },
  { id: "v-ii", khmer: "ី", latin: "ii", aSeriesSound: "ee", oSeriesSound: "ee" },
  { id: "v-ue", khmer: "ឹ", latin: "ue", aSeriesSound: "ue", oSeriesSound: "ue" },
  { id: "v-uee", khmer: "ឺ", latin: "uee", aSeriesSound: "uee", oSeriesSound: "uee" },
  { id: "v-u", khmer: "ុ", latin: "u", aSeriesSound: "u", oSeriesSound: "oo" },
  { id: "v-uu", khmer: "ូ", latin: "uu", aSeriesSound: "oo", oSeriesSound: "oo" },
  { id: "v-ua", khmer: "ួ", latin: "ua", aSeriesSound: "uor", oSeriesSound: "uor" },
  { id: "v-ae", khmer: "ើ", latin: "ae", aSeriesSound: "eur", oSeriesSound: "eur" },
  { id: "v-ya", khmer: "ឿ", latin: "ya", aSeriesSound: "uer", oSeriesSound: "uer" },
  { id: "v-ie", khmer: "ៀ", latin: "ie", aSeriesSound: "ier", oSeriesSound: "ier" },
  { id: "v-e", khmer: "េ", latin: "e", aSeriesSound: "ay", oSeriesSound: "ay" },
  { id: "v-ae2", khmer: "ែ", latin: "ae2", aSeriesSound: "ae", oSeriesSound: "ae" },
  { id: "v-ai", khmer: "ៃ", latin: "ai", aSeriesSound: "ay", oSeriesSound: "ey" },
  { id: "v-o", khmer: "ោ", latin: "o", aSeriesSound: "ao", oSeriesSound: "ow" },
  { id: "v-au", khmer: "ៅ", latin: "au", aSeriesSound: "au", oSeriesSound: "ov" },
  { id: "v-um", khmer: "ុំ", latin: "um", aSeriesSound: "um", oSeriesSound: "um" },
  { id: "v-om", khmer: "ំ", latin: "om", aSeriesSound: "om", oSeriesSound: "um" },
  { id: "v-am", khmer: "ាំ", latin: "am", aSeriesSound: "am", oSeriesSound: "oam" },
  { id: "v-ah", khmer: "ះ", latin: "ah", aSeriesSound: "ah", oSeriesSound: "eah" },
  { id: "v-uh", khmer: "ុះ", latin: "uh", aSeriesSound: "uh", oSeriesSound: "ush" },
  { id: "v-eh", khmer: "េះ", latin: "eh", aSeriesSound: "eh", oSeriesSound: "ih" },
  { id: "v-aeh", khmer: "ែះ", latin: "aeh", aSeriesSound: "eh", oSeriesSound: "eh" },
  { id: "v-oh", khmer: "ោះ", latin: "oh", aSeriesSound: "oh", oSeriesSound: "uoh" },
];

export const LEVEL_5_INDEPENDENT_VOWELS: KhmerCharacter[] = [
  { id: "iv-01", khmer: "ឥ", latin: "I / Ih", phonetic: "I / Ih", englishHint: "Like 'i' in 'it'", ttsText: "ឥ" },
  { id: "iv-02", khmer: "ឦ", latin: "Ee", phonetic: "Ee", englishHint: "Like 'ee' in 'see'", ttsText: "ឦ" },
  { id: "iv-03", khmer: "ឧ", latin: "U", phonetic: "U", englishHint: "Like 'u' in 'put'", ttsText: "ឧ" },
  { id: "iv-05", khmer: "ឩ", latin: "Oo", phonetic: "Oo", englishHint: "Like 'oo' in 'cool'", ttsText: "ឩ" },
  { id: "iv-06", khmer: "ឪ", latin: "Ov / Au", phonetic: "Ov / Au", englishHint: "Like 'oh' blending into 'v', or 'ow'", ttsText: "ឪ" },
  { id: "iv-07", khmer: "ឫ", latin: "Rue", phonetic: "Rue", englishHint: "Like 'rue' with a rolled R", ttsText: "ឫ" },
  { id: "iv-08", khmer: "ឬ", latin: "Ruee", phonetic: "Ruee", englishHint: "Long 'rue', heavily rolled R", ttsText: "ឬ" },
  { id: "iv-09", khmer: "ឭ", latin: "Lue", phonetic: "Lue", englishHint: "Like 'loo'", ttsText: "ឭ" },
  { id: "iv-10", khmer: "ឮ", latin: "Luee", phonetic: "Luee", englishHint: "Long 'loo'", ttsText: "ឮ" },
  { id: "iv-11", khmer: "ឯ", latin: "Eh / Ae", phonetic: "Eh / Ae", englishHint: "Like 'ai' in 'air'", ttsText: "ឯ" },
  { id: "iv-12", khmer: "ឰ", latin: "Ai", phonetic: "Ai", englishHint: "Like 'i' in 'hi'", ttsText: "ឰ" },
  { id: "iv-13", khmer: "ឱ", latin: "O", phonetic: "O", englishHint: "Like 'o' in 'so'", ttsText: "ឱ" },
  { id: "iv-15", khmer: "ឳ", latin: "Au", phonetic: "Au", englishHint: "Like 'ow' in 'cow'", ttsText: "ឳ" },
];

export const LEVEL_6_NUMERALS: KhmerCharacter[] = [
  { id: "num-0", khmer: "០", latin: "Soun (0)" },
  { id: "num-1", khmer: "១", latin: "Moi (1)" },
  { id: "num-2", khmer: "២", latin: "Pi (2)" },
  { id: "num-3", khmer: "៣", latin: "Bei (3)" },
  { id: "num-4", khmer: "៤", latin: "Buon (4)" },
  { id: "num-5", khmer: "៥", latin: "Pram (5)" },
  { id: "num-6", khmer: "៦", latin: "Pram Moi (6)" },
  { id: "num-7", khmer: "៧", latin: "Pram Pi (7)" },
  { id: "num-8", khmer: "៨", latin: "Pram Bei (8)" },
  { id: "num-9", khmer: "៩", latin: "Pram Buon (9)" },
  { id: "num-100", khmer: "១០០", latin: "Moi Roy (100)" },
  { id: "num-1000", khmer: "១០០០", latin: "Moi Poan (1000)" },
  { id: "num-10000", khmer: "១០០០០", latin: "Moi Meun (10000)" },
  { id: "num-1000000", khmer: "១០០០០០០", latin: "Moi Lean (1000000)" },
  { id: "num-1000000000", khmer: "១០០០០០០០០០", latin: "Moi Koat (1000000000)" },
];
