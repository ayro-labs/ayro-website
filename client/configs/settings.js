const properties = require('./properties');

module.exports = (env) => {
  const settings = {env};
  if (env === 'production') {
    settings.apiUrl = 'https://api.ayro.io';
  } else {
    settings.apiUrl = properties.getValue('api.url', 'http://localhost:3000');
  }
  settings.appToken = properties.getValue('ayro.appToken');
  settings.jsSdkVersion = properties.getValue('ayro.jsSdkVersion');
  settings.androidSdkVersion = properties.getValue('ayro.androidSdkVersion');
  if (!settings.appToken) {
    throw new Error('Property ayro.appToken is required');
  }
  if (!settings.jsSdkVersion) {
    throw new Error('Property ayro.jsSdkVersion is required');
  }
  if (!settings.androidSdkVersion) {
    throw new Error('Property ayro.androidSdkVersion is required');
  }
  return settings;
};
