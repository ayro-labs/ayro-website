const accountService = require('../services/account');
const errors = require('../utils/errors');
const {logger} = require('@ayro/commons');

module.exports = (router, app) => {

  async function login(req, res) {
    try {
      const result = await accountService.login(req.body.email, req.body.password);
      req.session.apiToken = result.token;
      res.json(result);
    } catch (err) {
      logger.error(err);
      errors.respondWithError(res, err);
    }
  }

  async function logout(req, res) {
    try {
      await accountService.logout(req.session.apiToken);
      req.session.destroy();
      res.json({});
    } catch (err) {
      logger.error(err);
      errors.respondWithError(res, err);
    }
  }

  router.post('/login', login);
  router.post('/logout', logout);

  app.use('/accounts', router);

};
