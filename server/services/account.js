const chatzClient = require('../utils/chatz-client');

exports.createAccount = (name, email, password) => {
  return chatzClient.post('/accounts', {name, email, password});
};

exports.authenticate = (email, password) => {
  return chatzClient.post('/auth/accounts', {email, password});
};
