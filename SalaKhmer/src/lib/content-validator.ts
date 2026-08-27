import type { LessonActivity } from "./lesson-activities";
import type { LessonMock } from "./mock-lessons";

export type ContentValidationIssue = {
  lessonId: string;
  activityIndex?: number;
  message: string;
};

export function validateLessons(lessons: LessonMock[]): ContentValidationIssue[] {
  const issues: ContentValidationIssue[] = [];
  const ids = new Set<string>();

  for (const lesson of lessons) {
    if (ids.has(lesson.id)) issues.push({ lessonId: lesson.id, message: "Duplicate lesson ID." });
    ids.add(lesson.id);

    const activities = lesson.activities ?? [];
    const hasLegacyCards = (lesson.content?.length ?? 0) > 0;
    if (!hasLegacyCards && activities.length === 0) {
      issues.push({ lessonId: lesson.id, message: "Lesson has no content or activities." });
    }

    activities.forEach((activity, activityIndex) => {
      validateActivity(lesson.id, activity, activityIndex, issues);
    });
  }

  return issues;
}

function validateActivity(
  lessonId: string,
  activity: LessonActivity,
  activityIndex: number,
  issues: ContentValidationIssue[],
) {
  const add = (message: string) => issues.push({ lessonId, activityIndex, message });
  switch (activity.type) {
    case "flashcard":
      if (activity.cards.length === 0) add("Flashcard activity has no cards.");
      break;
    case "multipleChoice":
    case "audioChoice":
    case "timedChoice":
      if (activity.options.length < 2) add("Choice activity requires at least two options.");
      if (!activity.options.includes(activity.answer))
        add("The answer is not included in the options.");
      break;
    case "errorRepair":
      if (activity.options.length < 2) add("Error-repair activity requires at least two options.");
      if (!activity.options.includes(activity.answer))
        add("The repair answer is not included in the options.");
      break;
    case "matching":
      if (activity.pairs.length < 2) add("Matching activity requires at least two pairs.");
      if (new Set(activity.pairs.map((pair) => pair.left)).size !== activity.pairs.length)
        add("Matching activity contains duplicate left-hand values.");
      break;
    case "ordering":
      if (activity.items.length === 0 || activity.answer.length === 0)
        add("Ordering activity cannot be empty.");
      if (activity.items.length !== activity.answer.length)
        add("Ordering items and answer must contain the same number of entries.");
      break;
    case "writing":
      if (!activity.character.trim()) add("Writing activity is missing a character.");
      if (activity.strokes.length === 0) add("Writing activity is missing stroke guidance.");
      break;
  }
}
