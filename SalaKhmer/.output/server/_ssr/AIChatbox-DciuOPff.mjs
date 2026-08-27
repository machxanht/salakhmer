import { n as __exportAll, r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Send, f as Sparkles, t as X } from "../_libs/lucide-react.mjs";
import { _ as __exportAll$1, c as useLocale, l as useAuth } from "./router-JcPmpmb6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AIChatbox-DciuOPff.js
var AIChatbox_DciuOPff_exports = /* @__PURE__ */ __exportAll({
	n: () => AIChatbox_exports,
	t: () => AIChatbox
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AIChatbox_exports = /* @__PURE__ */ __exportAll$1({ AIChatbox: () => AIChatbox });
var CMS_API_URL = "https://salakhmer-cms-api.oliverkhang.workers.dev".replace(/\/$/, "");
var localizedGreeting = {
	en: "Hi! I’m your SalaKhmer learning guide. Ask me naturally about Khmer or how to use this app.",
	vi: "Chào bạn! Mình là trợ lý học Khmer của SalaKhmer. Bạn cứ hỏi tự nhiên bằng tiếng Việt về tiếng Khmer hoặc cách dùng app nhé.",
	zh: "你好！我是 SalaKhmer 学习助手。你可以用中文自然地询问高棉语或应用的使用方法。",
	fr: "Bonjour ! Je suis le guide d’apprentissage SalaKhmer. Posez naturellement vos questions sur le khmer ou l’utilisation de l’application."
};
var placeholderByLocale = {
	en: "Ask about Khmer...",
	vi: "Hỏi về tiếng Khmer...",
	zh: "问我关于高棉语的问题…",
	fr: "Posez une question sur le khmer…"
};
var unavailableByLocale = {
	en: "The assistant is temporarily unavailable. Please try again in a moment.",
	vi: "Trợ lý đang tạm thời không phản hồi. Bạn thử lại sau ít phút nhé.",
	zh: "助手暂时无法回复，请稍后再试。",
	fr: "L’assistant est temporairement indisponible. Réessayez dans un instant."
};
function AIChatbox({ onClose }) {
	const { user, firebaseUser } = useAuth();
	const { locale } = useLocale();
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "ai",
		content: localizedGreeting[locale]
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const messagesEndRef = (0, import_react.useRef)(null);
	const hydratedChatKeyRef = (0, import_react.useRef)(null);
	const chatStorageKey = `salakhmer.ai-chat.v1.${firebaseUser?.uid ?? "guest"}`;
	(0, import_react.useEffect)(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	(0, import_react.useEffect)(() => {
		if (!firebaseUser || hydratedChatKeyRef.current === chatStorageKey) return;
		hydratedChatKeyRef.current = chatStorageKey;
		try {
			const valid = JSON.parse(window.localStorage.getItem(chatStorageKey) ?? "[]").filter((item) => (item.role === "user" || item.role === "ai") && typeof item.content === "string" && item.content.trim());
			setMessages(valid.length ? valid.slice(-50) : [{
				role: "ai",
				content: localizedGreeting[locale]
			}]);
		} catch {
			setMessages([{
				role: "ai",
				content: localizedGreeting[locale]
			}]);
		}
	}, [
		chatStorageKey,
		firebaseUser,
		locale
	]);
	(0, import_react.useEffect)(() => {
		if (!firebaseUser || hydratedChatKeyRef.current !== chatStorageKey) return;
		window.localStorage.setItem(chatStorageKey, JSON.stringify(messages.slice(-50)));
	}, [
		chatStorageKey,
		firebaseUser,
		messages
	]);
	const handleSend = async () => {
		if (!input.trim() || isLoading) return;
		const userMessage = input.trim();
		setInput("");
		setMessages((prev) => [...prev, {
			role: "user",
			content: userMessage
		}]);
		setIsLoading(true);
		try {
			if (!firebaseUser) throw new Error("Sign in to use SalaKhmer AI.");
			const token = await firebaseUser.getIdToken();
			const response = await fetch(`${CMS_API_URL}/api/assistant`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					message: userMessage,
					level: user.level,
					locale,
					history: messages.slice(-8).map((entry) => ({
						role: entry.role === "ai" ? "assistant" : "user",
						content: entry.content.slice(0, 500)
					}))
				})
			});
			const data = await response.json();
			if (!response.ok || !data.text) throw new Error(data.error || "AI request failed");
			console.info("SalaKhmer AI provider:", data.provider ?? "unknown");
			const text = data.text;
			setMessages((prev) => [...prev, {
				role: "ai",
				content: text
			}]);
		} catch (error) {
			console.error("AI Error:", error);
			setMessages((prev) => [...prev, {
				role: "ai",
				content: unavailableByLocale[locale]
			}]);
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col justify-end pointer-events-none sm:p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto sm:hidden",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full h-[80dvh] sm:h-[500px] sm:w-[380px] sm:ml-auto bg-card sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col pointer-events-auto overflow-hidden animate-in slide-in-from-bottom-10 border border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-[66px] bg-primary px-4 py-3 text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-8 w-8 rounded-full bg-white/20 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-sm",
								children: "SalaKhmer AI"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] opacity-80",
								children: "Quick SalaKhmer help"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "p-2 hover:bg-white/10 rounded-full transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-4 overflow-y-auto bg-[#FFF8EF] p-4",
					children: [
						messages.map((msg, idx) => {
							const isGreeting = msg.role === "ai" && idx === 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `max-w-[88%] rounded-2xl px-4 py-2 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-card border border-border text-foreground rounded-tl-sm shadow-sm"} ${isGreeting ? "flex items-center gap-2.5 pr-3" : ""}`,
									children: [isGreeting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/assets/mascot-apsara-D7-k-9Xn.png",
										alt: "SalaKhmer Apsara assistant",
										className: "h-14 w-11 shrink-0 object-contain mix-blend-multiply"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "leading-5",
										children: msg.content
									})]
								})
							}, idx);
						}),
						isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-2 h-2 rounded-full bg-primary animate-bounce",
										style: { animationDelay: "0ms" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-2 h-2 rounded-full bg-primary animate-bounce",
										style: { animationDelay: "150ms" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-2 h-2 rounded-full bg-primary animate-bounce",
										style: { animationDelay: "300ms" }
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEndRef })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3 bg-card border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							handleSend();
						},
						className: "flex items-center gap-2 bg-secondary rounded-full px-4 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: input,
							onChange: (e) => setInput(e.target.value),
							placeholder: placeholderByLocale[locale],
							className: "flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground",
							disabled: isLoading
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !input.trim() || isLoading,
							className: "grid place-items-center w-8 h-8 rounded-full bg-primary text-primary-foreground disabled:opacity-50 transition-opacity shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4 ml-0.5" })
						})]
					})
				})
			]
		})]
	});
}
//#endregion
export { AIChatbox_DciuOPff_exports as n, AIChatbox as t };
