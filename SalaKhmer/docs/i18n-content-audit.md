# Learner-app language audit

## Contract

SalaKhmer's learning target is Khmer. The display language is independent:

- `en` is the canonical learning language and fallback.
- `vi`, `zh`, and `fr` translate UI and explanatory meaning only.
- Khmer script, audio text, and SalaKhmer Reading Bridge labels remain Khmer / the
  approved English-friendly romanization. They must never be machine-translated.

## Source of truth

| Content class | Canonical source | Translation storage | Learner delivery |
| --- | --- | --- | --- |
| Shared UI labels | `src/lib/i18n.tsx` | `copy` + `interfaceCopy` | `useLocale()` |
| Read & Spell generated Khmer data | `src/lib/generated/read-spell-catalog.json` | `src/lib/read-spell-localization.ts` by stable IDs | `getLocalizedReadSpell*` |
| CMS lessons/articles | `content_items` | `content_localizations` (D1) | `GET /api/content?locale=&moduleId=` |
| Lesson/dialogue authoring data | content import workbook / JSON | a locale column or translation object per stable item ID | lesson renderer |

## Deliberate English fallbacks still awaiting reviewed translations

1. Most individual Read & Spell word meanings and example sentences. The route
   is wired for translation now; add a reviewed record in
   `WORD_TRANSLATIONS` using its `rs-*` ID. It will fall back to English until
   then instead of showing inaccurate machine translation.
2. Existing legacy `MOCK_LESSONS` dialogue/test prompts. These need a proper
   localization export keyed by lesson/activity ID; they are not CMS content
   and should not be changed with blind string replacement.
3. Cambodia Guide editorial body text. New articles should be published from
   the CMS with `en` plus reviewed supplemental locales.

## Required translation review

- Do not derive an ID from translated text. IDs such as `rs-fruit-001` and CMS
  UUIDs are immutable.
- Keep `khmer_text`, audio ID, and `phonetic_en` identical across locales.
- Store multilingual rich content in `body_json` as a complete object for each
  locale; never merge paragraphs by array index at runtime.
- A missing locale is valid and must resolve to English. Never hide published
  learning content because a supplemental translation is incomplete.
