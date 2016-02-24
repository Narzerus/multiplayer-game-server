'use strict';

let server = require('../server.js');
let userRoutes = require('./users-routes');


server.get('/users/new', userRoutes.new);
