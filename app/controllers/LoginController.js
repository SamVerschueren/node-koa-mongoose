'use strict';

/**
 * This controller handles all the requests regarding signing in.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  10 April 2015
 */

var passport = require('koa-passport');

exports.index = function*() {
    yield this.render('login/index', {
        title: 'Login'
    });
};
