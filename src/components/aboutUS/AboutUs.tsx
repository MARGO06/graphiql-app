import { useTranslations } from 'next-intl';
import style from './AboutUs.module.scss';

export const AboutUs = () => {
  const t = useTranslations('WelcomePage');
  return (
    <div className={style.aboutUs}>
      <span> &quot;{t('frontend team')}</span>
      <span>{t('scrum process')}</span>
      <span>{t('team collaboration')}&quot;</span>
    </div>
  );
};
