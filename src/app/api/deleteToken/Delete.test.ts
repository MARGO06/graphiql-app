import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { DELETE } from './route';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body) => ({ json: body })),
  },
}));

describe('DELETE API Route', () => {
  let deleteMock: jest.Mock;

  beforeEach(() => {
    deleteMock = jest.fn();
    (cookies as jest.Mock).mockReturnValue({
      delete: deleteMock,
    });
  });

  it('should delete JWT cookie and return null token in the response', async () => {
    const response = await DELETE();

    expect(deleteMock).toHaveBeenCalledWith('JWT');

    expect(response).toBeInstanceOf(Object);
    expect(NextResponse.json).toHaveBeenCalledWith({ token: null });
  });
});
