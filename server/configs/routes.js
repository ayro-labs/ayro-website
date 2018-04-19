const accountRoutes = require('../routes/account');
const appRoutes = require('../routes/app');
const libsRoutes = require('../routes/libs');
const indexRoutes = require('../routes');
const {logger} = require('@ayro/commons');

exports.configure = (express, app) => {

  logger.info('Configuring routes');

  accountRoutes(express.Router(), app);
  appRoutes(express.Router(), app);
  libsRoutes(express.Router(), app);
  indexRoutes(express.Router(), app);

};
