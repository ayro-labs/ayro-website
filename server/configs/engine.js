'use strict';

const {logger} = require('@ayro/commons');
const nunjucks = require('nunjucks');

exports.configure = (app) => {
  logger.info('Configuring view engine');
  app.engine('html', nunjucks.render);
  nunjucks.configure(app.get('views'), {
    autoescape: true,
    express: app,
  });
};