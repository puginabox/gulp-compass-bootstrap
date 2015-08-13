var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('clean', function(){
    del(['./assets/css/2014-12-30-ag-style.min.css'],{'force':true})
})

gulp.task('sass', function () {
    gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

gulp.task('minify-css', function() {
    gulp.src('./css/*.css')
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(rename("2014-12-30-ag-style.min.css"))
        .pipe(gulp.dest('./deployed/assets/css/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./sass/*.scss', ['clean','sass']);
    gulp.watch('./css/*.css', ['minify-css']);
});

// Default Task
gulp.task('default', ['sass','minify-css','watch']);