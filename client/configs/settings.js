const properties = require('./properties');

module.exports = (env) => {
  const settings = {env};
  if (env === 'production') {
    settings.apiUrl = 'https://api.ayro.io';
  } else {
    settings.apiUrl = properties.getValue('api.url', 'http://localhost:3000');
  }
  return settings;
};
