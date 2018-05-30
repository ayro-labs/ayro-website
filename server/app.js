'use strict';

require('newrelic');

const {logger} = require('@ayro/commons');

const settings = require('./configs/settings');
const engine = require('./configs/engine');
const middlewares = require('./configs/middlewares');
const routes = require('./configs/routes');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('json.date-extensions');

logger.setup({
  file: path.resolve('ayro-website.log'),
  level: settings.debug ? 'debug' : 'info',
});

// Parse string to date when call JSON.parse
JSON.useDateParser();

const app = express();

app.set('env', settings.env);
app.set('port', settings.port);
app.set('views', settings.distPath);
app.set('trust proxy', 1);

app.use(express.static(settings.distPath));
app.use(express.static(settings.publicPath));
app.use(morgan('tiny', {stream: {write: message => logger.console.debug(message)}}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compression());
app.use(cors());
app.use(flash());
app.use(session({
  secret: settings.session.secret,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

logger.info('Using %s environment settings', settings.env);
logger.info('Debug mode is %s', settings.debug ? 'ON' : 'OFF');

middlewares.configure(app);
routes.configure(express, app);

app.listen(app.get('port'), () => {
  logger.info('Ayro Website server is listening on port %s', app.get('port'));
});
