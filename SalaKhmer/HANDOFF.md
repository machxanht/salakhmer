# SalaKhmer — Project Handoff

Last updated: 2026-08-13

## Read this before editing

- Workspace: `E:\AI\Antigravity\SalaKhmer`
- App: SalaKhmer — English-first Khmer learning app. Vietnamese, Chinese, and French are optional interface languages; Khmer learning content must preserve Khmer script and its English-friendly romanization.
- The project is connected to Lovable. Never force-push, rebase, amend, or squash pushed history.
- Never print, paste, commit, or expose values from `.env`.
- Never delete audio backup folders. R2 is production delivery; local audio folders are backups/generation artifacts.
- Run this before modifying code:

```powershell
cd E:\AI\Antigravity\SalaKhmer
npm.cmd run build
```

## Run locally (Windows)

Use one Vite server only. Preferred port is 8081:

```powershell
npm.cmd run dev -- --port 8081 --strictPort
```

Open `http://localhost:8081`.

If it says the port is occupied, stop the old terminal server with `Ctrl + C`; do not casually keep starting new servers on 8080/8081/8082. Use the exact Local URL printed by Vite.

## Architecture already chosen

### Firebase

- Firebase Authentication: Email/Password and Google enabled; Facebook wiring exists but needs Meta configuration. Apple UI is intentionally hidden until the owner has an Apple Developer account.
- Firestore: learner profile/progress only.
- Firebase config is loaded from `.env`; client Firebase config is public configuration, but Google Cloud restrictions still apply.
- The app must not crash if Firebase temporarily fails. Guest learning remains available.

### Critical Firebase login fix completed on 2026-08-13

The login screen showed `Firebase is rejecting this app configuration` despite a valid key. Root cause:

1. `.env` had a UTF-8 BOM character at the beginning of the first line, which was `VITE_FIREBASE_API_KEY`.
2. Vite read that variable under a corrupted name, so client builds had `apiKey: ""` while the other Firebase settings were present.
3. `src/lib/firebase.ts` had bracket access for env variables and reused the default Firebase app, making stale/HMR investigation harder.

Fixes applied:

- Rewrote `.env` as UTF-8 without BOM, preserving values.
- `src/lib/firebase.ts` now uses direct `import.meta.env.VITE_*` access.
- It uses named Firebase app `salakhmer-client`, avoiding stale default app reuse under SSR/HMR.
- Confirmed: `vite.loadEnv()` sees the key and production build contains the key (do not print it).
- A Vite server was restarted on `http://localhost:8081` after the fix.

If login still fails, do not create more keys blindly. First check browser Console for the actual Firebase error code. Then verify:

- Firebase Auth > Settings > Authorized domains includes `localhost` and `127.0.0.1`.
- Google Cloud API key application restriction permits `http://localhost:8081/*` and `http://127.0.0.1:8081/*`.
- API restrictions include `Identity Toolkit API`, `Token Service API`, and `Cloud Firestore API`.
- the key belongs to the same Firebase project as the rest of the config.

Do not tick broad `Google Cloud APIs`; do not bind the browser key to a service account.

### Cloudflare

- R2 stores production media/audio.
- Cloudflare Worker is the public API/media gate. CMS base is `VITE_CMS_API_URL`.
- Worker source: `cloudflare-worker/`.
- R2 bucket: `salakhmer-media-prod`; D1: `salakhmer-cms-prod`; Worker: `salakhmer-cms-api`.
- Do not expose R2 credentials in browser code.

### Azure audio

- Use Azure TTS for complete Khmer words and sentences, with `km-KH-SreymomNeural` / `km-KH-PisethNeural`.
- Do not use Azure as truth for 33 isolated consonant letter names; it is unreliable for the classroom names. Native-reviewed recordings are required for that final feature.
- Do not claim alphabet audio is solved until files exist at the Worker native-alphabet endpoint.

## Audio inventory and maps

- Existing 5,000 dialogue MP3s: R2 prefix `audio/a1-master-5000/`.
- Existing Read & Spell audio: R2 prefix `audio/read-spell-v1/`.
- New expansion audio was synthesized and uploaded:
  - Module 2: 150 items
  - Module 3: 187 items
  - Module 4: 20 items
  - Module 5: 15 items
  - Total: 372 MP3s
- Pipeline report/logs:
  - `scripts/module-expansion-v1-pipeline-report.json`
  - `scripts/logs/module-expansion-audio.out.log`
