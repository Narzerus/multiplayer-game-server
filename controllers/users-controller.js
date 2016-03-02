'use strict';

let express = require('express');

let User = require('../models/user');
let userRouter = express.Router();

userRouter.post('/', function (req, res) {
  let user;

  // TODO: SOMETHING'S WRONG HERE
});


module.exports = userRouter;
