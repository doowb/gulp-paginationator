# gulp-paginationator [![NPM version](https://img.shields.io/npm/v/gulp-paginationator.svg?style=flat)](https://www.npmjs.com/package/gulp-paginationator) [![NPM downloads](https://img.shields.io/npm/dm/gulp-paginationator.svg?style=flat)](https://npmjs.org/package/gulp-paginationator) [![Build Status](https://img.shields.io/travis/doowb/gulp-paginationator.svg?style=flat)](https://travis-ci.org/doowb/gulp-paginationator)

Gulp plugin using paginationator to create pagination data for vinyl files coming through the stream.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save gulp-paginationator
```

## Usage

```js
var paginationator = require('gulp-paginationator');
```

## API

### [paginationator](index.js#L26)

Uses [paginationator](https://github.com/doowb/paginationator) to add pagination data to each file coming through the stream.

**Params**

* `options` **{Object}**: Options to control which files are paginated and where the data is put.
* `options.prop` **{String}**: This is the property that the pagination data will be set on. Defaults to `pager`.
* `options.filter` **{Function}**: Function that may be used to control which files are paginated.
* `options.sort` **{Function}**: Function that may be used to sort the files before paginating.
* `returns` **{Stream}**: Stream to be passed to `.pipe` that will add pagination data to each file.

**Example**

```js
gulp.task('default', function() {
  return gulp.src(['*.hbs'])
    .pipe(paginationator())
    .on('data', function(file) {
      console.log(file);
      console.log(file.data.pager);
    });
});
```

## Examples

See the [examples](examples) folder showing each of the options. Run examples using `node` directly:

```bash
$ node examples
$ node examples/prop.js
$ node examples/filter.js
$ node examples/sort.js
```

### options.prop

Change the property that pagination data is stored on.

```js
gulp.task('default', function() {
  return gulp.src(['*.hbs'])
    .pipe(paginationator({prop: 'pagination'}))
    .on('data', function(file) {
      console.log(file);
      console.log(file.data.pagination);
    });
});
```

### options.filter

Only include specific files to be paginated. The files that are not paginated will be pushed
back into the stream after the paginated files.

```js
gulp.task('default', function() {
  return gulp.src(['*.hbs'])
    .pipe(paginationator({
      filter: function(file, i, files) {
        return (i % 2 === 0);
      }
    }))
    .on('data', function(file) {
      console.log(file);
      console.log(file.data && file.data.pager);
    });
});
```

### options.sort

Sort the files before applying pagination.

```js
gulp.task('default', function() {
  return gulp.src(['*.hbs'])
    .pipe(paginationator({
      sort: function(a, b) {
        if (a.stem > b.stem) return 1;
        if (a.stem < b.stem) return -1;
        return 0;
      }
    }))
    .on('data', function(file) {
      console.log(file);
      console.log(file.data.pager);
    });
});
```

## About

### Related projects

* [gulp](https://www.npmjs.com/package/gulp): The streaming build system | [homepage](http://gulpjs.com "The streaming build system")
* [paginationator](https://www.npmjs.com/package/paginationator): Paginate an array into pages of items. | [homepage](https://github.com/doowb/paginationator "Paginate an array into pages of items.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](contributing.md) for avice on opening issues, pull requests, and coding standards.

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](http://twitter.com/doowb)

### License

Copyright © 2016, [Brian Woodward](https://github.com/doowb).
Released under the [MIT license](https://github.com/doowb/gulp-paginationator/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on August 09, 2016._