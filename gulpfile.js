var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    plumber     = require('gulp-plumber'),
    autoprefixer= require('gulp-autoprefixer');



//
// Static Server + watching scss/html files
//
gulp.task('serve', ['sass'], function() {

  browserSync.init({
      server: './dist'
  });

  gulp.watch('./src/scss/**/*.*', ['sass']);
  gulp.watch('./src/*.html', ['copy']).on('change', browserSync.reload);
});



//
// Compile Sass into CSS & auto-inject into browsers
//
gulp.task('sass', function() {
  return gulp.src('./src/scss/**/*.*')
    .pipe( plumber() )
    .pipe( sourcemaps.init() )
    .pipe( sass() )
    .pipe( autoprefixer() )
    .pipe( sourcemaps.write('./') )
    .pipe( gulp.dest('./dist/css') )
    .pipe( browserSync.stream() );
});



//
// Copy Task
//
gulp.task('copy', function() {
  gulp.src([
    './src/*.html'
  ])
  .pipe( gulp.dest('./dist') );
});


//
// copy dist to docs
//
gulp.task('copydocs', function() {
  gulp.src([
    './dist/**/*.*'
  ])
  .pipe( gulp.dest('./docs') );
});



//
// Default Task
//
gulp.task('default', ['serve', 'copy']);



//
// Build GitHub Pages - copy files for github-pages branch (/docs)
//
gulp.task('build', ['copydocs']);
