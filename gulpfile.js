'use strict';

var gulp = require('gulp'),
    pf = require('./js/paramFiles'),
    // js
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    webpack = require('gulp-webpack'),
    // CONSTANTS
    JS_PATH = 'js',
    PUBLIC_JS = 'public/js',
    JS_ENTRY_POINTS = [
      JS_PATH + '/main.js'
    ];

/**
 * Linting JS files
 * Possible send files to param -files=...
 */
gulp.task('jslint', function() {
  var files = pf.paramFiles();

  if (!files) {
    files = [pf.js(JS_PATH)];
  }
  
  files = files.concat(['!public/**/*.*', '!bower_components/**/*.*']);

  return gulp.src(files)
    .pipe(jshint.extract())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jscs())
    .pipe(jshint.reporter('fail'));
});

/**
 * Processing JS files
 */
gulp.task('js', ['jslint'], function() {
  var argv = process.argv,
      watchOn = (argv.indexOf('--watch') !== -1);
  
  return gulp.src(JS_ENTRY_POINTS)
    .pipe(webpack({
      watch: watchOn,
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          { test: /\.js/, loader: '6to5' }
        ]
      }
    }))
    .pipe(gulp.dest(PUBLIC_JS));
});

gulp.task('default', ['js']);
