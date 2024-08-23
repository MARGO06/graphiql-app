import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import style from '@/components/footer/Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footerContainer}>
        <Link href="https://github.com/MARGO06" className={style.gitHub} target="_blank">
          GITHUB
        </Link>
        <p className={style.year}>2024</p>
        <Link href="https://rs.school/react/" className={style.school} target="_blank">
          <Image
            src={'/rss-logo.svg'}
            alt="flag"
            className={style.schoolLogo}
            width={32}
            height={32}
            priority
          />
        </Link>
      </div>
    </footer>
  );
};
