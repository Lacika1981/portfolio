var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var pump = require('pump');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var uncss = require('gulp-uncss');

gulp.task('minify', function () {
  return gulp.src('*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('compress', function (cb) {
  pump([
    gulp.src('js/*.js'),
    uglify(),
    gulp.dest('dist')
  ],
    cb
  );
});

gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('unused-css', function () {
  return gulp.src('css/styles.css')
      .pipe(uncss({
          html: ['index.html', 'posts/**/*.html', 'http://example.com']
      }))
      .pipe(gulp.dest('dist'));
});