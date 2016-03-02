'use strict';

let express = require('express');
let bodyParser = require('body-parser');

let server = require('./server');
let usersController = require('./controllers/users-controller');

server.use('/users', usersController);
server.use(bodyParser.json());
