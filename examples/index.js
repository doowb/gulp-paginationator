'use strict';

var mockSrc = require('./lib/mock-src');
var display = require('./lib/display');

var paginationator = require('../');

mockSrc(5)
  .pipe(paginationator())
  .pipe(display())
  .pipe(display({lookup: true}));
