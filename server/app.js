'use strict';

const {properties, logger, loggerServer} = require('@ayro/commons');
const path = require('path');

properties.setup(path.join(__dirname, 'config.properties'));
logger.setup(path.join(__dirname, 'ayro-website.log'));
loggerServer.setup();

const settings = require('./configs/settings');
const engine = require('./configs/engine');
const middlewares = require('./configs/middlewares');
const routes = require('./configs/routes');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

require('json.date-extensions');

// Parse string to date when call JSON.parse
JSON.useDateParser();

const app = express();

app.set('env', settings.env);
app.set('port', settings.port);
app.set('views', settings.clientPath);
app.set('trust proxy', 1);

app.use(flash());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('tiny', {stream: {write: message => loggerServer.debug(message)}}));
app.use(cors());
app.use(express.static(settings.clientPath));
app.use('/public', express.static(settings.publicPath));

app.use(session({
  secret: settings.session.secret,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

engine.configure(app);
middlewares.configure(app);
routes.configure(express, app);

app.listen(app.get('port'), () => {
  logger.info('Ayro Website server is listening on port %s', app.get('port'));
});
