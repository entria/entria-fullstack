const merge = require('webpack-merge');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConf = require('./webpack.common');

module.exports = merge(baseConf, {
  output: {
    filename: 'bundle.[contenthash].js',
  },
  entry: './src/index.tsx',
  // plugins: [
  //     new MiniCssExtractPlugin()
  // ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
    ],
  },
});
