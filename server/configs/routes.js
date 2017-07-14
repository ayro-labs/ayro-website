const logger = require('../utils/logger');
const authRoutes = require('../routes/auth');
const indexRoutes = require('../routes');

exports.configure = (express, app) => {

  logger.info('Configuring routes');

  authRoutes(express.Router(), app);
  indexRoutes(express.Router(), app);

};
