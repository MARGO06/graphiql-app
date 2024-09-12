import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('JWT');
  const { pathname } = req.nextUrl;

  if (!token) {
    const allowedMethodsRegex =
      /^\/(GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD|graphiql|history)(\/[\S]+)?$/;
    const isAllowed = allowedMethodsRegex.test(pathname);

    if (isAllowed) {
      return NextResponse.redirect(new URL('/signOut', req.url));
    }
  }

  if (token && (pathname === '/signIn' || pathname === '/signUp')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (token) {
    const allowedMethodsRegex =
      /^\/(GET|POST|PUT|DELETE|PATCH|OPTIONS|HEAD|graphiql|history)(\/[\w-]+)?$/;
    const isAllowed = allowedMethodsRegex.test(pathname);

    if (isAllowed) {
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/signIn',
    '/signUp',
    '/signOut',
    '/GET/:path*',
    '/POST/:path*',
    '/PUT/:path*',
    '/DELETE/:path*',
    '/PATCH/:path*',
    '/OPTIONS/:path*',
    '/HEAD/:path*',
    '/history/:path*',
    '/graphiql/:path*',
  ],
};
