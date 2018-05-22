'use strict';

const libsRoutes = require('../routes/libs');
const appRoutes = require('../routes/app');
const indexRoutes = require('../routes');
const {logger} = require('@ayro/commons');

exports.configure = (express, app) => {
  logger.info('Configuring routes');
  libsRoutes(express.Router(), app);
  appRoutes(express.Router(), app);
  indexRoutes(express.Router(), app);
};