- Generator scripts are resumable. Do not rerun everything unless the report says it is incomplete.
- `src/lib/audioService.ts` is the primary playback mapping. Test actual playback from the browser; build success does not prove R2 audio playback.
- Verified on 2026-08-14: every one of the 372 module-expansion manifest keys returns a public audio response through the deployed Worker (`200`/`audio/*` on a HEAD health check). A legacy Module 3 clip also returned `200 audio/mpeg`. If a card is silent despite that evidence, inspect the browser console for its exact `audioId` and route mapping before regenerating audio.

## Content and modules

Product terminology:

1. Script Basics
2. Read & Spell
3. Listen & Speak
4. Handwriting
5. Review & Test
6. Cambodia Guide

### Module 1 — Script Basics

- Alphabet grid and six levels.
- User’s romanization standard is mandatory:
  - A-series: `K-aw`, `Kh-aw`, etc.
  - O-series: `K-o`, `Kh-o`, etc.
  - No IPA or academic diacritics in learner-facing labels.
- Dependent vowels require a dummy carrier for TTS:
  - A series: prefix `អ`
  - O series: prefix `អ៊`
- Independent vowels must be passed raw to TTS (no dummy carrier).
- Google TTS is only temporary for isolated letters; it cannot reliably pronounce all Khmer letter names.
- Khmer number cards must never overflow. Use responsive font sizing / containment instead of allowing text to escape cards.

### Module 2 — Read & Spell

- Data: `src/lib/read-spell-catalog.ts`, `src/lib/read-spell-expansion.ts`, localized metadata in `src/lib/read-spell-localization.ts`.
- Expansion added 10 topics / 150 words. Total target catalog after expansion: 30 topics / 450 words.
- Each word should show: Khmer text (no artificial spaces or line breaks), English-friendly phonetic, meaning, image, standard spelling, and the required SalaKhmer Reading Bridge.
- User’s non-negotiable bridge format:

```text
SalaKhmer Reading Bridge
ស (S) + ្រ (R) + ល (L) + អា (A) + ញ (NH) → SRALANH
Beginner bridge only. Standard reading: sro-lanh.
```

- Do not replace it with generic “B + A + T” copy. The Khmer source glyph and Latin component must both appear.
- Topic image helper: `src/components/TopicCover.tsx`; generated sprite `public/topic-covers/expansion-topics-sprite-v1.png`.
- Long screens use one compact floating control, not a large back/home/speed bar. `LongPageNav` is in `src/components/LovableAppShell.tsx`.

### Module 3 — Listen & Speak

- Must be transcript conversations, not flashcards or repeated two-line quizzes.
- UI reference: alternating dialogue bubbles, per-line speaker button, title/progress at top, fixed bottom player.
- Important files:
  - `src/components/ConversationTranscriptLesson.tsx`
  - `src/lib/masterA1Dialogues.ts`
  - `src/lib/mock-lessons.ts`
- When route changes, component unmounts, or screen visibility changes, stop current audio.
- New content: +29 genuine dialogues / +173 turns. Avoid repeated “asking price” templates with only nouns swapped.

### Module 4 — Handwriting

- Do not pretend auto-generated font paths are native stroke order.
- Five-letter draft/reference work exists only as reference/needs-review. It is not publication-ready handwriting data.
- Reference crop proof uses unlicensed reference material; do not ship it commercially until permission/replacement exists.
- Static thin stroke guidance is preferable to fake heavy animated arrows. Other letters should say direction guide pending until native review.
- 2026-08-14: a five-letter draft-only Model animation was added for ក, ខ, គ, ឃ, ង in `src/components/VideoTracedHandwritingPreview.tsx`. It plays six transparent visual stages extracted directly from each owner-supplied lower-writing video; it does not use hand-guessed SVG paths. Source files are `public/writing-video-drafts/`, generated by `scripts/export_first_five_video_stages.py`. It requires owner review before any clean SVG stroke data is authored for production.

### Module 5 — Review & Test

- Content currently: 30 distinct review/test lessons plus +15 expanded tests / +60 activities.
- Activities include listening discrimination, matching, sentence assembly, bridge checks, dialogue comprehension, error repair, timed choice, quick recall.
- Completion UI must give both `Review this lesson` and a working `Next lesson` button. Route parameter state must reset when moving next.

### Module 6 — Cambodia Guide

