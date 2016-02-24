'use strict';

let express = require('express');


let userRouter = express.Router();

userRouter.get('/', function (req, res) {
  res.send('User index test!');
});

userRouter.post('/', function (req, res) {
  res.send('User create test!');
});


module.exports = userRouter;
