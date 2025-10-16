import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({
    hasKey: !!process.env.GEMINI_API_KEY,

    url: "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent",

    note: "If your logs still show v1beta, you're not running this build."
  });
}
