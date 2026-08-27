import { createFileRoute } from "@tanstack/react-router";

const MAX_MESSAGE_LENGTH = 500;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
          if (!token) {
            return Response.json({ error: "Sign in to use SalaKhmer AI." }, { status: 401 });
          }
          const firebaseApiKey = process.env["FIREBASE_API_KEY"] ?? process.env["VITE_FIREBASE_API_KEY"];
          if (!firebaseApiKey) {
            return Response.json({ error: "Authentication has not been configured." }, { status: 503 });
          }
          const sessionCheck = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(firebaseApiKey)}`,
            {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ idToken: token }),
            },
          );
          if (!sessionCheck.ok) {
            return Response.json({ error: "Your session is no longer valid." }, { status: 401 });
          }
          const apiKey = process.env["GEMINI_API_KEY"];
          if (!apiKey) {
            return Response.json({ error: "AI has not been configured." }, { status: 503 });
          }

          const body = (await request.json()) as { message?: unknown; level?: unknown };
          const message = typeof body.message === "string" ? body.message.trim() : "";
          const level = typeof body.level === "number" ? body.level : 1;

          if (!message || message.length > MAX_MESSAGE_LENGTH) {
            return Response.json(
              { error: "The question must contain 1 to 500 characters." },
              { status: 400 },
            );
          }

          const prompt = `You are SalaKhmer AI, an English-speaking assistant for learning Khmer. The learner is at level ${level}. Reply in friendly, concise English using fewer than 100 words. When you include Khmer, provide a transliteration and English meaning. Do not invent information when uncertain.\n\nQuestion: ${message}`;
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 15_000);
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
              signal: controller.signal,
            },
          ).finally(() => clearTimeout(timeout));

          if (!response.ok) {
            console.error("Gemini request failed:", response.status, await response.text());
            return Response.json({ error: "AI is temporarily unavailable." }, { status: 502 });
          }

          const data = (await response.json()) as {
            candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
          };
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (!text) return Response.json({ error: "AI returned no content." }, { status: 502 });

          return Response.json({ text });
        } catch (error) {
          console.error("AI chat error:", error);
          return Response.json({ error: "Unable to connect to AI right now." }, { status: 500 });
        }
      },
    },
  },
});
