'use strict';

var mockSrc = require('./lib/mock-src');
var display = require('./lib/display');
var paginationator = require('../');

/**
 * This example will put the data on a different property on `file.data`
 */

var prop = 'pagination';

mockSrc(5)
  .pipe(paginationator({prop: prop}))
  .on('data', function(file) {
    console.log(file);
    console.log(file.data);
    console.log();
  })
  .pipe(display({prop: prop}))
  .pipe(display({prop: prop, lookup: true}));
