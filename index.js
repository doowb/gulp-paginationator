'use strict';

var utils = require('./lib/utils');

module.exports = function(options) {
  var opts = utils.extend({}, options);

  var files = [];
  return utils.through.obj(function(file, enc, cb) {
    files.push(file);
    cb(null);
  }, function(cb) {
    var stream = this;
    var Page = utils.paginationator.Page;
    var Pages = utils.paginationator.Pages;
    var pages = new Pages();

    // need to loop over files to apply all pagination objects so the correct `next/prev` values are accessible
    files.forEach(function(file) {
      file.data = file.data || {};
      file.data.pager = new Page();
      pages.addPage(file.data.pager);
    });

    // this loop is for pushing files back into the stream
    files.forEach(function(file) {
      stream.push(file);
    });

    cb();
  });
};
