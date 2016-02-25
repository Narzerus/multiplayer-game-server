'use strict';

let express = require('express');
let bodyParser = require('body-parser');

let server = require('../server.js');
let userRouter = require('./user-router');

server.use('/users', userRouter);
server.use(bodyParser.json());
