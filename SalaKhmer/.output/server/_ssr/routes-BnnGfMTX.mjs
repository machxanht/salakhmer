import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { N as LogIn, a as UserRound, at as Check, ft as ArrowRight, z as Languages } from "../_libs/lucide-react.mjs";
import { c as useLocale } from "./router-JcPmpmb6.mjs";
import { t as logo_default } from "./logo-5e2hnhS0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mascot-apsara-D6NXIlxt.js
var mascot_apsara_default = "/assets/mascot-apsara-D7-k-9Xn.png";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BnnGfMTX.js
var import_jsx_runtime = require_jsx_runtime();
var LANGUAGES = [
	{
		code: "en",
		short: "EN",
		label: "English"
	},
	{
		code: "vi",
		short: "VI",
		label: "Tiếng Việt"
	},
	{
		code: "zh",
		short: "中",
		label: "中文"
	},
	{
		code: "fr",
		short: "FR",
		label: "Français"
	}
];
function Welcome() {
	const navigate = useNavigate();
	const { locale, setLocale } = useLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#FFFDF9] px-5 pb-6 pt-8 sm:px-8 sm:pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#BDE8DE]/50 blur-3xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-[#D9F1E9]/60 blur-3xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 mx-auto flex w-full max-w-md flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-[68px] w-[68px] place-items-center overflow-hidden rounded-[20px] bg-[#15483D] shadow-[0_9px_22px_rgba(22,72,61,.2)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logo_default,
							alt: "SalaKhmer",
							className: "h-[54px] w-[54px] object-contain brightness-0 invert"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-3 text-[32px] tracking-tighter",
						style: { fontFamily: "'Playfair Display', serif" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold italic text-[#D4A832]",
							children: "Sala"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-[#143D35]",
							children: "Khmer"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11px] font-medium tracking-wide text-[#748077]",
						children: "Khmer School Made Easy."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative z-10 mx-auto flex w-full max-w-[470px] flex-1 flex-col items-center justify-center py-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex w-full flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-5 h-[270px] w-[270px] rounded-full bg-gradient-to-b from-[#BCE8DE] via-[#DDF2EC] to-transparent sm:h-[350px] sm:w-[350px]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex w-full max-w-[300px] flex-col items-end sm:max-w-[380px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mr-1 rounded-2xl border border-[#E5E1D9] bg-white px-4 py-2 text-center shadow-[0_6px_14px_rgba(64,55,38,.10)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-2 left-7 h-4 w-4 rotate-45 border-b border-r border-[#E5E1D9] bg-white" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "relative font-khmer text-[20px] font-bold leading-none text-[#21453C]",
									children: "ជំរាបសួរ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "relative mt-1 text-[8px] font-bold tracking-[.12em] text-[#87918B]",
									children: "CHOM REAB SOUR"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: mascot_apsara_default,
							alt: "Apsara mascot greeting learners",
							width: 1024,
							height: 1024,
							className: "relative -mt-1 w-full max-w-[300px] self-center object-contain drop-shadow-[0_12px_16px_rgba(39,79,67,.16)] sm:max-w-[370px]"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 mx-auto w-full max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-[#E8E1D2] bg-white/80 p-3 shadow-[0_8px_18px_rgba(74,61,37,.06)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-2 text-[11px] font-bold text-[#627068]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-4 w-4 text-[#15977F]" }), " Choose your language"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-2",
						children: LANGUAGES.map((language) => {
							const selected = locale === language.code;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setLocale(language.code),
								"aria-pressed": selected,
								className: `relative min-h-11 rounded-xl border px-1 text-center transition ${selected ? "border-[#12947E] bg-[#E4F6F0] text-[#126D5C]" : "border-[#E9E2D5] bg-[#FFFDF9] text-[#756D61] hover:border-[#C8DCCF]"}`,
								children: [
									selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "absolute right-1 top-1 h-3 w-3" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-[12px] font-extrabold leading-4",
										children: language.short
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-[8px] leading-3",
										children: language.label
									})
								]
							}, language.code);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => navigate({ to: "/login" }),
						className: "flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#D9D6CC] bg-white text-[13px] font-extrabold text-[#284239] transition hover:bg-[#F7FAF8]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-4 w-4" }), " Log in"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => navigate({ to: "/home" }),
						className: "flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#13957F] text-[13px] font-extrabold text-white shadow-[0_8px_15px_rgba(19,149,127,.22)] transition hover:bg-[#0D846F]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "h-4 w-4" }),
							" Continue as guest ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Welcome as component };
