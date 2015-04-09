'use strict';

/**
 * This file wires up all the routes.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  9 April 2015
 */

// controllers
var home = require('../app/controllers/HomeController');

module.exports = function(router) {
    router.get('/', home.index);
};
