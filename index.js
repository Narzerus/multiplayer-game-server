'use strict';

require('dotenv').config();

let db = require('./db');
let app = require('./app');

app.server.listen(process.env.SERVER_PORT);

db
  .then(function () {
    console.log('Successfully connected to MongoDB');
  })
  .then(function () {
    console.log('Webserver listening...');
  })
  .catch(function (err) {
    if (err) { throw err; }
  });
