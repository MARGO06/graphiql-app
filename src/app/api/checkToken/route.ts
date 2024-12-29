import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const token = cookies().get('JWT');
  return NextResponse.json({ token: token || null });
}
