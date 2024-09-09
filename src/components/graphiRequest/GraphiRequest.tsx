import React, { useState, useEffect } from 'react';
import style from '@/components/graphiRequest/GraphiRequest.module.scss';
import { useTranslations } from 'next-intl';

/* type GraphRequestProps = {
  handleClick: (url: string) => void;
};
*/
export const GraphRequest: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [currentSDL, setCurrentSDL] = useState<string>('');
  const t = useTranslations('Clients');

  useEffect(() => {
    if (currentUrl) {
      setCurrentSDL(`${currentUrl}?sdl`);
    }
  }, [currentUrl]);

  const handleSdlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSDL(e.target.value);
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
              value={currentSDL}
              onChange={() => handleSdlChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
