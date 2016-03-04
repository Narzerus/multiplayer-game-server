'use strict';

let express = require('express');

let User = require('../models/user');
let userRouter = express.Router();

userRouter.post('/', function (req, res) {
  let user;

  user = new User(req.params.user);

  res.sendStatus(201);
});


module.exports = userRouter;
