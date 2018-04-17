const authService = require('../services/auth');
const errors = require('../utils/errors');
const {logger} = require('@ayro/commons');

module.exports = (router, app) => {

  async function signIn(req, res) {
    try {
      const result = await authService.signIn(req.body.email, req.body.password);
      req.session.apiToken = result.token;
      res.json(result);
    } catch (err) {
      logger.error(err);
      errors.respondWithError(res, err);
    }
  }

  async function signOut(req, res) {
    try {
      await authService.signOut(req.session.apiToken);
      req.session.destroy();
      res.json({});
    } catch (err) {
      logger.error(err);
      errors.respondWithError(res, err);
    }
  }

  router.post('/accounts', signIn);
  router.delete('/accounts', signOut);

  app.use('/auth', router);

};
