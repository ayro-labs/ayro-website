'use strict';

const {properties} = require('@ayro/commons');
const helpers = require('./webpack/helpers');

properties.setup(helpers.root('/client/config.properties'));

const settings = require('./configs/settings');
const webpackCommon = require('./webpack/webpack-common.js');

const devSettings = settings('development');
const prodSettings = settings('production');

module.exports = (env) => {
  const choosedSettings = env && env.production ? prodSettings : devSettings;
  return webpackCommon(choosedSettings);
};
