module.exports = {
  projects: [
    // '<rootDir>/packages/app/jest.config.js',
    '<rootDir>/packages/server/jest.config.js'
  ],
  transform: {
    '^.+\\.(js|ts|tsx)?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'tsx'],
};
