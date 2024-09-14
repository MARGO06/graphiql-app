import React, { useState } from 'react';
import Image from 'next/image';
import magicImage from 'public/magic.png';
import style from './RequestWindow.module.scss';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { useTranslations } from 'next-intl';

interface RequestWindowProps {
  currentBody: string;
  setBody: (body: string) => void;
  updateUrlWithoutRedirect: () => void;
}

export const RequestWindow: React.FC<RequestWindowProps> = ({
  currentBody,
  setBody,
  updateUrlWithoutRedirect,
}) => {
  const [contentType, setContentType] = useState('application/json');
  const [error, setError] = useState<string | null>(null);
  const [formatSuccess, setFormatSuccess] = useState(false);

  const t = useTranslations('Clients');

  const formatJson = () => {
    if (contentType === 'application/json') {
      if (currentBody.trim() === '') {
        setError(t('empty field'));
        setFormatSuccess(false);
        return;
      }

      try {
        const correctedBody = currentBody.replace(/'/g, '"');
        const parsed = JSON.parse(correctedBody);
        const formatted = JSON.stringify(parsed, null, 2);

        setBody(formatted);
        setError(null);
        setFormatSuccess(true);
        setTimeout(() => setFormatSuccess(false), 1000);
      } catch (error) {
        setError(t('syntax err'));
        setFormatSuccess(false);
      }
    }
  };

  return (
    <>
      <div className={style.bodyControl}>
        <div className={style.selectContainer}>
          <label htmlFor="contentType"></label>
          <select
            id="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="application/json">JSON (application/json)</option>
            <option value="text/plain">TEXT (text/plain)</option>
          </select>
        </div>
        {contentType === 'application/json' && (
          <div className={style.magicContainer}>
            <Image
              src={magicImage}
              alt="magic"
              className={style.magic}
              onClick={formatJson}
              title="pretty"
            />
          </div>
        )}
      </div>

      <div className={style.editorContainer}>
        <label htmlFor="requestBody"></label>
        <textarea
          className={`${error ? style.textareaError : formatSuccess ? style.textareaMagic : ''}`}
          id="requestBody"
          rows={10}
          value={currentBody}
          onChange={(e) => setBody(e.target.value)}
          onBlur={updateUrlWithoutRedirect}
        />
      </div>
      {error && <ErrorMessage message={error} errorReset={() => setError(null)} />}
    </>
  );
};
