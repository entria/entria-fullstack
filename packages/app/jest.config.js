module.exports = {
  displayName: 'test',
  preset: 'react-native',
  transformIgnorePatterns: ['node_modules/(?!react-native|react-navigation)/'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  moduleNameMapper: {
    'styled-components': '<rootDir>/node_modules/styled-components/dist/styled-components.native.cjs.js',
  },
  setupFiles: ['<rootDir>/test/setupFiles.js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(j|t)s?$',
};
