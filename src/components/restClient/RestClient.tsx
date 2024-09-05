'use client';

import { useState } from 'react';
import style from './RestClient.module.scss';
import { ResponseWindow } from '../response/ResponseWindow';
import { fetchData } from '../../services/fetchData';
import { useTranslations } from 'next-intl';
import { RequestWindow } from '../request/RequestWindow';

export interface ResponseInfo {
  status: number | string;
  statusText: string;
  contentType: string | null;
  data: unknown;
}

export default function RestClient() {
  const [method, setMethod] = useState('GET');
  const [currentUrl, setCurrentUrl] = useState('https://swapi.dev/api/people/');
  const [responseInfo, setResponseInfo] = useState<ResponseInfo | null>(null);

  const t = useTranslations('RestClient');

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(e.target.value);
  };

  const handleClick = () => {
    fetchData(currentUrl, method, setResponseInfo);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.headerContainer}>
          <h1>{t('restfull client')}</h1>
        </div>

        <div className={style.sendContainer}>
          <div className={style.inputContainer}>
            <label htmlFor="endpoint"></label>
            <input
              type="text"
              id="endpoint"
              placeholder="Enter endpoint URL"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
            />
          </div>
          <div className={style.selectContainer}>
            <label htmlFor="method"></label>
            <select id="method" value={method} onChange={onChange}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="OPTIONS">OPTIONS</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="HEAD">HEAD</option>
            </select>
          </div>
          <button onClick={handleClick}>{t('send')}</button>
        </div>
        <button>{t('add header')}</button>

        <RequestWindow />
      </div>

      {responseInfo && <ResponseWindow responseInfo={responseInfo} />}
    </div>
  );
}
