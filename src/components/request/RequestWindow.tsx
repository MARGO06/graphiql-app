import React from 'react';
import style from './RequestWindow.module.scss';
import { ErrorMessage } from '../errorMessage/ErrorMessage';

interface RequestWindowProps {
  currentBody: string;
  setBody: (body: string) => void;
  updateUrlWithoutRedirect: () => void;
  contentType: string;
  setContentType: (contentType: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const RequestWindow: React.FC<RequestWindowProps> = ({
  currentBody,
  setBody,
  updateUrlWithoutRedirect,
  contentType,
  setContentType,
  error,
  setError,
}) => {
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
      </div>

      <div className={style.editorContainer}>
        <label htmlFor="requestBody"></label>
        <textarea
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
