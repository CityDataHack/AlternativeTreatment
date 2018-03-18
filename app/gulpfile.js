var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
require('dotenv').config({ path: 'variables.env' });


gulp.task('default', ['browser-sync'], function () {});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:" + process.env.PORT,
    files: ["**/**/*.*"],
    port: 7000
  });
});

gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
    script: 'app.js'
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});