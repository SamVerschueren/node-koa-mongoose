'use strict';

/**
 * This model defines the schema of a user that can be used to authenticate
 * someone in the application
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  10 April 2015
 */

// module dependencies
var mongoose = require('mongoose'),
    validator = require('node-mongoose-validator'),
    moment = require('moment'),
    crypto = require('crypto');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName:          {type: String, required: true},
    name:               {type: String, required: true},
    email:              {type: String, required: true},
    birthday:           {type: Date, required: true},
    hashed_password:    {type: String, required: true},
    salt:               {type: String, required: true}
});

// Virtuals
UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = mongoose.model('User').makeSalt();
        this.hashed_password = this.encryptPassword(password);
    });

// validations
UserSchema.path('firstName').validate(validator.notEmpty(), 'Please provide a firstname.');
UserSchema.path('name').validate(validator.notEmpty(), 'Please provide a lastname.');
UserSchema.path('birthday').validate(validator.isBefore(moment().add(1, 'day')), 'The birthday should be before today.');
UserSchema.path('email').validate(validator.isEmail(), 'Please provide a valid email address.');
UserSchema.path('email').validate(function(email, cb) {
    var User = mongoose.model('User');

    if(this.isNew || this.isModified('email')) {
        User.find({email: email}).exec(function(err, users) {
            cb(err || users.length === 0);
        });
    }
    else {
        cb(true);
    }
}, 'The email provided already exists.');

// methods
UserSchema.methods = {
    /**
     * Check if the passwords are the same, if so it will return true, else it will
     * return false.
     *
     * @param  {String}  plainText    The password we wish to authenticate with.
     * @return {Boolean}              A boolean indicating if we are succesfully authenticated or not.
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    /**
     * This method will encrypt the password in combination with the salt of this user
     * with the sha256 algorithm.
     *
     * @param  {String} password      The password that should be encrypted.
     * @return {String}               The encrypted password.
     */
    encryptPassword: function(password) {
        if(!password)
            return '';

        try {
            return crypto.createHmac('sha256', this.salt).update(password).digest('hex');
        }
        catch(err) {
            return '';
        }
    }
};

// static methods
UserSchema.statics = {
    /**
     * This method will generate a random salt that we can use to encrypt the password with.
     *
     * @return {String}               A randomly generated salt.
     */
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    }
};

mongoose.model('User', UserSchema);
