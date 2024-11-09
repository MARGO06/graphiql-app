import React, { useEffect, useRef, useState } from 'react';
import { GraphRequestProps } from '@/types/graphRequest';
import style from '@/components/graphiRequest/GraphiRequest.module.scss';
import { useTranslations } from 'next-intl';
import { updateUrl, updateSdlUrl } from '@/utils/getURL';
import { Header } from '@/types/graphRequest';
import Image from 'next/image';
import remove from 'public/remove.png';
import add from 'public/add.png';
import styles from 'src/components/editor/keyValue/KeyValue.module.scss';
import stylesEditor from 'src/components/editor/Editor.module.scss';

export const GraphRequest: React.FC<GraphRequestProps> = ({
  currentSdl,
  currentUrl,
  currentQuery,
  currentVariables,
  headers,
  setCurrentSdl,
  setCurrentUrl,
  setCurrentQuery,
  setCurrentVariables,
  setHeaders,
}) => {
  const t = useTranslations('Clients');
  const [variables, setVariables] = useState(false);
  const [headersContainer, setHeadersContainer] = useState(false);
  const [nextId, setNextId] = useState(1);

  const toggleVariables = () => {
    setVariables((value) => !value);
  };

  const toggleHeaders = () => {
    if (!headersContainer) {
      if (
        headers.length === 0 ||
        (headers.length === 1 && headers[0].key === '' && headers[0].value === '')
      ) {
        setHeaders([{ key: '', value: '', id: String(nextId) }]);
        setNextId((prevId) => prevId + 1);
      }
    }
    setHeadersContainer((value) => !value);
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

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newKey = e.target.value;
    setHeaders((prevHeaders) =>
      prevHeaders.map((header) => (header.id === id ? { ...header, key: newKey } : header)),
    );
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newValue = e.target.value;
    setHeaders((prevHeaders) =>
      prevHeaders.map((header) => (header.id === id ? { ...header, value: newValue } : header)),
    );
  };

  const updateUrlWithHeaders = (headers: Header[]) => {
    const headersString = headers
      .filter((header) => header.key && header.value)
      .map((header) => `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`)
      .join('&');

    const newUrl = updateSdlUrl(
      currentSdl,
      currentUrl,
      currentQuery,
      currentVariables,
      headersString,
    );
    updateUrl(newUrl);
  };

  const handleKeyBlur = () => {
    updateUrlWithHeaders(headers);
  };

  const handleValueBlur = () => {
    updateUrlWithHeaders(headers);
  };

  const handleAddHeader = () => {
    setHeaders((prevHeaders) => [...prevHeaders, { key: '', value: '', id: String(nextId) }]);
    setNextId((prevId) => prevId + 1);
  };

  const handleRemoveHeader = (id: string) => {
    const updatedHeaders = headers.filter((header) => header.id !== String(id));
    if (updatedHeaders.length === 0) {
      setHeadersContainer(false);
    }
    setHeaders(updatedHeaders);
  };

  useEffect(() => {
    setCurrentUrl(currentUrl);
    setCurrentSdl(currentSdl);
    setCurrentQuery(currentQuery);
    setCurrentVariables(currentVariables);
    setHeaders(headers);
  }, [
    currentUrl,
    currentSdl,
    setCurrentSdl,
    setCurrentUrl,
    setCurrentQuery,
    currentQuery,
    currentVariables,
    setCurrentVariables,
    headers,
    setHeaders,
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
          <button onClick={toggleHeaders}>Headers</button>
          {headersContainer && (
            <div>
              {headers.map((header) => (
                <div className={styles.container} key={header.id}>
                  <label>
                    <input
                      type="text"
                      value={header.key}
                      onChange={(e) => handleKeyChange(e, header.id)}
                      placeholder="key"
                      onBlur={handleKeyBlur}
                    />
                  </label>
                  <label>
                    <input
                      type="text"
                      value={header.value}
                      onChange={(e) => handleValueChange(e, header.id)}
                      placeholder="value"
                      onBlur={handleValueBlur}
                    />
                  </label>
                  <div className={style.imgContainer}>
                    <Image
                      src={remove}
                      alt="remove"
                      className={stylesEditor.img}
                      onClick={() => handleRemoveHeader(header.id)}
                    />
                    <Image
                      src={add}
                      alt="add"
                      className={stylesEditor.img}
                      onClick={handleAddHeader}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
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
