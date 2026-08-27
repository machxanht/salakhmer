import { beginnerCambodiaLessons } from "./beginnerCambodiaCourse";
import type { LessonActivity } from "./lesson-activities";

export type PracticeSourceCard = {
  id: string | number;
  front: string;
  back: string;
  audioId: string;
};

type Seed = { id: string; khmer: string; english: string; audioId: string };

const VARIATIONS_PER_SEED = 10;

function toSeeds(cards: PracticeSourceCard[]): Seed[] {
  return cards.map((card) => ({
    id: String(card.id),
    khmer: card.front,
    english: card.back,
    audioId: card.audioId,
  }));
}

function choicesFor(seeds: Seed[], seedIndex: number, value: "english" | "khmer") {
  const answer = seeds[seedIndex]?.[value] ?? "";
  const choices = [answer];
  for (let offset = 1; choices.length < Math.min(4, seeds.length); offset += 1) {
    const option = seeds[(seedIndex + offset) % seeds.length]?.[value];
    if (option && !choices.includes(option)) choices.push(option);
  }
  return choices.sort((left, right) => left.localeCompare(right));
}

/**
 * Turns approved Khmer/English phrase pairs into repeatable exercises.
 * It never invents Khmer: every answer comes from the input cards.
 */
export function createPracticeActivityBank(cards: PracticeSourceCard[]): LessonActivity[] {
  const seeds = toSeeds(cards);

  return seeds.flatMap((seed, seedIndex) =>
    Array.from({ length: VARIATIONS_PER_SEED }, (_, variation): LessonActivity => {
      const audioQuestion = variation % 2 === 0;
      if (audioQuestion) {
        return {
          type: "audioChoice",
          prompt:
            variation % 4 === 0
              ? "Listen and choose the English meaning."
              : "Listen carefully. What did you hear?",
          audioId: seed.audioId,
          audioText: seed.khmer,
          options: choicesFor(seeds, seedIndex, "english"),
          answer: seed.english,
        };
      }

      const chooseKhmer = variation % 4 === 1;
      return {
        type: "multipleChoice",
        prompt: chooseKhmer
          ? `Choose the Khmer phrase for "${seed.english}".`
          : `What does "${seed.khmer}" mean?`,
        options: choicesFor(seeds, seedIndex, chooseKhmer ? "khmer" : "english"),
        answer: chooseKhmer ? seed.khmer : seed.english,
      };
    }),
  );
}

/** Returns a short, balanced session before any phrase starts repeating. */
export function createPracticeSet(cards: PracticeSourceCard[], size = 10): LessonActivity[] {
  const bank = createPracticeActivityBank(cards);
  const seedCount = cards.length;
  if (seedCount === 0) return [];

  return Array.from({ length: Math.min(size, bank.length) }, (_, index) => {
    const seedIndex = index % seedCount;
    const variationIndex = Math.floor(index / seedCount);
    return bank[seedIndex * VARIATIONS_PER_SEED + variationIndex];
  });
}

const greetingCards = beginnerCambodiaLessons
  .filter((lesson) => ["daily-01-greetings", "daily-02-introductions"].includes(lesson.id))
  .flatMap((lesson) => lesson.content ?? []);

/** The first demo bank: 10 approved phrases × 10 exercise variations = 100. */
export const GREETINGS_INTRODUCTION_ACTIVITY_BANK = createPracticeActivityBank(greetingCards);

export function getGreetingsIntroductionPracticeSet(size = 10): LessonActivity[] {
  return createPracticeSet(greetingCards, size);
}

export const GREETINGS_INTRODUCTION_SOURCE_COUNT = greetingCards.length;
