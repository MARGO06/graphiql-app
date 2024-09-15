'use client';
import React, { useState, useEffect } from 'react';
import { GraphRequest } from '@/components/graphiRequest/GraphiRequest';
import { useTranslations } from 'next-intl';
import style from '@/components/graphClient/GraphClient.module.scss';
import { Documentation } from '@/components/documentation/Documentation';
import { Schema } from '@/types/graphQLSchema';
import { usePathname } from 'next/navigation';
import { handleGetDocumentation } from '@/utils/getDocumentation';
import { handleGetData } from '@/utils/getDataGraphiQl';
import { saveToHistory } from '@/services/saveToHistory';
import { decodeUrlFromBase64 } from '@/utils/fromBase64';
import { getURL } from '@/utils/getURL';
import { ResponseGraph, ResponseInfoGraph } from '@/components/graphiResponse/GraphiResponse';

export const GraphClient: React.FC = () => {
  const [responseInfo, setResponseInfo] = useState<ResponseInfoGraph | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [currentSdl, setCurrentSdl] = useState<string>('');
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showSchemaButton, setShowSchemaButton] = useState(false);
  const [documentation, setDocumentation] = useState<Schema | null>(null);
  const [visible, setVisible] = useState(false);
  const t = useTranslations('Clients');
  const pathname = usePathname();

  const fullUrl = `${pathname}`;
  const partUrl = fullUrl.split('/').splice(2).join('');
  const url = pathname.split('/')[2];

  useEffect(() => {
    if (url) {
      const { sdlParam, urlNew } = getURL(url);
      setCurrentUrl(urlNew);
      if (sdlParam) {
        const sdl = decodeUrlFromBase64(sdlParam);
        setCurrentSdl(urlNew + sdl);
      }
    }
  }, [url]);

  const fetchSchema = async () => {
    try {
      if (!currentUrl || !currentSdl) {
        throw new Error(t('url and sdl are required'));
      }
      const types = await handleGetDocumentation(currentUrl, currentSdl.slice(currentUrl.length));
      if (types) {
        setShowSchemaButton(true);
        setDocumentation(types);
        setError(null);
        saveToHistory('graphiql', currentSdl, partUrl);
      }
    } catch (error) {
      const err = error as { status: number; message: string };
      setError(err.message || t('failed to fetch documentation'));
      saveToHistory('graphiql', currentSdl, partUrl);
    }
  };

  const fetchQuery = async () => {
    try {
      if (!currentUrl || !currentQuery) {
        throw new Error(t('url and query are required'));
      }
      const data = await handleGetData(currentUrl, currentQuery);
      setResponseInfo(data);

      //saveToHistory('graphiql', currentSdl, partUrl);
    } catch (error) {
      const err = error as { status: number; message: string };
      setResponseInfo({
        status: err.status,
        data: 'Error',
      });
    }
  };

  const handleShowDocumentation = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.headerContainer}>
          <h1>GraphiQl</h1>
        </div>
        <div className={style.buttons}>
          <button className={style.buttonSchema} onClick={fetchSchema}>
            {t('get documentation')}
          </button>
          <button className={style.button_send} onClick={fetchQuery}>
            {t('get data')}
          </button>
          {showSchemaButton && !error ? (
            <button className={style.button_send} onClick={handleShowDocumentation}>
              {visible ? t('hidden documentation') : t('show documentation')}
            </button>
          ) : (
            error && <p className={style.error}>Error: {error}</p>
          )}
        </div>
        <div className={style.graphContainer}>
          <GraphRequest
            currentUrl={currentUrl}
            currentSdl={currentSdl}
            setCurrentUrl={setCurrentUrl}
            setCurrentSdl={setCurrentSdl}
            currentQuery={currentQuery}
            setCurrentQuery={setCurrentQuery}
          />
          <div className={style.response}>
            {responseInfo && <ResponseGraph responseInfo={responseInfo} />}
          </div>
          {documentation && visible && !error && <Documentation data={documentation} />}
        </div>
      </div>
    </div>
  );
};
