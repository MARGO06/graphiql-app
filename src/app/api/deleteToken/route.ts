import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function DELETE() {
  cookies().delete('JWT');
  return NextResponse.json({ token: null });
}
