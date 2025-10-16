import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MODEL = "gemini-1.5-flash-latest";
const clamp = (s: string) => (s || "").replace(/\s+/g, " ").trim().slice(0, 2000);

export async function POST(req: NextRequest) {
  const key = process.env.GEMINI_API_KEY;
  if (!key)
    return NextResponse.json({ ok: false, error: "Missing GEMINI_API_KEY" }, { status: 500 });

  const { messages = [] } = await req.json().catch(() => ({}));
  if (!Array.isArray(messages) || messages.length === 0)
    return NextResponse.json({ ok: false, error: "No messages provided" }, { status: 400 });

  const prompt = messages
    .map((m: any) => `${m.role}: ${clamp(m.content)}`)
    .join("\n");

  const url = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${key}`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] })
  });

  const json = await r.json();
  if (!r.ok) {
    const msg = json?.error?.message || JSON.stringify(json);
    return NextResponse.json({ ok: false, error: `Gemini error (${r.status}): ${msg}` }, { status: r.status });
  }

  const text =
    (json?.candidates?.[0]?.content?.parts || [])
      .map((p: any) => p?.text || "")
      .join("")
      .trim() || "No response.";

  return NextResponse.json({ reply: { content: text } });
}
