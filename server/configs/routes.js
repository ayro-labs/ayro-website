const logger = require('../utils/logger');
const authRoutes = require('../routes/auth');
const appRoutes = require('../routes/app');
const indexRoutes = require('../routes');

exports.configure = (express, app) => {

  logger.info('Configuring routes');

  authRoutes(express.Router(), app);
  appRoutes(express.Router(), app);
  indexRoutes(express.Router(), app);

};
