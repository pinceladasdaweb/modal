var gulp     = require('gulp'),
    header   = require('gulp-header'),
    uglify   = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename   = require('gulp-rename'),
    package  = require('./package.json'),
    banner;

banner = [
  '/*! ',
    '<%= package.name %> ',
    'v<%= package.version %> | ',
    '(c) ' + new Date().getFullYear() + ' <%= package.author %> |',
    ' <%= package.homepage %>',
  ' */',
  '\n'
].join('');

gulp.task('compress:js', function() {
  return gulp.src('src/modal.js')
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('compress:css', function() {
  return gulp.src('src/modal.css')
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function () {
    gulp.watch('src/modal.js', ['compress:js']);
    gulp.watch('src/modal.css', ['compress:css']);
});

gulp.task('default', ['compress:js', 'compress:css']);