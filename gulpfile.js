'use strict';
require('es6-promise').polyfill();

const gulp = require('gulp');
const mainBowerFiles = require('main-bower-files')
const $ = require('gulp-load-plugins')();

const sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

const autoprefixerBrowsers = [
  'Android >= 4',
  'iOS >= 6',
  'last 2 Chrome versions',
  'last 2 Firefox versions',
  'Firefox ESR',
  'last 2 Explorer versions',
  'last 2 Safari versions',
  'last 2 Opera versions'
];

gulp.task('build-css', function() {
  return gulp.src('assets/scss/**/*.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed'
    })
    .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: autoprefixerBrowsers
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('build-libs', function () {
  return gulp.src(mainBowerFiles(/\.js/))
    .pipe(gulp.dest('assets/js/lib'));
});

gulp.task('build-js', function () {
  return gulp.src('assets/js/**/*.js')
      .pipe($.uglify())
      .pipe(gulp.dest('public/js'));
});

gulp.task('build-img', function () {
  return gulp.src('assets/img/*')
    .pipe(gulp.dest('public/img'));
});

gulp.task('default',[
  'build-libs',
  'build-js',
  'build-css',
  'build-img'
]);

gulp.task('watch', function () {
  gulp.watch('assets/scss/**/*.scss', ['build-css']);
  gulp.watch('assets/js/**/*.js', ['build-js']);
  gulp.watch('assets/img/**/*', ['build-img']);
});