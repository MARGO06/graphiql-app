import JSONPretty from 'react-json-pretty';
import style from './ResponseWindow.module.scss';
import { ResponseInfo } from '../restClient/RestClient';
import { useTranslations } from 'next-intl';

export interface IResponse {
  responseInfo: ResponseInfo;
}

export const ResponseWindow: React.FC<IResponse> = ({ responseInfo }) => {
  const statusClass =
    typeof responseInfo.status === 'number' &&
    responseInfo.status >= 200 &&
    responseInfo.status < 300
      ? style.statusSuccess
      : style.statusError;
  const t = useTranslations('Response');

  const renderData = () => {
    if (responseInfo.contentType && responseInfo.contentType.includes('application/json')) {
      return <JSONPretty data={responseInfo.data} />;
    } else if (responseInfo.contentType && responseInfo.contentType.includes('text/plain')) {
      const textData = String(responseInfo.data);
      return <pre>{textData}</pre>;
    } else {
      return <pre>Unsupported content type: {responseInfo.contentType}</pre>;
    }
  };

  return (
    <div className={style.responseContainer}>
      <h2>{t('response info')}</h2>
      <p>
        <strong>{t('status')}:</strong>{' '}
        <span className={statusClass}>
          {responseInfo.status} {responseInfo.statusText}
        </span>
      </p>
      <p>
        <strong>{t('content-type')}:</strong> {responseInfo.contentType}
      </p>
      <pre className={style.pre}>
        <strong>Data:</strong>
        {renderData()}
      </pre>
    </div>
  );
};
