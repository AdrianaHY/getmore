var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require("gulp-connect");
var browserSync = require('browser-sync').create();

var rutas= {
  html:'./src/*.html',
  scss:'./src/assets/scss/*.scss',
  js: './src/assets/js/*.js'
}


gulp.task('CSS', function(){
  gulp.src(rutas.scss)
  .pipe(sass({
    outputStyle:'compressed'
  }))
  .on('error', sass.logError)
  .pipe(gulp.dest('./public/assets/css'))
});


gulp.task('JS', function(){
  gulp.src(rutas.js)
  .pipe(gulp.dest('./public/assets/js'))
});


gulp.task('HTML', function(){
  gulp.src(rutas.html)
  .pipe(gulp.dest('./public'))
})



gulp.task('html-watch', ['HTML'], function(done){
  browserSync.reload();
  done();
});

gulp.task('js-watch', ['JS'], function(done){
  browserSync.reload();
  done();
});

gulp.task('css-watch', ['CSS'], function(done){
  browserSync.reload();
  done();
});



gulp.task('serve', function(){
  browserSync.init({
    server:{
      baseDir: './public'
    }
  });

  gulp.watch(rutas.html, ['HTML', 'html-watch']);
  gulp.watch(rutas.scss, ['CSS', 'css-watch']);
  gulp.watch(rutas.js, ['JS', 'js-watch']);
})
