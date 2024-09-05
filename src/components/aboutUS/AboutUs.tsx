import { useTranslations } from 'next-intl';
import style from './AboutUs.module.scss';

export const AboutUs = () => {
  const t = useTranslations('WelcomePage');
  return (
    <div className={style.aboutUs}>
      <span>
        &quot;{t('frontend team')}
        <br />
        <br />
        {t('scrum process')}
        <br />
        <br />
        {t('team collaboration')}&quot;
      </span>
    </div>
  );
};
