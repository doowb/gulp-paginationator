'use strict';

var File = require('vinyl');
var Table = require('cli-table');
var utils = require('./lib/utils');
var paginationator = require('./');
var src = require('src-stream');

mockSrc(5)
  .pipe(paginationator())
  .pipe(display())
  .pipe(display(true))
  ;

//=========== Helper functions for example ============

function display(lookup) {
  var files = [];
  return utils.through.obj(function(file, enc, cb) {
    if (file.data && file.data.pager) {
      files.push(file);
    }
    cb();
  }, function(cb) {
    var stream = this;
    var table = new Table({
      head: ['File', 'IDX', 'FIRST', 'PREV', 'CURRENT', 'NEXT', 'LAST', 'TOTAL']
    });

    var findFile = function(file, prop) {
      var to = find(files, file.data.pager[prop]);
      return to ? to.path : '<undefined>';
    }

    files.forEach(function(file) {
      table.push([
        file.path,
        formatUndefined(file.data.pager.idx),
        lookup ? findFile(file, 'first') : formatUndefined(file.data.pager.first),
        lookup ? findFile(file, 'prev') : formatUndefined(file.data.pager.prev),
        lookup ? findFile(file, 'current') : formatUndefined(file.data.pager.current),
        lookup ? findFile(file, 'next') : formatUndefined(file.data.pager.next),
        lookup ? findFile(file, 'last') : formatUndefined(file.data.pager.last),
        formatUndefined(file.data.pager.total)
      ]);
      stream.push(file);
    });

    console.log(lookup
      ? '======== Resolved file paths ========'
      : '======== File page numbers ========'
    );

    console.log(table.toString());
    console.log();
    cb();
  });
}

function formatUndefined(val) {
  if (typeof val === 'undefined') {
    return '<undefined>';
  }
  return val;
}

function find(files, num) {
  return files[num - 1];
}

function mockSrc(n) {
  var stream = utils.through.obj();
  setImmediate(function() {
    for(var i = 0; i < n; i++) {
      var file = new File({
        path: `file-${i}.hbs`,
        content: `this is file ${i}`
      });
      stream.write(file);
    }
    stream.end();
  });
  return src(stream);
}
