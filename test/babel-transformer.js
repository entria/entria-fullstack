const config = require('../babel.config');
const { join, resolve } = require('path');

const { createTransformer } = require('babel-jest');

const packagePath = resolve('../');
const packageGlob = join(packagePath, '*');

module.exports = createTransformer({
  // babelrcRoots: packageGlob,
  ...config,
});
