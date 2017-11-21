const properties = require('./properties');

exports.env = properties.getValue('app.env', 'development');

if (this.env === 'production') {
  exports.apiUrl = 'https://api.chatz.io';
} else {
  exports.apiUrl = properties.getValue('api.url', 'http://localhost:3000');
}

exports.chatzAppToken = properties.getValue('app.chatzAppToken');

exports.jsSdkVersion = properties.getValue('app.jsSdkVersion');

exports.androidSdkVersion = properties.getValue('app.androidSdkVersion');

if (!this.chatzAppToken) {
  throw new Error('Property app.chatzAppToken is required');
}

if (!this.jsSdkVersion) {
  throw new Error('Property app.jsSdkVersion is required');
}

if (!this.androidSdkVersion) {
  throw new Error('Property app.androidSdkVersion is required');
}