# SalaKhmer — Completion Roadmap

## Product completion

- [ ] Review queue: persist incorrect answers and retry them.
- [ ] Checkpoint: unlock, pass threshold, score summary, retry.
- [ ] Progress: lesson/module completion, XP, streak, and skill breakdown.
- [ ] Access: guest limits, registered access, locked states, auth redirects.
- [ ] UX: loading, empty, error, mobile layout, keyboard/screen-reader states.
- [ ] Audio: stable asset mapping, play/pause/error/fallback and content audit.
- [ ] QA: data validation, route smoke tests, lint, build.

## Learning engine

- [x] Flashcard flip and audio.
- [x] Multiple choice with immediate feedback and scoring.
- [ ] Audio choice.
- [ ] Matching.
- [ ] Ordering.
- [ ] Writing/tracing assessment.
- [ ] Lesson result and review mode.

## Content coverage

- [ ] Module 1 — Script: consonants, vowels, sub-consonants, numerals, recognition.
- [ ] Module 2 — Spelling: syllable composition and spelling drills.
- [ ] Module 3 — Dialogues: greetings, introductions, market, restaurant, transport, emergency.
- [ ] Module 4 — Writing: stroke order, tracing, copying, recall.
- [ ] Module 5 — Tests: vocabulary, listening, reading, mixed assessment.
- [ ] Module 6 — Handbook: culture, etiquette, places, food, safety, history.

## Release gate

- [ ] No TypeScript/ESLint errors.
- [ ] Production build succeeds.
- [ ] Category and every lesson route return HTTP 200.
- [ ] Guest/registered access verified.
- [ ] Core learning flows manually smoke-tested.
