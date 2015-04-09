'use strict';

/**
 * This controller handles all the requests regarding the home page.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  9 April 2015
 */

exports.index = function *() {
    yield this.render('home/index', {
        title: 'Home'
    });
};
