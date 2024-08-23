'use client';
import React from 'react';
import style from './Header.module.scss';
import Link from 'next/link';
import { Languages } from '../language/Languages';
import { Registration } from '../registration/Registration';
import { usePathname } from 'next/navigation';

export const Header: React.FC = () => {
  const pathname = usePathname();
  return (
    <header className={style.header}>
      <nav className={style.navigation}>
        <Link href={'/'} className={`${style.logo} ${pathname === '/' ? style.active : ''}`}>
          APIQuest
        </Link>
        <Registration />
      </nav>
      <Languages />
    </header>
  );
};
