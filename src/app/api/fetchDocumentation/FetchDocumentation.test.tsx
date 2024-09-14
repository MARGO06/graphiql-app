import { NextRequest } from 'next/server';
import { POST } from './route';

jest.mock('../../../schemaQuery', () => ({
  SCHEMA_QUERY: 'mock schema query',
}));
jest.mock('next/server', () => ({
  ...jest.requireActual('next/server'),
  NextResponse: {
    json: jest.fn((data) => data),
  },
}));

describe('POST function', () => {
  it('should make a successful POST request and return the data', async () => {
    const req = {
      json: async () => ({
        url: 'https://countries.trevorblades.com',
        schema: '/schema',
      }),
    } as NextRequest;

    fetchMock.mockResponseOnce(JSON.stringify({ someData: 'mockedData' }));

    const response = await POST(req);

    expect(fetch).toHaveBeenCalledWith('https://countries.trevorblades.com/schema', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: 'mock schema query' }),
    });
    // TODO issue with success response, there is not status=200?
    //expect(jsonResponse.status).toBe(200);
    expect(response).toEqual({
      success: true,
      data: { someData: 'mockedData' },
    });
  });

  it('should return 400 when url or schema is missing', async () => {
    const req = {
      json: async () => ({ url: '', schema: '' }),
    } as unknown as NextRequest;

    const response = await POST(req);
    expect(response).toEqual({
      error: 'URL and SDL is required',
      status: 400,
    });
  });

  it('should handle fetch errors and return a 500 status', async () => {
    const req = {
      json: async () => ({
        url: 'https://countries.trevorblades.com',
        schema: '/schema',
      }),
    } as NextRequest;

    fetchMock.mockRejectOnce(new Error('Fetch failed'));
    const response = await POST(req);
    expect(response).toEqual({
      success: false,
      error: 'Fetch failed',
      status: 500,
    });
  });
});
