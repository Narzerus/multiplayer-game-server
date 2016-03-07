'use strict';

const SALT_ROUNDS = 10;

let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let hasTimestamps = require('./plugins/has-timestamps');

/**
* Schema
**/
let userSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  }
});

/**
* Middleware
**/
/* Hash paswords */
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) { return next(); }

  bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) { return next(err); }

      this.password = hash;
      next();
    });
  });
});

/**
* Methods
**/
/* Returns a user if credentials are valid */
userSchema.statics.getAuthenticated = function (email, password) {
  const REASONS = {
    WRONG_CREDENTIALS: 'WRONG_CREDENTIALS'
  };

  return this
    .findOne({email: email})
    .then(function (user) {
      if (!user) {
        return Promise.reject({reason: REASONS.WRONG_CREDENTIALS});
      }

      return user.comparePassword(password).then(function (isMatch) {
        if (isMatch) {
          return Promise.resolve(user);
        }

        return Promise.reject({reason: REASONS.WRONG_CREDENTIALS});
      });
    })
    .catch(function (response) {
      if (response.err) { throw response.err };

      return Promise.reject(response);
    });
}
/* Compare password with hash */
userSchema.methods.comparePassword = function (password) {
  let deferred;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) { throw err; }

      resolve(isMatch);
    });
  });
};

/**
* Plugins
*/
userSchema.plugin(hasTimestamps);


module.exports = mongoose.model('User', userSchema);
