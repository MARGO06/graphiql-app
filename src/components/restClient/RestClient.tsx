'use client';

import { useEffect, useRef, useState } from 'react';
import style from './RestClient.module.scss';
import { ResponseWindow } from '../response/ResponseWindow';
import { fetchData } from '../../services/fetchData';
import { useTranslations } from 'next-intl';
import { RequestWindow } from '../request/RequestWindow';
import { getUrl } from '@/services/createUrl';
import { useRouter } from 'next/navigation';

export interface ResponseInfo {
  status: number | string;
  statusText: string;
  contentType: string | null;
  data: unknown;
}

interface RestClientProps {
  method?: string;
  currentURL?: string;
}

export default function RestClient({ method, currentURL }: RestClientProps) {
  const [selectMethod, setSelectMethod] = useState(method);
  const [initialMethod, setInitialMethod] = useState(method);
  const [currentUrl, setCurrentUrl] = useState(currentURL);
  const inputRef = useRef<HTMLInputElement>(null);
  const [responseInfo, setResponseInfo] = useState<ResponseInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (method && initialMethod !== method) {
      setSelectMethod(method);
      setInitialMethod(method);
    }
  }, [method, initialMethod]);

  const t = useTranslations('RestClient');

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectMethod(e.target.value);
  };

  useEffect(() => {
    if (currentURL && initialMethod) {
      fetchData(currentURL, initialMethod, setResponseInfo);
    }
  }, [currentURL, initialMethod]);

  const handleClick = async () => {
    const updatedUrl = inputRef.current?.value || '';
    const createUrl = getUrl(selectMethod!, updatedUrl);
    router.push(createUrl);
  };

  const handleApiClick = (apiUrl: string) => {
    setCurrentUrl(apiUrl);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.headerContainer}>
          <h1>{t('restfull client')}</h1>
          <div className={style.apiContainer}>
            <span>API:</span>
            <a
              href="#"
              onClick={() => handleApiClick('https://jsonplaceholder.typicode.com/posts')}
              rel="noopener noreferrer"
            >
              JSONPLACEHOLDER
            </a>
            <a
              href="#"
              onClick={() => handleApiClick('https://swapi.dev/api/')}
              rel="noopener noreferrer"
            >
              SWAPI
            </a>
            <a
              href="#"
              onClick={() => handleApiClick('https://pokeapi.co/api/v2')}
              rel="noopener noreferrer"
            >
              POKEAPI
            </a>
          </div>
        </div>

        <div className={style.sendContainer}>
          <div className={style.inputContainer}>
            <label htmlFor="endpoint"></label>
            <input
              type="text"
              id="endpoint"
              placeholder="Enter endpoint URL"
              value={currentUrl || ''}
              ref={inputRef}
              onChange={(e) => setCurrentUrl(e.target.value)}
            />
          </div>
          <div className={style.selectContainer}>
            <label htmlFor="method"></label>
            <select id="method" value={selectMethod} onChange={onChange}>
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
