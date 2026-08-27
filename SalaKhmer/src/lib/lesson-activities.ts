import type { FlashcardContent, LessonMock } from "./mock-lessons";

export type LessonActivity =
  | { type: "flashcard"; cards: FlashcardContent[] }
  | {
      type: "audioChoice";
      prompt: string;
      options: string[];
      answer: string;
      audioId?: string;
      audioText?: string;
    }
  | { type: "multipleChoice"; prompt: string; options: string[]; answer: string }
  | { type: "matching"; pairs: { left: string; right: string }[] }
  | { type: "ordering"; items: string[]; answer: string[] }
  | {
      /** Find the one word that makes a Khmer sentence natural and correct. */
      type: "errorRepair";
      prompt: string;
      sentence: string;
      options: string[];
      answer: string;
      explanation: string;
    }
  | {
      /** A short recall check. The timer is a gentle challenge, never a lockout. */
      type: "timedChoice";
      prompt: string;
      options: string[];
      answer: string;
      seconds: number;
    }
  | { type: "writing"; character: string; strokes: string[] };

/** Normalizes legacy flashcard lessons into the shared activity contract. */
export function getLessonActivities(lesson: LessonMock): LessonActivity[] {
  if (lesson.activities?.length) return lesson.activities;
  return lesson.content?.length ? [{ type: "flashcard", cards: lesson.content }] : [];
}

export type ActivityResult = {
  correct: boolean;
  score: number;
  responseTimeMs: number;
  attempts: number;
  response: string;
};

export function isEvaluatedActivity(activity: LessonActivity): boolean {
  return activity.type !== "flashcard";
}

export function getActivityPrompt(activity: LessonActivity): string {
  switch (activity.type) {
    case "flashcard":
      return activity.cards[0]?.front ?? "Flashcard";
    case "multipleChoice":
    case "audioChoice":
    case "timedChoice":
      return activity.prompt;
    case "matching":
      return "Match words with meanings";
    case "ordering":
      return "Arrange the sentence";
    case "errorRepair":
      return activity.prompt;
    case "writing":
      return `Write the character ${activity.character}`;
  }
}

export function getActivityAnswer(activity: LessonActivity): string {
  switch (activity.type) {
    case "flashcard":
      return activity.cards[0]?.back ?? "";
    case "multipleChoice":
    case "audioChoice":
    case "timedChoice":
      return activity.answer;
    case "matching":
      return activity.pairs.map((pair) => `${pair.left}=${pair.right}`).join(" | ");
    case "ordering":
      return activity.answer.join(" ");
    case "errorRepair":
      return activity.answer;
    case "writing":
      return activity.character;
  }
}
