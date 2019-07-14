const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const AssetManifestPlugin = require('@micro-fe/build/AssetManifestPlugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  output: {
    filename: 'bundle.js',
    publicPath: isProduction ? '/foods/' : '/cdn/foods/',
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
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                require.resolve('@micro-fe/build/BridgeAliasPlugin'),
              ],
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
        from: 'data/foods.json',
        to: 'foods.json',
      },
    ]),
    new webpack.DefinePlugin({
      __BASE_URL__: isProduction ? '"/foods/"' : '"/cdn/foods/"',
    }),
    new AssetManifestPlugin(),
  ],
  optimization: {
    minimize: false,
  },
};
