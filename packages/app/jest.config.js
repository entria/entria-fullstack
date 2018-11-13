module.exports = {
  displayName: 'test',
  preset: 'react-native',
  transformIgnorePatterns: ['node_modules/(?!react-native|react-navigation)/'],
  transform: {
    '^.+\\.js$': require.resolve('react-native/jest/preprocessor'),
  },
  moduleNameMapper: {
    'styled-components': require.resolve('styled-components/native/dist/styled-components.native.cjs'),
  },
  setupFiles: [
    require.resolve('./test/setupFiles'),
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(j|t)s?$',
};
