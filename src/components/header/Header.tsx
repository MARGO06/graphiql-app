'use client';
import React, { useState, useEffect } from 'react';
import style from '@/components/header/Header.module.scss';
import Link from 'next/link';
import { Languages } from '@/components/language/Languages';
import { Registration } from '@/components/registration/Registration';
import { usePathname, useRouter } from 'next/navigation';
import { removeTokenFromCookie, getTokenFromCookie } from '@/services/token';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import Image from 'next/image';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const token = getTokenFromCookie();

  const updateHasToken = () => {
    const token = getTokenFromCookie();
    setHasToken(!!token);
  };

  useEffect(() => {
    updateHasToken();
  }, [token]);

  const logout = async () => {
    signOut(auth).then(() => {
      removeTokenFromCookie();
      setHasToken(false);
      router.replace('/');
      window.location.reload(); //TODO: Find a good solution!
    });
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
          {hasToken ? (
            <button className={style.signOut} onClick={logout}>
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
