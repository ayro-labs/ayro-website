const apiClient = require('../utils/api-client');

exports.authenticateAccount = (email, password) => {
  return apiClient.post('/auth/accounts', null, {email, password});
};
