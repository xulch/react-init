const path = require('path');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const webpackMerge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = webpackMerge(base, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // 在一个css中引入了另一个css，也会执行之前1个loader，即postcss-loader；若值设为2，执行postcss-loader和less-loader
              sourceMap: false,
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                '@hd': '2px',
              },
              javascriptEnabled: true,
            },
          },
        ],
        include: /node_modules/,
        exclude: /src/,
      },
    ],
  },
  plugins: [new HardSourceWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
  devtool: 'eval',
  devServer: {
    disableHostCheck: true,
    contentBase: [path.resolve(process.cwd(), 'dist'), path.resolve(process.cwd(), 'mocks')],
    compress: true, // 开启资源的 gzip 压缩
    port: 8082,
    host: '0.0.0.0',
    hot: true,
    inline: true,
    noInfo: false,
    clientLogLevel: 'none',
    open: true,
    stats: 'minimal',
  },
});
