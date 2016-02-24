'use strict';

let server = require('../server.js');
let userRouter = require('./user-router');

server.use('/users', userRouter);
