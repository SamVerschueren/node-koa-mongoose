'use strict';

/**
 * Describe all the configuration per environment.
 *
 * @author  Sam Verschueren      <sam.verschueren@gmail.com>
 * @since   9 April 2015
 */

// module dependencies
var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

// Export the config objects
module.exports = {
    // development configuration
    development: {
        db: 'mongodb://localhost/koa_dev',
        root: rootPath,
        app: {
            name: 'Koa | Development',
            host: 'http://localhost',
            port: 1337
        }
    },
    // production configuration
    production: {
        db: 'mongodb://localhost/koa',
        root: rootPath,
        app: {
            name: 'Koa',
            host: 'http://localhost',
            port: 80
        }
    }
};
