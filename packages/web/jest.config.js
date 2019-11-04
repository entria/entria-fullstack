module.exports = {
  notify: false,
  bail: false,
  displayName: 'web-app',
  transformIgnorePatterns: ['/node_modules/', './dist'],
  testEnvironment: 'jest-environment-jsdom-fifteen',
  setupFilesAfterEnv: ['<rootDir>test/setupFilesAfterEnv.ts'],
  coverageReporters: ['lcov', 'html'],
  transform: {
    '^.+\\.tsx?$': ['babel-jest', { cwd: __dirname }],
  },
  rootDir: './',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  automock: false,
  moduleNameMapper: {
    '.(css)$': '<rootDir>/test_utils/stub.js',
    '.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test_utils/stub.js',
    '.(woff|woff2|otf|ttf|eot|csv)$': '<rootDir>/test_utils/stub.js',
  },
};
