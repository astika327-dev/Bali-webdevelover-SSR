import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const MODEL_NAME = "gemini-1.5-flash";
const MAX_PROMPT_LEN = 2000;
const clamp = (s: string) => (s || "").replace(/\s+/g, " ").trim().slice(0, MAX_PROMPT_LEN);

function toPrompt(messages: Array<{ role: "user" | "assistant"; content: string }>) {
  const header =
    "You are a concise web-dev copilot. Prioritize performance, SEO, a11y, and clean stack suggestions. Be direct. Say when unsure.";
  const convo = messages
    .map(m => `${m.role === "user" ? "User" : "Assistant"}: ${clamp(m.content)}`)
    .join("\n");
  return `${header}\n\n${convo}\nAssistant:`;
}

// helper untuk munculin error asli ke client
function fail(status: number, error: unknown) {
  const msg = typeof error === "string" ? error : (error as any)?.message || "Unknown error";
  return NextResponse.json({ ok: false, error: msg }, { status });
}

export async function POST(req: NextRequest) {
  const hasKey = !!process.env.GEMINI_API_KEY;
  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    if (!hasKey) return fail(500, "Missing GEMINI_API_KEY");
    if (!messages.length) return fail(400, "No messages provided");

    const gen = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = gen.getGenerativeModel({ model: MODEL_NAME });

    const prompt = toPrompt(messages);
    const result = await model.generateContent(prompt);

    // ambil teks dgn aman
    let text = "";
    try { text = result.response?.text?.() || ""; } catch {}
    if (!text.trim()) text = "No response.";

    return NextResponse.json({ ok: true, env: true, reply: { content: text } });
  } catch (e: any) {
    // cetak juga ke log lokal/production
    console.error("[/api/ai] error:", e?.message || e);
    return fail(500, e);
  }
}
