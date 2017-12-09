const {properties} = require('@ayro/commons');
const path = require('path');

properties.setup(path.join(__dirname, 'config.properties'));

const webpackProd = require('./webpack/webpack.prod.js');
const webpackDev = require('./webpack/webpack.dev.js');

module.exports = (env) => {
  return env && env.production ? webpackProd : webpackDev;
};
