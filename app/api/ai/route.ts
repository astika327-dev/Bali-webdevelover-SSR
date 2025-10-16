import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const MODEL_NAME = "gemini-1.5-flash-latest";
const MAX_PROMPT_LEN = 2000;
const clamp = (s: string) => (s || "").replace(/\s+/g, " ").trim().slice(0, MAX_PROMPT_LEN);

type Message = { role: "user" | "assistant"; content: string };

const toPrompt = (messages: Message[]) => {
  const header =
    "You are a concise web-dev copilot. Prioritize performance, SEO, a11y, and clean stack suggestions. Be direct. Say when unsure.";
  const convo = (messages || [])
    .map(m => `${m.role === "user" ? "User" : "Assistant"}: ${clamp(m.content)}`)
    .join("\n");
  return `${header}\n\n${convo}\nAssistant:`;
};

// Helper untuk ekstraksi parts dari payload (dipakai SDK fallback dan REST)
const pickParts = (payload: any) =>
  (payload?.candidates?.[0]?.content?.parts || [])
    .map((part: any) => part?.text || "")
    .join("")
    .trim();

const pickREST = (payload: any) => pickParts(payload) || "No response.";

const fail = (status: number, error: unknown) => {
  const message = typeof error === "string" ? error : (error as any)?.message || "Unknown error";
  return NextResponse.json({ ok: false, error: message }, { status });
};

const respond = (text: string, init?: ResponseInit, meta?: Record<string, unknown>) => {
  const payload: Record<string, unknown> = {
    reply: { content: text?.trim() ? text.trim() : "No response." }
  };
  if (meta && Object.keys(meta).length > 0) {
    payload.meta = meta;
  }
  return NextResponse.json(payload, init);
};

const FALLBACK_TIPS = [
  "Audit Core Web Vitals and largest contentful paint with PageSpeed Insights.",
  "Ship only the scripts you need — trim unused libraries and defer below-the-fold code.",
  "Structure headings logically (H1 → H2 → H3) and pair them with descriptive meta titles.",
  "Add internal links from high-authority pages to the ones you want indexed quickly."
];

const fallbackReply = (messages: Message[], reason: string) => {
  const lastUserMessage = [...messages]
    .reverse()
    .find(message => message.role === "user")?.content
    ?.trim();

  const intro =
    `I couldn't reach the Gemini API (${reason}). Double-check your GEMINI_API_KEY and billing configuration. ` +
    "Here are baseline steps you can take right away:";

  const contextual = lastUserMessage
    ? `\n\nRegarding “${lastUserMessage.slice(0, 180)}”, start with:`
    : "";

  const tips = FALLBACK_TIPS.map(tip => `• ${tip}`).join("\n");

  return `${intro}${contextual}\n${tips}`;
};

const respondWithFallback = (messages: Message[], reason: string) =>
  respond(fallbackReply(messages, reason), undefined, { warning: reason });

async function generateWithSDK(prompt: string, key: string) {
  const gen = new GoogleGenerativeAI(key);
  const model = gen.getGenerativeModel({ model: MODEL_NAME });
  const result = await model.generateContent(prompt);
  try {
    // Ambil via API text(); kalau kosong, coba baca dari struktur parts
    if (typeof result?.response?.text === "function") {
      const text = result.response.text() || "";
      if (text.trim()) return text;
    }
    return pickParts(result?.response) || "";
  } catch (error) {
    console.warn("[/api/ai] SDK text extraction failed", error);
    return "";
  }
}

async function generateWithREST(prompt: string, key: string) {
  const url = `https://generativelanguage.googleapis.com/v1/models/${MODEL_NAME}:generateContent?key=${key}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Gemini error (${response.status}): ${data?.error?.message || JSON.stringify(data)}`);
  }

  return pickREST(data);
}

export async function POST(req: NextRequest) {
  let messages: Message[] = [];

  try {
    const body = await req.json().catch(() => ({ messages: [] }));
    messages = Array.isArray(body?.messages) ? body.messages : [];
    if (!messages.length) return fail(400, "No messages provided");

    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("[/api/ai] Missing GEMINI_API_KEY; responding with fallback copy");
      return respondWithFallback(messages, "GEMINI_API_KEY is not configured");
    }

    const prompt = toPrompt(messages);

    // 1) Coba SDK dulu
    try {
      const sdkText = await generateWithSDK(prompt, key);
      if (sdkText.trim()) return respond(sdkText);
    } catch (error) {
      console.warn("[/api/ai] SDK call failed, falling back to REST", error);
    }

    // 2) Fallback ke REST
    try {
      const restText = await generateWithREST(prompt, key);
      return respond(restText);
    } catch (error) {
      const message = (error as Error)?.message || String(error);
      console.error("[/api/ai] REST fallback failed", message);
      return respondWithFallback(messages, message || "Gemini REST request failed");
    }
  } catch (error) {
    const message = (error as Error)?.message || String(error);
    console.error("[/api/ai] Unexpected error", message);
    return respondWithFallback(messages, message || "Unexpected server error");
  }
}
