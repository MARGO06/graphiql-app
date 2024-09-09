'use client';
import React, { useState } from 'react';
import { ResponseWindow } from '@/components/response/ResponseWindow';
import { ResponseInfo } from '@/components/restClient/RestClient';
import { GraphRequest } from '@/components/graphiRequest/GraphiRequest';
import { useTranslations } from 'next-intl';
import style from '@/components/graphClient/GraphClient.module.scss';
import { Documentation } from '../documentation/Documentation';

export const GraphClient: React.FC = () => {
  const [responseInfo /*, setResponseInfo*/] = useState<ResponseInfo | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [currentSdl, setCurrentSdl] = useState<string>('');
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [documentation, setDocumentation] = useState(false);
  const t = useTranslations('Clients');

  const handleGetDocumentation = async (url: string, schema: string) => {
    try {
      const response = await fetch('/api/fetchDocumentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, schema }),
      });
      const documentation = await response.json();
      if (documentation.success === true) {
        setShowDocumentation(true);
      }
      //console.log(documentation);
      return documentation;
    } catch (error) {
      //TODO
    }
  };

  const fetchSchema = () => {
    const currentSdlLength = currentUrl.length;
    handleGetDocumentation(currentUrl, currentSdl.slice(currentSdlLength));
  };

  const handleShowDocumentation = () => {
    setDocumentation(true);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.headerContainer}>
          <h1>GraphQl</h1>
        </div>
        <div className={style.buttons}>
          <button className={style.buttonSchema} onClick={fetchSchema}>
            {t('get documentation')}
          </button>
          <button className={style.button_send}>{t('get data')}</button>
          {showDocumentation && (
            <button className={style.button_send} onClick={handleShowDocumentation}>
              ShowDocumentation
            </button>
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
        </div>
      </div>
      {documentation && <Documentation />}
    </div>
  );
};
