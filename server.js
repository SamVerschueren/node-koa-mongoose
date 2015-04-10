'use strict';

/**
 * The main entry file of the application.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  9 April 2015
 */

// module dependencies
var koa = require('koa'),
    router = require('koa-router')(),
    fs = require('fs'),
    mongoose = require('mongoose');

var config = require('./config/config')[process.env.NODE_ENV || 'development'];
var app = koa();

// Connect to mongodb
var connect = function() {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
    if(~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Configure routes
require('./config/routes')(router);

// Configure koa
require('./config/koa')(app, router, config);

var port = process.argv[2] || config.app.port || 1337;
app.listen(port, function() {
    console.log('Server started on port ' + port);
});
