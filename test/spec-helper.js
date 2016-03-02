'use strict';

require('dotenv').config({path: './test/.env'});

require('mocha-mongoose')(process.env.DB_URI);
