'use client';
import React from 'react';
import Link from 'next/link';
import style from '@/components/registration/Registration.module.scss';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const Registration: React.FC = () => {
  const t = useTranslations('Registration');
  const pathname = usePathname();
  return (
    <div className={style.registration}>
      <Link
        href={'/signIn'}
        className={`${style.signIn} ${pathname === '/signIn' ? style.active : ''} `}
      >
        {t('signin')}
      </Link>
      <Link
        href={'/signUp'}
        className={`${style.signUp} ${pathname === '/signUp' ? style.active : ''} `}
      >
        {t('signup')}
      </Link>
    </div>
  );
};
