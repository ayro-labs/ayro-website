const authService = require('../services/auth');
const errors = require('../utils/errors');
const {logger} = require('@ayro/commons');

module.exports = (router, app) => {

  function signIn(req, res) {
    authService.signIn(req.body.email, req.body.password).then((result) => {
      req.session.apiToken = result.token;
      res.json(result);
    }).catch((err) => {
      logger.error(err);
      errors.respondWithError(res, err);
    });
  }

  function signOut(req, res) {
    authService.signOut(req.session.apiToken).then(() => {
      req.session.destroy();
      res.json({});
    }).catch((err) => {
      logger.error(err);
      errors.respondWithError(res, err);
    });
  }

  router.post('/accounts', signIn);
  router.delete('/accounts', signOut);

  app.use('/auth', router);

};
