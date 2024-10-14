import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url, queries, variables } = await req.json();

    if (!url || !queries) {
      return NextResponse.json({ error: 'URL and Query is required', status: 400 });
    }

    const requestBody = variables ? { query: queries, variables } : { query: queries };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status !== 200) {
      const errorData = await response.json();
      return NextResponse.json({
        success: false,
        error: errorData.message || 'Failed to fetch from external API',
        status: response.status,
      });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data, status: 200 });
  } catch (error) {
    const err = error as { status: number; message: string };
    return NextResponse.json({ success: false, error: err.message, status: err.status || 500 });
  }
}
