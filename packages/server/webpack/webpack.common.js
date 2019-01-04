const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  cache: {
    type: 'filesystem',
    cacheDirectory: resolve(__dirname, '.cache'),
    loglevel: 'warning',
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
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};
