'use strict'

const helpers = require('./helpers');
const webpackCommon = require('./webpack.common.js');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(webpackCommon, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify('http://localhost:3000'),
        CHATZ_APP_TOKEN: JSON.stringify('b38ea487e4d3ee65a7fabf68a98b9b15effb0fe0'),
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});
