'use strict';

module.exports = (router, app) => {
  app.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    res.render('sitemap.xml');
  });

  app.get('/robots.txt', (req, res) => {
    res.header('Content-Type', 'text/plain');
    res.render('robots.txt');
  });

  app.get('/*', (req, res) => {
    res.render('index.html');
  });
};
