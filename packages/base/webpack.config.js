const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  output: {
    filename: 'bundle.js',
    publicPath: isProduction ? '/base/' : '/cdn/base/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DISCOVERY_BASE_URL__: isProduction ? '/' : '"/cdn"',
    }),
    new HtmlWebpackPlugin(),
  ],
  optimization: {
    minimize: false,
  },
};
