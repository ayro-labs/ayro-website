'use strict'

const helpers = require('./helpers');
const webpackCommon = require('./webpack.common.js');
const project = require('../../package.json');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(webpackCommon, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_URL: JSON.stringify('https://api.chatz.io'),
        CHATZ_APP_TOKEN: JSON.stringify('8b845b96169027add4d7031a5db4a44dcd274473'),
        CHATZ_JS_VERSION: JSON.stringify(project.dependencies.chatz),
        CHATZ_ANDROID_VERSION: JSON.stringify('0.0.6'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
});
