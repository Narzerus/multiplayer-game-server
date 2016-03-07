'use strict';

require('../spec-helper.js');

let _ = require('lodash');
let fetch = require('node-fetch');
let request = require('supertest');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let expect = chai.expect;
let app = require('../../index');
let User = require('../../models/user');

const BASE_URL = `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`;

describe('POST /users', function () {
  describe('VALID PARAMS', function () {
    let req;

    beforeEach(function () {
      req = request(app)
        .post('/users')
        .send({
          user: {
            email: 'foo@bar.com',
            password: '1234'
          }
        });
    });

    it('responds with status 201', function (done) {
      req.expect(201, done);
    });

    it('creates a new user', function (done) {
      req.end(function () {
        User
          .findOne({email: 'foo@bar.com'})
          .then(function (user) {
            expect(user).to.be.an('object');
            expect(user._id).to.be.ok;
            expect(user.email).to.eql('foo@bar.com');
            done();
          })
          .catch(function (err) {
            done(err);
          });
      });
    });

    xit('returns a session object', function () {

    });
  });

  describe('INVALID PARAMS', function () {
    let req;

    beforeEach(function () {
      req = request(app)
        .post('/users')
        .send({
          user: {
            email: '',
            password: '1234'
          }
        })
    });

    it('responds with status 422', function (done) {
      req.expect(422, done);
    });

    it('should return error', function (done) {
      req
        .expect(function (res) {
          expect(res.body.errors).to.be.an('object');
          expect(res.body.errors).to.have.property('email');
        })
        .end(done);
    });

  });
});
