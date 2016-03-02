'use strict';

require('../spec-helper');

let _ = require('lodash')
let db = require('../../db');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');

let User = require('../../models/user.js');

chai.use(chaiAsPromised);

let expect = chai.expect;
let user;


beforeEach(function (done) {
  user = new User({
    email: 'foo@bar.com',
    password: 'right-password'
  })

  user.save().then(function () {
    done();
  });
});

describe('User', function () {
  describe('.getAuthenticated', function () {
    it('returns a promise', function () {
      expect(User.getAuthenticated('foo@bar.com', 'right-password').then).to.be.a('function');
    });

    it('resolves with the user if credentials are correct', function () {
      return User.findOne({email: 'foo@bar.com'}).then(function (user) {
        return User.getAuthenticated('foo@bar.com', 'right-password').then(function (result) {
          expect(user._id).to.eql(result._id);
        }).catch(function (err) {
          if (err) { throw err; }
        });
      })
    });

    it('rejects with the reason if credentials are incorrect', function (done) {
      return User.getAuthenticated('foo@bar.com', 'wrong-password')
        .catch(function (result) {
          expect(result.reason).to.eql('WRONG_CREDENTIALS');
          expect(result.err).to.be.an('undefined');
          done();
        });
    });
  });

  describe('#comparePassword', function () {
    it('returns a promise', function () {
      expect(user.comparePassword('right-password').then).to.be.a('function');
    });

    it('resolves with True if password matches', function () {
      return expect(user.comparePassword('right-password')).eventually.equal(true);
    });

    it('resolves with False if password doesn\'t match', function () {
      return expect(user.comparePassword('wrong-password')).eventually.equal(false);
    });
  });
});
