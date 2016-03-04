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


describe('POST /sessions', function () {
  describe('VALID PARAMS', function () {
    xit('responds with status 200', function () {

    });

    xit('creates a new session', function () {

    });

    xit('replaces previous session', function () {

    });
  });

  describe('INVALID PARAMS', function () {
    xit('responds with status 422', function () {

    });

    xit('responds with error', function () {

    });
  });
});

describe('GET sessions/me', function () {
  describe('AUTHORIZED', function () {
    xit('returns a session object', function () {

    });
  });

  describe('UNAUTHORIZED', function () {
    xit('responds with status 401', function () {

    });
  });
});
