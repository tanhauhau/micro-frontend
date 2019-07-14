const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const AssetManifestPlugin = require('@micro-fe/build/AssetManifestPlugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  output: {
    filename: 'bundle.js',
    publicPath: isProduction ? 'TODO' : '/cdn/food/dist/',
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
              plugins: [require.resolve('@micro-fe/build/BridgeAliasPlugin')],
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
    new CopyPlugin([
      {
        from: 'data/*.json',
      },
    ]),
    new webpack.DefinePlugin({
      __BASE_URL__: isProduction ? 'TODO' : '"/cdn/food/dist/"',
    }),
    new AssetManifestPlugin(),
  ],
  optimization: {
    minimize: false,
  },
};
