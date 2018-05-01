'use strict';

const {properties} = require('@ayro/commons');

module.exports = (env) => {
  const settings = {env};
  if (env === 'production') {
    settings.apiUrl = 'https://api.ayro.io';
  } else {
    settings.apiUrl = properties.get('api.url', 'http://localhost:3000');
  }
  return settings;
};
