import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { B as Keyboard, lt as BookOpen, ot as CalendarDays, rt as ChevronRight, v as Search } from "../_libs/lucide-react.mjs";
import { c as useLocale } from "./router-JcPmpmb6.mjs";
import { a as LovableHeader, c as LovableSectionTitle, i as LovableBottomNav, s as LovableScreen } from "./LovableAppShell-kutS1aM-.mjs";
import { t as PatreonSupportCard } from "./PatreonSupportCard-DIO9v5-U.mjs";
import { t as require_momentkh } from "../_libs/thyrith__momentkh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/apply-DIm7dDM9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_momentkh = /* @__PURE__ */ __toESM(require_momentkh());
function ApplyPage() {
	const { locale, tr, t } = useLocale();
	const [keyboardOpen, setKeyboardOpen] = (0, import_react.useState)(false);
	const [date, setDate] = (0, import_react.useState)(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const calendarRef = (0, import_react.useRef)(null);
	const lunar = import_momentkh.default.format(import_momentkh.default.fromDate(/* @__PURE__ */ new Date(`${date}T12:00:00+07:00`)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LovableScreen, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableHeader, {
			eyebrow: tr("practicalKhmer"),
			title: t("practice")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 pt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[14px] text-[#786858]",
				children: tr("applyIntro")
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-5 pt-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableSectionTitle, { title: tr("tools") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dictionary",
						className: "rounded-[18px] border border-[#B7DDD7] bg-[#EFF9F6] p-4 text-left shadow-[0_5px_14px_rgba(43,112,101,.08)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTile, {
								icon: Search,
								tone: "teal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-[15px] font-semibold",
								children: t("dictionary")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[12px] text-[#56756E]",
								children: "Look up Khmer words and hear saved pronunciation."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "mt-2 h-4 w-4 text-[#287E75]" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolCard, {
						icon: CalendarDays,
						title: tr("khmerCalendar"),
						text: tr("checkLunarDate"),
						onClick: () => calendarRef.current?.scrollIntoView({ behavior: "smooth" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolCard, {
						icon: Keyboard,
						title: tr("khmerKeyboard"),
						text: tr("setUpTyping"),
						onClick: () => setKeyboardOpen((open) => !open)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/practice",
						className: "rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7] p-4 text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTile, { icon: BookOpen }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-[15px] font-semibold",
								children: t("review")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[12px] text-[#786858]",
								children: tr("reviewSavedMistakes")
							})
						]
					})
				]
			})]
		}),
		keyboardOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 pt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7] p-4 text-[13px] leading-5 text-[#786858]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[15px] font-semibold text-[#47382B]",
						children: "Set up Khmer typing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-[#47382B]",
							children: "Android:"
						}), " Settings → System → Languages & input → Gboard → Languages → Add keyboard → Khmer."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-[#47382B]",
							children: "iPhone/iPad:"
						}), " Settings → General → Keyboard → Keyboards → Add New Keyboard → Khmer."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-[#47382B]",
							children: "Windows:"
						}), " Settings → Time & language → Language & region → Add a language → Khmer. Switch with Win + Space."]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			ref: calendarRef,
			className: "px-5 pt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableSectionTitle, {
				title: tr("khmerCalendar"),
				note: "Choose a date"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7] p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					value: date,
					onChange: (event) => setDate(event.target.value),
					className: "rounded-[12px] border border-[#E4D7C5] bg-[#FBF7F0] px-3 py-2 text-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "khmer mt-3 rounded-[12px] bg-[#F9E8BF]/50 p-3 text-center text-lg",
					children: lunar
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 pb-8 pt-7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatreonSupportCard, { locale })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableBottomNav, {})
	] });
}
function IconTile({ icon: Icon, tone = "gold" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `grid h-10 w-10 place-items-center rounded-[14px] ${tone === "teal" ? "bg-[#D7EFEA] text-[#287E75]" : "bg-[#F9E8BF] text-[#A9631E]"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "h-5 w-5",
			strokeWidth: 1.75
		})
	});
}
function ToolCard({ icon, title, text, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: "min-h-[142px] rounded-[18px] border border-[#E4D7C5] bg-[#FFFCF7] p-4 text-left",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTile, { icon }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-[15px] font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[12px] text-[#786858]",
				children: text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "mt-2 h-4 w-4 text-[#A99B8C]" })
		]
	});
}
//#endregion
export { ApplyPage as component };
