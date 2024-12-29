import style from '@/components/header/language/Language.module.scss';
import React, { startTransition, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { setUserLocale } from '@/services/locale';
import { Locale } from '@/config';

export const Languages: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const toggleLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.currentTarget.value as Locale;

    startTransition(() => {
      setUserLocale(newLanguage);
    });
    setSelectedLanguage(newLanguage);
    Cookies.set('NEXT_LOCALE', newLanguage);
  };

  useEffect(() => {
    const savedLanguage = Cookies.get('NEXT_LOCALE');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  return (
    <div className={style.language}>
      <select
        value={selectedLanguage}
        onChange={toggleLanguage}
        className={style.selectWrap}
        id="languageselect"
      >
        <option value="en" data-testid="en-option">
          English
        </option>
        <option value="es" data-testid="es-option">
          Español
        </option>
        <option value="pl" data-testid="pl-option">
          Polish
        </option>
        <option value="fr" data-testid="fr-option">
          French
        </option>
        <option value="it" data-testid="it-option">
          Italian
        </option>
      </select>
    </div>
  );
};
