'use client';
import React, { useState } from 'react';
import style from '@/components/header/Header.module.scss';
import Link from 'next/link';
import { Languages } from '@/components/language/Languages';
import { Registration } from '@/components/registration/Registration';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useTranslations } from 'next-intl';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const t = useTranslations('Header');
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={style.header}>
      <nav className={style.navigation}>
        <Link
          href={'/'}
          onClick={closeMenu}
          className={`${style.logo} ${pathname === '/' ? style.active : ''}`}
        >
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
            <button className={style.signOut} onClick={handleLogout}>
              SING OUT
            </button>
          ) : (
            <Registration closeMenu={closeMenu} />
          )}
          <Languages />
        </div>
      </nav>
    </header>
  );
};
