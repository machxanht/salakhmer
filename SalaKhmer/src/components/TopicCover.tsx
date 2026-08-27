import { MapPin } from "lucide-react";

type SpritePosition = { column: number; row: number };

// The new real-life topics share one generated, licensed-for-this-project sprite.
// Keeping a single small asset makes the topic list fast on mobile while every
// expansion topic still has its own distinct cover crop.
const EXPANSION_COVERS: Record<string, SpritePosition> = {
  "topic-directions-location": { column: 0, row: 0 },
  "topic-health-symptoms": { column: 1, row: 0 },
  "topic-feelings-emotions": { column: 2, row: 0 },
  "topic-daily-routine": { column: 3, row: 0 },
  "topic-kitchen-cooking": { column: 4, row: 0 },
  "topic-travel-accommodation": { column: 0, row: 1 },
  "topic-technology-communication": { column: 1, row: 1 },
  "topic-personal-care": { column: 2, row: 1 },
  "topic-emergency-safety": { column: 3, row: 1 },
  "topic-services-documents": { column: 4, row: 1 },
};

const LEGACY_TOPIC_MARKS: Record<string, string> = {
  "topic-numbers": "123",
  "topic-family": "👪",
  "topic-greetings": "👋",
  "topic-food": "🍚",
  "topic-drinks": "🥤",
  "topic-fruit": "🥭",
  "topic-colors": "●",
  "topic-animals": "🦜",
  "topic-body-parts": "✋",
  "topic-clothes": "👕",
  "topic-home-furniture": "🏠",
  "topic-school-study": "📚",
  "topic-places-in-town": "🏪",
  "topic-transport": "🚌",
  "topic-weather": "☀️",
  "topic-time-days": "🕒",
  "topic-jobs": "🧑‍🏫",
  "topic-common-actions": "🚶",
  "topic-shopping": "🛍️",
  "topic-nature": "🌿",
};

export function TopicCover({
  topicId,
  size = "card",
  label,
}: {
  topicId: string;
  size?: "card" | "hero" | "word";
  label?: string;
}) {
  const cover = EXPANSION_COVERS[topicId];
  const dimensions = size === "hero"
    ? "h-[76px] w-[76px] rounded-[22px]"
    : size === "word"
      // A fixed visual box prevents the sprite crop from stretching vertically
      // when a Khmer word needs more line-height than its Latin translation.
      ? "h-20 w-20 rounded-[18px]"
      : "h-11 w-11 rounded-[14px]";

  if (cover) {
    return (
      <span
        role="img"
        aria-label={label}
        className={`shrink-0 border border-[#E5D5BC] bg-[#FFF8EC] shadow-[0_2px_5px_rgba(71,56,43,.08)] ${dimensions}`}
        style={{
          backgroundImage: "url(/topic-covers/expansion-topics-sprite-v1.png)",
          backgroundSize: "500% 200%",
          backgroundPosition: `${(cover.column / 4) * 100}% ${cover.row * 100}%`,
        }}
      />
    );
  }

  const mark = LEGACY_TOPIC_MARKS[topicId];
  return (
    <span
      role="img"
      aria-label={label}
      className={`grid shrink-0 place-items-center border border-[#E5D5BC] bg-[#FFF8EC] text-[#167C70] shadow-[0_2px_5px_rgba(71,56,43,.06)] ${dimensions}`}
    >
      {mark ? <span className="text-xl leading-none">{mark}</span> : <MapPin className="h-5 w-5" />}
    </span>
  );
}
