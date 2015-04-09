'use strict';

/**
 * This file wires up everything regarding koa. All the koa middleware
 * should be configured here.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  9 April 2015
 */

// module dependencies
var jade = require('koa-jade');

var env = process.env.NODE_ENV || 'development';

// Configure koa
module.exports = function(app, router, config) {

    // Use jade as template engine
    app.use(jade.middleware({
        viewPath: config.root + '/app/views',
        noCache: env === 'development',
        locals: {
            pkg: require('../package.json')
        }
    }));

    // Configure the routes
    app.use(router.routes());
    app.use(router.allowedMethods());
};
