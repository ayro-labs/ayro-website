const properties = require('./properties');

module.exports = (env) => {
  const settings = {env};
  settings.apiUrl = env === 'production' ? 'https://api.ayro.io' : properties.getValue('api.url', 'http://ayro:3000');
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
