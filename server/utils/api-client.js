const settings = require('../configs/settings');
const restifyClients = require('restify-clients');
const Promise = require('bluebird');

const client = restifyClients.createJsonClient(settings.apiUrl);

function getRequestOptions(path, apiToken) {
  const options = {path, headers: {}};
  if (apiToken) {
    options.headers['X-Token'] = apiToken;
  }
  return options;
}

exports.get = (path, apiToken) => {
  return new Promise((resolve, reject) => {
    client.get(getRequestOptions(path, apiToken), (err, req, res, obj) => {
      if (err) {
        reject(err);
      } else {
        resolve(obj);
      }
    });
  });
};

exports.post = (path, apiToken, body) => {
  return new Promise((resolve, reject) => {
    client.post(getRequestOptions(path, apiToken), body, (err, req, res, obj) => {
      if (err) {
        reject(err);
      } else {
        resolve(obj);
      }
    });
  });
};

exports.delete = (path, apiToken) => {
  return new Promise((resolve, reject) => {
    client.del(getRequestOptions(path, apiToken), (err, req, res, obj) => {
      if (err) {
        reject(err);
      } else {
        resolve(obj);
      }
    });
  });
};
