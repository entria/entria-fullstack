const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackNodeExternals = require('webpack-node-externals');
const ReloadServerPlugin = require('reload-server-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge.smart(common, {
  mode: 'development',
  watch: true,
  stats: 'errors-only',
  entry: {
    server: ['webpack/hot/poll?1000'],
  },
  externals: [
    WebpackNodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new ReloadServerPlugin({
      script: resolve('dist', 'server.js'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
});
