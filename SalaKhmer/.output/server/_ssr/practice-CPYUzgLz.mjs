import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { H as House, at as Check, b as RotateCcw, f as Sparkles, ft as ArrowRight, i as User, lt as BookOpen, n as Volume2 } from "../_libs/lucide-react.mjs";
import { c as useLocale, l as useAuth } from "./router-JcPmpmb6.mjs";
import { t as playKhmerAudio } from "./audioService-CfsJ3L6R.mjs";
import { t as AudioSpeedSettings } from "./AudioSpeedSettings-CO0lW9Kj.mjs";
import { n as removeReviewItem } from "./review-queue-xu6BhGRg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice-CPYUzgLz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AIChatbox = (0, import_react.lazy)(() => import("./AIChatbox-DciuOPff.mjs").then((n) => n.n).then((n) => n.n).then((module) => ({ default: module.AIChatbox })));
function BottomNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [isAIChatOpen, setIsAIChatOpen] = (0, import_react.useState)(false);
	const { t } = useLocale();
	const items = [
		{
			to: "/home",
			label: t("home"),
			icon: House
		},
		{
			to: "/dictionary",
			label: t("dictionary"),
			icon: BookOpen
		},
		{
			type: "ai",
			label: "AI",
			icon: Sparkles
		},
		{
			to: "/practice",
			label: "REVIEW",
			icon: RotateCcw
		},
		{
			to: "/profile",
			label: t("profile"),
			icon: User
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mx-auto grid max-w-md grid-cols-5 px-1 pb-3 pt-2",
			children: items.map((item) => {
				const Icon = item.icon;
				if (!("to" in item)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setIsAIChatOpen(true),
						className: "flex flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-bold tracking-[0.14em] transition-colors text-ruby hover:opacity-80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-9 w-9 place-items-center rounded-full bg-ruby text-ruby-foreground shadow-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "h-5 w-5",
								strokeWidth: 2.2
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-ruby font-extrabold",
							children: item.label
						})]
					})
				}, "ai");
				const active = pathname === item.to;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: `flex flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-bold tracking-[0.14em] transition-colors ${active ? "text-primary-foreground" : "text-muted-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `grid h-9 w-9 place-items-center rounded-xl transition-all ${active ? "bg-primary" : "bg-transparent"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "h-5 w-5",
								strokeWidth: 2.2
							})
						}), item.label]
					})
				}, item.to);
			})
		})
	}), isAIChatOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIChatbox, { onClose: () => setIsAIChatOpen(false) })
	})] });
}
function Practice() {
	const { updateUser, user } = useAuth();
	const items = user.reviewQueue;
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const current = items[0];
	const playCurrent = async () => {
		if (!current || playing) return;
		setPlaying(true);
		try {
			await playKhmerAudio(current.id, current.prompt, user.audioSettings.playbackRate);
		} finally {
			setPlaying(false);
		}
	};
	const markReviewed = async (correct) => {
		if (!current) return;
		setSelected(correct ? "correct" : "wrong");
		if (correct) await updateUser({ reviewQueue: removeReviewItem(items, current.id) });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "px-4 pb-3 pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "khmer text-sm text-muted-foreground",
						children: "លំហាត់"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-extrabold",
						children: "Practice"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioSpeedSettings, { compact: true })
					})
				]
			}),
			current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-amber-300/60 bg-amber-50 p-5 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-700",
									children: [
										"Review incorrect answers · ",
										items.length,
										" items"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 text-xl font-extrabold text-amber-950",
									children: current.prompt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-amber-900/80",
									children: ["Answer: ", current.answer]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void playCurrent(),
								disabled: playing,
								"aria-label": "Listen to the question",
								className: "rounded-full bg-amber-500 p-3 text-white disabled:opacity-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: playing ? "animate-pulse" : "" })
							})]
						}),
						selected === "wrong" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 rounded-xl bg-red-100 p-3 text-sm font-bold text-red-700",
							children: "Keep this item for another review."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void markReviewed(false),
								className: "rounded-xl border border-amber-300 px-4 py-3 text-sm font-extrabold text-amber-900",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "mr-2 inline h-4 w-4" }), " Not yet"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void markReviewed(true),
								className: "rounded-xl bg-emerald-600 px-4 py-3 text-sm font-extrabold text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-2 inline h-4 w-4" }), " I remember"]
							})]
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-4 rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mx-auto h-10 w-10 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-xl font-extrabold",
						children: "No items left to review"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Start a new lesson to continue building your Khmer skills."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/home",
						className: "mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground",
						children: ["Back to learning path ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})
		]
	});
}
//#endregion
export { Practice as component };
