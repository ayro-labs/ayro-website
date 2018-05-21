'use strict';

const path = require('../../utils/path');
const {properties, logger} = require('@ayro/commons');

exports.env = properties.get('app.env', 'development');
exports.port = properties.get('app.port', 4000);
exports.debug = properties.get('app.debug', false);
exports.distPath = path.root('dist');
exports.publicPath = path.root('server', 'public');

exports.websiteUrl = this.env === 'production' ? 'https://www.ayro.io' : `http://localhost:${this.port}`;
exports.apiUrl = properties.get('api.url', this.env === 'production' ? 'https://api.ayro.io' : 'http://localhost:3000');
exports.prerenderUrl = properties.get('prerender.url');

exports.appToken = properties.get('ayro.appToken');
exports.jsSdkVersion = properties.get('ayro.jsSdkVersion');
exports.androidSdkVersion = properties.get('ayro.androidSdkVersion');
exports.wpPluginVersion = properties.get('ayro.wpPluginVersion');

exports.session = {
  secret: 'ayro.io',
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
