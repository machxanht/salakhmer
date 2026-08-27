import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { $ as Compass, D as PenLine, W as Headphones, at as Check, lt as BookOpen, s as Type } from "../_libs/lucide-react.mjs";
import { c as useLocale } from "./router-JcPmpmb6.mjs";
import { a as LovableHeader, c as LovableSectionTitle, i as LovableBottomNav, s as LovableScreen } from "./LovableAppShell-kutS1aM-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/learn-BmmgRdXm.js
var import_jsx_runtime = require_jsx_runtime();
function LearnPage() {
	const { t } = useLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LovableScreen, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableHeader, {
			eyebrow: t("curriculum"),
			title: t("learnKhmer")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-5 pt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[14px] leading-5 text-[#66766F]",
				children: t("curriculumIntro")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableSectionTitle, {
					title: t("yourPath"),
					note: "6 modules"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnModule, {
							to: "/category/module_1",
							icon: Type,
							title: "Script Basics",
							text: "Letters and sounds",
							tone: "gold"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnModule, {
							to: "/category/module_2",
							icon: BookOpen,
							title: "Read & Spell",
							text: "Useful words",
							tone: "mint"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnModule, {
							to: "/category/module_3",
							icon: Headphones,
							title: "Listen & Speak",
							text: "Real conversations",
							tone: "blue"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnModule, {
							to: "/category/module_4",
							icon: PenLine,
							title: "Handwriting",
							text: "Trace Khmer forms",
							tone: "violet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnModule, {
							to: "/category/module_5",
							icon: Check,
							title: "Review & Test",
							text: "Build recall",
							tone: "coral"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnModule, {
							to: "/category/module_6",
							icon: Compass,
							title: "Cambodia Guide",
							text: "Everyday Khmer",
							tone: "mint"
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableBottomNav, {})
	] });
}
function LearnModule({ to, icon: Icon, title, text, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "min-h-[142px] rounded-[22px] border border-[#E5E6E0] bg-white p-4 shadow-[0_7px_18px_rgba(23,59,51,.06)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `grid h-12 w-12 place-items-center rounded-[16px] ${{
					gold: "bg-[#FFF0CC] text-[#C77800]",
					mint: "bg-[#E3F4ED] text-[#07836C]",
					blue: "bg-[#E5F1FF] text-[#3073B6]",
					violet: "bg-[#EEE8FF] text-[#6756B5]",
					coral: "bg-[#FFE7DB] text-[#C45E36]"
				}[tone]}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "mt-4 block text-[15px] font-black text-[#173B33]",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "mt-1 block text-[12px] text-[#73817B]",
				children: text
			})
		]
	});
}
//#endregion
export { LearnPage as component };
