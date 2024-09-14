import { ResponseInfo } from '@/components/restClient/RestClient';

export const fetchData = async (
  apiUrl: string,
  method: string,
  setResponseInfo: (info: ResponseInfo) => void,
  body: string | null = null,
  setError: (error: string) => void,
  headers: { key: string; value: string; id: string }[],
) => {
  try {
    const response = await fetch('/api/fetchData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: apiUrl,
        method,
        headers: headers.reduce(
          (acc, { key, value }) => {
            if (key && value) {
              acc[key] = value;
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
        body,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`(Request failed: ${response.status})`);
    }

    setResponseInfo({
      status: data.status,
      statusText: data.statusText,
      contentType: data.contentType,
      data: data.data,
    });

    setError('');
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

    setResponseInfo({
      status: 'Error',
      statusText: errorMessage,
      contentType: 'N/A',
      data: null,
    });
  }
};
