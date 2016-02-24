'use strict';

let mongoose = require('mongoose');

let app = require('./app');

let connStr = 'mongodb://localhost:27017/multiplayer-game';

mongoose.connect(connStr, function (err) {
  if (err) { throw err };

  console.log('Successfully connected to MongoDB');
});
