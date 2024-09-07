import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  push: jest.fn(),
}));
