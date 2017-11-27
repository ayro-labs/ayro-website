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
        APP_TOKEN: JSON.stringify(settings.appToken),
        JS_SDK_VERSION: JSON.stringify(settings.jsSdkVersion),
        ANDROID_SDK_VERSION: JSON.stringify(settings.androidSdkVersion),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
});
