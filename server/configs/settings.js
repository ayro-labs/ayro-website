const properties = require('./properties');
const logger = require('../utils/logger');
const path = require('path');

exports.env = properties.getValue('app.env', 'development');

exports.port = properties.getValue('app.port', 4000);

exports.debug = properties.getValue('app.debug', false);

exports.publicPath = path.join(__dirname, '../../client-dist');

if (this.env === 'production') {
  exports.apiUrl = 'https://api.chatz.io';
  exports.websiteUrl = 'https://www.chatz.io';
} else {
  exports.apiUrl = properties.getValue('api.url', 'http://localhost:3000');
  exports.websiteUrl = `http://localhost:${this.port}`;
}

exports.session = {
  secret: 'chatz.io',
  prefix: 'websession:',
  ttl: Number.MAX_SAFE_INTEGER,
};

exports.redis = {
  host: properties.getValue('redis.host', 'localhost'),
  port: properties.getValue('redis.port', 6379),
  password: properties.getValue('redis.password'),
};

exports.facebook = {
  appId: '1577343385621250',
  appSecret: '28a2b0321aec6799be5f0e884431f626',
};

exports.slack = {
  clientId: '238285510608.246046996448',
  clientSecret: 'a10204a6416c5e4b50a1209c6380568f',
  verificationToken: '5aRssO4wD1yjYeyfDNuA6np2',
};

if (properties.getValue('prerender')) {
  exports.prerenderUrl = properties.getValue('prerender.url', 'http://localhost:9000');
}

if (properties.getValue('https')) {
  exports.https = {
    key: properties.getValue('https.key'),
    cert: properties.getValue('https.cert'),
  };
}

if (this.env === 'production' && !this.https) {
  throw new Error('Https is required when running in production environment');
}

logger.info('Using %s environment settings', this.env);
logger.info('Debug mode is %s', this.debug ? 'ON' : 'OFF');
