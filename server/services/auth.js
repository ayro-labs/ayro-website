const apiClient = require('../utils/api-client');

exports.signIn = (email, password) => {
  return apiClient.post('/auth/accounts', null, {email, password});
};

exports.signOut = (apiToken) => {
  return apiClient.post('/auth/accounts/sign_out', apiToken, {});
};
