const logger = require('../utils/logger');

exports.configure = (app) => {

  logger.info('Configuring CORS middleware');

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Token');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
};
