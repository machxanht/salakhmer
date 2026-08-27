/**
 * Makes a dependent Khmer vowel pronounceable for a TTS engine.
 *
 * A dependent vowel cannot be synthesised alone.  SalaKhmer uses the
 * independent carrier អ for A-series examples and អ៊ for O-series
 * examples.  The carrier is only sent to TTS; the lesson continues to display
 * the original vowel sign to the learner.
 */
export type KhmerVowelSeries = "A" | "O";

export function formatVowelForTTS(
  vowelChar: string | null | undefined,
  seriesType: KhmerVowelSeries | string | null | undefined,
): string {
  if (!vowelChar || !vowelChar.trim()) return "";

  const normalizedSeries = seriesType?.trim().toUpperCase();
  if (normalizedSeries === "O") return `\u17A2\u17CA${vowelChar}`;

  // A is the documented/default series so an unexpected caller never sends an
  // isolated vowel sign to TTS.
  return `\u17A2${vowelChar}`;
}

// Development proof for the two required carrier forms. Kept out of production
// builds so normal users never receive debug console noise.
if (import.meta.env.DEV) {
  console.log("[SalaKhmer TTS] A-series ា:", formatVowelForTTS("ា", "A")); // អា
  console.log("[SalaKhmer TTS] O-series ា:", formatVowelForTTS("ា", "O")); // អ៊ា
}
