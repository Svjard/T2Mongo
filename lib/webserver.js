/**
 * Web server
 */
var bodyParser = require('body-parser'),
    domainCreate = require('domain').create,
    express = require('express'),
    path = require('path'),
    util = require('util'),
    _ = require('lodash');

module.exports = function (pj, callback) {
  var app = express();

  require('http').maxSockets = Infinity;

  app.enable('trust proxy');
  app.set('port', pj.config.port || 3000);
  app.set('views', path.join(__dirname, '..', 'public'));
  app.set('view engine', 'ejs');
  app.use(require('errorhandler')());
  app.use(require('morgan')('dev')); // logging
  app.use(require('compression')()); // gzip
  app.use(require('method-override')()); // provides REST support to browsers that only support GET and POST
  app.use(require('cookie-session')({
    keys: ['Teradata orange', '#F57300']
  }));
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  }));
  app.use(bodyParser.json({ 'limit': '50mb' }))
  app.use(require('cookie-parser')('Teradata is a great for analytics'));
  app.use(require('serve-static')(path.join(__dirname, '..', 'public')));

  return callback(app);
};