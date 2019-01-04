const { resolve } = require('path');

const webpack = require('webpack');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
const outputPath = resolve(__dirname, '../dist');

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'cheap-eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: resolve(__dirname, '.cache'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.woff(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            mimetype: 'application/font-woff',
          },
        },
      },
      {
        test: /\.woff2(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            mimetype: 'application/font-woff2',
          },
        },
      },
      {
        test: /\.(otf)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
      {
        test: /\.ttf(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            mimetype: 'application/octet-stream',
          },
        },
      },
      {
        test: /\.svg(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[ext]',
            mimetype: 'image/svg+xml',
          },
        },
      },
      {
        test: /\.(png|jpg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      },
    ],
  },
  output: {
    path: outputPath,
    publicPath: '/',
  },
  plugins: [
    // new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};
