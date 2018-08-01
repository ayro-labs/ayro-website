'use strict';

const {configs} = require('@ayro/commons');
const path = require('path');

const config = configs.load(path.resolve('server', 'config.yml'));

exports.env = config.get('app.env', 'development');
exports.port = config.get('app.port', 4000);
exports.debug = config.get('app.debug', false);
exports.distPath = path.resolve('dist');
exports.publicPath = path.resolve('server', 'public');

exports.websiteUrl = this.env === 'production' ? 'https://www.ayro.io' : `http://localhost:${this.port}`;
exports.apiUrl = config.get('api.url', this.env === 'production' ? 'https://api.ayro.io' : 'http://localhost:3000');
exports.prerenderUrl = config.get('prerender.url');

exports.appToken = config.get('ayro.appToken');
exports.jsSdkVersion = config.get('ayro.jsSdkVersion');
exports.androidSdkVersion = config.get('ayro.androidSdkVersion');
exports.wpPluginVersion = config.get('ayro.wpPluginVersion');

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
