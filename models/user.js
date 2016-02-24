'use strict';

const SALT_ROUNDS = 10;

let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/******
* Schema
*******/
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
  },
  created_at: Date,
  updated_at: Date
});

/******
* Middleware
*******/

/* Set timestamps */
userSchema.pre('save', function (next) {
  let currentDate;

  currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

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
*/

/* Compare password with hash */
userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', userSchema);
