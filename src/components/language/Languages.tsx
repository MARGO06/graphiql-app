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

      <button type="button" className={style.buttonWrap} onClick={toggleLanguage}>
        <p className={style.languageName}>{language === 'ENG' ? 'ENG' : 'ESP'}</p>
      </button>
    </div>
  );
};
