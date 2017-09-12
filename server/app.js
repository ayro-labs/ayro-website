const settings = require('./configs/settings');
const engine = require('./configs/engine');
const middlewares = require('./configs/middlewares');
const cors = require('./configs/cors');
const routes = require('./configs/routes');
const logger = require('./utils/logger');
const loggerServer = require('./utils/logger-server');
const fs = require('fs');
const https = require('https');
const express = require('express');
const flash = require('connect-flash');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

require('json.date-extensions');

// Parse string to date when call JSON.parse
JSON.useDateParser();

const app = express();

app.set('env', settings.env);
app.set('port', settings.port);
app.set('views', settings.publicPath);
app.set('trust proxy', 1);

app.use(flash());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('tiny', {stream: loggerServer.stream}));
cors.configure(app);
app.use(express.static(settings.publicPath));

const redisClient = redis.createClient(settings.redis.port, settings.redis.host);
if (settings.redis.password) {
  redisClient.auth(settings.redis.password, (err) => {
    if (err) {
      logger.error('Could not authenticate to redis.', err);
      process.exit(1);
    }
  });
}

app.use(session({
  store: new RedisStore({
    client: redisClient,
    prefix: settings.session.prefix,
    ttl: settings.session.ttl,
  }),
  secret: settings.session.secret,
}));

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
