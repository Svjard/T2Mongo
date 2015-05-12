/**
 * REST API endpoints
 */
var _ = require('lodash'),
    fs = require('fs'),
    os = require('os'),
    path = require('path'),
    pj = require('../package.json'),
    util = require('util');

module.exports = function (app, callback) {
  // render main page
  app.get('/', function (req, res) {
    res.render('index', { 'title': pj.title });
  });

  app.post('/api/cutover/:id', function (req, res) {
    var options = {
      host: 'localhost',
      port: 8080,
      path: '/bailiwick/rest/archie/cutover/' + req.params.id,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    var reqRemote = require('http').request(options, function(resRemote) {
      var output = '';
      console.log(options.host + ':' + resRemote.statusCode);
      resRemote.setEncoding('utf8');

      resRemote.on('data', function (chunk) {
        output += chunk;
      });

      resRemote.on('end', function() {
        //var obj = JSON.parse(output);
        //onResult(resRemote.statusCode, obj);
        console.log('END', resRemote.statusCode);
        res.sendStatus(resRemote.statusCode);
      });
    });

    reqRemote.on('error', function(err) {
      //resRemote.send('error: ' + err.message);
    });

    reqRemote.end();
  });

  callback(app);
};
