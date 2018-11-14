module.exports = {
  projects: [
    '<rootDir>/packages/app/jest.config.js',
    '<rootDir>/packages/server/jest.config.js'
  ],
  transform: {
    '^.+\\.(js|ts|tsx)?$': require.resolve('babel-jest'),
  },
  moduleFileExtensions: ['js', 'css', 'ts', 'tsx'],
};
