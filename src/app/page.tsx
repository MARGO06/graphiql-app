'use client';
import style from './page.module.css';
import Link from 'next/link';
import { AboutUs } from '@/components/aboutUS/AboutUs';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';
import { saveCurrentUrlToLocalStorage } from '@/services/baseURL';
import { useEffect, useState } from 'react';

export default function Home() {
  const { token } = useAuth();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, []);

  useEffect(() => {
    saveCurrentUrlToLocalStorage();
  }, []);

  const t = useTranslations('WelcomePage');
  const th = useTranslations('History');

  return (
    <main className={style.main}>
      {token ? (
        <>
          <h1>
            {t('welcome')}, {userName}!
          </h1>
          <div className={style.containerLink}>
            <Link href={'/GET'} className={style.signIn}>
              RESTfull
            </Link>
            <Link href={'/graphiql'} className={style.signIn}>
              GraphiQL
            </Link>
            <Link href={'/history'} className={style.signUp}>
              {th('title')}
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
