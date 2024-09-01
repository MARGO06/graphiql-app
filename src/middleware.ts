import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('JWT');

  const url = req.nextUrl.clone();

  if (token) {
    if (url.pathname === '/signIn' || url.pathname === '/signUp') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/signIn', '/signUp'],
};
