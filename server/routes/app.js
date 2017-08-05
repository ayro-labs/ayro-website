const settings = require('../configs/settings');
const appService = require('../services/app');
const logger = require('../utils/logger');
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;

module.exports = (router, app) => {

  function connectSlack(req, res, next) {
    req.session.app = req.params.app;
    passport.authorize('slack')(req, res, next);
  }

  function connectSlackCallback(req, res, next) {
    passport.authorize('slack', (err, accessToken) => {
      const apiToken = req.session.apiToken;
      const app = req.session.app;
      const redirectTo = `/apps/${app}/integrations/slack`;
      appService.addSlackIntegration(apiToken, app, accessToken).then(() => {
        res.redirect(redirectTo);
      }).catch((err) => {
        logger.error(err);
        res.redirect(redirectTo);
      });
    })(req, res, next);
  }

  passport.use(new SlackStrategy({
    clientID: settings.slack.clientId,
    clientSecret: settings.slack.clientSecret,
    skipUserProfile: true,
    scope: ['identify', 'commands', 'users:read.email', 'chat:write:bot', 'channels:write', 'channels:read', 'users:read'],
  }, (accessToken, refreshToken, profile, done) => {
    done(null, accessToken);
  }));

  router.get('/:app/integrations/slack/connect', connectSlack);
  router.get('/integrations/slack/connect/callback', connectSlackCallback);

  app.use('/apps', router);

};
