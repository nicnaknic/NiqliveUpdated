const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var pump = require('pump');
var clean = require('gulp-clean');



/** 
    Run 'gulp build' from within the command line to 
    minify Js, compile sass and move html into build folder 
**/

gulp.task('build', function( cb ){
    console.log("Gulp is running...");

    gulp.src('src/html/*.html')
        .pipe(gulp.dest('build/html'));

    console.log("Html moved...");

    pump([
        gulp.src('src/js/*.js'),
        uglify(),   
        gulp.dest('build/js')
    ], cb);

    
    console.log("Js minified and moved...");

    gulp.src('src/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/sass/compiled'))
        .pipe(gulp.src('src/sass/compiled/*.css'))
        .pipe(clean())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('build/css'))

    console.log("SASS Compiled to CSS...");


    

    console.log("CSS Merged to bundle and Moved");
}); 

