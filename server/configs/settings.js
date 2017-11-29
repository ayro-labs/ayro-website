const properties = require('./properties');
const logger = require('../utils/logger');
const path = require('path');

exports.env = properties.getValue('app.env', 'development');
exports.port = properties.getValue('app.port', 4000);
exports.debug = properties.getValue('app.debug', false);
exports.publicPath = path.join(__dirname, '../../client-dist');

exports.apiUrl = properties.getValue('api.url', this.env === 'production' ? 'https://api.ayro.io' : 'http://localhost:3000');
exports.websiteUrl = this.env === 'production' ? 'https://www.ayro.io' : `http://localhost:${this.port}`;

exports.appToken = properties.getValue('ayro.appToken');
exports.jsSdkVersion = properties.getValue('ayro.jsSdkVersion');
exports.androidSdkVersion = properties.getValue('ayro.androidSdkVersion');

exports.session = {
  secret: 'ayro.io',
  prefix: 'websession:',
  ttl: Number.MAX_SAFE_INTEGER,
};

exports.redis = {
  host: properties.getValue('redis.host', 'localhost'),
  port: properties.getValue('redis.port', 6379),
  password: properties.getValue('redis.password'),
};

exports.facebook = {
  appId: '2149355741952296',
  appSecret: 'ddd354f9a28d85876bda6a03594aae7b',
};

exports.slack = {
  clientId: '277516112707.277074206417',
  clientSecret: '62026310b3b8841342854eb14f65ae70',
  verificationToken: 'BVUOTnQlEn5vBZQG6AaACegL',
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
if (!this.appToken) {
  throw new Error('Property ayro.appToken is required');
}
if (!this.jsSdkVersion) {
  throw new Error('Property ayro.jsSdkVersion is required');
}
if (!this.androidSdkVersion) {
  throw new Error('Property ayro.androidSdkVersion is required');
}

logger.info('Using %s environment settings', this.env);
logger.info('Debug mode is %s', this.debug ? 'ON' : 'OFF');
