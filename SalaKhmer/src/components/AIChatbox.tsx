import { useState, useRef, useEffect } from "react";
import { Send, X, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/lib/i18n";
import mascotApsara from "@/assets/mascot-apsara.png";

const CMS_API_URL = (import.meta.env.VITE_CMS_API_URL ?? "").replace(/\/$/, "");

type ChatMessage = { role: "user" | "ai"; content: string };

// Keep the opening message tied to the currently selected app language.
const localizedGreeting: Record<"en" | "vi" | "zh" | "fr", string> = {
  en: "Hi! I’m your SalaKhmer learning guide. Ask me naturally about Khmer or how to use this app.",
  vi: "Chào bạn! Mình là trợ lý học Khmer của SalaKhmer. Bạn cứ hỏi tự nhiên bằng tiếng Việt về tiếng Khmer hoặc cách dùng app nhé.",
  zh: "你好！我是 SalaKhmer 学习助手。你可以用中文自然地询问高棉语或应用的使用方法。",
  fr: "Bonjour ! Je suis le guide d’apprentissage SalaKhmer. Posez naturellement vos questions sur le khmer ou l’utilisation de l’application.",
};

const placeholderByLocale: Record<"en" | "vi" | "zh" | "fr", string> = {
  en: "Ask about Khmer...", vi: "Hỏi về tiếng Khmer...", zh: "问我关于高棉语的问题…", fr: "Posez une question sur le khmer…",
};
const unavailableByLocale: Record<"en" | "vi" | "zh" | "fr", string> = {
  en: "The assistant is temporarily unavailable. Please try again in a moment.",
  vi: "Trợ lý đang tạm thời không phản hồi. Bạn thử lại sau ít phút nhé.",
  zh: "助手暂时无法回复，请稍后再试。",
  fr: "L’assistant est temporairement indisponible. Réessayez dans un instant.",
};

const welcomeByLocale: Record<"en" | "vi" | "zh" | "fr", string> = {
  en: "Hi! I’m your SalaKhmer learning guide. Ask me naturally about Khmer or how to use this app.",
  vi: "Chào bạn! Mình là trợ lý học Khmer của SalaKhmer. Bạn cứ hỏi tự nhiên bằng tiếng Việt về tiếng Khmer hoặc cách dùng app nhé.",
  zh: "你好！我是 SalaKhmer 学习助手。你可以用中文自然地询问高棉语或应用的使用方法。",
  fr: "Bonjour ! Je suis le guide d’apprentissage SalaKhmer. Posez naturellement vos questions sur le khmer ou l’utilisation de l’application.",
};

export function AIChatbox({ onClose }: { onClose: () => void }) {
  const { user, firebaseUser } = useAuth();
  const { locale } = useLocale();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      content: localizedGreeting[locale],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hydratedChatKeyRef = useRef<string | null>(null);
  const chatStorageKey = `salakhmer.ai-chat.v1.${firebaseUser?.uid ?? "guest"}`;

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Conversations belong to the signed-in learner, survive refresh/navigation,
  // and are never shared with another Firebase account on the same device.
  useEffect(() => {
    if (!firebaseUser || hydratedChatKeyRef.current === chatStorageKey) return;
    hydratedChatKeyRef.current = chatStorageKey;
    try {
      const saved = JSON.parse(window.localStorage.getItem(chatStorageKey) ?? "[]") as ChatMessage[];
      const valid = saved.filter((item) => (item.role === "user" || item.role === "ai") && typeof item.content === "string" && item.content.trim());
      setMessages(valid.length ? valid.slice(-50) : [{ role: "ai", content: localizedGreeting[locale] }]);
    } catch {
      setMessages([{ role: "ai", content: localizedGreeting[locale] }]);
    }
  }, [chatStorageKey, firebaseUser, locale]);

  useEffect(() => {
    if (!firebaseUser || hydratedChatKeyRef.current !== chatStorageKey) return;
    window.localStorage.setItem(chatStorageKey, JSON.stringify(messages.slice(-50)));
  }, [chatStorageKey, firebaseUser, messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      if (!firebaseUser) throw new Error("Sign in to use SalaKhmer AI.");
      const token = await firebaseUser.getIdToken();
      const response = await fetch(`${CMS_API_URL}/api/assistant`, {
        method: "POST",
        headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          message: userMessage,
          level: user.level,
          locale,
          // Enough recent context for natural follow-up replies. The Worker
          // does not store this transcript.
          history: messages.slice(-8).map((entry) => ({
            role: entry.role === "ai" ? "assistant" : "user",
            content: entry.content.slice(0, 500),
          })),
        }),
      });
      const data = (await response.json()) as { text?: string; error?: string; provider?: "gemini" | "cloudflare" };
      if (!response.ok || !data.text) throw new Error(data.error || "AI request failed");
      // Keep provider choice invisible to learners, but make it auditable in
      // DevTools while we operate Gemini primary with a Cloudflare fallback.
      console.info("SalaKhmer AI provider:", data.provider ?? "unknown");
      const text = data.text;

      setMessages((prev) => [...prev, { role: "ai", content: text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: unavailableByLocale[locale],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end pointer-events-none sm:p-4">
      {/* Backdrop (mobile only) */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto sm:hidden"
        onClick={onClose}
      />

      {/* Chat Window */}
      <div className="relative w-full h-[80dvh] sm:h-[500px] sm:w-[380px] sm:ml-auto bg-card sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col pointer-events-auto overflow-hidden animate-in slide-in-from-bottom-10 border border-border">
        {/* Header */}
        <div className="min-h-[66px] bg-primary px-4 py-3 text-primary-foreground">
          <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">SalaKhmer AI</h3>
              <p className="text-[10px] opacity-80">Quick SalaKhmer help</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 space-y-4 overflow-y-auto bg-[#FFF8EF] p-4">
          {messages.map((msg, idx) => {
            const isGreeting = msg.role === "ai" && idx === 0;
            return (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-card border border-border text-foreground rounded-tl-sm shadow-sm"
                  } ${isGreeting ? "flex items-center gap-2.5 pr-3" : ""}`}
                >
                  {isGreeting && (
                    <img
                      src={mascotApsara}
                      alt="SalaKhmer Apsara assistant"
                      className="h-14 w-11 shrink-0 object-contain mix-blend-multiply"
                    />
                  )}
                  <p className="leading-5">{msg.content}</p>
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1 shadow-sm">
                <span
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-card border-t border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholderByLocale[locale]}
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="grid place-items-center w-8 h-8 rounded-full bg-primary text-primary-foreground disabled:opacity-50 transition-opacity shrink-0"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
