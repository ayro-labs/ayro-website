'use strict';

const helpers = require('./helpers');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  return {
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
        helpers.root('/node_modules'),
      ],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ['ts-loader', 'angular2-template-loader'],
          include: helpers.root('/client/src'),
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
          include: helpers.root('/client/src'),
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                minimize: env === 'production',
              },
            }],
          }),
          include: helpers.root('/node_modules/bootstrap'),
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                minimize: env === 'production',
              },
            }, 'less-loader'],
          }),
          include: helpers.root('/client/src/assets/styles'),
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: helpers.root('/client/src'),
            },
          }],
          include: helpers.root('/client/src/assets/img'),
        },
        {
          test: /\.(woff(2)?|ttf|otf|eot|svg)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: helpers.root('/client/src'),
            },
          }],
          include: helpers.root('/client/src/assets/fonts'),
        },
        {
          test: /\.(woff(2)?|ttf|otf|eot|svg)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '/assets/fonts/glyphicons/[name].[ext]',
            },
          }],
          include: helpers.root('/node_modules/bootstrap/dist/fonts'),
        },
      ],
    },
    plugins: [
      new CleanPlugin(['client-dist'], {root: helpers.root('/')}),
      new webpack.LoaderOptionsPlugin({debug: true}),
      new webpack.ContextReplacementPlugin(/angular\/core\/@angular/, helpers.root('/client/src')),
      new webpack.ContextReplacementPlugin(/@angular\/core\/esm5/, helpers.root('/client/src')),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.CommonsChunkPlugin({name: ['app', 'vendor', 'polyfills']}),
      new ExtractTextPlugin({filename: 'assets/styles/[name].css', allChunks: true}),
      new HtmlPlugin({template: helpers.root('/client/src/index.html')}),
    ],
  };
};