- Current guide expansion added 10 articles, for 22 visible articles.
- New articles include Vietnamese localization. Chinese/French still require complete data coverage checks.

## i18n status

- Supported UI locales: `en`, `vi`, `zh`, `fr`.
- `src/lib/i18n.tsx`: shared chrome/UI strings, persisted locale.
- `src/lib/read-spell-localization.ts`: Module 2 data localization.
- `cloudflare-worker/migrations/0002_content_localizations.sql` and `0003_content_module.sql`: CMS translation/module bindings.

Important: multilingual work is incomplete. User is particularly unhappy because Vietnamese still has English strings inside modules. Do a deep audit before claiming it is done:

```powershell
rg -n '>[A-Za-z][^<{]*<' src
rg -n '"[A-Za-z][^"]{8,}"' src/routes src/components src/lib
```

Move static strings to `t(...)`; move dynamic lesson metadata to locale resolver/data. Do not merely translate navigation while leaving module cards, descriptions, activities, completion buttons, writing UI, and guide cards English.

## UI direction

- Keep Welcome page.
- Logged-in UI is moving toward the code in `.reference\khmer-blossom-path` and the matching Lovable preview.
- The user dislikes pale yellow/white monotony. Use restrained but fresh colors; do not create a random mixture of unrelated illustration styles.
- Apsara mascots should be full-body and background-free (or background matches containing card exactly). Do not show rough partial crops on home.
- Empty image placeholders should be replaced by appropriate category/topic art or a consistent visual symbol, not arbitrary fruit.

## Social login

- Firebase Facebook provider exists in `src/lib/firebase-auth.ts` and Login UI.
- Meta configuration document: `docs/social-login-setup.md`.
- Facebook will not work until Meta app ID/secret are configured in Firebase and authorized OAuth domains are set.
- Apple sign-in is hidden until owner enrolls in Apple Developer Program; do not re-enable as a fake/non-working button.

## Security/release truth

- Not Google Play ready. This is a web/TanStack app; no Capacitor Android project, package ID, manifest, signing, or AAB exists.
- Before Play release: Android packaging, privacy policy, in-app account deletion + public deletion URL, Data Safety form, consent strategy for Analytics, licensed handwriting/image assets, and rate/size limits for CMS uploads.
- Worker security work already added Firebase verified-email admin requirement, authenticated AI endpoint, media MIME allowlist, and basic response headers.
- Keep Gemini/Google/Azure secrets server-only; only Firebase web configuration may be in browser config.

## Current verification

- Latest `npm.cmd run build`: passed after Firebase fix.
- Vite was last restarted on port 8081.
- Firebase key validation via Identity Toolkit: valid (never print the key).
- Vite environment validation after BOM removal: key is present.
- Production client build validation after BOM removal: key is present.

## Priority work for the next agent

1. Ask owner to test `http://localhost:8081/login` now that the BOM/Vite issue is fixed. Capture exact Console error only if it still fails.
2. Validate live R2 audio in Modules 2–5. Fix URLs/CORS/playback only with browser evidence.
3. Finish i18n deeply across all module strings and dynamic content; Vietnamese must not mix English except intentional Khmer/romanization.
4. Replace/licence handwriting reference assets; do not claim accurate stroke order without Khmer native review.
5. Test Next Lesson in Module 5 and compact long-page navigation in Module 2.
6. Do not start Android/Play work until web behavior, content, audio, and legal assets are stable.

## Module 4 handwriting direction status (2026-08-14)

