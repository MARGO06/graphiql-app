import { NextRequest, NextResponse } from 'next/server';
import { SCHEMA_QUERY } from '@/schemaQuery';

export async function POST(req: NextRequest) {
  try {
    const { url, schema } = await req.json();

    if (!url || !schema) {
      return NextResponse.json({ error: 'URL and SDL is required', status: 400 });
    }

    const query = SCHEMA_QUERY;

    const response = await fetch(url + schema, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
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
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const err = error as { status: number; message: string };
    return NextResponse.json({ success: false, error: err.message, status: err.status || 500 });
  }
}
