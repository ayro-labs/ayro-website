const settings = require('./settings');
const logger = require('../utils/logger');
const prerender = require('prerender-node');

exports.configure = (app) => {

  logger.info('Configuring middlewares');

  if (settings.prerender) {
    app.use(prerender.set('prerenderServiceUrl', settings.prerender.url));
  }
};
