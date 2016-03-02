'use strict';


let mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.DB_URI);
