const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    server: ['./src/index.js'],
  },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
  },
  target: 'node',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};
