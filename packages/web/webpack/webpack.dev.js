const { resolve } = require('path');

const merge = require('webpack-merge');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

const baseConf = require('./webpack.common');
const outputPath = resolve(__dirname, '../dist');

module.exports = merge(baseConf, {
  output: {
    filename: 'bundle.js',
  },
  entry: ['./src/index.tsx', 'webpack-plugin-serve/client'],
  plugins: [
    new Serve({
      hmr: true,
      historyFallback: true,
      static: [outputPath],
    }),
  ],
  watch: true,
});
