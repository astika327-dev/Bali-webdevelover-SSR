import { NextRequest, NextResponse } from "next/server";

import { GEMINI_REST_URL, MAX_MESSAGES, MAX_PROMPT_LEN, REQUEST_TIMEOUT_MS } from "./config";

export const runtime = "nodejs";

type ChatMessage = {
  role?: string;
  content?: unknown;
};

type GeminiContent = {
  role: "user" | "model";
  parts: { text: string }[];
};

const FALLBACK_RESPONSES: { test: RegExp; reply: string }[] = [
  {
    test: /seo|search|serp/i,
    reply:
      "Gemini is offline right now, but here are quick SEO wins: tighten your title tags to under 60 characters, add internal links from high-authority pages, and ship schema.org markup for FAQs or services. Each change usually moves the needle within one crawl cycle.",
  },
  {
    test: /performance|speed|core web vitals|lcp|cls|tti/i,
    reply:
      "Gemini can't be reached, so here's the performance playbook: serve critical CSS inline, lazy-load third-party scripts, and convert hero imagery to AVIF/WebP with width hints. Audit layout shifts with `prefers-reduced-motion` fallbacks to stabilise CLS.",
  },
  {
    test: /stack|tech|framework|cms|headless/i,
    reply:
      "The live assistant is unavailable. For Bali villa sites I recommend a Next.js + Tailwind frontend, Sanity or Strapi for content, and either Vercel or Cloudflare Pages for hosting. Pair it with Resend/Nodemailer for transactional email and Cloudinary for media.",
  },
];

const DEFAULT_FALLBACK =
  "Gemini isn't reachable right now. Rephrase your brief into clear goals, capture the main user journey, and break scope into a launch MVP plus follow-up enhancements. I can go deeper once the AI connection is restored.";

const clamp = (value: unknown) => {
  const base = typeof value === "string" ? value : JSON.stringify(value ?? "");
  return base.replace(/\s+/g, " ").trim().slice(0, MAX_PROMPT_LEN);
};

const offlineResponse = (reason: string, lastUserMessage?: string) => {
  const fallback =
    FALLBACK_RESPONSES.find(({ test }) => lastUserMessage && test.test(lastUserMessage))?.reply ??
    DEFAULT_FALLBACK;

  return NextResponse.json({
    reply: { content: fallback },
    meta: { warning: reason, offline: true },
  });
};

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
    if (role === "user") {
      lastUser = text;
    }
  }

  return { contents, lastUser };
};

export async function POST(req: NextRequest) {
  let payload: unknown;

  try {
    payload = await req.json();
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const key = process.env.GEMINI_API_KEY;
  const messages = (payload as { messages?: ChatMessage[] })?.messages ?? [];

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ ok: false, error: "No messages provided" }, { status: 400 });
  }

  const { contents, lastUser } = buildConversation(messages);

  if (contents.length === 0 || !contents.some((item) => item.role === "user")) {
    return NextResponse.json({ ok: false, error: "At least one user message is required" }, { status: 400 });
  }

  if (!key) {
    return offlineResponse("Missing GEMINI_API_KEY in the deployment environment.", lastUser);
  }

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
      console.error("[/api/ai] Gemini request failed:", {
        status: response.status,
        message,
      });

      return offlineResponse(`Gemini error (${response.status}): ${message}`, lastUser);
    }

    if (!json?.candidates?.length) {
      console.error("[/api/ai] No candidates returned from Gemini:", json);
      return offlineResponse("Gemini returned no candidates.", lastUser);
    }

    const text =
      (json.candidates[0]?.content?.parts || [])
        .map((part: { text?: string }) => part?.text ?? "")
        .join("")
        .trim();

    if (!text) {
      return offlineResponse("Gemini responded without text content.", lastUser);
    }

    const warnings: string[] = [];

    if (json.promptFeedback?.safetyRatings?.length) {
      const blocked = json.promptFeedback.safetyRatings.filter(
        (rating: { probability?: string; category?: string }) =>
          rating.probability === "HIGH" || rating.probability === "MEDIUM"
      );
      if (blocked.length) {
        warnings.push(
          `Gemini filtered some content: ${blocked
            .map((rating: { category?: string }) => rating.category || "unknown")
            .join(", ")}.`
        );
      }
    }

    if (json.promptFeedback?.blockReason) {
      warnings.push(`Gemini block reason: ${json.promptFeedback.blockReason}.`);
    }

    const body: Record<string, unknown> = { reply: { content: text } };

    if (warnings.length) {
      body.meta = { warning: warnings.join(" ") };
    }

    return NextResponse.json(body);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[/api/ai] REST request failed:", message);
    return offlineResponse(`Gemini request failed: ${message}`, lastUser);
  } finally {
    clearTimeout(timeout);
  }
}
