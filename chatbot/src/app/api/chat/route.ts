import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'GROQ_API_KEY not set in environment.' }, { status: 500 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const { messages, temperature, top_p, json_mode } = body;
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Missing or invalid messages array.' }, { status: 400 });
  }

  const payload: Record<string, any> = {
    model: 'llama3-70b-8192',
    messages,
    temperature: typeof temperature === 'number' ? temperature : 0.7,
    top_p: typeof top_p === 'number' ? top_p : 1,
  };
  if (json_mode) {
    payload.response_format = { type: 'json_object' };
  }

  try {
    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!groqRes.ok) {
      const errorText = await groqRes.text();
      return NextResponse.json({ error: errorText }, { status: groqRes.status });
    }

    const data = await groqRes.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error.' }, { status: 500 });
  }
}
