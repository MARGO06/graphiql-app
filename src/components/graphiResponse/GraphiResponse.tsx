import style from '@/components/response/ResponseWindow.module.scss';
import { useTranslations } from 'next-intl';

export type ResponseInfoGraph = {
  status: number | string;
  statusText?: string;
  data?: unknown;
};

export type ResponseGraphProps = {
  responseInfo: ResponseInfoGraph;
};

export const ResponseGraph: React.FC<ResponseGraphProps> = ({ responseInfo }) => {
  const statusClass =
    typeof responseInfo.status === 'number' &&
    responseInfo.status >= 200 &&
    responseInfo.status < 300
      ? style.statusSuccess
      : style.statusError;
  const t = useTranslations('Response');

  const renderData = () => {
    if (typeof responseInfo.data === 'string') {
      return <pre>{responseInfo.data}</pre>;
    } else if (typeof responseInfo.data === 'object') {
      return <pre>{JSON.stringify(responseInfo.data, null, 2)}</pre>;
    }
    return <pre>Unsupported content type: {String(responseInfo.data)}</pre>;
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
      <pre className={style.pre}>
        <strong>Data:</strong>
        {renderData()}
      </pre>
    </div>
  );
};
