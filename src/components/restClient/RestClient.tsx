'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import style from './RestClient.module.scss';
import { ResponseWindow } from '../response/ResponseWindow';
import { fetchData } from '../../services/fetchData';
import { useTranslations } from 'next-intl';
import { RequestWindow } from '../request/RequestWindow';
import { getUrl } from '@/services/createUrl';
import { Editor } from '../editor/Editor';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { replaceVariables } from '@/services/replaceVariables';
import { convertQueryParamsToHeaders } from '@/utils/convertQueryParamsToHeaders';
import { getQueryStringFromHeaders } from '@/utils/getQueryStringFromHeaders';
import { formatJson } from '@/utils/formatJson';

export interface ResponseInfo {
  status: number | string;
  statusText: string;
  contentType: string | null;
  data: unknown;
}

interface RestClientProps {
  method?: string;
  currentURL?: string;
  currentBody?: string;
  queryParams?: Record<string, string>;
}

export default function RestClient({
  method,
  currentURL,
  currentBody,
  queryParams,
}: RestClientProps) {
  const [selectMethod, setSelectMethod] = useState(method);
  const [initialMethod, setInitialMethod] = useState(method);
  const [responseInfo, setResponseInfo] = useState<ResponseInfo | null>(null);
  const [body, setBody] = useState(currentBody);
  const [nextId, setNextId] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const [headers, setHeaders] = useState<{ key: string; value: string; id: string }[]>(
    convertQueryParamsToHeaders(queryParams),
  );
  const [variables, setVariables] = useState<{ key: string; value: string; id: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState(currentURL);
  const [isHeaderUpdated, setIsHeaderUpdated] = useState(false);
  const [contentType, setContentType] = useState('application/json');

  useEffect(() => {
    if (method && initialMethod !== method) {
      setSelectMethod(method);
      setInitialMethod(method);
    }
  }, [method, initialMethod]);

  const t = useTranslations('Clients');

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectMethod(e.target.value);
  };

  const sendOneTime = useRef(false);

  useEffect(() => {
    if (!sendOneTime.current && currentURL && initialMethod) {
      fetchData(currentURL, initialMethod, setResponseInfo, currentBody, setError, headers);

      sendOneTime.current = true;
    }
  }, [currentURL, initialMethod, currentBody, headers]);

  const handleClick = async () => {
    const updatedBody = replaceVariables(body ?? '', variables);

    if (inputValue && initialMethod) {
      const isFormatSuccessful = formatJson(body, selectMethod, setBody, setError, t, contentType);

      if (isFormatSuccessful) {
        const isSend = true;
        const updatedUrl = inputRef.current?.value || '';
        const headerParams = getQueryStringFromHeaders(headers);
        getUrl(selectMethod ?? '', updatedUrl, updatedBody, headerParams, isSend);

        fetchData(
          inputValue ?? '',
          selectMethod ?? 'GET',
          setResponseInfo,
          updatedBody,
          setError,
          headers,
        );
      }
    } else {
      setError(t('url empty'));
    }
  };

  const handleApiClick = (apiUrl: string) => {
    setInputValue(apiUrl);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyValueChange = (
    key: string,
    value: string,
    id: string,
    type: 'header' | 'variable',
  ) => {
    if (type === 'header') {
      setHeaders((prevHeaders) =>
        prevHeaders.map((header) =>
          header.id === String(id) ? { ...header, key, value } : header,
        ),
      );
    } else if (type === 'variable') {
      setVariables((prevVariables) =>
        prevVariables.map((variable) =>
          variable.id === String(id) ? { ...variable, key, value } : variable,
        ),
      );
    }
  };

  const handleAddHeader = () => {
    setHeaders((prevHeaders) => [...prevHeaders, { key: '', value: '', id: String(nextId) }]);
    setNextId((prevId) => prevId + 1);
  };

  const handleRemoveHeader = (id: string) => {
    const updatedHeaders = headers.filter((header) => header.id !== String(id));
    setHeaders(updatedHeaders);
    setIsHeaderUpdated(true);
  };

  const handleAddVariable = () => {
    setVariables((prevVariables) => [...prevVariables, { key: '', value: '', id: String(nextId) }]);
    setNextId((prevId) => prevId + 1);
  };

  const handleRemoveVariable = (id: string) => {
    setVariables((prevVariables) => prevVariables.filter((variable) => variable.id !== String(id)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const updateUrlWithoutRedirect = useCallback(() => {
    const isSend = false;
    const updatedBody = replaceVariables(body ?? '', variables);
    const headerParams = getQueryStringFromHeaders(headers);
    const createUrl = getUrl(
      selectMethod ?? 'GET',
      inputValue ?? '',
      updatedBody,
      headerParams,
      isSend,
    );

    window.history.replaceState(null, '', createUrl);
  }, [body, headers, inputValue, selectMethod, variables]);

  useEffect(() => {
    if (isHeaderUpdated) {
      updateUrlWithoutRedirect();
      setIsHeaderUpdated(false);
    }
  }, [headers, isHeaderUpdated, updateUrlWithoutRedirect]);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.headerContainer}>
          <h1>{t('restfull client')}</h1>
          <div className={style.apiContainer}>
            <h4>API:</h4>
            <span onClick={() => handleApiClick('https://jsonplaceholder.typicode.com/posts')}>
              JSONPLACEHOLDER
            </span>
            <span onClick={() => handleApiClick('https://swapi.dev/api/')}>SWAPI</span>
            <span onClick={() => handleApiClick('https://pokeapi.co/api/v2')}>POKEAPI</span>
          </div>
        </div>

        <div className={style.sendContainer}>
          <div className={style.inputContainer}>
            <label htmlFor="endpoint"></label>
            <input
              type="text"
              id="endpoint"
              placeholder={t('enter endpoint URL')}
              value={inputValue}
              ref={inputRef}
              onChange={handleChange}
              onBlur={updateUrlWithoutRedirect}
            />
          </div>
          <div className={style.selectContainer}>
            <label htmlFor="method"></label>
            <select
              id="method"
              value={selectMethod}
              onChange={onChange}
              onBlur={updateUrlWithoutRedirect}
            >
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

        <Editor
          headers={headers}
          handleAddHeader={handleAddHeader}
          handleKeyValueChange={(key, value, id) => handleKeyValueChange(key, value, id, 'header')}
          handleRemoveHeader={handleRemoveHeader}
          placeholder={t('header')}
          updateUrlWithoutRedirect={updateUrlWithoutRedirect}
        />

        <Editor
          headers={variables}
          handleAddHeader={handleAddVariable}
          handleKeyValueChange={(key, value, id) =>
            handleKeyValueChange(key, value, id, 'variable')
          }
          handleRemoveHeader={handleRemoveVariable}
          placeholder={t('variable')}
          updateUrlWithoutRedirect={updateUrlWithoutRedirect}
        />

        <RequestWindow
          currentBody={body ?? ''}
          setBody={setBody}
          updateUrlWithoutRedirect={updateUrlWithoutRedirect}
          contentType={contentType}
          setContentType={setContentType}
          error={error}
          setError={setError}
        />
      </div>

      {responseInfo && <ResponseWindow responseInfo={responseInfo} />}
      {error && <ErrorMessage message={error} errorReset={() => setError(null)} />}
    </div>
  );
}
