'use strict';

var through = require('through2');

module.exports = function() {
  return through.obj(function(file, enc, cb) {
    file.data = file.data || {};
    file.data.year = randomYear();
    file.data.month = randomMonth();
    file.data.day = randomDay();
    file.stem = `${file.data.year}-${file.data.month}-${file.data.day}-${file.stem}`;
    cb(null, file);
  });
};

function random(arr) {
  return arr[Math.floor(Math.random() * (arr.length))];
}

function randomYear() {
  var years = ['2013', '2014', '2015', '2016'];
  return random(years);
}

function randomMonth() {
  var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  return random(months);
}

function randomDay() {
  var days = [];
  for (var i = 1; i < 25; i++) {
    days.push(pad(i));
  }
  return random(days);
}

function pad(n) {
  return '' + (n < 10 ? '0' : '') + n;
}
