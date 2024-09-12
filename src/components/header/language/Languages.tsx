import React, { startTransition } from 'react';
import style from '@/components/header/language/Language.module.scss';
import { Locale } from '@/config';
import { setUserLocale } from '@/services/locale';

export const Languages: React.FC = () => {
  const toggleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.currentTarget.value as Locale;

    startTransition(() => {
      setUserLocale(locale);
    });
  };

  return (
    <div className={style.language}>
      <select onChange={toggleLanguage} className={style.selectWrap} id="languageselect">
        <option value="en" data-testid="en-option">
          English
        </option>
        <option value="es" data-testid="es-option">
          Español
        </option>
      </select>
    </div>
  );
};
