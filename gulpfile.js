var gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass');


gulp.task('clean', function(cb){
  del(['./app/public'], cb);
});

gulp.task('styles', function(){
  return gulp.src('./app/assets/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/public/css'));
});

gulp.task('scripts', function(){
  return gulp.src(['./app/assets/js/config.js', './app/assets/js/**/**'])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/public/js/'));
});

gulp.task('watch', function(){
  gulp.watch('./app/assets/scss/*.scss', ['styles']);
  gulp.watch('./app/assets/js/**/**', ['scripts']);
});

gulp.task('default', ['clean', 'styles', 'scripts', 'watch']);