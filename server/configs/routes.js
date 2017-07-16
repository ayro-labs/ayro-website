const logger = require('../utils/logger');
const authRoutes = require('../routes/auth');
const accountRoutes = require('../routes/account');
const indexRoutes = require('../routes');

exports.configure = (express, app) => {

  logger.info('Configuring routes');

  authRoutes(express.Router(), app);
  accountRoutes(express.Router(), app);
  indexRoutes(express.Router(), app);

};
