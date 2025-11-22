import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/validation";

type RateBucket = { count: number; reset: number };

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const rateStore: Map<string, RateBucket> = (globalThis as any).__contactRateStore || new Map();
if (!(globalThis as any).__contactRateStore) {
  (globalThis as any).__contactRateStore = rateStore;
}

function getClientIp(req: NextRequest) {
  const header = req.headers.get("x-forwarded-for");
  if (header) {
    return header.split(",")[0]?.trim() || "anonymous";
  }
  return (req as any).ip ?? "anonymous";
}

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid request payload" }), { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return new Response(
      JSON.stringify({ ok: false, error: "Validation failed", details: fieldErrors }),
      { status: 400 }
    );
  }

  const data = parsed.data;
  const ip = getClientIp(req);
  const now = Date.now();
  const bucket = rateStore.get(ip);

  if (bucket && bucket.reset > now) {
    if (bucket.count >= RATE_LIMIT_MAX) {
      return new Response(
        JSON.stringify({ ok: false, error: "Too many requests. Please try again in a few minutes." }),
        { status: 429 }
      );
    }
    bucket.count += 1;
  } else {
    rateStore.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return new Response(JSON.stringify({ ok: false, error: "Mail service unavailable" }), { status: 500 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: (process.env.SMTP_SECURE || "true") === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    const to = process.env.CONTACT_TO || process.env.SMTP_USER || "";
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `New inquiry from ${data.name}`,
      replyTo: data.email,
      text: `Name: ${data.name}
Email: ${data.email}
WhatsApp: ${data.whatsapp || "-"}

${data.message}`
    });
    return new Response(JSON.stringify({ ok: true, id: info.messageId }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: "Failed to send email" }), { status: 500 });
  }
}
