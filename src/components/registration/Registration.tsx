'use client';
import React from 'react';
import Link from 'next/link';
import style from './Registration.module.scss';
import { usePathname } from 'next/navigation';

export const Registration: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className={style.registration}>
      <Link
        href={'/singIn'}
        className={`${style.signIn} ${pathname === '/singIn' ? style.active : ''} `}
      >
        Sign In
      </Link>
      <Link
        href={'/singUp'}
        className={`${style.signUp} ${pathname === '/singUp' ? style.active : ''} `}
      >
        Sign Up
      </Link>
    </div>
  );
};
