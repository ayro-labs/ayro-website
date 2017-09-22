const authService = require('../services/auth');
const logger = require('../utils/logger');

module.exports = (router, app) => {

  function signIn(req, res) {
    authService.signIn(req.body.email, req.body.password).then((result) => {
      req.session.apiToken = result.token;
      res.json(result);
    }).catch((err) => {
      logger.error(err);
      res.status(err.statusCode).json(err.body);
    });
  }

  function signOut(req, res) {
    authService.signOut(req.session.apiToken).then(() => {
      req.session.destroy();
      res.json({});
    }).catch((err) => {
      logger.error(err);
      res.status(err.statusCode).json(err.body);
    });
  }

  router.post('/accounts', signIn);
  router.delete('/accounts', signOut);

  app.use('/auth', router);

};
