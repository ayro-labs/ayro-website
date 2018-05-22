'use strict';

const errors = require('../utils/errors');
const {logger} = require('@ayro/commons');
const axios = require('axios');

const githubContentClient = axios.create({
  baseURL: 'https://raw.githubusercontent.com',
});

async function getWordPressPlugin(req, res) {
  try {
    const libUrl = `/ayrolabs/ayro-wordpress/${req.params.version}/ayro-wordpress-${req.params.version}.zip`;
    const response = await githubContentClient.get(libUrl);
    res.set('Content-Type', 'application/octet-stream');
    res.send(response.data);
  } catch (err) {
    logger.error(err.message);
    errors.respondWithError(res, err);
  }
}

module.exports = (router, app) => {
  router.get('/ayro-wordpress-:version.zip', getWordPressPlugin);

  app.use('/libs', router);
};
