const accountService = require('../services/account');

module.exports = (router, app) => {

  function createAccount(req, res) {
    accountService.createAccount(req.body.name, req.body.email, req.body.password).then((account) => {
      res.json(account);
    }).catch((err) => {
      res.status(err.statusCode).json(err.body);
    });
  }
  router.post('/', createAccount);

  app.use('/accounts', router);

};
