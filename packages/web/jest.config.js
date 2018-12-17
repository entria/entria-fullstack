module.exports = {
  notify: false,
  bail: false,
  snapshotSerializers: ['jest-serializer-html'],
  displayName: 'web-app',
  setupTestFrameworkScriptFile: require.resolve('./jest.setup.js'),
  transformIgnorePatterns: ['node_modules/'],
  coverageReporters: ['lcov', 'html'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '.(css)$': '<rootDir>/test_utils/stub.js',
    '.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test_utils/stub.js',
    '.(woff|woff2|otf|ttf|eot|csv)$': '<rootDir>/test_utils/stub.jss',
  },
};
