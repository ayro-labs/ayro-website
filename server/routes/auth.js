const authService = require('../services/auth');
const errors = require('../utils/errors');
const {logger} = require('@ayro/commons');
const Promise = require('bluebird');

module.exports = (router, app) => {

  function signIn(req, res) {
    Promise.coroutine(function* () {
      try {
        const result = yield authService.signIn(req.body.email, req.body.password);
        req.session.apiToken = result.token;
        res.json(result);
      } catch (err) {
        logger.error(err);
        errors.respondWithError(res, err);
      }
    })();
  }

  function signOut(req, res) {
    Promise.coroutine(function* () {
      try {
        yield authService.signOut(req.session.apiToken);
        req.session.destroy();
        res.json({});
      } catch (err) {
        logger.error(err);
        errors.respondWithError(res, err);
      }
    })();
  }

  router.post('/accounts', signIn);
  router.delete('/accounts', signOut);

  app.use('/auth', router);

};
