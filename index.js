'use strict';

var utils = require('./lib/utils');

/**
 * Uses [paginationator][] to add pagination data to each file coming through the stream.
 *
 * ```js
 * gulp.task('default', function() {
 *   return gulp.src(['*.hbs'])
 *     .pipe(paginationator())
 *     .on('data', function(file) {
 *       console.log(file);
 *       console.log(file.data.pager);
 *     });
 * });
 * ```
 * @param  {Object} `options` Options to control which files are paginated and where the data is put.
 * @param  {String} `options.prop` This is the property that the pagination data will be set on. Defaults to `pager`.
 * @param  {Function} `options.filter` Function that may be used to control which files are paginated.
 * @param  {Function} `options.sort` Function that may be used to sort the files before paginating.
 * @return {Stream} Stream to be passed to `.pipe` that will add pagination data to each file.
 * @api public
 */

module.exports = function paginationator(options) {
  var opts = utils.extend({prop: 'pager'}, options);

  var files = [];
  return utils.through.obj(function(file, enc, cb) {
    files.push(file);
    cb(null);
  }, function(cb) {
    var removed = [];
    var stream = this;
    var Page = utils.paginationator.Page;
    var Pages = utils.paginationator.Pages;
    var pages = new Pages();

    if (typeof opts.filter === 'function') {
      files = files.filter(function(file) {
        var keep = opts.filter.apply(opts.filter, arguments);
        if (!keep) removed.push(file);
        return keep;
      });
    }

    if (typeof opts.sort === 'function') {
      files.sort(opts.sort);
    }

    // need to loop over files to apply all pagination objects so the correct `next/prev` values are accessible
    files.forEach(function(file) {
      file.data = file.data || {};
      file.data[opts.prop] = new Page();
      pages.addPage(file.data[opts.prop]);
    });

    // this loop is for pushing files back into the stream
    files.forEach(function(file) {
      stream.push(file);
    });

    // push any files removed through a filter back into the stream
    removed.forEach(function(file) {
      stream.push(file);
    });

    cb();
  });
};
