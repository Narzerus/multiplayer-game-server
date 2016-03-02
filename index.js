'use strict';

require('dotenv').config();

let db = require('./db');
let app = require('./app');

db
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
