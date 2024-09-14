import { fetchData } from '@/services/fetchData';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('fetchData', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should handle successful responses', async () => {
    const mockResponse = {
      status: 200,
      statusText: 'OK',
      contentType: 'application/json',
      data: { key: 'value' },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const setResponseInfo = jest.fn();
    const setError = jest.fn();

    const result = await fetchData(
      'https://example.com/api',
      'GET',
      setResponseInfo,
      null,
      setError,
      [],
    );

    expect(fetchMock).toHaveBeenCalledWith('/api/fetchData', expect.any(Object));
    expect(setResponseInfo).toHaveBeenCalledWith(mockResponse);
    expect(setError).toHaveBeenCalledWith('');
    expect(result).toEqual(mockResponse);
  });

  it('should handle errors', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    const setResponseInfo = jest.fn();
    const setError = jest.fn();

    await fetchData('https://example.com/api', 'GET', setResponseInfo, null, setError, []);

    expect(setResponseInfo).toHaveBeenCalledWith({
      status: 'Error',
      statusText: 'Network error',
      contentType: 'N/A',
      data: null,
    });
  });

  it('should handle non-OK HTTP responses', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ status: 500, statusText: 'Internal Server Error' }),
      { status: 500 },
    );

    const setResponseInfo = jest.fn();
    const setError = jest.fn();

    await fetchData('https://example.com/api', 'GET', setResponseInfo, null, setError, []);

    expect(setResponseInfo).toHaveBeenCalledWith({
      status: 'Error',
      statusText: '(Request failed: 500)',
      contentType: 'N/A',
      data: null,
    });
  });
});
