'use client';
import React, { useState } from 'react';
import { ResponseWindow } from '@/components/response/ResponseWindow';
import { ResponseInfo } from '@/components/restClient/RestClient';
import { GraphRequest } from '@/components/graphiRequest/GraphiRequest';
import { useTranslations } from 'next-intl';
import style from '@/components/graphClient/GraphClient.module.scss';
import { Documentation } from '@/components/documentation/Documentation';
import { Schema } from '@/types/graphQLSchema';
import { handleGetDocumentation } from '@/utils/getDocumentation';

export const GraphClient: React.FC = () => {
  const [responseInfo /*, setResponseInfo*/] = useState<ResponseInfo | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [currentSdl, setCurrentSdl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showSchemaButton, setShowSchemaButton] = useState(false);
  const [documentation, setDocumentation] = useState<Schema | null>(null);
  const [visible, setVisible] = useState(false);
  const t = useTranslations('Clients');

  const fetchSchema = async () => {
    try {
      if (!currentUrl || !currentSdl) {
        throw new Error('URL and SDL are required');
      }
      const types = await handleGetDocumentation(currentUrl, currentSdl.slice(currentUrl.length));
      if (types) {
        setShowSchemaButton(true);
        setDocumentation(types);
        setError(null);
      }
    } catch (error) {
      const err = error as { status: number; message: string };
      setError(err.message || 'Failed to fetch documentation');
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
          <button className={style.button_send}>{t('get data')}</button>
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
          />
          <div className={style.response}>
            {responseInfo && <ResponseWindow responseInfo={responseInfo} />}
          </div>
          {documentation && visible && !error && <Documentation data={documentation} />}
        </div>
      </div>
    </div>
  );
};
