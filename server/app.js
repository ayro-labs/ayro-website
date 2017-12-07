const settings = require('./configs/settings');
const engine = require('./configs/engine');
const middlewares = require('./configs/middlewares');
const routes = require('./configs/routes');
const logger = require('./utils/logger');
const loggerServer = require('./utils/logger-server');
const prerender = require('prerender');
const express = require('express');
const cors = require('cors');
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
app.use(cors());
app.use(express.static(settings.publicPath));

const redisClient = redis.createClient({
  host: settings.redis.host,
  port: settings.redis.port,
  password: settings.redis.password,
});

app.use(session({
  store: new RedisStore({
    client: redisClient,
    prefix: settings.session.prefix,
    ttl: settings.session.ttl,
  }),
  secret: settings.session.secret,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

engine.configure(app);
middlewares.configure(app);
routes.configure(express, app);

app.listen(app.get('port'), () => {
  logger.info('Ayro Website server is listening on port %s', app.get('port'));
});

const prerenderServer = prerender({
  port: settings.prerender.port,
  chromeLocation: settings.prerender.chromeLocation,
});
prerenderServer.use(prerender.sendPrerenderHeader());
prerenderServer.use(prerender.httpHeaders());
prerenderServer.use(prerender.removeScriptTags());
prerenderServer.use(prerender.blockResources());
prerenderServer.use(prerender.whitelist());
prerenderServer.start();
