const settings = require('../configs/settings');
const errors = require('../utils/errors');
const {logger} = require('@ayro/commons');
const Promise = require('bluebird');
const axios = require('axios');

const githubContentClient = axios.create({
  baseURL: 'https://raw.githubusercontent.com',
});

module.exports = (router, app) => {

  app.get(`/libs/ayro-${settings.jsSdkVersion}.min.js`, (req, res) => {
    Promise.coroutine(function* () {
      try {
        const libUrl = `/ayrolabs/ayro-javascript/${settings.jsSdkVersion}/ayro-${settings.jsSdkVersion}.min.js`;
        const response = yield githubContentClient.get(libUrl);
        res.set('Content-Type', 'text/javascript');
        res.send(response.data);
      } catch (err) {
        logger.error(err);
        errors.respondWithError(res, err);
      }
    })();
  });

  app.get(`/libs/ayro-wordpress-${settings.wpPluginVersion}.zip`, (req, res) => {
    Promise.coroutine(function* () {
      try {
        const libUrl = `/ayrolabs/ayro-wordpress/${settings.wpPluginVersion}/ayro-wordpress-${settings.wpPluginVersion}.zip`;
        const response = yield githubContentClient.get(libUrl);
        res.set('Content-Type', 'application/octet-stream');
        res.send(response.data);
      } catch (err) {
        logger.error(err);
        errors.respondWithError(res, err);
      }
    })();
  });

};
