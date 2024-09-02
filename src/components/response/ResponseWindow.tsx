import JSONPretty from 'react-json-pretty';
import style from './ResponseWindow.module.scss';

export interface IResponse {
  responseInfo: ResponseInfo;
}

export interface ResponseInfo {
  status: number | string;
  statusText: string;
  contentType: string | null;
  data: unknown;
}

export const ResponseWindow: React.FC<IResponse> = ({ responseInfo }) => {
  const statusClass = responseInfo.status === 200 ? style.statusSuccess : style.statusError;

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
      <h2>Response Info</h2>
      <p>
        <strong>Status:</strong>{' '}
        <span className={statusClass}>
          {responseInfo.status} {responseInfo.statusText}
        </span>
      </p>
      <p>
        <strong>Content-Type:</strong> {responseInfo.contentType}
      </p>
      <pre className={style.pre}>
        <strong>Data:</strong>
        {renderData()}
      </pre>
    </div>
  );
};
