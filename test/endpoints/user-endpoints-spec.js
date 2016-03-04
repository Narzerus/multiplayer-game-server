'use strict';

require('../spec-helper.js');
require('../../index.js');

let _ = require('lodash');
let fetch = require('node-fetch');
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let expect = chai.expect;

const BASE_URL = `http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`;

describe('/users', function () {
  describe('POST /', function () {
    it('responds with status 201 if data is valid', function (done) {
      fetch(`${BASE_URL}/users`, {method: 'POST', body: {}}).then(function (res) {
        console.log(res.status);
        expect(res.status).to.eql(201);
        done();
      })
      .catch(function (err) {
        throw err;
      });
    });

    it('responds with status 422 if data is invalid', function (done) {

    });
  });
});
