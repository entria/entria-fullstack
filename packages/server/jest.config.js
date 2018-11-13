const pack = require("./package");

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
  testEnvironment: '<rootDir>/packages/server/test/environment/mongodb',
  // testPathIgnorePatterns: ignoredPaths,
  // coverageReporters: ['lcov', 'html'],
  setupTestFrameworkScriptFile: '<rootDir>/packages/server/test/setupTestFramework.js',
  globalSetup: '<rootDir>/packages/server/test/setup.js',
  globalTeardown: '<rootDir>/packages/server/test/teardown.js',
  resetModules: false,
  // reporters: [
  //   'default',
  //   [
  //     'jest-junit',
  //     {
  //       suiteName: 'GraphQL Dataloader Boilerplate Tests',
  //       output: './test-results/jest/results.xml',
  //     },
  //   ],
  // ],
  // transform: {
  //   '^.+\\.(js|ts|tsx)?$': 'babel-jest',
  // },
  moduleFileExtensions: ['ts', 'js', 'tsx'],
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
  // rootDir: "../..",
};
