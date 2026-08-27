import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as Volume2, v as Search, z as Languages } from "../_libs/lucide-react.mjs";
import { c as useLocale, l as useAuth, s as LOCALES } from "./router-JcPmpmb6.mjs";
import { a as LovableHeader, i as LovableBottomNav, s as LovableScreen } from "./LovableAppShell-kutS1aM-.mjs";
import { t as PatreonSupportCard } from "./PatreonSupportCard-DIO9v5-U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dictionary-uLPLVzSU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var apiBase = "https://salakhmer-cms-api.oliverkhang.workers.dev".replace(/\/$/, "");
async function callDictionary(path, token, body) {
	if (!apiBase) throw new Error("Dictionary service has not been configured.");
	const response = await fetch(`${apiBase}${path}`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: `Bearer ${token}`
		},
		body: JSON.stringify(body)
	});
	const payload = await response.json().catch(() => ({}));
	if (!response.ok) throw new Error(payload.error ?? "Dictionary service is unavailable.");
	return payload;
}
function lookupKhmerDictionary(token, text) {
	return callDictionary("/api/dictionary/lookup", token, { text });
}
function createDictionaryAudio(token, text) {
	return callDictionary("/api/dictionary/audio", token, { text });
}
var copy = {
	en: {
		intro: "Look up Khmer words. New results are safely cached for faster future searches.",
		search: "Enter a Khmer word or short phrase",
		helper: "Khmer → English, Vietnamese, Chinese, French",
		signIn: "Sign in to search the online dictionary.",
		loading: "Looking up…",
		listen: "Create / play pronunciation",
		machine: "Machine translation — verify important meanings.",
		audioHint: "Tap the speaker to hear Khmer. First play can take a few seconds while audio is prepared and saved; later plays are instant."
	},
	vi: {
		intro: "Tra từ Khmer. Kết quả mới được lưu an toàn để các lần sau nhanh hơn.",
		search: "Nhập từ hoặc cụm từ Khmer",
		helper: "Khmer → Anh, Việt, Trung, Pháp",
		signIn: "Hãy đăng nhập để tra từ điển trực tuyến.",
		loading: "Đang tra…",
		listen: "Tạo / phát phát âm",
		machine: "Bản dịch máy — hãy kiểm tra các nghĩa quan trọng.",
		audioHint: "Nhấn biểu tượng loa để nghe tiếng Khmer. Lần đầu có thể mất vài giây để chuẩn bị và lưu âm thanh; các lần sau sẽ phát ngay."
	},
	zh: {
		intro: "查询高棉语词汇。新结果会安全缓存，以便下次更快显示。",
		search: "输入一个高棉语词或短语",
		helper: "高棉语 → 英语、越南语、中文、法语",
		signIn: "请登录后使用在线词典。",
		loading: "正在查询…",
		listen: "生成 / 播放发音",
		machine: "机器翻译——重要含义请核对。",
		audioHint: "点击扬声器收听高棉语。首次播放需要几秒钟来准备并保存音频，之后会立即播放。"
	},
	fr: {
		intro: "Recherchez des mots khmers. Les nouveaux résultats sont mis en cache pour les recherches suivantes.",
		search: "Saisissez un mot ou une courte expression khmère",
		helper: "Khmer → anglais, vietnamien, chinois, français",
		signIn: "Connectez-vous pour utiliser le dictionnaire en ligne.",
		loading: "Recherche…",
		listen: "Créer / écouter la prononciation",
		machine: "Traduction automatique : vérifiez les sens importants.",
		audioHint: "Touchez le haut-parleur pour écouter le khmer. La première lecture peut prendre quelques secondes pendant la préparation et la sauvegarde de l’audio ; les suivantes sont immédiates."
	}
};
var glossaryCopy = {
	en: {
		label: "SalaKhmer learning term",
		level: "Related level",
		reviewed: "Reviewed SalaKhmer entry."
	},
	vi: {
		label: "Thuật ngữ học SalaKhmer",
		level: "Cấp liên quan",
		reviewed: "Mục SalaKhmer đã duyệt."
	},
	zh: {
		label: "SalaKhmer 学习术语",
		level: "相关级别",
		reviewed: "已审核的 SalaKhmer 条目。"
	},
	fr: {
		label: "Terme d'apprentissage SalaKhmer",
		level: "Niveau associé",
		reviewed: "Entrée SalaKhmer approuvée."
	}
};
function DictionaryPage() {
	const { locale } = useLocale();
	const { firebaseUser } = useAuth();
	const [targetLocale, setTargetLocale] = (0, import_react.useState)(locale);
	const [query, setQuery] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [audioLoading, setAudioLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const player = (0, import_react.useRef)(null);
	const text = copy[locale];
	const lookup = async () => {
		if (!firebaseUser || !query.trim() || loading) return;
		setLoading(true);
		setError("");
		try {
			const token = await firebaseUser.getIdToken();
			setResult(await lookupKhmerDictionary(token, query));
		} catch (cause) {
			setResult(null);
			setError(cause instanceof Error ? cause.message : "Dictionary lookup failed.");
		} finally {
			setLoading(false);
		}
	};
	const playAudio = async () => {
		if (!firebaseUser || !result || audioLoading) return;
		setAudioLoading(true);
		setError("");
		try {
			const audio = await createDictionaryAudio(await firebaseUser.getIdToken(), result.text);
			if (audio.status !== "ready" || !audio.url) throw new Error("Pronunciation is being created. Tap again in a moment.");
			player.current?.pause();
			player.current = new Audio(audio.url);
			await player.current.play();
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Pronunciation could not play.");
		} finally {
			setAudioLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LovableScreen, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableHeader, {
			eyebrow: "SalaKhmer",
			title: "Dictionary"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "px-5 pt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[14px] leading-5 text-[#786858]",
					children: text.intro
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (event) => {
						event.preventDefault();
						lookup();
					},
					className: "mt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#A99B8C]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: text.search,
							className: "khmer h-12 w-full rounded-[14px] border border-[#E4D7C5] bg-[#FFFCF7] pl-10 pr-3 text-[16px] outline-none"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: !firebaseUser || !query.trim() || loading,
						className: "mt-3 h-11 w-full rounded-[14px] bg-[#E99B12] text-sm font-bold text-[#392410] disabled:cursor-not-allowed disabled:opacity-45",
						children: loading ? text.loading : "Search"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-2 rounded-[14px] border border-[#DCE9E6] bg-[#EEF8F5] px-3 py-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-4 w-4 shrink-0 text-[#287E75]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1 text-[12px] text-[#5B756F]",
							children: text.helper
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: targetLocale,
							onChange: (event) => setTargetLocale(event.target.value),
							className: "max-w-[136px] bg-transparent text-right text-[13px] font-bold outline-none",
							children: LOCALES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.nativeLabel
							}, item.id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[12px] leading-5 text-[#786858]",
					children: text.audioHint
				}),
				!firebaseUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 rounded-[14px] border border-[#F2D39C] bg-[#FFF7E7] px-3 py-3 text-sm text-[#806239]",
					children: text.signIn
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "mt-4 rounded-[14px] border border-[#F3B2A9] bg-[#FFF0EE] px-3 py-3 text-sm text-[#A23D2C]",
					children: error
				})
			]
		}),
		result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 pt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "overflow-hidden rounded-[20px] border border-[#DDE9E6] bg-[#FFFCF7] shadow-[0_8px_20px_rgba(47,76,72,.08)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b border-[#EDE1CE] p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "khmer min-w-0 flex-1 text-[31px] font-bold leading-tight",
						children: result.text
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => void playAudio(),
						disabled: audioLoading,
						"aria-label": text.listen,
						className: "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#E9B85D] bg-[#FFF8E8] text-[#C87709] disabled:opacity-50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-5 w-5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold uppercase tracking-[.1em] text-[#A9631E]",
							children: LOCALES.find((item) => item.id === targetLocale)?.nativeLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xl font-bold",
							children: result.translations[targetLocale]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid grid-cols-2 gap-2",
							children: LOCALES.filter((item) => item.id !== targetLocale).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-[#F7F2E8] px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold uppercase text-[#A99B8C]",
									children: item.nativeLabel
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-sm font-medium",
									children: result.translations[item.id]
								})]
							}, item.id))
						}),
						result.glossary && result.explanation?.[targetLocale] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl border border-[#DDE9E6] bg-[#F3FAF7] px-3 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold uppercase tracking-[.08em] text-[#287E75]",
									children: glossaryCopy[locale].label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[13px] leading-5 text-[#46635D]",
									children: result.explanation[targetLocale]
								}),
								result.relatedLevel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-[11px] font-semibold text-[#6F817B]",
									children: [
										glossaryCopy[locale].level,
										": ",
										result.relatedLevel.replace("_", " ").replace("level", "Level")
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-[12px] leading-5 text-[#786858]",
							children: result.status === "machine_draft" ? text.machine : result.glossary ? glossaryCopy[locale].reviewed : "Reviewed SalaKhmer entry."
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-5 pb-8 pt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatreonSupportCard, { locale })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableBottomNav, {})
	] });
}
//#endregion
export { DictionaryPage as component };
