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
let Session = require('../../models/session');

const BASE_URL = `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`;

let user;

beforeEach(function (done) {
  user = new User({
    email: 'sessions@controller.com',
    password: 'foo'
  });

  user
    .save()
    .then(function () {
      done();
    });
});

describe('POST /sessions', function () {
  describe('VALID PARAMS', function () {
    let req;

    beforeEach(function () {
      req = request(app)
        .post('/sessions')
        .send({
          login: {
            email: 'sessions@controller.com',
            password: 'foo'
          }
        });
    });

    it('responds with status 201', function (done) {
      req.expect(200, done);
    });

    it('creates a new session', function (done) {
      req.end(function () {
        Session.count({_user: user._id}, function (res) {
          expect(res).to.be(1)
        });
      });
    });

    it('replaces previous session', function (done) {
      let token;

      req.end(function () {
        Session
          .findOne({_user: user._id}, function (res) {
            token = res.token;

            return request(app)
              .post('/sessions')
              .send({
                login: {
                  email: 'sessions@controller.com',
                  password: 'foo'
                }
              })
          })
          .then(function () {
            Session.findOne({_user: user._id}, function (res) {
              expect(res.token).not.to.eql(token);
              done()
            });
          });
      });
    });
  });

  describe('INVALID PARAMS', function () {
    it('responds with status 422', function () {

    });

    it('responds with error', function () {

    });
  });
});

describe('GET sessions/me', function () {
  describe('AUTHORIZED', function () {
    it('returns a session object', function () {

    });
  });

  describe('UNAUTHORIZED', function () {
    xit('responds with status 401', function () {

    });
  });
});
