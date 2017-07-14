const chatzClient = require('../utils/chatz-client');

exports.authenticate = (email, password) => {
  return chatzClient.post('/auth/accounts', {email, password});
};