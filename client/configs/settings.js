const properties = require('./properties');

exports.env = properties.getValue('app.env', 'development');

if (this.env === 'production') {
  exports.apiUrl = 'https://api.ayro.io';
} else {
  exports.apiUrl = properties.getValue('api.url', 'http://localhost:3000');
}

exports.ayroAppToken = properties.getValue('ayro.appToken');
exports.ayroJsSdkVersion = properties.getValue('ayro.jsSdkVersion');
exports.ayroAndroidSdkVersion = properties.getValue('ayro.androidSdkVersion');

if (!this.ayroAppToken) {
  throw new Error('Property ayro.appToken is required');
}

if (!this.ayroJsSdkVersion) {
  throw new Error('Property ayro.jsSdkVersion is required');
}

if (!this.ayroAndroidSdkVersion) {
  throw new Error('Property ayro.androidSdkVersion is required');
}
