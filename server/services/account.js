const apiClient = require('../utils/api-client');

exports.login = async (email, password) => {
  return apiClient.post('/accounts/login', null, {email, password});
};

exports.logout = async (apiToken) => {
  return apiClient.post('/accounts/logout', apiToken);
};
