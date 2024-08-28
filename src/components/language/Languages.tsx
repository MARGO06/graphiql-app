import React, { startTransition } from 'react';
import style from '@/components/language/Language.module.scss';
import { Locale } from '@/config';
import { setUserLocale } from '@/services/locale';
import { useRouter } from 'next/navigation';

export const Languages: React.FC = () => {
  const router = useRouter();

  const toggleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.currentTarget.value as Locale;

    startTransition(() => {
      setUserLocale(locale);
      // TODO delete redirect, it's just for test
      router.push('/main');
    });
  };

  return (
    <div className={style.language}>
      <select onChange={toggleLanguage} className={style.selectWrap}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
};
