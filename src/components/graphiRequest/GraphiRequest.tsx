import React, { useEffect } from 'react';
import { GraphRequestProps } from '@/types/graphRequest';
import style from '@/components/graphiRequest/GraphiRequest.module.scss';
import { useTranslations } from 'next-intl';

export const GraphRequest: React.FC<GraphRequestProps> = ({
  currentSdl,
  currentUrl,
  setCurrentSdl,
  setCurrentUrl,
}) => {
  const t = useTranslations('Clients');

  useEffect(() => {
    if (currentUrl) {
      setCurrentSdl(`${currentUrl}?sdl`);
    }
  }, [currentUrl, setCurrentSdl]);

  const handleSdlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSdl(e.target.value);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.sendContainer}>
        <div className={style.inputContainer}>
          <div className={style.urlInput}>
            <label htmlFor="endpoint"> URL</label>
            <input
              type="text"
              id="endpoint"
              placeholder={t('enter endpoint URL')}
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
            />
          </div>
          <div className={style.sdlInput}>
            <label htmlFor="sdl-endpoint">SDL</label>
            <input
              type="text"
              id="sdl-endpoint"
              placeholder={t('enter SDL endpoint URL')}
              value={currentSdl}
              onChange={() => handleSdlChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
