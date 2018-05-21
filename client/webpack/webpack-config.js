'use strict';

const path = require('../../utils/path');
const {properties} = require('@ayro/commons');

properties.setup(path.root('client', 'config.properties'));

const settings = require('../configs/settings');
const webpackCommon = require('./webpack-common.js');

const devSettings = settings('development');
const prodSettings = settings('production');

module.exports = (env) => {
  const choosedSettings = env && env.production ? prodSettings : devSettings;
  return webpackCommon(choosedSettings);
};
