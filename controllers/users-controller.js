'use strict';

let express = require('express');

let User = require('../models/user');
let userRouter = express.Router();

userRouter.get('/', function (req, res) {
  res.send('User index test!');
});

userRouter.post('/', function (req, res) {
  let user;

  console.log(req.body);
  res(req.body);
});


module.exports = userRouter;
