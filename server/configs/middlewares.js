'use strict';

let settings = require('./settings'),
    logger = require('./logger');

exports.configure = function(app) {

  logger.info('Configuring middlewares');

  if (settings.prerender) {
    app.use(require('prerender-node').set('prerenderServiceUrl', settings.prerender.url));
  }

};