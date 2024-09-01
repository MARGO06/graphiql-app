'use client';
import style from './page.module.css';
import Link from 'next/link';
import { AboutUs } from '@/components/aboutUS/AboutUs';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getTokenFromCookie } from '@/services/token';

export default function Home() {
  const [hasToken, setHasToken] = useState(false);
  const user = 'User';

  const t = useTranslations('WelcomePage');

  const token = getTokenFromCookie();

  const updateHasToken = () => {
    const token = getTokenFromCookie();
    setHasToken(!!token);
  };

  useEffect(() => {
    updateHasToken();
  }, [token]);

  return (
    <main className={style.main}>
      {hasToken ? (
        <>
          <h1>
            {t('welcome')}, {user}!
          </h1>
          <div className={style.containerLink}>
            <Link href={'/restfull'} className={style.signIn}>
              RESTfull
            </Link>
            <Link href={'/graphiql'} className={style.signIn}>
              GraphiQL
            </Link>
            <Link href={'/history'} className={style.signUp}>
              {t('history')}
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1>{t('welcome')}!</h1>
          <div className={style.containerLink}>
            <Link href={'/signIn'} className={style.signIn}>
              {t('signin')}
            </Link>
            <Link href={'/signUp'} className={style.signUp}>
              {t('signup')}
            </Link>
          </div>
        </>
      )}

      <AboutUs />
    </main>
  );
}
