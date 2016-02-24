'use strict';

let mongoose = require('mongoose');

let User = require('./models/user.js');

let connStr = 'mongodb://localhost:27017/multiplayer-game';

mongoose.connect(connStr, function (err) {
  if (err) { throw err };

  console.log('Successfully connected to MongoDB');
});

let testUser = new User({
  email: 'narzerus@gmail.com',
  password: 'somepass'
});

testUser.save()
  .then(function (err) {
    if (err) { throw err; }

    console.log('user saved!');

    return true;
  })
  .then(function () {
    return User.findOne({ username: 'narzerus@gmail.com' });
  })
  .then(function (err, user) {
    if (err) { throw err; }

    console.log(user);
  })
  .catch(function (err) {
    console.log(err);
  });
