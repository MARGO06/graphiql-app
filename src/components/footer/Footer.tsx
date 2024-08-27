import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import style from '@/components/footer/Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footerContainer}>
        <div className={style.gitHub}>
          <Link href="https://github.com/MARGO06" className={style.gitHubWhite} target="_blank">
            <Image src="/github-mark-white.png" alt="logo" width={32} height={32} quality={100} />
          </Link>
          <Link href="https://github.com/comtvset" className={style.gitHubOrange} target="_blank">
            <Image src="/github-mark-orange.png" alt="logo" width={32} height={32} quality={100} />
          </Link>
          <Link
            href="https://github.com/maria-akulova"
            className={style.gitHubBlue}
            target="_blank"
          >
            <Image src="/github-mark-blue.png" alt="logo" width={32} height={32} quality={100} />
          </Link>
        </div>

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
