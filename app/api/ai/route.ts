import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const MODEL_NAME = "gemini-1.5-flash";
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

const pickREST = (payload: any) =>
  (payload?.candidates?.[0]?.content?.parts || [])
    .map((part: any) => part?.text || "")
    .join("")
    .trim() || "No response.";

const fail = (status: number, error: unknown) => {
  const message = typeof error === "string" ? error : (error as any)?.message || "Unknown error";
  return NextResponse.json({ ok: false, error: message }, { status });
};

const respond = (text: string) =>
  NextResponse.json({ reply: { content: text?.trim() ? text.trim() : "No response." } });

async function generateWithSDK(prompt: string, key: string) {
  const gen = new GoogleGenerativeAI(key);
  const model = gen.getGenerativeModel({ model: MODEL_NAME });
  const result = await model.generateContent(prompt);
  try {
    const text = typeof result?.response?.text === "function" ? result.response.text() || "" : "";
    return text;
  } catch (error) {
    console.warn("[/api/ai] SDK text extraction failed", error);
    return "";
  }
}

async function generateWithREST(prompt: string, key: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${key}`;
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
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    return fail(500, "Missing GEMINI_API_KEY");
  }

  try {
    const body = await req
      .json()
      .catch(() => ({ messages: [] }));
    const messages: Message[] = Array.isArray(body?.messages) ? body.messages : [];

    if (!messages.length) {
      return fail(400, "No messages provided");
    }

    const prompt = toPrompt(messages);

    try {
      const sdkText = await generateWithSDK(prompt, key);
      if (sdkText.trim()) {
        return respond(sdkText);
      }
    } catch (error) {
      console.warn("[/api/ai] SDK call failed, falling back to REST", error);
    }

    try {
      const restText = await generateWithREST(prompt, key);
      return respond(restText);
    } catch (error) {
      console.error("[/api/ai] REST fallback failed", error);
      return respond("No response.");
    }
  } catch (error) {
    console.error("[/api/ai] Unexpected error", (error as any)?.message || error);
    return fail(500, error);
  }
}
