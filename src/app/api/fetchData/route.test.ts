import { NextRequest } from 'next/server';
import fetchMock from 'jest-fetch-mock';
import { POST } from './route';

describe('POST handler', () => {
  it('should return a successful response with data', async () => {
    global.Response = {
      json: jest.fn((data) => {
        return {
          json: () => Promise.resolve(data),
          status: 200,
          statusText: 'OK',
          headers: {
            get: jest.fn().mockReturnValue('application/json'),
          },
        };
      }),
    } as unknown as typeof Response;

    const mockRequest = {
      json: async () => ({
        url: 'https://example.com/api',
        method: 'POST',
        headers: {
          Authorization: 'Bearer token',
        },
        body: JSON.stringify({ key: 'value' }),
      }),
    } as unknown as NextRequest;

    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Success' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });

    const response = await POST(mockRequest);

    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    if ('contentType' in response && 'data' in response) {
      expect(response.contentType).toBe('application/json');
      expect(response.data).toEqual({ message: 'Success' });
    }
  });

  it('should return an error response when fetch fails', async () => {
    global.Response = {
      json: jest.fn((data) => {
        return {
          json: () => Promise.reject(data),
          status: 500,
          statusText: 'Error',
          headers: {
            get: jest.fn().mockReturnValue('application/json'),
          },
        };
      }),
    } as unknown as typeof Response;

    const mockRequest = {
      json: async () => ({
        url: 'https://example.com/api',
        method: 'POST',
        headers: {},
        body: JSON.stringify({}),
      }),
    } as unknown as NextRequest;

    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 500 });

    const response = await POST(mockRequest);

    expect(response.status).toBe(500);
  });

  it('should handle invalid JSON in request', async () => {
    const mockRequest = {
      json: async () => {
        throw new Error('Invalid JSON');
      },
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    if ('success' in response && 'error' in response) {
      expect(response.success).toBe(false);
      expect(response.error).toBe('Invalid JSON');
    }

    expect(response.status).toBe(500);
  });
});
