'use strict';

let settings = require('../configs/settings'),
    passport = require('passport'),
    SlackStrategy = require('passport-slack').Strategy;

module.exports = function(router, app) {

  passport.use(new SlackStrategy({
    clientID: settings.slack.client_id,
    clientSecret: settings.slack.client_secret,
    skipUserProfile: true,
    scope: ['identify', 'commands', 'users:read.email', 'chat:write:bot', 'channels:write', 'channels:read', 'users:read']
  }, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  }));

  router.get('/slack', passport.authorize('slack'));
  router.get('/slack/callback', passport.authorize('slack', {failureRedirect: '/login'}), (req, res) => res.redirect('/'));

  app.use('/auth', router);

};