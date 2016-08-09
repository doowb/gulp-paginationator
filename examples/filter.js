'use strict';


var mockSrc = require('./lib/mock-src');
var display = require('./lib/display');
var paginationator = require('../');

/**
 * This example will filter out all odd numbered files
 * so only even files will be paginated.
 */

mockSrc(10)
  .pipe(paginationator({
    filter: function(file, i, files) {
      return (i % 2 === 0);
    }
  }))
  .on('data', console.log)
  .pipe(display())
  .pipe(display({lookup: true}));
