import { fetchData } from '@/services/fetchData';

global.fetch = jest.fn();

describe('fetchData', () => {
  const mockSetResponseInfo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle a successful fetch request', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers({ 'content-type': 'application/json' }),
      json: jest.fn().mockResolvedValue({ key: 'value' }),
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const url = 'https://api.example.com/data';
    const method = 'GET';
    const body = 'testBody';
    const setError = (error: string) => {
      error;
    };
    const headers = [
      { key: 'Content-Type', value: 'application/json', id: '1' },
      { key: 'Authorization', value: 'Bearer token', id: '2' },
    ];

    const data = await fetchData(url, method, mockSetResponseInfo, body, setError, headers);

    expect(fetch).toHaveBeenCalledWith(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
      },
    });
    expect(mockSetResponseInfo).toHaveBeenCalledWith({
      status: 200,
      statusText: 'OK',
      contentType: 'application/json',
      data: { key: 'value' },
    });
    expect(data).toEqual({ key: 'value' });
  });

  it('should handle a fetch request with an error response', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: 'HTTP error! status: 404',
      headers: new Headers({ 'content-type': 'application/json' }),
      json: jest.fn(),
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const url = 'https://api.example.com/data';
    const method = 'GET';
    const body = 'testBody';
    const setError = (error: string) => {
      error;
    };
    const headers = [
      { key: 'Content-Type', value: 'application/json', id: '1' },
      { key: 'Authorization', value: 'Bearer token', id: '2' },
    ];

    const data = await fetchData(url, method, mockSetResponseInfo, body, setError, headers);

    expect(fetch).toHaveBeenCalledWith(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
      },
    });

    expect(mockSetResponseInfo).toHaveBeenCalledWith({
      status: 'Error',
      statusText: 'Resource not found (404)',
      contentType: 'N/A',
      data: null,
    });

    expect(data).toBeUndefined();
  });

  it('should handle a fetch request with a network error', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const url = 'https://api.example.com/data';
    const method = 'GET';
    const body = 'testBody';
    const setError = (error: string) => {
      error;
    };
    const headers = [
      { key: 'Content-Type', value: 'application/json', id: '1' },
      { key: 'Authorization', value: 'Bearer token', id: '2' },
    ];

    const data = await fetchData(url, method, mockSetResponseInfo, body, setError, headers);

    expect(fetch).toHaveBeenCalledWith(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
      },
    });

    expect(mockSetResponseInfo).toHaveBeenCalledWith({
      status: 'Error',
      statusText: 'Network error',
      contentType: 'N/A',
      data: null,
    });
    expect(data).toBeUndefined();
  });
});
