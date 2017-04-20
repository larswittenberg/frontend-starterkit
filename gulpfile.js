var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    concat      = require('gulp-concat'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify'),
    autoprefixer= require('gulp-autoprefixer');

//
// Static Server + watching scss/html files
//
gulp.task('serve', ['sass'], function() {

  browserSync.init({
      server: './dist',
      notify: false
  });

  gulp.watch('./src/scss/**/*.*', ['sass']);
  gulp.watch('./src/js/**/*.*', ['copyjs']).on('change', browserSync.reload);
  gulp.watch('./src/*.html', ['copyhtml']).on('change', browserSync.reload);
});



//
// Notify Tasks
//
function scssError(error){
  return "\n"+error.message+"\n";
}



//
// Compile Sass into CSS & auto-inject into browsers
//
gulp.task('sass', function() {
  return gulp.src('./src/scss/**/*.*')
    .pipe( plumber( {errorHandler: notify.onError(scssError)} ) )
    .pipe( sourcemaps.init() )
    .pipe( sass().on('error', sass.logError) )
    .pipe( autoprefixer() )
    .pipe( sourcemaps.write('./') )
    .pipe( gulp.dest('./dist/css') )
    .pipe( browserSync.stream() );
});



//
// Copy Task - HTML
//
gulp.task('copyhtml', function() {
  gulp.src([
    './src/*.html'
  ])
  .pipe( gulp.dest('./dist') );
});



//
// Copy Task - Images
//
gulp.task('copyimages', function() {
  gulp.src([
    './src/images/**/*.*'
  ])
  .pipe( gulp.dest('./dist/images') );
});


//
// Copy Task - JavaScript
//
gulp.task('copyjs', function() {
  gulp.src([
    './src/js/**/*.*'
  ])
  .pipe( gulp.dest('./dist/js') );
});



//
// Copy Task - Fonts
//
gulp.task('copyfonts', function() {
  gulp.src([
    './src/fonts/**/*.*'
  ])
  .pipe( gulp.dest('./dist/fonts') );
});


gulp.task('copy', ['copyhtml', 'copyimages', 'copyjs', 'copyfonts']);


//
// Default Task
//
gulp.task('default', ['serve', 'copy']);
gulp.task('no-serve', ['sass', 'copy']);
