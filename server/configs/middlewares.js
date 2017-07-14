const settings = require('./settings');
const logger = require('../utils/logger');

exports.configure = function(app) {

  logger.info('Configuring middlewares');

  if (settings.prerender) {
    app.use(require('prerender-node').set('prerenderServiceUrl', settings.prerender.url));
  }

};