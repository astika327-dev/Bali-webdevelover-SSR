import { NextResponse } from "next/server";

import { GEMINI_MODEL, GEMINI_REST_URL } from "../ai/config";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({
    hasKey: !!process.env.GEMINI_API_KEY,
    model: GEMINI_MODEL,
    url: GEMINI_REST_URL,
    note: "If your logs still show v1beta, you're not running this build.",
  });
}
