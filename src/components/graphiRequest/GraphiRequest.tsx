import React, { useState } from 'react';
import style from '@/components/graphiRequest/GraphiRequest.module.scss';
import { useTranslations } from 'next-intl';

type GraphRequestProps = {
  handleClick: (url: string) => void;
};

export const GraphRequest: React.FC<GraphRequestProps> = ({ handleClick }) => {
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const t = useTranslations('RestClient');

  return (
    <div className={style.wrapper}>
      <button className={style.button_send} onClick={() => handleClick(currentUrl)}>
        {t('send')}
      </button>
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
