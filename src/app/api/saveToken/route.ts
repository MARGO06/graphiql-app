import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/utils/aunthenticate';

export async function POST(req: NextRequest) {
  const { email, password, isLogin } = await req.json();

  try {
    const user = await authenticate(email, password, isLogin);

    if (user) {
      const response = NextResponse.json({ success: true, token: user.token, uid: user.uid });

      response.headers.set(
        'Set-Cookie',
        `JWT=${user.token}; Max-Age=3600; HttpOnly; Secure;Path=/; SameSite=strict`,
      );
      return response;
    } else {
      return NextResponse.json({ success: false, error: 'Authentication failed' });
    }
  } catch (error) {
    //TODO
  }
}
