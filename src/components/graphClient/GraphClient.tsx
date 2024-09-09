'use client';
import React, { useState } from 'react';
import { ResponseWindow } from '@/components/response/ResponseWindow';
import { ResponseInfo } from '@/components/restClient/RestClient';
import { GraphRequest } from '@/components/graphiRequest/GraphiRequest';
import { useTranslations } from 'next-intl';
import style from '@/components/graphClient/GraphClient.module.scss';

export const GraphClient: React.FC = () => {
  const [responseInfo /*, setResponseInfo*/] = useState<ResponseInfo | null>(null);
  const t = useTranslations('Clients');

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.headerContainer}>
          <h1>GraphQl</h1>
        </div>
        <div className={style.buttons}>
          <button className={style.buttonSchema}>{t('get documentation')}</button>
          <button className={style.button_send}>{t('get data')}</button>
        </div>
        <div className={style.graphContainer}>
          <GraphRequest />
          <div className={style.response}>
            {responseInfo && <ResponseWindow responseInfo={responseInfo} />}
          </div>
        </div>
      </div>
    </div>
  );
};
