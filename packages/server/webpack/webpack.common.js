const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: ['./src/index.js'],
  },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
  },
  target: 'node',
  node: {
    __filename: false,
    __dirname: false,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};
