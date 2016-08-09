'use strict';

var mockSrc = require('./lib/mock-src');
var mockDates = require('./lib/mock-dates');
var display = require('./lib/display');
var paginationator = require('../');

/**
 * This example will sort the files before paginating them.
 * Mock dates are added to the `file.data` object and used for sorting.
 */

mockSrc(10)
  .pipe(mockDates())
  .pipe(paginationator({
    sort: function(a, b) {
      var aDate = `${a.data.year}-${a.data.month}-${a.data.day}`;
      var bDate = `${b.data.year}-${b.data.month}-${b.data.day}`;
      if (aDate > bDate) return -1;
      if (aDate < bDate) return 1;
      return 0;
    }
  }))
  .on('data', console.log)
  .pipe(display())
  .pipe(display({lookup: true}));