- The video-traced SVG draft set was removed because its character/path mapping was not reliable enough for publication.
- Never reuse a path map between Khmer letters. Rebuild an animation only from a separate source reference for that exact letter, then have the Khmer owner approve it.
- The Model tab intentionally shows a direction-review-pending state; the Write canvas remains usable.
- Owner supplied `E:\YoutubeDownloader\Downloads\Downloads.zip`. It has been imported as **private reference only** into `.reference/handwriting-videos/` (72 MP4s: 33 consonants, 26 dependent-vowel videos, 13 independent-vowel videos). This folder is gitignored and must never be served or packaged.
- `scripts/extract_handwriting_animation_sheets.py` samples the **lower animated-writing area only**; it explicitly ignores title/thumbnail/subscriber material. Run it locally before tracing a letter.
- `scripts/derive_handwriting_svg_candidates.py` can create 72 private centreline **candidates** (mask, skeleton and SVG) from those videos. It filters small overlay components such as Subscribe, but cannot infer native stroke order/direction. Never ship candidate SVGs without owner review.
- `scripts/derive_handwriting_timeline_candidates.py` now creates 71 private `timeline-stages.png` sheets (one overview video is correctly excluded). These show sampled lower-animation stages for the exact matching video.
- To review them locally, run `node scripts\\build_handwriting_reference_review.cjs` and open `.reference\\handwriting-derived\\index.html`. The review instructions are in `.reference\\handwriting-derived\\README.md`.
- First-five visual draft was revised on 2026-08-14: `scripts/export_first_five_video_stages.py` now creates a 30-fps, 720px animated WebP from the lower live-writing area of each exact supplied video, rather than six static stage PNGs or guessed SVG curves. It starts at the blank first video frame (not 38% through the clip), applies a soft alpha edge to reduce raster jaggies, and is positioned on one shared baseline at the second guide line from the bottom. Assets are `public/writing-video-drafts/<video-id>/animation.webp`; `VideoTracedHandwritingPreview.tsx` replays those animations in the Model tab. This avoids upper worksheet/Subscribe residue. Still owner-review-only: it is a smooth raster draft, not validated vector stroke data.
- Ng-o (`7yutJvZP_qE`) has a documented per-video live-writing crop of 42% instead of 55%; its animation begins higher in the supplied source. This fixes the prior missing upper loop/stroke. Do not apply one fixed crop percentage across the video set.
- Full export command: `py scripts\\export_all_handwriting_video_animations.py`. It uses each clip's own first-frame static layer subtraction instead of one hard-coded crop, produces local `public/writing-video-drafts/<video-id>/animation.webp` assets, and uses no external API/model quota. It is resumable; only integrate a glyph in the runtime map after its asset has been visually checked.
- Important independent-vowel mapping rule: source files are named like `... ឥ «អិ» [id]`. The standalone glyph before `«` is the app target (`ឥ`); the content inside `« »` is only a pronunciation/example form (`អិ`) and must never be shown or used as the map key. 13 exact independent-vowel IDs are now mapped this way; `ឨ` and `ឲ` have no supplied matching video in the current 71-video import.

## Dictionary + assistant (2026-08-13)

## UI direction approved (2026-08-14)

- Owner approved the **Sala Atlas** direction from `/ui-concepts`: icon-first rather than colour-heavy. Keep `/ui-concepts` as an isolated five-direction gallery; it is intended to become a future one-page public product/website introduction, not production navigation.
- The production shell was moved toward Atlas in `src/components/LovableAppShell.tsx`: paper-white content surface, dark jade ink (`#173B33`), jade interactive colour (`#0B8B76`), gold accent (`#F7B733`), larger rounded icon containers, safer iOS bottom inset, and a raised central AI button.
- `src/routes/home.tsx` and `src/routes/category.$categoryId.tsx` now use the Atlas dark “continue”/module hero and icon-forward module/lesson cards. Keep content/audio/auth logic untouched when iterating on UI.
- The practical next UI pass is to restyle module-detail activities (Read & Spell, Listen & Speak, Write, Review) using their corresponding concepts in `/ui-concepts`: Visual Library, Conversation, and Study Notebook. Do not replace their layouts blindly; preserve working playback and learning flows.

### Teaching curriculum + glossary (2026-08-14)

