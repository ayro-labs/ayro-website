'use strict'

const helpers = require('./helpers');
const webpackCommon = require('./webpack.common.js');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(webpackCommon, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        API_URL: JSON.stringify('http://localhost:3000'),
        CHATZ_APP_TOKEN: JSON.stringify('9fc3d6012e0fbe3bb0599ee3c03537a22d6ca2d2'),
        CHATZ_JS_VERSION: JSON.stringify('0.0.21'),
        CHATZ_ANDROID_VERSION: JSON.stringify('0.0.6'),
      },
    }),
  ],
});
