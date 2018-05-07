'use strict';

const {properties} = require('@ayro/commons');
const path = require('path');

properties.setup(path.join(__dirname, 'config.properties'));

const webpackDev = require('./webpack/webpack-dev');
const webpackProd = require('./webpack/webpack-prod');

module.exports = (env) => {
  return env && env.production ? webpackProd : webpackDev;
};
