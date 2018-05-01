const {properties} = require('@ayro/commons');
const path = require('path');

properties.setup(path.join(__dirname, 'config.properties'));

const webpackProd = require('./webpack/webpack-prod');
const webpackDev = require('./webpack/webpack-dev');

module.exports = (env) => {
  return env && env.production ? webpackProd : webpackDev;
};
