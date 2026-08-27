/**
 * Free, offline-friendly visual vocabulary.
 *
 * These are Unicode pictographs rendered with the platform's Noto Color Emoji
 * font where available (Android), with the system emoji font as a fallback.
 * They deliberately replace the old "Illustration queued" placeholders until
 * a genuinely useful, licensed illustration is added for a concept.
 */
const VISUALS_BY_TOPIC: Record<string, readonly string[]> = {
  "topic-numbers": ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟", "1️⃣1️⃣", "1️⃣2️⃣", "1️⃣3️⃣", "1️⃣4️⃣", "1️⃣5️⃣"],
  "topic-family": ["👨", "👩", "👨‍🦱", "👩‍🦱", "👦", "👧", "👴", "👵", "👦", "👧", "👨", "👩", "🧑‍🤝‍🧑", "🧒", "👪"],
  "topic-greetings": ["👋", "👋", "🙂", "🙏", "🙋‍♂️", "🙋‍♀️", "🙅", "🙏", "😔", "💬", "😊", "🤗", "🍀", "🤝", "👍"],
  "topic-food": ["🍚", "🍜", "🥖", "🥩", "🥓", "🍗", "🥩", "🐟", "🥚", "🍲", "🥬", "🧂", "🍬", "🌶️", "🍰"],
  "topic-drinks": ["💧", "🍵", "☕", "🥛", "🧃", "🧊", "🥥", "🧊", "🍵", "🧋", "🥤", "🍋", "🧃", "🍺", "🍷"],
  "topic-fruit": ["🍌", "🥭", "🥥", "🍊", "🍎", "🍉", "🍍", "🧡", "🥥", "🔴", "🐉", "🍇", "🍓", "🍈", "🍐"],
  "topic-animals": ["🐕", "🐈", "🐄", "🐖", "🐓", "🦆", "🐦", "🐟", "🐘", "🐎", "🐅", "🐒", "🐍", "🐸", "🐀"],
  "topic-body-parts": ["🧑", "👁️", "👂", "👃", "👄", "💪", "🦶", "🦷", "💇", "🙂", "🦒", "🤰", "☝️", "🔙", "🫀"],
  "topic-clothes": ["👕", "👖", "👗", "👞", "🧢", "🧦", "👓", "👜", "💍", "➖", "👗", "🧥", "⌚", "🧣", "🩴"],
  "topic-home-furniture": ["🏠", "🪑", "🪑", "🛏️", "🚪", "🪟", "🍳", "🚪", "🛁", "🌀", "🪞", "🕰️", "💡", "🛏️", "🛌"],
  "topic-school-study": ["🏫", "🧑‍🏫", "🧑‍🎓", "📖", "🖊️", "✏️", "📄", "📏", "🪑", "🏫", "🎒", "🧽", "📚", "📘", "📝"],
  "topic-places-in-town": ["🏪", "🏥", "🛕", "🏦", "🌳", "🍽️", "🏨", "🛍️", "💊", "✈️", "📮", "👮", "🛣️", "🌉", "🥐"],
  "topic-transport": ["🚗", "🚲", "🏍️", "🚌", "🛺", "🛶", "🚢", "✈️", "🚆", "🚕", "🚁", "🚇", "🚚", "🛞", "🚏"],
  "topic-weather": ["☀️", "🌧️", "💨", "☁️", "🥵", "🥶", "⛈️", "🌌", "🌩️", "⚡", "🌈", "🌤️", "🌫️", "🏜️", "💧"],
  "topic-time-days": ["📅", "➡️", "⬅️", "🌅", "🌇", "🌙", "☀️", "🕐", "⏱️", "📅", "📅", "📅", "📆", "🗓️", "🗓️"],
  "topic-jobs": ["🧑‍⚕️", "🧑‍🏫", "🧑‍🌾", "🧑‍✈️", "👮", "🧑‍🍳", "🧑‍💼", "🧑‍🎓", "👩‍⚕️", "🧑‍🔧", "👷", "🧑‍🎨", "💇", "📷", "🧑‍💼"],
  "topic-common-actions": ["🍽️", "🥤", "➡️", "⬅️", "😴", "📖", "✍️", "👀", "🚶", "🏃", "🗣️", "👂", "💼", "🧍", "🪑"],
  "topic-shopping": ["💵", "🏷️", "💸", "🪙", "🔖", "🛍️", "🤝", "💰", "🧾", "🛍️", "🧑", "💵", "❓", "🧮", "💳"],
  "topic-nature": ["🌳", "🌸", "⛰️", "🏞️", "🏞️", "🌲", "🌊", "🪨", "🌙", "⭐", "🟫", "🌱", "🍃", "💦", "🏝️"],
  // Module 2 expansion: every vocabulary item receives its own offline visual.
  // This deliberately avoids repeating the topic cover on each word card.
  "topic-directions-location": ["⬅️", "➡️", "⬆️", "📍", "↔️", "🚪", "🌳", "⬆️", "⬇️", "🔜", "🔙", "↔️", "📍", "📌", "❓"],
  "topic-health-symptoms": ["🤒", "🌡️", "🤕", "🤢", "😷", "🤧", "💊", "🩹", "🩸", "⚡", "🛏️", "💚", "😵", "🤮", "🚻"],
  "topic-feelings-emotions": ["😊", "😔", "😠", "😨", "😟", "😫", "😲", "🎉", "😌", "😳", "😔", "❤️", "👍", "👎", "🌤️"],
  "topic-daily-routine": ["⏰", "🛏️", "🧼", "🪥", "🚿", "👕", "🍳", "💼", "🏫", "🍱", "🏠", "🍲", "📖", "📺", "😴"],
  "topic-kitchen-cooking": ["🍳", "🫕", "🍳", "🔥", "♨️", "🔪", "🧼", "🥣", "➕", "😋", "🥄", "🍴", "🔪", "🍲", "🍽️"],
  "topic-travel-accommodation": ["✈️", "🛂", "🎫", "📅", "🗝️", "🛏️", "🛏️", "🧳", "🧳", "🛎️", "✅", "🚪", "🗺️", "🧭", "🧳"],
  "topic-technology-communication": ["☎️", "💻", "🌐", "💬", "📧", "📞", "📷", "🎬", "🔌", "🔋", "🔐", "📶", "⬇️", "📤", "🔗"],
  "topic-personal-care": ["🧼", "🧴", "🪥", "🦷", "🧻", "💇", "🪒", "🧻", "🧴", "🧼", "💅", "🪮", "✨", "🧹", "✨"],
  "topic-emergency-safety": ["🆘", "⚠️", "🔥", "👮", "🚑", "🛑", "⚠️", "🗺️", "📱", "🚨", "🚪", "🚪", "🛡️", "🚗", "🧯"],
  "topic-services-documents": ["🪪", "🏠", "📱", "📋", "✍️", "🪪", "📄", "📑", "🏢", "📅", "👥", "⏳", "🟢", "🔴", "📁"],
};

export function getReadSpellVisual(topicId: string, wordOrder: number): string | null {
  return VISUALS_BY_TOPIC[topicId]?.[wordOrder - 1] ?? null;
}
