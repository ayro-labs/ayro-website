'use strict';

const settings = require('./settings');
const {logger} = require('@ayro/commons');
const prerender = require('prerender-node');

exports.configure = (app) => {
  logger.info('Configuring middlewares');
  if (settings.prerenderUrl) {
    app.use(prerender.set('prerenderServiceUrl', settings.prerenderUrl));
  }
};
