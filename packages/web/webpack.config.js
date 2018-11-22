const { resolve } = require('path');

const webpack = require('webpack');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const outputPath = resolve(__dirname, 'dist');

const entry = isDev ? ['./src/index.js', 'webpack-plugin-serve/client'] : './src/index.js';

const plugins = [
  new HtmlWebpackPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  })
];

if (isDev) {
  plugins.push(new Serve({
    hmr: true,
    historyFallback: true,
    static: [outputPath]
  }));
} else {
  plugins.push(new MiniCssExtractPlugin())
}

module.exports = {
  entry,
  mode: process.env.NODE_ENV,
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: !isDev ? [MiniCssExtractPlugin.loader, 'css-loader'] : ['style-loader', 'css-loader']
      },
      {
        test: /\.woff(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.woff2(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            mimetype: 'application/font-woff2'
          }
        }
      },
      {
        test: /\.(otf)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.ttf(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            mimetype: 'application/octet-stream'
          }
        }
      },
      {
        test: /\.svg(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[ext]',
            mimetype: 'image/svg+xml'
          }
        }
      },
      {
        test: /\.(png|jpg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        }
      }
    ]
  },
  output: {
    path: outputPath,
    publicPath: '/',
    filename: isDev ? 'bundle.[contenthash].js' : 'bundle.js'
  },
  plugins,
  watch: isDev
};
