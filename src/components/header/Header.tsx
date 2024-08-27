'use client';
import React, { useState } from 'react';
import style from '@/components/header/Header.module.scss';
import Link from 'next/link';
import { Languages } from '@/components/language/Languages';
import { Registration } from '@/components/registration/Registration';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Image from 'next/image';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = useSelector((state: RootState) => state.token.token);
  // eslint-disable-next-line no-console
  console.log(token);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={style.header}>
      <nav className={style.navigation}>
        <Link href={'/'} className={`${style.logo} ${pathname === '/' ? style.active : ''}`}>
          <Image
            src="/APIQuest-logo.png"
            alt="logo"
            width={60}
            height={60}
            quality={100}
            priority
          />
        </Link>
        <div className={style.burger} onClick={toggleMenu}>
          <span className={isMenuOpen ? style.burgerOpen : ''}></span>
          <span className={isMenuOpen ? style.burgerOpen : ''}></span>
          <span className={isMenuOpen ? style.burgerOpen : ''}></span>
        </div>
        <div className={`${style.menu} ${isMenuOpen ? style.menuOpen : ''}`}>
          {token ? (
            <Link href={'/'} className={style.signOut}>
              SING OUT
            </Link>
          ) : (
            <Registration />
          )}
          <Languages />
        </div>
      </nav>
    </header>
  );
};
