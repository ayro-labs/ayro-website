'use strict';

let logger = require('./logger'),
    nunjucks = require('nunjucks');

exports.configure = function(app) {

  logger.info('Configuring view engine');

  app.engine('html', nunjucks.render);
  nunjucks.configure(app.get('views'), {
    tags: {
      blockStart: '<%',
      blockEnd: '%>',
      variableStart: '<$',
      variableEnd: '$>',
      commentStart: '<#',
      commentEnd: '#>'
    },
    autoescape: true,
    express: app
  });

};