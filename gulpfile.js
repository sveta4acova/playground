const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');

gulp.task('scss', () => {
  return (
    gulp
      .src('dev/scss/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(
        autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
          cascade: true
        })
      )
      .pipe(cssnano())
      .pipe(gulp.dest('public/stylesheets'))
  );
});

gulp.task('scripts', () => {
  return (
    gulp
      .src([
        'dev/js/auth.js',
        'dev/js/post.js',
        'dev/js/comment.js',
        'node_modules/medium-editor/dist/js/medium-editor.min.js'
      ])
      .pipe(concat('scripts.js'))
      // .pipe(uglify())
      .pipe(gulp.dest('public/javascripts'))
  );
});

gulp.task('build', ['scss', 'scripts']);

gulp.task('default', ['build'], () => {
  gulp.watch('dev/scss/**/*.scss', ['scss']);
  gulp.watch('dev/js/**/*.js', ['scripts']);
});
