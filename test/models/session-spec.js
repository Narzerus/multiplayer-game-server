'use strict';

require('../spec-helper');

let _ = require('lodash');
let db = require('../../db');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');

let User = require('../../models/user.js');
let Session = require('../../models/session.js');

chai.use(chaiAsPromised);

let expect = chai.expect;

let session, user;

beforeEach(function (done) {
  user = new User({
    email: 'randmail@gmail.com',
    password: 'foo'
  });

  user
    .save()
    .then(function () {
      session = new Session({
        user_id: user._id
      });
      return session.save();
    })
    .then(function () {
      done();
    })
    .catch(function (err) {
      console.log(err)
    });
});

describe('Session', function () {
  describe('middleware', function () {
    it('sets timestamps on save', function () {
      expect(session.created_at).to.be.a('date');
      expect(session.updated_at).to.be.a('date');
    });

    it('sets unique token on create', function () {
      expect(session.token).to.be.a('string');
    });
  });
});
