import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    return NextResponse.json({
      reply: { content: "GEMINI_API_KEY is not set in the environment." },
    });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({
            reply: { content: `Error from Gemini API: ${JSON.stringify(data)}` },
        });
    }

    const supportedModels = data.models
      .filter((model: any) => model.supportedGenerationMethods.includes('generateContent'))
      .map((model: any) => model.name);

    return NextResponse.json({
      reply: { content: `Available Models: ${JSON.stringify(supportedModels)}` },
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({
        reply: { content: `An unexpected error occurred: ${message}` },
    });
  }
}
