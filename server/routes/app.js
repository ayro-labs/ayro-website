const settings = require('../configs/settings');
const appService = require('../services/app');
const logger = require('../utils/logger');
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (router, app) => {

  function connectFacebook(req, res, next) {
    req.session.app = req.params.app;
    passport.authorize('facebook')(req, res, next);
  }

  function connectFacebookCallback(req, res, next) {
    passport.authorize('facebook', (err, data) => {
      const apiToken = req.session.apiToken;
      const app = req.session.app;
      const redirectTo = `/apps/${app}/integrations/messenger/setup`;
      const configuration = {
        profile: {
          id: data.profile.id,
          name: data.profile.displayName,
          access_token: data.accessToken,
        },
      };
      appService.addMessengerIntegration(apiToken, app, configuration).then(() => {
        res.redirect(redirectTo);
      }).catch((err) => {
        logger.error(err);
        res.redirect(redirectTo);
      });
    })(req, res, next);
  }

  function connectSlack(req, res, next) {
    req.session.app = req.params.app;
    passport.authorize('slack')(req, res, next);
  }

  function connectSlackCallback(req, res, next) {
    passport.authorize('slack', (err, accessToken) => {
      const apiToken = req.session.apiToken;
      const app = req.session.app;
      const redirectTo = `/apps/${app}/integrations/slack/setup`;
      appService.addSlackIntegration(apiToken, app, accessToken).then(() => {
        res.redirect(redirectTo);
      }).catch((err) => {
        logger.error(err);
        res.redirect(redirectTo);
      });
    })(req, res, next);
  }

  passport.use(new FacebookStrategy({
    clientID: settings.facebook.appId,
    clientSecret: settings.facebook.appSecret,
    callbackURL: `${settings.websiteUrl}/apps/integrations/facebook/connect/callback`,
    profileFields: ['id', 'displayName'],
  }, (accessToken, refreshToken, profile, done) => {
    done(null, {profile, accessToken});
  }));

  passport.use(new SlackStrategy({
    clientID: settings.slack.clientId,
    clientSecret: settings.slack.clientSecret,
    skipUserProfile: true,
    scope: ['identify', 'commands', 'users:read.email', 'chat:write:bot', 'channels:write', 'channels:read', 'users:read'],
  }, (accessToken, refreshToken, profile, done) => {
    done(null, accessToken);
  }));

  router.get('/:app/integrations/facebook/connect', connectFacebook);
  router.get('/integrations/facebook/connect/callback', connectFacebookCallback);
  router.get('/:app/integrations/slack/connect', connectSlack);
  router.get('/integrations/slack/connect/callback', connectSlackCallback);

  app.use('/apps', router);

};
