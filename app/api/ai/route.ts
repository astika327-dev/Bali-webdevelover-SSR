import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs"; // gunakan node runtime agar SDK jalan mulus

// Model cepat dan hemat
const MODEL_NAME = "gemini-1.5-flash";
// Batasan santun biar servermu gak jadi tempat curhat novel
const MAX_PROMPT_LEN = 2000;

function clampText(s: string, n = MAX_PROMPT_LEN) {
  return s.replace(/\s+/g, " ").trim().slice(0, n);
}

function toPrompt(messages: Array<{ role: "user" | "assistant"; content: string }>) {
  // Kamu sudah slice(-12) di client. Di sini kita sanitize lagi.
  const sanitized = messages.map(m => ({
    role: m.role,
    content: clampText(m.content || "")
  }));

  // Tambah sedikit “system-style” instruction di header prompt
  const header =
    "You are a concise web-dev copilot. Prioritize web performance, SEO, accessibility, clean stack suggestions. Answer with clear, actionable steps. Avoid hallucinations and say when unsure.";
  const convo = sanitized
    .map(m => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  return `${header}\n\n${convo}\nAssistant:`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "Missing GEMINI_API_KEY in environment." },
        { status: 500 }
      );
    }
    if (!messages.length) {
      return Response.json({ error: "No messages provided." }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = toPrompt(messages);
    const result = await model.generateContent(prompt);
    const text = result.response?.text?.() || "";

    // Bentuk respons cocok dengan widget kamu: data.reply.content
    return Response.json({ reply: { content: text || "No response." } });
  } catch (err: any) {
    // Kalau rate limit atau quota habis, jangan ngegas ke user, cukup jujur.
    const msg =
      err?.message ||
      (typeof err === "string" ? err : "Unknown server error. Check logs.");
    return Response.json({ error: msg }, { status: 500 });
  }
}
