const apiClient = require('../utils/api-client');

exports.signIn = async (email, password) => {
  return apiClient.post('/auth/accounts', null, {email, password});
};

exports.signOut = async (apiToken) => {
  return apiClient.delete('/auth/accounts', apiToken);
};
