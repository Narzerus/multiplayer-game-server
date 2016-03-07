'use strict';

let mongoose = require('mongoose');
let uuid = require('uuid');
let Schema = mongoose.Schema;
let Session;

let hasTimestamps = require('./plugins/has-timestamps');

/**
* Schema
**/
let sessionSchema = new Schema({
  token: {
    type: String,
    index: {
      unique: true
    }
  }
});

/**
* Middleware
**/
sessionSchema.pre('save', function (next) {
  let token;

  if (!this.token) {
    token = uuid.v4();
    while (Session.count({token: token}) > 0) {
      token = uuid.v4();
    }

    this.token = token;
  }

  next();
});

/**
* Methods
*/

/**
* Plugins
*/
sessionSchema.plugin(hasTimestamps);


module.exports = Session = mongoose.model('Session', sessionSchema);
