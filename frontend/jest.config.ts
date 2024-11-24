import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    'src/@types',
    'src/styles',
    'src/theme',
    'src/utils',
    'src/providers',
    'src/App.tsx',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts(x)?',
    '!src/main.tsx',
    '!src/@types/**',
    '!src/**/*.mdx',
    '!src/styles/**',
    '!src/theme/**',
    '!src/utils/**',
    '!src/providers/**',
    '!src/App.tsx',
  ],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.app.json' }],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};

export default config;
