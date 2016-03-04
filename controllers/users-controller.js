'use strict';

let express = require('express');

let User = require('../models/user');
let userRouter = express.Router();

userRouter.post('/', function (req, res) {
  let user, errors;

  user = new User(req.body.user);
  user
    .save()
    .then(function () {
      res.status(201);
      res.json({user: user});
      res.end();
    })
    .catch(function (err) {
      res.status(422);
      res.json(err);
      res.end();
    });
});


module.exports = userRouter;
