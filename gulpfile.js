var Promise       = require('es6-promise').Promise;
var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var reload        = browserSync.reload();
var del           = require('del');
var rename        = require('gulp-rename');
var plumber       = require('gulp-plumber');
var jade          = require('gulp-jade');
var affected      = require('gulp-jade-find-affected');
var sass          = require('gulp-sass');
var autoprefix    = require('gulp-autoprefixer');
var cssnano       = require('gulp-cssnano');
var jshint        = require('gulp-jshint');

var _project_dist = './dist/';
var _jade_src     = './src/**/!(_)*.jade';
var _jade_dest    = './dist';
var _jade_watch   = './src/**/*.jade';
var _scss_src     = './src/scss/styles.scss';
var _scss_dest    = './dist/css';
var _scss_watch   = './src/scss/**/*.scss';
var _js_src       = './src/js/**/*.js';
var _js_dest      = './dist/js/';


gulp.task('browser-sync', function() {
    browserSync.init({
      reloadDelay: 1000,
       server: {
          baseDir: './dist'
       }
    });
});

gulp.task('jade', function() {
  gulp.src(_jade_src)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(affected())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(_jade_dest))
    .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  gulp.src(_scss_src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefix('last 2 versions'))
    .pipe(cssnano())
    .pipe(gulp.dest(_scss_dest))
    .pipe(browserSync.stream());
});

gulp.task('icons', function() {
    return gulp.src('./src/fonts/**.*')
      .pipe(gulp.dest('./dist/fonts/'));
});


gulp.task('del', function() {
  return del(['dist/']);
});

gulp.task('images', function() {
  gulp.src('./src/images/**.*')
     .pipe(gulp.dest('./dist/images'))
     .pipe(browserSync.stream());
});

gulp.task('js', function() {
  gulp.src(_js_src)
     .pipe(jshint())
     .pipe(gulp.dest(_js_dest))
     .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', function() {
    gulp.watch(_jade_watch , ['jade'], browserSync.reload);
    gulp.watch(_scss_watch , ['sass'], browserSync.reload);
    gulp.watch(_js_src     , ['js'],   browserSync.reload);
    gulp.watch('./dist/images'     , ['images'],   browserSync.reload);
});

gulp.task('default', ['jade', 'images', 'icons', 'sass', 'js', 'watch', 'del', 'browser-sync']);