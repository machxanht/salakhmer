import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { O as Pause, T as Play, et as CircleCheck, n as Volume2, rt as ChevronRight, t as X, x as Repeat2, z as Languages } from "../_libs/lucide-react.mjs";
import { c as useLocale, l as useAuth, r as Route$1, u as MOCK_LESSONS } from "./router-JcPmpmb6.mjs";
import { t as PatreonSupportCard } from "./PatreonSupportCard-DIO9v5-U.mjs";
import { t as hasFullLessonTestAccess } from "./tester-access-DrwpAQaY.mjs";
import { n as localizeLegacyLesson, r as localizeLegacyText, t as isCategoryAccessible } from "./content-localization-CdbR65H0.mjs";
import { n as stopKhmerAudio, t as playKhmerAudio } from "./audioService-CfsJ3L6R.mjs";
import { t as AudioSpeedSettings } from "./AudioSpeedSettings-CO0lW9Kj.mjs";
import { n as removeReviewItem, t as addReviewItem } from "./review-queue-xu6BhGRg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lesson._lessonId-CHbExom8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Normalizes legacy flashcard lessons into the shared activity contract. */
function getLessonActivities(lesson) {
	if (lesson.activities?.length) return lesson.activities;
	return lesson.content?.length ? [{
		type: "flashcard",
		cards: lesson.content
	}] : [];
}
function getActivityPrompt(activity) {
	switch (activity.type) {
		case "flashcard": return activity.cards[0]?.front ?? "Flashcard";
		case "multipleChoice":
		case "audioChoice":
		case "timedChoice": return activity.prompt;
		case "matching": return "Match words with meanings";
		case "ordering": return "Arrange the sentence";
		case "errorRepair": return activity.prompt;
		case "writing": return `Write the character ${activity.character}`;
	}
}
function getActivityAnswer(activity) {
	switch (activity.type) {
		case "flashcard": return activity.cards[0]?.back ?? "";
		case "multipleChoice":
		case "audioChoice":
		case "timedChoice": return activity.answer;
		case "matching": return activity.pairs.map((pair) => `${pair.left}=${pair.right}`).join(" | ");
		case "ordering": return activity.answer.join(" ");
		case "errorRepair": return activity.answer;
		case "writing": return activity.character;
	}
}
/**
* SalaKhmer display romanization: English-friendly, never IPA.
* This is a display safety net for imported lesson data. New content must be
* authored directly in this style and reviewed by a Khmer speaker.
*/
function englishFriendlyRomanization(value) {
	if (!value) return "";
	return value.replaceAll("ɨ", "ue").replaceAll("ə", "uh").replaceAll("ɔ", "aw").replaceAll("ɲ", "ny").replaceAll("ŋ", "ng").replaceAll("ʔ", "").replaceAll("â", "aw").replaceAll("ô", "o").replaceAll("ê", "ay").replaceAll("ă", "a").replaceAll("ĕ", "e").replaceAll("ŭ", "u").replaceAll("č", "ch").replaceAll("â€˜", "'").replaceAll("â€™", "'").replace(/\b(Kh|Chh|Ch|Th|Ph|Ng|Ny|K|D|T|N|B|P|S|H|L)aw\b/g, "$1-aw").replace(/\b(Kh|Chh|Ch|Th|Ph|Ng|Ny|K|D|T|N|B|P|M|Y|R|L|V)o\b/g, "$1-o").replace(/\s+/g, " ").trim();
}
/** Shared activity surface; new activity types can be added without changing LessonPage. */
function ActivityRenderer({ activity, cardIndex, flipped, onFlip, onPlayAudio, onPlayPromptAudio, isPlaying, onResult }) {
	const { tr } = useLocale();
	if (activity.type === "multipleChoice" || activity.type === "audioChoice") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceActivity, {
		activity,
		isPlaying,
		onPlayAudio: onPlayPromptAudio,
		onResult
	});
	if (activity.type === "timedChoice") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimedChoiceActivity, {
		activity,
		onResult
	});
	if (activity.type === "errorRepair") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorRepairActivity, {
		activity,
		onResult
	});
	if (activity.type === "matching") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchingActivity, {
		pairs: activity.pairs,
		onResult
	});
	if (activity.type === "ordering") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderingActivity, {
		items: activity.items,
		answer: activity.answer,
		onResult
	});
	if (activity.type === "writing") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WritingActivity, {
		character: activity.character,
		strokes: activity.strokes,
		onResult
	});
	if (activity.type !== "flashcard") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex aspect-[3/4] w-full max-w-sm items-center justify-center rounded-3xl border border-dashed border-primary/40 bg-card p-8 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-bold text-muted-foreground",
			children: tr("notYet")
		})
	});
	const card = activity.cards[cardIndex];
	if (!card) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl bg-card p-6 text-center text-sm text-muted-foreground",
		children: tr("lessonMissing")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative aspect-[3/4] w-full max-w-sm cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`,
		onClick: onFlip,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-border/50 bg-card p-8 text-center shadow-xl [backface-visibility:hidden]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: (event) => {
						event.stopPropagation();
						onPlayAudio(card);
					},
					disabled: isPlaying,
					className: "absolute right-5 top-5 rounded-full bg-secondary p-3 text-primary transition-transform hover:scale-110 disabled:animate-pulse",
					"aria-label": tr("audio"),
					children: "🔊"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `khmer font-bold ${card.front.length > 5 ? "text-4xl" : "text-[9rem] leading-none"}`,
					children: card.front
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "absolute bottom-8 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground",
					children: tr("tapFlip")
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-primary bg-primary p-8 text-center text-primary-foreground shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "khmer mb-6 text-5xl font-bold",
					children: card.front
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-4xl font-extrabold",
					children: card.back
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg opacity-90",
					children: englishFriendlyRomanization(card.desc)
				})
			]
		})]
	});
}
function result(correct, response, startedAt, attempts = 1) {
	return {
		correct,
		response,
		attempts,
		score: correct ? 100 : 0,
		responseTimeMs: Date.now() - startedAt
	};
}
function ChoiceActivity({ activity, isPlaying, onPlayAudio, onResult }) {
	const { tr } = useLocale();
	const [selected, setSelected] = (0, import_react.useState)();
	const startedAt = (0, import_react.useRef)(Date.now());
	const answered = selected !== void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-sm rounded-3xl border border-border/50 bg-card p-6 shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-extrabold leading-relaxed",
					children: activity.prompt
				}), activity.type === "audioChoice" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: isPlaying,
					"aria-label": tr("audio"),
					onClick: () => onPlayAudio(activity.audioId ?? activity.prompt, activity.audioText ?? activity.prompt),
					className: "shrink-0 rounded-full bg-secondary p-3 text-primary disabled:opacity-50",
					children: "🔊"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: activity.options.map((option) => {
					const isSelected = selected === option;
					const correct = option === activity.answer;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: answered,
						onClick: () => {
							setSelected(option);
							onResult(result(correct, option, startedAt.current));
						},
						className: `w-full rounded-2xl border p-4 text-left text-sm font-bold transition-all ${answered && correct ? "border-emerald-500 bg-emerald-50 text-emerald-700" : answered && isSelected ? "border-red-400 bg-red-50 text-red-700" : "border-border bg-background hover:border-primary hover:bg-primary/5"}`,
						children: option
					}, option);
				})
			}),
			answered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, {
				correct: selected === activity.answer,
				answer: activity.answer
			})
		]
	});
}
function Feedback({ correct, answer }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "status",
		className: `mt-5 rounded-xl p-3 text-center text-sm font-extrabold ${correct ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`,
		children: correct ? "Correct!" : `Not quite — answer: ${answer}`
	});
}
function TimedChoiceActivity({ activity, onResult }) {
	const { tr } = useLocale();
	const [selected, setSelected] = (0, import_react.useState)();
	const startedAt = (0, import_react.useRef)(Date.now());
	const elapsed = Math.floor((Date.now() - startedAt.current) / 1e3);
	const remaining = Math.max(activity.seconds - elapsed, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-sm rounded-3xl border border-border/50 bg-card p-6 shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800",
					children: tr("quickRecall")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs font-bold text-muted-foreground",
					children: [activity.seconds, "s"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 text-lg font-extrabold leading-relaxed",
				children: activity.prompt
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: activity.options.map((option) => {
					const answered = selected !== void 0;
					const correct = option === activity.answer;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: answered,
						onClick: () => {
							setSelected(option);
							onResult(result(correct, option, startedAt.current));
						},
						className: `w-full rounded-2xl border p-4 text-left text-sm font-bold ${answered && correct ? "border-emerald-500 bg-emerald-50 text-emerald-700" : answered && selected === option ? "border-red-400 bg-red-50 text-red-700" : "border-border bg-background hover:border-primary hover:bg-primary/5"}`,
						children: option
					}, option);
				})
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, {
				correct: selected === activity.answer,
				answer: activity.answer
			}),
			remaining === 0 && !selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: "No penalty — choose when ready."
			}) : null
		]
	});
}
function ErrorRepairActivity({ activity, onResult }) {
	const { tr } = useLocale();
	const [selected, setSelected] = (0, import_react.useState)();
	const startedAt = (0, import_react.useRef)(Date.now());
	const answered = selected !== void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-sm rounded-3xl border border-border/50 bg-card p-6 shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-lg font-extrabold leading-relaxed",
				children: activity.prompt
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "khmer mb-5 rounded-2xl bg-secondary p-4 text-center text-2xl font-bold",
				children: activity.sentence
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground",
				children: tr("checkAnswer")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: activity.options.map((option) => {
					const correct = option === activity.answer;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: answered,
						onClick: () => {
							setSelected(option);
							onResult(result(correct, option, startedAt.current));
						},
						className: `w-full rounded-2xl border p-4 text-left text-sm font-bold ${answered && correct ? "border-emerald-500 bg-emerald-50 text-emerald-700" : answered && selected === option ? "border-red-400 bg-red-50 text-red-700" : "border-border bg-background hover:border-primary hover:bg-primary/5"}`,
						children: option
					}, option);
				})
			}),
			answered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, {
				correct: selected === activity.answer,
				answer: activity.answer
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: activity.explanation
			})] })
		]
	});
}
function MatchingActivity({ pairs, onResult }) {
	const { tr } = useLocale();
	const [matches, setMatches] = (0, import_react.useState)({});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const startedAt = (0, import_react.useRef)(Date.now());
	const correct = pairs.every((pair) => matches[pair.left] === pair.right);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-sm rounded-3xl border border-border/50 bg-card p-6 shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 text-lg font-extrabold",
				children: tr("matchWords")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: pairs.map((pair) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-xl bg-secondary p-3 text-center font-bold",
						children: pair.left
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						"aria-label": tr("chooseMeaning"),
						disabled: submitted,
						value: matches[pair.left] ?? "",
						onChange: (event) => setMatches((current) => ({
							...current,
							[pair.left]: event.target.value
						})),
						className: "rounded-xl border border-border bg-background p-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: tr("chooseMeaning")
						}), pairs.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: option.right }, option.right))]
					})]
				}, pair.left))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: submitted || Object.keys(matches).length !== pairs.length,
				onClick: () => {
					setSubmitted(true);
					onResult(result(correct, pairs.map((pair) => `${pair.left}=${matches[pair.left] ?? ""}`).join(" | "), startedAt.current));
				},
				className: "mt-5 w-full rounded-xl bg-primary p-3 font-extrabold text-primary-foreground disabled:opacity-40",
				children: tr("checkAnswer")
			}),
			submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, {
				correct,
				answer: pairs.map((pair) => `${pair.left} = ${pair.right}`).join(" · ")
			})
		]
	});
}
function OrderingActivity({ items, answer, onResult }) {
	const { tr } = useLocale();
	const [order, setOrder] = (0, import_react.useState)([]);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const startedAt = (0, import_react.useRef)(Date.now());
	const complete = order.length === items.length;
	const response = order.map((index) => items[index] ?? "");
	const correct = response.join(" ") === answer.join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-sm rounded-3xl border border-border/50 bg-card p-6 shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 text-lg font-extrabold",
				children: tr("arrangeSentence")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 min-h-12 rounded-xl bg-primary/10 p-3 text-sm font-bold",
				children: response.join(" ") || tr("selectWords")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: submitted || order.includes(index),
					onClick: () => setOrder((current) => [...current, index]),
					className: "rounded-xl border border-border bg-background px-3 py-2 text-sm font-bold disabled:opacity-40",
					children: item
				}, `${item}-${index}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: submitted || order.length === 0,
					onClick: () => setOrder([]),
					className: "rounded-xl border border-border p-3 font-bold disabled:opacity-40",
					children: tr("reset")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: submitted || !complete,
					onClick: () => {
						setSubmitted(true);
						onResult(result(correct, response.join(" "), startedAt.current));
					},
					className: "rounded-xl bg-primary p-3 font-extrabold text-primary-foreground disabled:opacity-40",
					children: tr("checkAnswer")
				})]
			}),
			submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, {
				correct,
				answer: answer.join(" ")
			})
		]
	});
}
function WritingActivity({ character, strokes, onResult }) {
	const { tr } = useLocale();
	const [value, setValue] = (0, import_react.useState)("");
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const startedAt = (0, import_react.useRef)(Date.now());
	const correct = value.trim() === character;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-sm rounded-3xl border border-border/50 bg-card p-6 text-center shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-extrabold uppercase tracking-widest text-muted-foreground",
				children: tr("writeCharacter")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "khmer mb-4 text-8xl font-bold text-primary",
				children: character
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value,
				disabled: submitted,
				onChange: (event) => setValue(event.target.value),
				placeholder: tr("typeKhmerCharacter"),
				className: "w-full rounded-xl border border-border bg-background p-3 text-center text-xl",
				"aria-label": tr("typeKhmerCharacter")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: ["Stroke order: ", strokes.join(" → ")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: submitted || value.trim().length === 0,
				onClick: () => {
					setSubmitted(true);
					onResult(result(correct, value.trim(), startedAt.current));
				},
				className: "mt-5 w-full rounded-xl bg-primary p-3 font-extrabold text-primary-foreground disabled:opacity-40",
				children: tr("checkAnswer")
			}),
			submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, {
				correct,
				answer: character
			})
		]
	});
}
function ConversationTranscriptLesson({ lesson, playbackRate, onBack, onComplete }) {
	const { locale, tr } = useLocale();
	const lines = lesson.content ?? [];
	const [active, setActive] = (0, import_react.useState)(0);
	const [showEnglish, setShowEnglish] = (0, import_react.useState)(true);
	const [playingAll, setPlayingAll] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [rate, setRate] = (0, import_react.useState)(playbackRate);
	const [error, setError] = (0, import_react.useState)(null);
	const stopAfterLine = (0, import_react.useRef)(false);
	const progress = lines.length ? (active + 1) / lines.length * 100 : 0;
	const scenario = getDialogueScenario(lesson.title, lesson.scenarioIcon, lesson.scenarioLabel);
	(0, import_react.useEffect)(() => {
		const stopWhenHidden = () => {
			if (document.visibilityState !== "visible") stopKhmerAudio();
		};
		document.addEventListener("visibilitychange", stopWhenHidden);
		window.addEventListener("pagehide", stopKhmerAudio);
		return () => {
			document.removeEventListener("visibilitychange", stopWhenHidden);
			window.removeEventListener("pagehide", stopKhmerAudio);
			stopKhmerAudio();
		};
	}, []);
	async function playLine(line, index) {
		setActive(index);
		setError(null);
		try {
			await playKhmerAudio(line.audioId, line.front, rate);
		} catch (reason) {
			if (reason.message !== "Audio stopped") setError(locale === "vi" ? "Không thể phát âm thanh này. Hãy kiểm tra kết nối và thử lại." : "This audio could not be played. Check your connection and try again.");
		}
	}
	async function playAll() {
		if (playingAll) {
			stopAfterLine.current = true;
			stopKhmerAudio();
			return;
		}
		stopAfterLine.current = false;
		setPlayingAll(true);
		setError(null);
		try {
			for (const [index, line] of lines.entries()) {
				setActive(index);
				await playKhmerAudio(line.audioId, line.front, rate);
				if (stopAfterLine.current) break;
			}
		} catch (reason) {
			if (reason.message !== "Audio stopped") setError(locale === "vi" ? "Hội thoại đã dừng vì một câu audio không phát được." : "The conversation stopped because one audio line could not be played.");
		} finally {
			setPlayingAll(false);
			stopAfterLine.current = false;
		}
	}
	async function complete() {
		setSaving(true);
		try {
			await onComplete();
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[#FFFCF7] font-sans text-[#173B33] pb-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto min-h-screen max-w-[480px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "border-b border-[#E5E6E0] bg-[#FFFCF7] px-5 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									stopKhmerAudio();
									onBack();
								},
								className: "grid h-9 w-6 place-items-center",
								"aria-label": tr("backToLessons"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "truncate text-lg font-black",
									children: lesson.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[12px] text-[#786858]",
									children: locale === "vi" ? `Câu ${active + 1} / ${lines.length}` : `Line ${active + 1} of ${lines.length}`
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowEnglish((value) => !value),
								className: "grid h-9 w-9 place-items-center",
								"aria-label": locale === "vi" ? "Hiện hoặc ẩn bản dịch" : "Show or hide English",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-5 w-5" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-[3px] bg-[#EDE5D8]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-[#0B8B76] transition-[width]",
							style: { width: `${progress}%` }
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "px-5 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mb-5 flex items-center gap-3 rounded-[22px] border border-[#CFE7DC] bg-[#F0F8F5] p-3 shadow-[0_7px_18px_rgba(11,139,118,.07)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-3xl",
								role: "img",
								"aria-label": scenario.label,
								children: scenario.icon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-black uppercase tracking-[.16em] text-[#0B8B76]",
								children: "Conversation setting"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-black text-[#173B33]",
								children: scenario.label
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-4",
							children: lines.map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogueLine, {
								line,
								index,
								active: active === index,
								showEnglish,
								locale,
								onPlay: () => void playLine(line, index)
							}, line.id))
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 rounded-[14px] border border-red-200 bg-red-50 p-3 text-sm text-red-700",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => void complete(),
							disabled: saving,
							className: "mt-7 w-full rounded-2xl border border-[#D6E7E0] bg-white py-3 text-sm font-black text-[#587169] disabled:opacity-50",
							children: saving ? locale === "vi" ? "Đang lưu tiến độ..." : "Saving progress..." : locale === "vi" ? "Đánh dấu hoàn thành hội thoại" : "Mark conversation complete"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[480px] bg-[#FFFCF7] px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-[20px] border border-[#E5E6E0] bg-white p-3 shadow-[0_10px_22px_rgba(23,59,51,.10)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => void playAll(),
									className: "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0B8B76] text-white",
									children: playingAll ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5 fill-current" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative h-1 rounded-full bg-[#EEE5D8]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-[#0B8B76]",
											style: { width: `${progress}%` }
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#0B8B76]",
											style: { left: `calc(${progress}% - 6px)` }
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex justify-between text-[12px] text-[#786858]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: playingAll ? locale === "vi" ? "Đang phát" : "Playing" : locale === "vi" ? "Sẵn sàng" : "Ready" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											active + 1,
											"/",
											lines.length
										] })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex shrink-0 gap-1",
									children: [
										.6,
										1,
										1.25
									].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											stopKhmerAudio();
											setRate(value);
										},
										className: `rounded-full px-2 py-1 text-[10px] font-bold ${rate === value ? "bg-[#0B8B76] text-white" : "bg-[#E7F2EE] text-[#62766D]"}`,
										children: [value, "x"]
									}, value))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat2, { className: "h-4 w-4 text-[#786858]" })
							]
						})
					})
				})
			]
		})
	});
}
function DialogueLine({ line, index, active, showEnglish, locale, onPlay }) {
	const speaker = line.speaker ?? (index % 2 === 0 ? "female" : "male");
	const speakerName = line.speakerName ?? (speaker === "female" ? "Sreymom" : "Piseth");
	const isMale = speaker === "male";
	const bubble = [
		"max-w-[74%] rounded-[18px] border px-3.5 py-3 text-left",
		isMale ? "bg-[#E9F4EF] border-[#D2E8DE]" : "bg-white border-[#E5E6E0]",
		active ? "ring-2 ring-[#0B8B76]" : ""
	].join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: isMale ? "flex flex-row-reverse items-start gap-2" : "flex items-start gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				title: speakerName,
				className: `mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${isMale ? "bg-[#E5E9F5]" : "bg-[#F8E2E8]"}`,
				children: isMale ? "👨" : "👩"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onPlay,
				className: "mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#F2D28D] bg-[#FFF5D8] text-[#B87300]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: active ? "h-[18px] w-[18px] animate-pulse" : "h-[18px] w-[18px]" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: bubble,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "khmer text-[20px] font-bold leading-[1.55]",
						children: line.front
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-[12px] italic leading-4 text-[#786858]",
						children: englishFriendlyRomanization(line.desc)
					}),
					showEnglish && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-[13px] leading-5 text-[#665546]",
						children: localizeLegacyText(line.back, locale)
					})
				]
			})
		]
	});
}
function getDialogueScenario(title, icon, label) {
	if (icon && label) return {
		icon,
		label
	};
	const value = title.toLowerCase();
	if (/(market|shopping|fruit|price)/.test(value)) return {
		icon: "🛍️",
		label: "Market conversation"
	};
	if (/(restaurant|coffee|food|drink)/.test(value)) return {
		icon: "🍜",
		label: "Restaurant conversation"
	};
	if (/(school|class|library)/.test(value)) return {
		icon: "🏫",
		label: "School conversation"
	};
	if (/(hotel|room)/.test(value)) return {
		icon: "🏨",
		label: "Hotel conversation"
	};
	if (/(clinic|medicine|pharmacy|health)/.test(value)) return {
		icon: "💊",
		label: "Health conversation"
	};
	if (/(bus|train|tuk|travel|trip|airport)/.test(value)) return {
		icon: "🛺",
		label: "Travel conversation"
	};
	if (/(morning|home|family)/.test(value)) return {
		icon: "🏠",
		label: "Everyday conversation"
	};
	return {
		icon: "💬",
		label: "Everyday Khmer conversation"
	};
}
var PASS_THRESHOLD = 70;
function LessonPage() {
	const { lessonId } = Route$1.useParams();
	const { activity: requestedActivity } = Route$1.useSearch();
	const navigate = useNavigate();
	const { completeLesson, updateUser, user, firebaseUser } = useAuth();
	const { t, tr, locale } = useLocale();
	const sourceLesson = Object.values(MOCK_LESSONS).flat().find((candidate) => candidate.id === lessonId) ?? null;
	const lesson = sourceLesson ? localizeLegacyLesson(sourceLesson, locale) : null;
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(requestedActivity);
	const [flipped, setFlipped] = (0, import_react.useState)(false);
	const [isFinished, setIsFinished] = (0, import_react.useState)(false);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [results, setResults] = (0, import_react.useState)({});
	const [finalScore, setFinalScore] = (0, import_react.useState)(0);
	const [passed, setPassed] = (0, import_react.useState)(false);
	const [sessionKey, setSessionKey] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setCurrentIndex(requestedActivity);
		setFlipped(false);
		setIsFinished(false);
		setIsSaving(false);
		setResults({});
		setFinalScore(0);
		setPassed(false);
		setSessionKey((value) => value + 1);
	}, [lessonId, requestedActivity]);
	if (!lesson) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center h-screen p-4 bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl font-bold",
			children: t("lessonMissing")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => navigate({ to: "/home" }),
			className: "mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold",
			children: t("back")
		})]
	});
	if (!(hasFullLessonTestAccess(firebaseUser?.email ?? user.email) || isCategoryAccessible(user.role, lesson.categoryId))) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-extrabold",
				children: t("lessonNeedsAccount")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: t("lessonNeedsAccountText")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				search: { redirect: `/lesson/${lessonId}` },
				className: "mt-6 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground",
				children: t("signInOrUp")
			})
		]
	});
	if (lesson.type === "conversation" && lesson.content?.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationTranscriptLesson, {
		lesson,
		playbackRate: user.audioSettings.playbackRate,
		onBack: () => navigate({
			to: "/category/$categoryId",
			params: { categoryId: lesson.categoryId }
		}),
		onComplete: async () => {
			await completeLesson(lesson.id, lesson.categoryId, lesson.title, 100, lesson.xpReward);
			navigate({
				to: "/category/$categoryId",
				params: { categoryId: lesson.categoryId }
			});
		}
	});
	const activities = getLessonActivities(lesson);
	const flashcards = activities[0]?.type === "flashcard" ? activities[0].cards : [];
	const activityCount = activities[0]?.type === "flashcard" ? flashcards.length : activities.length;
	const activeActivity = flashcards.length > 0 ? activities[0] : activities[currentIndex];
	const progressPercent = activityCount > 0 ? Math.round((currentIndex + 1) / activityCount * 100) : 0;
	const currentResult = results[currentIndex];
	const canContinue = flashcards.length > 0 ? flipped : currentResult !== void 0;
	const handleNext = () => {
		if (!canContinue) return;
		if (currentIndex < activityCount - 1) {
			setFlipped(false);
			setTimeout(() => setCurrentIndex(currentIndex + 1), 150);
		} else handleFinish();
	};
	const handleFinish = async () => {
		setIsSaving(true);
		const calculatedScore = flashcards.length > 0 ? 100 : Math.round(Object.values(results).filter((result) => result.correct).length / Math.max(activityCount, 1) * 100);
		const didPass = calculatedScore >= PASS_THRESHOLD;
		setFinalScore(calculatedScore);
		setPassed(didPass);
		if (didPass) await completeLesson(lesson.id, lesson.categoryId, lesson.title, calculatedScore, lesson.xpReward);
		setIsFinished(true);
		setIsSaving(false);
	};
	const retryLesson = () => {
		setCurrentIndex(0);
		setFlipped(false);
		setResults({});
		setFinalScore(0);
		setPassed(false);
		setIsFinished(false);
		setSessionKey((value) => value + 1);
	};
	const goToNextLesson = () => {
		const categoryLessons = MOCK_LESSONS[lesson.categoryId] ?? [];
		const currentLessonIndex = categoryLessons.findIndex((candidate) => candidate.id === lesson.id);
		const nextLesson = currentLessonIndex >= 0 ? categoryLessons[currentLessonIndex + 1] : void 0;
		if (nextLesson) {
			navigate({
				to: "/lesson/$lessonId",
				params: { lessonId: nextLesson.id },
				search: { activity: 0 }
			});
			return;
		}
		navigate({
			to: "/category/$categoryId",
			params: { categoryId: lesson.categoryId }
		});
	};
	if (isFinished) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `h-32 w-32 rounded-full flex items-center justify-center mb-6 shadow-lg ${passed ? "bg-emerald-100 shadow-emerald-500/20" : "bg-amber-100 shadow-amber-500/20"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: `h-16 w-16 ${passed ? "text-emerald-600" : "text-amber-500"}` })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-extrabold mb-2",
				children: passed ? t("completed") : tr("checkpointNotPassed")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground text-lg",
				children: [
					tr("scoreLabel"),
					": ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-extrabold text-foreground",
						children: [finalScore, "%"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 mb-8 text-sm text-muted-foreground",
				children: passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					t("earned"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold text-amber-500",
						children: [
							"+",
							lesson.xpReward,
							" XP"
						]
					})
				] }) : tr("needScore", { score: PASS_THRESHOLD })
			}),
			passed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatreonSupportCard, {
				locale,
				className: "mb-5 w-full max-w-sm"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full max-w-sm flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: retryLesson,
					className: "w-full rounded-2xl border border-primary bg-card py-4 text-lg font-extrabold text-primary shadow-sm transition-all hover:bg-primary/5 active:scale-95",
					children: tr("reviewLesson")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: goToNextLesson,
					className: "w-full rounded-2xl bg-primary py-4 text-lg font-extrabold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-95",
					children: tr("nextLesson")
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex flex-col font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 p-4 pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => navigate({
						to: "/category/$categoryId",
						params: { categoryId: lesson.categoryId }
					}),
					className: "shrink-0 text-muted-foreground hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-7 w-7" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 h-3.5 bg-secondary rounded-full overflow-hidden border border-border/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-primary rounded-full transition-all duration-500 ease-out",
						style: { width: `${progressPercent}%` }
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 pb-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioSpeedSettings, { compact: true })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 flex flex-col items-center justify-center p-6 [perspective:1000px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityRenderer, {
					activity: activeActivity ?? {
						type: "flashcard",
						cards: []
					},
					cardIndex: activeActivity?.type === "flashcard" ? currentIndex : 0,
					flipped,
					onFlip: () => setFlipped(!flipped),
					onPlayAudio: async (card) => {
						setIsPlaying(true);
						try {
							await playKhmerAudio(card.audioId || `${lesson.id}-${card.back}`, card.front, user.audioSettings.playbackRate);
						} finally {
							setIsPlaying(false);
						}
					},
					onPlayPromptAudio: async (audioId, text) => {
						setIsPlaying(true);
						try {
							await playKhmerAudio(audioId, text, user.audioSettings.playbackRate);
						} finally {
							setIsPlaying(false);
						}
					},
					isPlaying,
					onResult: (result) => {
						if (!activeActivity || results[currentIndex]) return;
						setResults((current) => ({
							...current,
							[currentIndex]: result
						}));
						const reviewId = `${lesson.id}-${currentIndex}`;
						if (result.correct) updateUser({ reviewQueue: removeReviewItem(user.reviewQueue, reviewId) });
						else updateUser({ reviewQueue: addReviewItem(user.reviewQueue, {
							id: reviewId,
							lessonId: lesson.id,
							activityIndex: currentIndex,
							prompt: getActivityPrompt(activeActivity),
							answer: getActivityAnswer(activeActivity),
							wrongAnswer: result.response
						}) });
					}
				}, `${sessionKey}-${currentIndex}`)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-6 pb-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleNext,
					disabled: isSaving || !canContinue,
					className: "w-full max-w-sm mx-auto bg-primary text-primary-foreground font-extrabold text-lg py-4 rounded-2xl shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50",
					children: [isSaving ? t("saving") : currentIndex === activityCount - 1 ? t("complete") : t("next"), !isSaving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-6 w-6" })]
				})
			})
		]
	});
}
//#endregion
export { LessonPage as component };
