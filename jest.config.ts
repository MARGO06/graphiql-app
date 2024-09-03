import nextJest from 'next/jest';

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: './',
});

const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/src/config.ts',
    '!**/src/i18n.ts',
    '!**/src/middleware.ts',
    '!**/jest.config.ts',
    '!**/*.d.ts',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>//node_modules',
    '<rootDir>/src/lib/',
    '<rootDir>/.next/',
    '<rootDir>/__mocks__/',
    '<rootDir>/src/services/',
    '<rootDir>/src/types/',
  ],

  collectCoverage: true,
  clearMocks: true,
  moduleNameMapper: {
    '^firebase/(.*)': '<rootDir>/__mocks__/firebase.ts',
    '^@firebase/(.*)': '<rootDir>/__mocks__/firebase.ts',
  },
};

export default createJestConfig(config);
