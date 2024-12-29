import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url, method, headers, body } = await request.json();

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: method === 'POST' || method === 'PUT' ? body : undefined,
    });

    if (!response.ok) {
      return Response.json({ status: response.status });
    }

    const data = await response.json();

    return Response.json({
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get('content-type'),
      data,
    });
  } catch (error) {
    const err = error as { status?: number; message?: string };
    return Response.json({ success: false, error: err.message, status: err.status || 500 });
  }
}
