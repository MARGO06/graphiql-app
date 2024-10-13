import React, { useEffect, useRef, useState } from 'react';
import { GraphRequestProps } from '@/types/graphRequest';
import style from '@/components/graphiRequest/GraphiRequest.module.scss';
import { useTranslations } from 'next-intl';
import { updateUrl, updateSdlUrl } from '@/utils/getURL';

export const GraphRequest: React.FC<GraphRequestProps> = ({
  currentSdl,
  currentUrl,
  currentQuery,
  currentVariables,
  setCurrentSdl,
  setCurrentUrl,
  setCurrentQuery,
  setCurrentVariables,
}) => {
  const t = useTranslations('Clients');
  const [variables, setVariables] = useState(false);

  const toggleVariables = () => {
    setVariables((value) => !value);
  };

  const previousSdlRef = useRef(currentSdl);
  const previousURLRef = useRef(currentUrl);
  const previousQueryRef = useRef(currentQuery);
  const previousVariableRef = useRef(currentVariables);

  const resetUrl = () => {
    if (currentUrl === '' && currentSdl === '' && currentQuery === '' && currentVariables === '') {
      setCurrentUrl('');
      setCurrentSdl('');
      setCurrentQuery('');
      setCurrentVariables('');
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

  const handleQueryBlur = () => {
    if (currentQuery !== previousQueryRef.current) {
      if (currentQuery !== previousQueryRef.current && currentSdl !== '') {
        setCurrentQuery(currentQuery);
        const newUrl = updateSdlUrl(currentSdl, currentUrl, currentQuery);
        updateUrl(newUrl);
      }
    }
    resetUrl();
  };

  const handleVariableBlur = () => {
    if (currentVariables !== previousVariableRef.current) {
      if (currentVariables !== previousVariableRef.current && currentSdl !== '') {
        setCurrentVariables(currentVariables);
        const newUrl = updateSdlUrl(currentSdl, currentUrl, currentQuery, currentVariables);
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

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newQuery = e.target.value;
    setCurrentQuery(newQuery);
  };

  const handleVariableChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVariables = e.target.value;
    setCurrentVariables(newVariables);
  };

  useEffect(() => {
    setCurrentUrl(currentUrl);
    setCurrentSdl(currentSdl);
    setCurrentQuery(currentQuery);
    setCurrentVariables(currentVariables);
  }, [
    currentUrl,
    currentSdl,
    setCurrentSdl,
    setCurrentUrl,
    setCurrentQuery,
    currentQuery,
    currentVariables,
    setCurrentVariables,
  ]);

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
          <button onClick={toggleVariables}>Variables</button>
          {variables && (
            <div className={style.editorContainer}>
              <label htmlFor="queryEditor" />
              <textarea
                className={style.queryEditor}
                id="queryEditor"
                rows={10}
                value={currentVariables}
                onChange={handleVariableChange}
                onBlur={handleVariableBlur}
              />
            </div>
          )}
          <div className={style.editorContainer}>
            <label htmlFor="queryEditor">Query</label>
            <textarea
              className={style.queryEditor}
              id="queryEditor"
              rows={10}
              placeholder={'{countries{name, code}}'}
              value={currentQuery}
              onChange={handleQueryChange}
              onBlur={handleQueryBlur}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
