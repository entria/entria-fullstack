const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackNodeExternals = require('webpack-node-externals');
const AutoReloadServerPlugin = require('auto-reload-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge.smart(common, {
  mode: 'development',
  watch: true,
  stats: 'errors-only',
  entry: {
    index: ['webpack/hot/poll?1000'],
  },
  externals: [
    WebpackNodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  plugins: [
    new AutoReloadServerPlugin({
      filePath: 'dist/index.js',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
});
