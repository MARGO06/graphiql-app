import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/utils/aunthenticate';
import { loadTranslations } from '@/utils/translation';

export async function POST(req: NextRequest) {
  try {
    const { email, password, isLogin, locale } = await req.json();
    const translations = loadTranslations(locale);

    if (!translations) {
      throw { status: 500, message: 'Failed to load translations' };
    }

    const user = await authenticate(email, password, isLogin, translations);
    if (user && user.token) {
      const response = NextResponse.json(
        { success: true, token: user.token, uid: user.uid },
        { status: 200 },
      );

      response.headers.set(
        'Set-Cookie',
        `JWT=${user.token}; Max-Age=3600; HttpOnly; Secure; Path=/; SameSite=strict`,
      );
      return response;
    }
  } catch (error) {
    const err = error as { status?: number; message?: string };
    return NextResponse.json({ success: false, error: err.message, status: err.status || 500 });
  }
}
