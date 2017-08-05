const authService = require('../services/auth');
const logger = require('../utils/logger');

module.exports = (router, app) => {

  function authenticateAccount(req, res) {
    authService.authenticateAccount(req.body.email, req.body.password).then((result) => {
      req.session.apiToken = result.token;
      res.json(result);
    }).catch((err) => {
      logger.error(err);
      res.status(err.statusCode).json(err.body);
    });
  }

  router.post('/accounts', authenticateAccount);

  app.use('/auth', router);

};
