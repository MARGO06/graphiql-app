import { ResponseInfo } from '@/components/restClient/RestClient';

export const fetchData = async (
  url: string,
  method: string,
  setResponseInfo: (info: ResponseInfo) => void,
) => {
  try {
    const response = await fetch(url, { method });
    const contentType = response.headers.get('content-type');
    const status = response.status;
    const statusText = response.statusText;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setResponseInfo({
      status,
      statusText,
      contentType,
      data,
    });
    return data;
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    setResponseInfo({
      status: 'Error',
      statusText: errorMessage,
      contentType: 'N/A',
      data: null,
    });
  }
};
