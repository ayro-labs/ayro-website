const settings = require('../configs/settings');
const restify = require('restify');
const Promise = require('bluebird');

const client = restify.createJsonClient(settings.apiUrl);

exports.get = (url) => {
  return new Promise((resolve, reject) => {
    client.get(url, function(err, req, res, obj) {
      if (err) {
        reject(err);
      } else {
        resolve(obj);
      }
    });
  });
};

exports.post = (url, body) => {
  return new Promise((resolve, reject) => {
    client.post(url, body, function(err, req, res, obj) {
      if (err) {
        reject(err);
      } else {
        resolve(obj);
      }
    });
  });
};