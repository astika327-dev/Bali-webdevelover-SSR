import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Konfigurasi
const MODEL_NAME = "gemini-1.5-flash-latest";
const GEMINI_REST_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;
const MAX_PROMPT_LEN = 2000;
const MAX_MESSAGES = 12;
const REQUEST_TIMEOUT_MS = 15000;

// Helper
const clamp = (value: unknown) => {
  const base = typeof value === "string" ? value : JSON.stringify(value ?? "");
  return base.replace(/\s+/g, " ").trim().slice(0, MAX_PROMPT_LEN);
};

// Tipe data
type ChatMessage = {
  role?: string;
  content?: unknown;
};

type GeminiContent = {
  role: "user" | "model";
  parts: { text: string }[];
};

// Pesan fallback jika Gemini tidak bisa diakses
const FALLBACK_RESPONSES: { test: RegExp; reply: string }[] = [
  {
    test: /seo|search|serp/i,
    reply:
      "Gemini is offline, but here are SEO wins: tighten title tags (<60 chars), add internal links from strong pages, and include schema.org markup for FAQs or services.",
  },
  {
    test: /performance|speed|core web vitals|lcp|cls|tti/i,
    reply:
      "Gemini can’t be reached, so here’s your performance plan: inline critical CSS, lazy-load third-party scripts, and convert hero images to AVIF/WebP with proper width hints.",
  },
  {
    test: /stack|tech|framework|cms|headless/i,
    reply:
      "The assistant is offline. For a villa booking site, I’d recommend Next.js + Tailwind, Strapi/Sanity CMS, and Vercel or Cloudflare Pages for hosting. Add Cloudinary for media and Resend for email.",
  },
];

const DEFAULT_FALLBACK =
  "Gemini isn't reachable right now. Refine your project scope into clear deliverables and MVP phases. Once the AI connection restores, I’ll refine further.";

const offlineResponse = (reason: string, lastUserMessage?: string) => {
  const fallback =
    FALLBACK_RESPONSES.find(({ test }) => lastUserMessage && test.test(lastUserMessage))?.reply ??
    DEFAULT_FALLBACK;

  return NextResponse.json({
    reply: { content: fallback },
    meta: { warning: reason, offline: true },
  });
};

// Bangun format percakapan sesuai Gemini
const buildConversation = (messages: ChatMessage[]) => {
  const trimmed = messages.slice(-MAX_MESSAGES);
  const contents: GeminiContent[] = [];
  let lastUser: string | undefined;

  for (const message of trimmed) {
    if (!message || typeof message !== "object") continue;

    const role = message.role === "assistant" ? "model" : message.role === "user" ? "user" : null;
    if (!role) continue;

    const text = clamp(message.content);
    if (!text) continue;

    contents.push({ role, parts: [{ text }] });
    if (role === "user") lastUser = text;
  }

  return { contents, lastUser };
};

// Handler utama
export async function POST(req: NextRequest) {
  let payload: unknown;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const key = process.env.GEMINI_API_KEY;
  const messages = (payload as { messages?: ChatMessage[] })?.messages ?? [];

  if (!Array.isArray(messages) || messages.length === 0)
    return NextResponse.json({ ok: false, error: "No messages provided" }, { status: 400 });

  const { contents, lastUser } = buildConversation(messages);

  if (contents.length === 0 || !contents.some((item) => item.role === "user"))
    return NextResponse.json({ ok: false, error: "At least one user message is required" }, { status: 400 });

  if (!key) return offlineResponse("Missing GEMINI_API_KEY in the environment.", lastUser);

  // Timeout handler
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${GEMINI_REST_URL}?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
      signal: controller.signal,
      cache: "no-store",
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = json?.error?.message || JSON.stringify(json) || "Unknown Gemini error";
      console.error("[/api/ai] Gemini request failed:", { status: response.status, message });
      return offlineResponse(`Gemini error (${response.status}): ${message}`, lastUser);
    }

    if (!json?.candidates?.length) {
      console.error("[/api/ai] No candidates returned from Gemini:", json);
      return offlineResponse("Gemini returned no candidates.", lastUser);
    }

    const text =
      (json.candidates[0]?.content?.parts || [])
        .map((p: { text?: string }) => p?.text ?? "")
        .join("")
        .trim();

    if (!text) return offlineResponse("Gemini responded without text content.", lastUser);

    const warnings: string[] = [];

    if (json.promptFeedback?.safetyRatings?.length) {
      const blocked = json.promptFeedback.safetyRatings.filter(
        (r: { probability?: string }) => r.probability === "HIGH" || r.probability === "MEDIUM"
      );
      if (blocked.length)
        warnings.push(
          `Gemini filtered some content: ${blocked
            .map((r: { category?: string }) => r.category || "unknown")
            .join(", ")}.`
        );
    }

    if (json.promptFeedback?.blockReason)
      warnings.push(`Gemini block reason: ${json.promptFeedback.blockReason}.`);

    const body: Record<string, unknown> = { reply: { content: text } };
    if (warnings.length) body.meta = { warning: warnings.join(" ") };

    return NextResponse.json(body);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[/api/ai] REST request failed:", message);
    return offlineResponse(`Gemini request failed: ${message}`, lastUser);
  } finally {
    clearTimeout(timeout);
  }
}
