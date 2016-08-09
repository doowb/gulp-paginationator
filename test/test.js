'use strict';

require('mocha');
var assert = require('assert');
var mockSrc = require('./support/mock-src');
var paginationator = require('../');

describe('gulp-paginationator', function() {
  it('should export a function', function() {
    assert.equal(typeof paginationator, 'function');
  });

  it('should paginate files', function(cb) {
    var files = [];
    mockSrc(5)
      .pipe(paginationator())
      .once('error', cb)
      .on('data', function(file) {
        files.push(file);
      })
      .on('end', function() {
        files.forEach(function(file, i) {
          assert(file);
          assert.equal(file.stem, `file-${i}`);
          assert.equal(typeof file.data.pager, 'object');
          assert.equal(file.data.pager.idx, i);
          assert.equal(file.data.pager.current, i + 1);
        });
        cb();
      });
  });

  it('should put pagination data on the specified property', function(cb) {
    var files = [];
    mockSrc(5)
      .pipe(paginationator({prop: 'pagination'}))
      .once('error', cb)
      .on('data', function(file) {
        files.push(file);
      })
      .on('end', function() {
        files.forEach(function(file, i) {
          assert(file);
          assert.equal(file.stem, `file-${i}`);
          assert.equal(typeof file.data.pager, 'undefined');
          assert.equal(typeof file.data.pagination, 'object');
          assert.equal(file.data.pagination.idx, i);
          assert.equal(file.data.pagination.current, i + 1);
        });
        cb();
      });
  });

  it('should only paginate filtered files', function(cb) {
    var files = [];
    var removed = [];
    function filter(file, i) {
      return (i % 2 === 0);
    }

    mockSrc(5)
      .pipe(paginationator({filter: filter}))
      .once('error', cb)
      .on('data', function(file) {
        if (file.data) {
          files.push(file);
        }
        else {
          removed.push(file);
        }
      })
      .on('end', function() {
        files.forEach(function(file, i) {
          assert(file);
          assert.equal(file.stem, `file-${i * 2}`);
          assert.equal(typeof file.data.pager, 'object');
          assert.equal(file.data.pager.idx, i);
          assert.equal(file.data.pager.current, i + 1);
        });
        removed.forEach(function(file, i) {
          assert(file);
          assert.equal(file.stem, `file-${((i + 1) * 2) - 1}`);
          assert.equal(typeof file.data, 'undefined');
        });
        cb();
      });
  });

  it('should sort files before pagination', function(cb) {
    var files = [];
    function sort(a, b) {
      if (a.stem > b.stem) return -1;
      if (a.stem < b.stem) return 1;
      return 0;
    }

    mockSrc(5)
      .pipe(paginationator({sort: sort}))
      .once('error', cb)
      .on('data', function(file) {
        files.push(file);
      })
      .on('end', function() {
        files.forEach(function(file, i) {
          assert(file);
          assert.equal(file.stem, `file-${files.length - (i + 1)}`);
          assert.equal(typeof file.data.pager, 'object');
          assert.equal(file.data.pager.idx, i);
          assert.equal(file.data.pager.current, i + 1);
        });
        cb();
      });
  });
});
