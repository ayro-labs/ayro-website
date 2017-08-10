'use strict';

const helpers = require('./helpers');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: helpers.root('/client/src/main.ts'),
    vendor: helpers.root('/client/src/vendor.ts'),
    polyfills: helpers.root('/client/src/polyfills.ts'),
  },
  output: {
    path: helpers.root('/client-dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      helpers.root('/client/src'),
      helpers.root('/node_modules')
    ],
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts-loader', 'angular2-template-loader'],
        include: helpers.root('/client/src'),
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        include: helpers.root('/client/src'),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
        include: [
          helpers.root('/node_modules/bootstrap'),
          helpers.root('/node_modules/pkginfo'),
        ],
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
        include: helpers.root('/client/src/assets/css'),
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: `file-loader?name=[path][name].[ext]&context=${helpers.root('/client/src')}`,
        include: helpers.root('/client/src/assets/img'),
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: `file-loader?name=[path][name].[ext]&context=${helpers.root('/client/src')}`,
        include: helpers.root('/client/src/assets/fonts'),
      },
    ],
  },
  plugins: [
    new CleanPlugin(['client-dist'], {
      root: helpers.root('/'),
    }),
    new webpack.ContextReplacementPlugin(/angular\/core\/@angular/, helpers.root('/client/src')),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills'],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether'
    }),
    new ExtractTextPlugin({
      filename: 'assets/css/[name].css',
      allChunks: true
    }),
    new HtmlPlugin({
      template: helpers.root('/client/src/index.html'),
    }),
  ],
};
