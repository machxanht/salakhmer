export type ReviewItem = {
  id: string;
  lessonId: string;
  activityIndex?: number;
  prompt: string;
  answer: string;
  wrongAnswer: string;
  attempts: number;
  updatedAt: string;
};

const MAX_REVIEW_ITEMS = 100;

export function addReviewItem(
  queue: ReviewItem[],
  item: Omit<ReviewItem, "attempts" | "updatedAt">,
): ReviewItem[] {
  const existing = queue.find((entry) => entry.id === item.id);
  const next = existing
    ? queue.map((entry) =>
        entry.id === item.id
          ? { ...entry, ...item, attempts: entry.attempts + 1, updatedAt: new Date().toISOString() }
          : entry,
      )
    : [{ ...item, attempts: 1, updatedAt: new Date().toISOString() }, ...queue];
  return next.slice(0, MAX_REVIEW_ITEMS);
}

export function removeReviewItem(queue: ReviewItem[], id: string): ReviewItem[] {
  return queue.filter((item) => item.id !== id);
}
