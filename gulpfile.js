const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  'src': {
    'scss': 'public/src/scss/**/*.scss',
  },
  'dist': {
    'css': 'public/src/css/',
  }
};

gulp.task('sass', done => {
  gulp.src(paths.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.css))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(paths.dist.css));
  done();
});

gulp.task('dev', () => {
  gulp.watch(paths.src.scss, gulp.task('sass'));
});