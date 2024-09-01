import { useTranslations } from 'next-intl';
import style from './AboutUs.module.scss';

export const AboutUs = () => {
  const t = useTranslations('WelcomePage');
  return (
    <div className={style.aboutUs}>
      <span>
        &quot;{t('part1')}
        <br />
        <br />
        {t('part2')}
        <br />
        <br />
        {t('part3')}&quot;
      </span>
    </div>
  );
};
