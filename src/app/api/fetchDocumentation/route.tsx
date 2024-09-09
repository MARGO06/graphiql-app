import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url, schema } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required', status: 400 });
    }

    if (!schema) {
      return NextResponse.json({ error: 'SDL is required', status: 400 });
    }

    const query = `
     query {
      __schema {
        types {
          name
           fields {
             name
           }
        }
      }
    }
`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    });

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const err = error as { status?: number; message?: string };
    return NextResponse.json({ success: false, error: err.message, status: err.status || 500 });
  }
}
