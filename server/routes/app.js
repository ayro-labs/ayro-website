'use strict';

const settings = require('configs/settings');
const appService = require('services/app');
const errors = require('utils/errors');
const {logger} = require('@ayro/commons');
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const _ = require('lodash');

async function getConfigs(req, res) {
  try {
    const config = await appService.getConfigs();
    res.json(config);
  } catch (err) {
    logger.error(err);
    errors.respondWithError(res, err);
  }
}

function connectFacebook(req, res, next) {
  req.flash('app', req.params.app);
  req.flash('apiToken', req.query.api_token);
  passport.authorize('facebook')(req, res, next);
}

function connectFacebookCallback(req, res, next) {
  passport.authorize('facebook', async (err, data) => {
    const app = _.last(req.flash('app'));
    const redirectTo = `/apps/${app}/integrations/messenger/setup`;
    if (err) {
      logger.error(err);
      res.redirect(redirectTo);
      return;
    }
    try {
      const configuration = {
        profile: {
          id: data.profile.id,
          name: data.profile.displayName,
          access_token: data.accessToken,
        },
      };
      const apiToken = _.last(req.flash('apiToken'));
      await appService.addMessengerIntegration(apiToken, app, configuration);
      res.redirect(redirectTo);
    } catch (apiError) {
      logger.error(apiError);
      res.redirect(`${redirectTo}?error=${apiError.code}`);
    }
  })(req, res, next);
}

function connectSlack(req, res, next) {
  req.flash('app', req.params.app);
  req.flash('apiToken', req.query.api_token);
  passport.authorize('slack')(req, res, next);
}

function connectSlackCallback(req, res, next) {
  passport.authorize('slack', async (err, accessToken) => {
    const app = _.last(req.flash('app'));
    const redirectTo = `/apps/${app}/integrations/slack/setup`;
    if (err) {
      logger.error(err);
      res.redirect(redirectTo);
      return;
    }
    try {
      const apiToken = _.last(req.flash('apiToken'));
      await appService.addSlackIntegration(apiToken, app, accessToken);
      res.redirect(redirectTo);
    } catch (apiError) {
      logger.error(apiError);
      res.redirect(`${redirectTo}?error=${apiError.code}`);
    }
  })(req, res, next);
}

module.exports = (router, app) => {
  passport.use(new FacebookStrategy({
    clientID: settings.facebook.appId,
    clientSecret: settings.facebook.appSecret,
    callbackURL: `${settings.websiteUrl}/apps/integrations/facebook/connect/callback`,
    scope: ['manage_pages'],
    profileFields: ['id', 'displayName'],
    enableProof: true,
    authType: 'rerequest',
  }, (accessToken, refreshToken, profile, done) => {
    done(null, {profile, accessToken});
  }));

  passport.use(new SlackStrategy({
    clientID: settings.slack.clientId,
    clientSecret: settings.slack.clientSecret,
    callbackURL: `${settings.websiteUrl}/apps/integrations/slack/connect/callback`,
    scope: ['commands', 'channels:read', 'channels:write', 'chat:write:bot'],
    skipUserProfile: true,
  }, (accessToken, refreshToken, profile, done) => {
    done(null, accessToken);
  }));

  router.get('/configs', getConfigs);
  router.get('/:app/integrations/facebook/connect', connectFacebook);
  router.get('/integrations/facebook/connect/callback', connectFacebookCallback);
  router.get('/:app/integrations/slack/connect', connectSlack);
  router.get('/integrations/slack/connect/callback', connectSlackCallback);

  app.use('/apps', router);
};
