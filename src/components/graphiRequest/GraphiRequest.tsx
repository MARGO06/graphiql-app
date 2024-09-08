import React, { useState } from 'react';
import style from '@/components/graphiRequest/GraphiRequest.module.scss';
import { useTranslations } from 'next-intl';

export const GraphRequest: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState<string | undefined>(undefined);
  const t = useTranslations('RestClient');
  return (
    <div className={style.wrapper}>
      <button className={style.button_send}>{t('send')}</button>
      <div className={style.sendContainer}>
        <div className={style.inputContainer}>
          <label htmlFor="endpoint"></label>
          <input
            type="text"
            id="endpoint"
            placeholder={t('enter endpoint URL')}
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
          />
        </div>
      </div>
      <div className={style.graphContainer}></div>
    </div>
  );
};
