'use client';
import React, { useState } from 'react';
import style from '@/components/language/Language.module.scss';
import Image from 'next/image';

export const Languages: React.FC = () => {
  const [language, setLanguage] = useState<'ENG' | 'ESP'>('ENG');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'ENG' ? 'ESP' : 'ENG'));
  };

  return (
    <div className={style.language}>
      <Image
        src={language === 'ENG' ? '/England.png' : '/Spain.png'}
        alt="flag"
        className={style.languageFlag}
        width={24}
        height={24}
        priority
      />
      <p className={style.languageName}>{language === 'ENG' ? 'ENG' : 'ESP'}</p>
      <button type="button" className={style.buttonArrow} onClick={toggleLanguage}>
        <Image
          src="/arrow.png"
          alt="toggle language"
          className={style.languageArrow}
          width={32}
          height={32}
          priority
        />
      </button>
    </div>
  );
};
