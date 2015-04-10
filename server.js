'use strict';

/**
 * The main entry file of the application.
 * 
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  9 April 2015
 */

// module dependencies
var koa = require('koa'),
    router = require('koa-router')();

var config = require('./config/config')[process.env.NODE_ENV || 'development'];
var app = koa();

// Configure routes
require('./config/routes')(router);

// Configure koa
require('./config/koa')(app, router, config);

var port = process.argv[2] || config.app.port || 1337;
app.listen(port, function() {
    console.log('Server started on port ' + port);
});
