const pack = require('./package');

module.exports = {
  displayName: pack.name,
  name: pack.name,
  testEnvironment: '<rootDir>/test/environment/mongodb',
  testPathIgnorePatterns: ['/node_modules/', './dist'],
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
    '^.+\\.(js|ts|tsx)?$': '<rootDir>/test/babel-transformer',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
  moduleFileExtensions: ['ts', 'js'],

};
