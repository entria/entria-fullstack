module.exports = {
  projects: [
    '<rootDir>/packages/server/jest.config.js',
    '<rootDir>/packages/web/jest.config.js'
  ],
  transform: {
    '^.+\\.(js|ts|tsx)?$': require('path').resolve('./customBabelTransformer'),
  },
  moduleFileExtensions: ['js', 'css', 'ts', 'tsx'],
};
