const settings = require('../configs/settings');
const errors = require('../utils/errors');
const axios = require('axios');

const githubContentClient = axios.create({
  baseURL: 'https://raw.githubusercontent.com',
});

module.exports = (router, app) => {

  app.get(`/libs/ayro-${settings.jsSdkVersion}.min.js`, (req, res) => {
    const libUrl = `/ayrolabs/ayro-javascript/master/ayro-${settings.jsSdkVersion}.min.js`;
    githubContentClient.get(libUrl).then((response) => {
      res.set('Content-Type', 'text/javascript');
      res.send(response.data);
    }).catch((err) => {
      errors.respondWithError(res, err);
    });
  });

};
