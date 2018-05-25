'use strict';

const {configs} = require('@ayro/commons');
const path = require('path');

const config = configs.load(path.resolve('client', 'config.yml'));

module.exports = (env) => {
  const settings = {env};
  if (env === 'production') {
    settings.apiUrl = 'https://api.ayro.io';
  } else {
    settings.apiUrl = config.get('api.url', 'http://localhost:3000');
  }
  return settings;
};
