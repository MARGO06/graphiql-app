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

  const resetUrl = () => {
    if (currentUrl === '' && currentSdl === '') {
      setCurrentUrl('');
      setCurrentSdl('');
      updateUrl('');
    }
  };

  const handleUrlBlur = () => {
    if (currentUrl !== previousURLRef.current && currentUrl !== '') {
      setCurrentUrl(currentUrl);
      const newUrl = updateSdlUrl(currentSdl, currentUrl);
      updateUrl(newUrl);
    }
    resetUrl();
  };

  const handleSdlBlur = () => {
    if (currentSdl !== previousSdlRef.current) {
      if (currentSdl !== previousSdlRef.current && currentSdl !== '') {
        setCurrentSdl(currentSdl);
        const newUrl = updateSdlUrl(currentSdl, currentUrl);
        updateUrl(newUrl);
      }
    }
    resetUrl();
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newURL = e.target.value;
    setCurrentUrl(newURL);
    if (newURL === '') {
      setCurrentSdl('');
    } else if (!newURL.includes('graphiql')) {
      setCurrentSdl(`${newURL}?sdl`);
    }
  };

  const handleSdlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSdl = e.target.value;
    setCurrentSdl(newSdl);
    if (newSdl === '') {
      setCurrentUrl('');
    }
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
