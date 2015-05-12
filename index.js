var events = require('events'),
    pj = require('./package.json'),
    os = require('os');

// Rename the process
process.title = pj.name;

// Initialize the web server
require('./lib/webserver')(pj, function (app) {
  // Attach the REST API endpoints to the server
  require('./lib/api')(app, function (app) {
    // Start the web server
    var server = require('http').createServer(app);
    server.listen(app.get('port'), function () {
      console.log(new Date().toLocaleString(), ':', pj.title, 'started on port', app.get('port'));
    });
  });
});

process.on('exit', function () {
  console.log(new Date().toLocaleString(), ':', pj.title, 'exiting');
});

process.on('SIGINT', function () {
  process.exit(1);
});
