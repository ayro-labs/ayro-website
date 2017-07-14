const properties = require('./properties');
const logger = require('../utils/logger');
const path = require('path');

exports.env = properties.getValue('app.env', 'development');

exports.port = properties.getValue('app.port', 4000);

exports.debug = properties.getValue('app.debug', false);

exports.publicPath = path.join(__dirname, '../../client-dist');

exports.apiUrl = properties.getValue('api.url', 'http://localhost:3000');

exports.slack = {
  clientId: '4332799729.201066840038',
  clientSecret: '1d8e1127054e9577da4cc6e25b83e74e',
  verificationToken: 'tHYsNNTDP00nL2HlqhAdEraQ',
};

if (properties.getValue('prerender')) {
  exports.prerender = {
    url: properties.getValue('prerender.url', 'http://localhost:9000'),
  };
}

if (properties.getValue('https')) {
  exports.https = {
    key: properties.getValue('https.key'),
    cert: properties.getValue('https.cert'),
  };
}

logger.info('Using %s environment settings', this.env);
logger.info('Debug mode is %s', this.debug ? 'ON' : 'OFF');
