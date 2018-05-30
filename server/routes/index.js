'use strict';

module.exports = (router, app) => {
  app.get('/sitemap.xml', function(req, res, next) {
    res.header('Content-Type', 'application/xml');
    res.render('sitemap.xml');
  });

  app.get('/robots.txt', function(req, res, next) {
    res.header('Content-Type', 'text/plain');
    res.render('robots.txt');
  });

  app.get('/*', (req, res) => {
    res.render('index.html');
  });
};
