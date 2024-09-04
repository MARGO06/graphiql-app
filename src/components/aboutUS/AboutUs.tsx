import { useTranslations } from 'next-intl';
import style from './AboutUs.module.scss';

export const AboutUs = () => {
  const t = useTranslations('WelcomePage');
  return (
    <div className={style.aboutUs}>
      <span> &quot;{t('part1')}</span>
      <span>{t('part2')}</span>
      <span>{t('part3')}&quot;</span>
    </div>
  );
};
