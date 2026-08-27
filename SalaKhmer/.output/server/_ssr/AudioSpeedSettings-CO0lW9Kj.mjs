import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { l as useAuth } from "./router-JcPmpmb6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AudioSpeedSettings-CO0lW9Kj.js
var import_jsx_runtime = require_jsx_runtime();
var PLAYBACK_RATES = [
	.6,
	1,
	1.25
];
function AudioSpeedSettings({ compact = false }) {
	const { updateUser, user } = useAuth();
	const selectedRate = user.audioSettings.playbackRate;
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-center gap-2",
		role: "group",
		"aria-label": "Audio speed",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-bold text-muted-foreground",
			children: "Speed"
		}), PLAYBACK_RATES.map((rate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-pressed": selectedRate === rate,
			onClick: () => void updateUser({ audioSettings: {
				...user.audioSettings,
				playbackRate: rate
			} }),
			className: `rounded-lg px-2.5 py-1.5 text-xs font-extrabold transition-colors ${selectedRate === rate ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`,
			children: [rate, "×"]
		}, rate))]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-border bg-card p-5 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground",
				children: "Audio speed"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 text-lg font-extrabold",
				children: "Listening speed"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "This applies to every Khmer audio clip."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-3 gap-2",
				role: "group",
				"aria-label": "Audio speed",
				children: PLAYBACK_RATES.map((rate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-pressed": selectedRate === rate,
					onClick: () => void updateUser({ audioSettings: {
						...user.audioSettings,
						playbackRate: rate
					} }),
					className: `rounded-xl px-3 py-3 text-sm font-extrabold transition-colors ${selectedRate === rate ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`,
					children: [rate, "×"]
				}, rate))
			})
		]
	});
}
//#endregion
export { AudioSpeedSettings as t };
