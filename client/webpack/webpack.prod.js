const settings = require('../configs/settings')('production');
const webpackCommon = require('./webpack.common.js');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(webpackCommon, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(settings.env),
        API_URL: JSON.stringify(settings.apiUrl),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
});
