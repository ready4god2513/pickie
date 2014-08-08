var gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass');


gulp.task('clean', function(cb){
  del(['./app/public'], cb);
});

gulp.task('styles', ['clean'], function(){
  return gulp.src('./app/assets/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/public/css'));
});

gulp.task('scripts', ['clean'], function(){
  return gulp.src(['./app/assets/js/config.js', './app/assets/js/**/**'])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/public/js/'));
});

gulp.task('watch', function(){
  gulp.watch('./app/assets/scss/*.scss', ['styles']);
  gulp.watch('./app/assets/js/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'watch']);