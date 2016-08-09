'use strict';

var Table = require('cli-table');
var through = require('through2');
var extend = require('extend-shallow');

module.exports = function(options) {
  var opts = extend({prop: 'pager'}, options);
  var lookup = opts.lookup;

  var files = [];
  return through.obj(function(file, enc, cb) {
    if (file.data && file.data[opts.prop]) {
      files.push(file);
    }
    cb();
  }, function(cb) {
    var stream = this;
    var table = new Table({
      head: ['File', 'IDX', 'FIRST', 'PREV', 'CURRENT', 'NEXT', 'LAST', 'TOTAL']
    });

    var findFile = function(file, prop) {
      var to = find(files, file.data[opts.prop][prop]);
      return to ? to.path : '<undefined>';
    };

    files.forEach(function(file) {
      table.push([
        file.path,
        formatUndefined(file.data[opts.prop].idx),
        lookup ? findFile(file, 'first') : formatUndefined(file.data[opts.prop].first),
        lookup ? findFile(file, 'prev') : formatUndefined(file.data[opts.prop].prev),
        lookup ? findFile(file, 'current') : formatUndefined(file.data[opts.prop].current),
        lookup ? findFile(file, 'next') : formatUndefined(file.data[opts.prop].next),
        lookup ? findFile(file, 'last') : formatUndefined(file.data[opts.prop].last),
        formatUndefined(file.data[opts.prop].total)
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
};

function formatUndefined(val) {
  if (typeof val === 'undefined') {
    return '<undefined>';
  }
  return val;
}

function find(files, num) {
  return files[num - 1];
}
