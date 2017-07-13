'use strict';

let logger = require('./logger');

exports.configure = function(express, app) {

  logger.info('Configuring routes');

  require('../routes/auth')(express.Router(), app);
  require('../routes/index')(express.Router(), app);

};