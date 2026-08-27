import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { U as Heart, Z as ExternalLink } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PatreonSupportCard-DIO9v5-U.js
var import_jsx_runtime = require_jsx_runtime();
var PATREON_URL = "https://www.patreon.com/cw/SalaKhmer";
var COPY = {
	en: {
		label: "KEEP SALAKHMER FREE",
		title: "Support SalaKhmer",
		body: "SalaKhmer is independently made and free for every learner. If this helped you, a small Patreon encouragement helps us keep building.",
		action: "Support on Patreon"
	},
	vi: {
		label: "GIỮ SALAKHMER MIỄN PHÍ",
		title: "Ủng hộ SalaKhmer",
		body: "SalaKhmer được làm độc lập và luôn miễn phí cho người học. Nếu phần này hữu ích, một lời ủng hộ nhỏ qua Patreon sẽ giúp ứng dụng tiếp tục phát triển.",
		action: "Ủng hộ trên Patreon"
	},
	zh: {
		label: "让 SALAKHMER 保持免费",
		title: "支持 SalaKhmer",
		body: "SalaKhmer 由独立开发者制作，并始终免费提供给学习者。如果它对你有帮助，欢迎通过 Patreon 支持我们继续建设它。",
		action: "在 Patreon 上支持"
	},
	fr: {
		label: "GARDER SALAKHMER GRATUIT",
		title: "Soutenir SalaKhmer",
		body: "SalaKhmer est créé indépendamment et reste gratuit pour tous les apprenants. Si cela vous a aidé, un petit soutien sur Patreon nous aide à continuer.",
		action: "Soutenir sur Patreon"
	}
};
/** One consistent, optional Patreon CTA throughout the learner experience. */
function PatreonSupportCard({ locale, className = "" }) {
	const copy = COPY[locale];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: `relative overflow-hidden rounded-[18px] border border-[#EFCB7B] bg-[#FFF2D2] p-4 text-left shadow-[0_8px_18px_rgba(109,73,20,0.08)] ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": "true",
			className: "absolute -right-7 -top-9 h-24 w-24 rounded-full bg-[#F3C34B]/25"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-7 w-7 place-items-center rounded-full bg-[#F5B321] text-[#4D3420] shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3.5 w-3.5 fill-current" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[9px] font-extrabold tracking-[0.1em] text-[#A25C1E]",
						children: copy.label
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 text-[16px] font-extrabold text-[#3C332A]",
					children: copy.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[12px] leading-5 text-[#80654B]",
					children: copy.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: PATREON_URL,
					target: "_blank",
					rel: "noreferrer",
					className: "mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-[#1D1B1B] px-3.5 text-[11px] font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A9631E]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3.5 w-3.5 fill-[#FF7272] text-[#FF7272]" }),
						copy.action,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5 opacity-70" })
					]
				})
			]
		})]
	});
}
//#endregion
export { PatreonSupportCard as t };
