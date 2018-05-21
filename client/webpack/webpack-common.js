'use strict';

const helpers = require('./helpers');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const rxjsPaths = require('rxjs/_esm5/path-mapping');
const glob = require('glob');

module.exports = (settings) => {
  function isProduction() {
    return settings.env === 'production';
  }

  const optimization = {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /\/node_modules\//,
          chunks: 'all',
          priority: 0,
          enforce: true,
        },
      },
    },
  };
  if (isProduction()) {
    optimization.minimizer = [
      new UglifyJsPlugin({cache: true, parallel: true}),
      new OptimizeCssAssetsPlugin({}),
    ];
  }

  return {
    optimization,
    mode: settings.env,
    devtool: 'source-map',
    entry: {
      vendor: helpers.root('/client/src/vendor.ts'),
      main: helpers.root('/client/src/main.ts'),
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
      alias: rxjsPaths(),
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
          use: [CssExtractPlugin.loader, 'css-loader'],
          include: helpers.root('/node_modules/bootstrap'),
        },
        {
          test: /\.less$/,
          use: [CssExtractPlugin.loader, 'css-loader', 'less-loader'],
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
      ],
    },
    plugins: [
      new CleanPlugin(['client-dist'], {root: helpers.root('/')}),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          API_URL: JSON.stringify(settings.apiUrl),
        },
      }),
      new CssExtractPlugin({filename: 'assets/styles/[name].css'}),
      new PurgeCssPlugin({
        paths: glob.sync(`${helpers.root('/client/src')}/**/*`, {nodir: true}),
        whitelist: ['modal', 'dropdown', 'alert', 'show', 'fade', 'collapse'],
        whitelistPatterns: [/^modal-/, /^dropdown-/, /^alert-/, /^bg-/],
      }),
      new HtmlPlugin({template: helpers.root('/client/src/index.html')}),
    ],
  };
};
