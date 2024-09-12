import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  push: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ value: 'mockedJWTToken' })),
  })),
}));
