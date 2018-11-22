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
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
};
