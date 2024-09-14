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
      return Response.json({}, { status: response.status });
    }

    const data = await response.json();

    return Response.json({
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get('content-type'),
      data,
    });
  } catch (error) {
    return Response.json({}, { status: 500 });
  }
}

// import { NextRequest } from 'next/server';

// export async function POST(request: NextRequest) {
//   try {
//     const { url, method, headers, body } = await request.json();

//     const response = await fetch(url, {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//         ...headers,
//       },
//       body: method === 'POST' || method === 'PUT' ? body : undefined,
//     });

//     if (!response.ok) {
//       return new Response(null, { status: response.status });
//     }

//     const data = await response.json();

//     return new Response(
//       JSON.stringify({
//         status: response.status,
//         statusText: response.statusText,
//         contentType: response.headers.get('content-type'),
//         data,
//       }),
//       {
//         status: response.status,
//         headers: { 'Content-Type': 'application/json' },
//       },
//     );
//   } catch (error) {
//     return new Response(null, { status: 500 });
//   }
// }
