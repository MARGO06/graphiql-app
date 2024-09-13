import React, { useEffect, useRef } from 'react';
import { GraphRequestProps } from '@/types/graphRequest';
import style from '@/components/graphiRequest/GraphiRequest.module.scss';
import { useTranslations } from 'next-intl';
import { updateUrl } from '@/utils/updateURL';
import { updateSdlUrl } from '@/utils/sdlUrl';

export const GraphRequest: React.FC<GraphRequestProps> = ({
  currentSdl,
  currentUrl,
  setCurrentSdl,
  setCurrentUrl,
}) => {
  const t = useTranslations('Clients');

  const previousSdlRef = useRef(currentSdl);
  const previousURLRef = useRef(currentUrl);

  const handleUrlBlur = () => {
    if (currentUrl !== previousURLRef.current) {
      setCurrentUrl(currentUrl);
      const newUrl = updateSdlUrl(currentSdl, currentUrl);
      updateUrl(newUrl);
    }
  };

  const handleSdlBlur = () => {
    if (currentSdl !== previousSdlRef.current) {
      setCurrentSdl(currentSdl);
      const newUrl = updateSdlUrl(currentSdl, currentUrl);
      updateUrl(newUrl);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newURL = e.target.value;
    setCurrentUrl(newURL);
    if (!newURL.includes('graphiql')) {
      setCurrentSdl(`${newURL}?sdl`);
    } else {
      setCurrentSdl(currentSdl);
    }
  };

  const handleSdlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSdl(e.target.value);
  };

  useEffect(() => {
    setCurrentUrl(currentUrl);
    setCurrentSdl(currentSdl);
  }, [currentUrl, currentSdl, setCurrentSdl, setCurrentUrl]);

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
              onChange={handleUrlChange}
              onBlur={handleUrlBlur}
            />
          </div>
          <div className={style.sdlInput}>
            <label htmlFor="sdl-endpoint">SDL</label>
            <input
              type="text"
              id="sdl-endpoint"
              placeholder={t('enter SDL endpoint URL')}
              value={currentSdl}
              onChange={handleSdlChange}
              onBlur={handleSdlBlur}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
