const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackNodeExternals = require('webpack-node-externals');

const common = require('./webpack.common');

module.exports = merge.smart(common, {
  mode: 'production',
  externals: [WebpackNodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});
