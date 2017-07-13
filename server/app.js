'use strict';

require('newrelic');

let engine = require('./configs/engine'),
    routes = require('./configs/routes'),
    middlewares = require('./configs/middlewares'),
    settings = require('./configs/settings'),
    logger = require('./configs/logger'),
    loggerServer = require('./configs/logger-server'),
    express = require('express'),
    session = require('express-session'),
    morgan = require('morgan'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    passport = require('passport');

let app = express();

app.set('env', settings.env);
app.set('port', settings.port);
app.set('views', settings.publicPath);
app.set('public', settings.publicPath);
app.set('trust proxy', 1);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(favicon(app.get('public') + '/assets/img/favicon.ico'));
app.use(morgan('tiny', {stream: loggerServer.stream}));
app.use(express.static(app.get('public')));
app.use(session({secret: 'chatz', name: 'session'}));
app.use(passport.initialize());
app.use(passport.session());

middlewares.configure(app);
engine.configure(app);
routes.configure(express, app);

if (settings.https) {
  let https = require('https');
  let fs = require('fs');
  let key = fs.readFileSync(settings.https.key);
  let cert = fs.readFileSync(settings.https.cert);
  https.createServer({key: key, cert: cert}, app).listen(app.get('port'), function() {
    logger.info('Chatz Site server is listening on port %s (Https)', app.get('port'));
  });
} else {
  app.listen(app.get('port'), function() {
    logger.info('Chatz Site server is listening on port %s', app.get('port'));
  });
}