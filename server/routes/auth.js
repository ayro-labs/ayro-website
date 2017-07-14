const settings = require('../configs/settings');
const accountService = require('../services/account');
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;

module.exports = (router, app) => {

  passport.use(new SlackStrategy({
    clientID: settings.slack.clientId,
    clientSecret: settings.slack.clientSecret,
    skipUserProfile: true,
    scope: ['identify', 'commands', 'users:read.email', 'chat:write:bot', 'channels:write', 'channels:read', 'users:read'],
  }, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  }));

  function authenticateAccount(req, res) {
    accountService.authenticate(req.body.email, req.body.password).then((result) => {
      res.json(result);
    }).catch((err) => {
      res.status(err.statusCode).json(err.body);
    });
  }

  router.get('/slack', passport.authorize('slack'));
  router.get('/slack/callback', passport.authorize('slack', {failureRedirect: '/login'}), (req, res) => res.redirect('/'));
  router.post('/accounts', authenticateAccount);

  app.use('/auth', router);

};
