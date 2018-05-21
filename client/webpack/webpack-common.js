'use strict';

const path = require('../../utils/path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const JsUglifyPlugin = require('uglifyjs-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CssOptimizePlugin = require('optimize-css-assets-webpack-plugin');
const CssPurgePlugin = require('purgecss-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
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
      new JsUglifyPlugin({cache: true, parallel: true}),
      new CssOptimizePlugin({}),
    ];
  }

  return {
    optimization,
    mode: settings.env,
    devtool: isProduction() ? false : 'source-map',
    entry: {
      vendor: path.root('client', 'src', 'vendor.ts'),
      main: path.root('client', 'src', 'main.ts'),
    },
    output: {
      path: path.root('dist'),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [
        path.root('client', 'src'),
        path.root('node_modules'),
      ],
      alias: rxjsPaths(),
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ['ts-loader', 'angular2-template-loader'],
          include: path.root('client', 'src'),
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
          include: path.root('client', 'src'),
        },
        {
          test: /\.css$/,
          use: [CssExtractPlugin.loader, 'css-loader'],
          include: path.root('node_modules', 'bootstrap'),
        },
        {
          test: /\.less$/,
          use: [CssExtractPlugin.loader, 'css-loader', 'less-loader'],
          include: path.root('client', 'src', 'assets', 'styles'),
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: path.root('client', 'src'),
            },
          }],
          include: path.root('client', 'src', 'assets', 'img'),
        },
        {
          test: /\.(woff(2)?|ttf|otf|eot|svg)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: path.root('client', 'src'),
            },
          }],
          include: path.root('client', 'src', 'assets', 'fonts'),
        },
      ],
    },
    plugins: [
      new CleanPlugin(['dist'], {root: path.root()}),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          API_URL: JSON.stringify(settings.apiUrl),
        },
      }),
      new CssExtractPlugin({filename: 'assets/styles/[name].css'}),
      new CssPurgePlugin({
        paths: glob.sync(`${path.root('client', 'src')}/**/*`, {nodir: true}),
        whitelist: ['modal', 'dropdown', 'alert', 'show', 'fade', 'collapse'],
        whitelistPatterns: [/^modal-/, /^dropdown-/, /^alert-/, /^bg-/],
      }),
      new HtmlPlugin({template: path.root('client', 'src', 'index.html')}),
    ],
  };
};
