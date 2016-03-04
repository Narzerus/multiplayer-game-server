'use strict';

require('../spec-helper.js');

let app = require('../../index.js');
let _ = require('lodash');
let fetch = require('node-fetch');
let request = require('supertest');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let expect = chai.expect;

const BASE_URL = `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`;

describe('/users', function () {
  describe('POST /', function () {
    describe('VALID PARAMS', function () {
      it('responds with status 201', function (done) {
        request(app)
          .post('/users')
          .send({
            user: {
              email: 'narzerus@gmail.com',
              password: '1234'
            }
          })
          .expect(201, done);
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
            console.log(res.body.errors)
            expect(res.body.errors).to.have.property('email');
          })
          .end(done);
      });

    });
  });
});
