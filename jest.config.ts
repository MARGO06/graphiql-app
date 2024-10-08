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
    '!**/src/schemaQuery.ts',
    '!**/src/i18n.ts',
    '!**/src/middleware.ts',
    '!**/jest.config.ts',
    '!**/*.d.ts',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>//node_modules',
    '<rootDir>/.next/',
    '<rootDir>/src/types/',
  ],

  collectCoverage: true,
  clearMocks: true,
};

export default createJestConfig(config);
