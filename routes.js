'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let server = require('./server');

let usersController;

server.use(bodyParser.json());

/* This requires needs to happen after server.use, or middleware is ignored */
usersController = require('./controllers/users-controller');

server.use('/users', usersController);
