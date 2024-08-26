'use client';
import React from 'react';
import Link from 'next/link';
import style from '@/components/registration/Registration.module.scss';
import { usePathname } from 'next/navigation';

export const Registration: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className={style.registration}>
      <Link
        href={'/signIn'}
        className={`${style.signIn} ${pathname === '/signIn' ? style.active : ''} `}
      >
        SING IN
      </Link>
      <Link
        href={'/signUp'}
        className={`${style.signUp} ${pathname === '/signUp' ? style.active : ''} `}
      >
        SING UP
      </Link>
    </div>
  );
};
