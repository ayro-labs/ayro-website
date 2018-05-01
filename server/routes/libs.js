'use strict';

const settings = require('../configs/settings');
const errors = require('../utils/errors');
const {logger} = require('@ayro/commons');
const axios = require('axios');

const githubContentClient = axios.create({
  baseURL: 'https://raw.githubusercontent.com',
});

async function getJavascriptSdk(req, res) {
  try {
    const libUrl = `/ayrolabs/ayro-javascript/${settings.jsSdkVersion}/ayro.min.js`;
    const response = await githubContentClient.get(libUrl);
    res.set('Content-Type', 'text/javascript');
    res.send(response.data);
  } catch (err) {
    logger.error(err);
    errors.respondWithError(res, err);
  }
}

async function getWordPressPlugin(req, res) {
  try {
    const libUrl = `/ayrolabs/ayro-wordpress/${settings.wpPluginVersion}/ayro-wordpress.zip`;
    const response = await githubContentClient.get(libUrl);
    res.set('Content-Type', 'application/octet-stream');
    res.send(response.data);
  } catch (err) {
    logger.error(err);
    errors.respondWithError(res, err);
  }
}

module.exports = (router, app) => {
  router.get(`/ayro-${settings.jsSdkVersion}.min.js`, getJavascriptSdk);
  router.get(`/ayro-wordpress-${settings.wpPluginVersion}.zip`, getWordPressPlugin);

  app.use('/libs', router);
};
