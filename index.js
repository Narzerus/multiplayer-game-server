'use strict';

let mongoose = require('mongoose');

let app = require('./app');

let connStr = 'mongodb://localhost:27017/multiplayer-game';

mongoose
  .connect(connStr, function (err) {
    if (err) { throw err };
  })
  .then(function () {
    console.log('Successfully connected to MongoDB');
    app.server.listen(3000);
  })
  .then(function () {
    console.log('Webserver listening...');
  })
  .catch(function (err) {
    if (err) { throw err; }
  });
