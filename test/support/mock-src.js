'use strict';

var src = require('src-stream');
var through = require('through2');
var File = require('vinyl');

module.exports = function(n) {
  var stream = through.obj();
  setImmediate(function() {
    for (var i = 0; i < n; i++) {
      var file = new File({
        path: `file-${i}.hbs`,
        content: `this is file ${i}`
      });
      stream.write(file);
    }
    stream.end();
  });
  return src(stream);
};
