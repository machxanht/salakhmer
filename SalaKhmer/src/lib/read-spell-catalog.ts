import catalog from "@/lib/generated/read-spell-catalog.json";
import { READ_SPELL_EXPANSION_TOPICS, READ_SPELL_EXPANSION_WORDS } from "@/lib/read-spell-expansion";

export type ReadSpellTopic = (typeof READ_SPELL_TOPICS)[number];
export type ReadSpellWord = (typeof READ_SPELL_WORDS)[number];

// Colors is intentionally shown after Fruit: a color swatch makes more sense once learners
// have seen a few concrete objects, and it keeps Fruit next to the illustrations it uses.
export const READ_SPELL_TOPICS = [...catalog.topics, ...READ_SPELL_EXPANSION_TOPICS].sort((a, b) => {
  const displayOrder = (topic: (typeof catalog.topics)[number] | (typeof READ_SPELL_EXPANSION_TOPICS)[number]) =>
    topic.topic_id === "topic-colors" ? 7.5 : topic.topic_order;
  return displayOrder(a) - displayOrder(b);
});

export const READ_SPELL_WORDS = [...catalog.vocabulary, ...READ_SPELL_EXPANSION_WORDS];

export function getReadSpellTopic(topicId: string) {
  return READ_SPELL_TOPICS.find((topic) => topic.topic_id === topicId);
}

export function getReadSpellWords(topicId: string) {
  return READ_SPELL_WORDS
    .filter((word) => word.topic_id === topicId)
    .sort((a, b) => a.word_order - b.word_order);
}
