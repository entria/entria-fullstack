module.exports = {
  projects: [
    // '<rootDir>/packages/app/jest.config.js',
    '<rootDir>/packages/server/jest.config.js'
  ],
  transform: {
    // '^.+\\.(js|ts|tsx)?$': 'babel-jest',
    '^.+\\.(js|ts|tsx)?$': '<rootDir>/test/babel-transformer',
  },
  moduleFileExtensions: ['js', 'css', 'ts', 'tsx'],
};
