const settings = require('./configs/settings');
const engine = require('./configs/engine');
const middlewares = require('./configs/middlewares');
const routes = require('./configs/routes');
const logger = require('./utils/logger');
const loggerServer = require('./utils/logger-server');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const passport = require('passport');
const https = require('https');
const fs = require('fs');

require('json.date-extensions');

// Parse string to date when call JSON.parse
JSON.useDateParser();

const app = express();

app.set('env', settings.env);
app.set('port', settings.port);
app.set('views', settings.publicPath);
app.set('public', settings.publicPath);
app.set('trust proxy', 1);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('tiny', {stream: loggerServer.stream}));
app.use(express.static(app.get('public')));
app.use(favicon(`${app.get('public')}/assets/img/favicon.ico`));
app.use(session({secret: 'chatz', name: 'session'}));
app.use(passport.initialize());
app.use(passport.session());

engine.configure(app);
middlewares.configure(app);
routes.configure(express, app);

if (settings.https) {
  const key = fs.readFileSync(settings.https.key);
  const cert = fs.readFileSync(settings.https.cert);
  https.createServer({key, cert}, app).listen(app.get('port'), () => {
    logger.info('Chatz Website server is listening on port %s (Https)', app.get('port'));
  });
} else {
  app.listen(app.get('port'), () => {
    logger.info('Chatz Website server is listening on port %s', app.get('port'));
  });
}
