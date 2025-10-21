import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch models from Gemini API', details: data }, { status: response.status });
    }

    // Filter models that support 'generateContent'
    const supportedModels = data.models.filter((model: any) =>
      model.supportedGenerationMethods.includes('generateContent')
    );

    return NextResponse.json({ models: supportedModels });

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: 'An unexpected error occurred', details: message }, { status: 500 });
  }
}
