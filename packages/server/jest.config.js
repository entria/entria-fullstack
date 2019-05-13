const pack = require('./package');

// const ignoredPaths = [
//   '<rootDir>/node_modules/',
//   '<rootDir>/dist',
//   '<rootDir>/scripts',
//   '<rootDir>/repl/',
//   '<rootDir>/flow-typed/',
//   '<rootDir>/test/',
// ];

module.exports = {
  displayName: pack.name,
  name: pack.name,
  testEnvironment: '<rootDir>/test/environment/mongodb',
  // testPathIgnorePatterns: ignoredPaths,
  // coverageReporters: ['lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTestFramework.js'],
  globalSetup: '<rootDir>/test/setup.js',
  globalTeardown: '<rootDir>/test/teardown.js',
  resetModules: false,
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'GraphQL Dataloader Boilerplate Tests',
        output: './test-results/jest/results.xml',
      },
    ],
  ],
  transform: {
    // '^.+\\.(js|ts|tsx)?$': 'babel-jest',
    // '^.+\\.(js|ts|tsx)?$': '<rootDir>/node_modules/babel-jest',
    // '^.+\\.(js|ts|tsx)?$': '<rootDir>/../../node_modules/babel-jest',
    '^.+\\.(js|ts|tsx)?$': '<rootDir>/test/babel-transformer',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
  moduleFileExtensions: ['ts', 'js'],

};
