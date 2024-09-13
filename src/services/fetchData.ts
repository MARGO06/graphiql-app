import { ResponseInfo } from '@/components/restClient/RestClient';
export const fetchData = async (
  url: string,
  method: string,
  setResponseInfo: (info: ResponseInfo) => void,
  body: string | null = null,
  setError: (error: string) => void,
  headers: { key: string; value: string; id: string }[],
) => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers.reduce(
          (acc, { key, value }) => {
            if (key && value) {
              acc[key] = value;
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
      },
    };

    if (method === 'POST' || method === 'PUT') {
      options.body = body;
    }

    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type');
    const status = response.status;
    const statusText = response.statusText;

    if (status === 404) {
      throw new Error('Resource not found (404)');
    }

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

    setError('');

    return data;
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      if (error.name === 'SyntaxError') {
        errorMessage = error.name;
      }
      if (error.name === 'TypeError' || error.name === 'Error') {
        errorMessage = error.message;
      }
    }

    setResponseInfo({
      status: 'Error',
      statusText: errorMessage,
      contentType: 'N/A',
      data: null,
    });
  }
};
