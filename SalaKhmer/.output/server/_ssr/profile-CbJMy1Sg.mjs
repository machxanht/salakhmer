import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { ct as Bookmark, h as Settings, nt as CircleAlert, rt as ChevronRight } from "../_libs/lucide-react.mjs";
import { c as useLocale, l as useAuth } from "./router-JcPmpmb6.mjs";
import { a as LovableHeader, c as LovableSectionTitle, i as LovableBottomNav, o as LovableModulePath, s as LovableScreen } from "./LovableAppShell-kutS1aM-.mjs";
import { t as PatreonSupportCard } from "./PatreonSupportCard-DIO9v5-U.mjs";
import { t as AudioSpeedSettings } from "./AudioSpeedSettings-CO0lW9Kj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-CbJMy1Sg.js
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { user, totalCompletedLessons, logout } = useAuth();
	const { locale, t, tr } = useLocale();
	const initial = user.name?.[0]?.toUpperCase() || "O";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LovableScreen, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableHeader, {
			eyebrow: tr("myLearning"),
			title: tr("yourProfile"),
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-5 w-5 text-[#786858]" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-5 pt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-16 w-16 place-items-center rounded-full bg-[#F9E8BF] text-2xl font-bold text-[#A9631E]",
					children: initial
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "truncate text-[19px] font-semibold",
						children: user.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-[13px] text-[#786858]",
						children: user.email || "SalaKhmer"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [user.currentStreak, "-day streak"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [
						totalCompletedLessons,
						" ",
						t("lessonsCompleted")
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: ["Level ", user.level] })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-5 pt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableSectionTitle, { title: tr("yourLearningPath") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableModulePath, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-5 pt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableSectionTitle, { title: t("review") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					icon: Bookmark,
					label: tr("savedWords"),
					value: "Phrase list coming next"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					icon: CircleAlert,
					label: tr("mistakesToReview"),
					value: `${user.reviewQueue.length} ${tr("waiting")}`,
					to: "/practice"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 pt-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatreonSupportCard, { locale })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-5 pt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableSectionTitle, { title: tr("audio") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7] p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[14px] font-semibold",
							children: tr("listeningSpeed")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[12px] text-[#786858]",
							children: tr("speedDescription")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioSpeedSettings, { compact: true })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => void logout(),
					className: "mt-4 w-full rounded-[14px] border border-[#DFA7A0] bg-[#FFF7F5] py-3 text-sm font-semibold text-[#A54135]",
					children: tr("signOut")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableBottomNav, {})
	] });
}
function Chip({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-full bg-[#F9E8BF] px-3 py-1.5 text-[12px] font-semibold text-[#A9631E]",
		children
	});
}
function Row({ icon: Icon, label, value, to }) {
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex min-w-0 flex-1 items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-[18px] w-[18px] text-[#786858]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[14px] font-semibold",
				children: label
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "max-w-[120px] truncate text-[12px] text-[#786858]",
			children: value
		}),
		to && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-[18px] w-[18px] text-[#A99B8C]" })
	] });
	return to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: "flex h-14 w-full items-center gap-2 border-b border-[#EDE1CE] px-4 text-left last:border-0",
		children: content
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-14 w-full items-center gap-2 border-b border-[#EDE1CE] px-4 text-left last:border-0",
		children: content
	});
}
//#endregion
export { ProfilePage as component };