- `cloudflare-worker/src/teaching-curriculum.ts` gives the assistant a reviewed teaching sequence for all six Script Basics levels.
- `cloudflare-worker/src/learning-glossary.ts` is the hand-reviewed source for core terms, including `\u179f\u17d2\u179a\u17c8\u1796\u17c1\u1789\u178f\u17bd` (Independent vowel / Nguy\u00ean \u00e2m \u0111\u1ed9c l\u1eadp / \u72ec\u7acb\u5143\u97f3 / Voyelle ind\u00e9pendante), `\u1796\u17d2\u1799\u1789\u17d2\u1787\u1793\u17c8`, `\u179f\u17d2\u179a\u17c8`, `\u1787\u17be\u1784\u17a2\u1780\u17d2\u179f\u179a`, and `\u179b\u17c1\u1781\u1781\u17d2\u1798\u17c2\u179a`.
- The dictionary checks these terms locally before D1/Azure Translator and returns a localized explanation plus related level. The assistant receives both curriculum and glossary as context, while Gemini/Workers AI still writes a natural answer.
- Deployed Worker version: `2022c553-7821-4971-a0bb-ecd31a40c2fc`. Root build and Worker dry-run passed.
- Expanded curated tutor library (2026-08-14): The three owner-provided PDFs were reviewed as reference material. `cloudflare-worker/src/curriculum-library.ts` contains 15 short, paraphrased and reviewable tutor cards rather than raw book text: script overview, A/O contrast, aspiration, coeng, dependent/independent vowels, diacritics, Reading Bridge, politeness, greetings, questions, numbers/prices, directions, time, and handwriting safety. `curriculumContextFor()` selects up to seven relevant cards by the learner question, so the assistant is not overloaded with all source material. Do not copy raw PDF pages/dialogues into this file. Deployed Worker version: `5f2f6cf7-6297-46c1-ae78-e6cf841d5523`; root build and Worker dry-run passed.
- Source verification + Basic Khmer intake (2026-08-14): `docs/ai-knowledge-sources.md` records the source/licence decision. **Basic Khmer** by Vathanak Sok / Michigan State University is CC BY 4.0 and is used only for a paraphrased eight-topic practical-learning framework (introductions, work/study, family, dates, travel, plans, meetings). The Worker now has those new cards. Do not import Intermediate Khmer (CC BY-NC), khPOS (CC BY-NC-SA), generic Scribd/Facebook, Kaikki/Wiktionary dumps, or alleged Huffman public-domain content without item-level licence/provenance review. Deployed Worker version: `3d30a587-f677-41b3-95a0-ce7689a425a0`; build and dry-run passed.

- Dedicated route: `/dictionary`; footer now uses Dictionary instead of Lessons and has a raised central AI button.
- Worker dictionary design is production-oriented: authenticated lookup, D1 cache, Azure Translator only for cache misses, and Azure Speech only after speaker tap. Generated MP3s are stored privately in R2 and served through `/assets/audio/...`.
- Migration `cloudflare-worker/migrations/0005_dictionary_cache.sql` has already been applied remotely. Worker version `801eb0a6-2d25-4d88-bf79-e1e39bf7bd98` includes `/api/dictionary/lookup`, `/api/dictionary/audio`, and `/api/assistant`.
- Before online translation works, owner must create an Azure Translator resource and add Worker secrets using Wrangler: `AZURE_TRANSLATOR_KEY` and, for a regional Translator resource, `AZURE_TRANSLATOR_REGION`. Never put either in Vite/client `.env` variables.
- Assistant quality refactor (2026-08-14): `AIChatbox.tsx` now sends only the latest eight shortened client-side messages as request context (the Worker does not persist chat logs). The Worker requires a single reply language based on the learner’s latest input, uses Gemini 2.5 Flash first with `gemini-flash-latest` compatibility fallback, and uses Cloudflare `@cf/meta/llama-3.1-8b-instruct-fast` as a multilingual fallback instead of the weaker 3B model. The server rate guard is 100 model requests per user per UTC hour; grounded built-in answers do not consume it. Temporary failures and limits respond in the learner’s language instead of a generic English error. `GEMINI_API_KEY` remains a Worker secret and must never be copied to Vite/client code. These source changes require a normal Worker deploy before the deployed API changes.
- Root build passed after this work. Worker dry run passed, migration/deploy passed. Local Vite still must be started with `npm.cmd run dev` at the declared port.
- Assistant UX follow-up (2026-08-14): removed the redundant “Your SalaKhmer guide is here…” panel. The Apsara mascot now sits inside the first assistant greeting bubble. That greeting, input placeholder, and connection fallback are localized for EN/VI/ZH/FR and reset when the learner changes the app language. Worker prompt now prioritizes direct answers, writes requested Khmer script first, uses history for “write it” follow-ups, and must ask for clarification instead of inventing Khmer. Deployed Worker version: `bbfda100-aac6-4880-9eed-021c0c66419a`.
- Approved Script Basics lock (2026-08-14): `cloudflare-worker/src/knowledge_base.txt` contains the static six-level app data (A/O consonants, coeng forms, dependent vowels, independent vowels, numerals). It is bundled directly into the Worker. Script Basics questions now instruct Gemini Flash / Workers AI to use only this file and return `ERR_NO_DATA_FOUND` if absent; the Worker converts that token to a localized approved-data rejection. “Independent consonant / phụ âm độc lập” is intercepted server-side with a fixed localized answer. Deployed Worker version: `2f323843-3b00-4d38-94ba-470e10ab6a03`.
