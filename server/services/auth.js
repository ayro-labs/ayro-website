const apiClient = require('../utils/api-client');

exports.signIn = (email, password) => {
  return apiClient.post('/auth/accounts', null, {email, password});
};

exports.signOut = (apiToken) => {
  return apiClient.delete('/auth/accounts', apiToken);
};
