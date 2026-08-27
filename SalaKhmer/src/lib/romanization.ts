/**
 * SalaKhmer display romanization: English-friendly, never IPA.
 * This is a display safety net for imported lesson data. New content must be
 * authored directly in this style and reviewed by a Khmer speaker.
 */
export function englishFriendlyRomanization(value: string | undefined | null): string {
  if (!value) return "";
  return value
    .replaceAll("ɨ", "ue")
    .replaceAll("ə", "uh")
    .replaceAll("ɔ", "aw")
    .replaceAll("ɲ", "ny")
    .replaceAll("ŋ", "ng")
    .replaceAll("ʔ", "")
    .replaceAll("â", "aw")
    .replaceAll("ô", "o")
    .replaceAll("ê", "ay")
    .replaceAll("ă", "a")
    .replaceAll("ĕ", "e")
    .replaceAll("ŭ", "u")
    .replaceAll("č", "ch")
    .replaceAll("â€˜", "'")
    .replaceAll("â€™", "'")
    .replace(/\b(Kh|Chh|Ch|Th|Ph|Ng|Ny|K|D|T|N|B|P|S|H|L)aw\b/g, "$1-aw")
    .replace(/\b(Kh|Chh|Ch|Th|Ph|Ng|Ny|K|D|T|N|B|P|M|Y|R|L|V)o\b/g, "$1-o")
    .replace(/\s+/g, " ")
    .trim();
}
