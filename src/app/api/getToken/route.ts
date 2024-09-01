import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const token = cookies().get('JWT')?.value || null;
  return NextResponse.json({ token });
}
