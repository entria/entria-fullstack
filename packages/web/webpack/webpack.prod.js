const merge = require('webpack-merge');

const baseConf = require('./webpack.common');

module.exports = merge(baseConf, {
  output: {
    filename: 'bundle.[contenthash].js',
  },
  entry: './src/index.tsx',
});
