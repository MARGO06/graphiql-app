import { NextRequest } from 'next/server';
import fetchMock from 'jest-fetch-mock';
import { POST } from './route';

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
  redirect: jest.fn(),
  error: jest.fn(),
  prototype: Object.getPrototypeOf(Response),
} as unknown as typeof Response;

describe('POST handler', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return a successful response with data', async () => {
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
    const jsonResponse = await response.json();

    expect(jsonResponse.status).toBe(200);
    expect(jsonResponse.statusText).toBe('OK');
    expect(jsonResponse.contentType).toBe('application/json');
    expect(jsonResponse.data).toEqual({ message: 'Success' });
  });

  it('should return an error response when fetch fails', async () => {
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
    const jsonResponse = await response.json();

    expect(jsonResponse.status).toBe(500);
  });

  it('should handle invalid JSON in request', async () => {
    const mockRequest = {
      json: async () => {
        throw new Error('Invalid JSON');
      },
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const jsonResponse = await response.json();

    expect(jsonResponse.success).toBe(false);
    expect(jsonResponse.error).toBe('Invalid JSON');
    expect(jsonResponse.status).toBe(500);
  });
});
