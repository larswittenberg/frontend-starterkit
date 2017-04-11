var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
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
