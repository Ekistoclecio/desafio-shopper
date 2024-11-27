import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    'src/types',
    'src/styles',
    'src/theme',
    'src/utils',
    'src/providers',
    'src/App.tsx',
    'src/routes',
    'src/pages',
    'src/services',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts(x)?',
    '!src/main.tsx',
    '!src/types/**',
    '!src/**/*.mdx',
    '!src/styles/**',
    '!src/theme/**',
    '!src/utils/**',
    '!src/providers/**',
    '!src/routes/**',
    '!src/App.tsx',
    '!src/pages/**',
    '!src/services/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/.jest/mocks/fileMock.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.app.json' }],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@mui)', '\\.(jpg|jpeg|png|gif|webp|svg)$'],
};

export default config;
