global.hostname = "localhost";

var gulp     = require('gulp'),
sass         = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
minifycss    = require('gulp-minify-css'),
rename       = require('gulp-rename'),
concatCss    = require('gulp-concat-css'),
uglify       = require('gulp-uglify'),
concat       = require('gulp-concat'),
imagemin     = require('gulp-imagemin');

gulp.task('express', function() {
	var express = require('express');
	var app     = express();
	app.use(require('connect-livereload')({port: 35729}));
	app.use(express.static(__dirname + '/dist'));
	app.listen('81', hostname);
});

var tinylr;
gulp.task('livereload', function() {
	tinylr = require('tiny-lr')();
	tinylr.listen(35729);
});

function notifyLiveReload(event) {
	var fileName = require('path').relative(__dirname, event.path);
	tinylr.changed({
		body: {
			files: [fileName]
		}
	});
}

gulp.task('compress', function() {
  return gulp.src(['app/img/*','app/img/favicon/*'])
  .pipe(imagemin(''))
  .pipe(gulp.dest('dist/img/'));
});

gulp.task('scriptsConcat', function() {
  return gulp.src('app/libs/**/*.js')
    .pipe(concat('plagin.min.js'))
    .pipe(uglify(''))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scriptsCommon', function() {
  return gulp.src('app/js/*.js')
    .pipe(concat('common.min.js'))
    .pipe(uglify(''))
    .pipe(gulp.dest('dist/js'));
});
 
gulp.task('vendorCss', function () {
  return gulp.src('app/libs/**/*.css')
    .pipe(concatCss("vendor.css"))   
    .pipe(minifycss('')) 
    .pipe(rename("vendor.min.css"))
    .pipe(gulp.dest('dist/css'));
}); 

gulp.task('styles', function () {
	gulp.src('app/sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : '_'}))
	.pipe(autoprefixer({
		browsers: ['last 15 versions'],
		cascade: false
	}))
	.pipe(minifycss(''))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
	gulp.watch('app/img/*', ['compress']);
	gulp.watch('app/sass/*.sass', ['styles']);
	gulp.watch('app/js/*.js', ['scriptsCommon']);
	gulp.watch('dist/css/*.css', notifyLiveReload);
	gulp.watch('dist/js/common.min.js', notifyLiveReload);
	gulp.watch('dist/*.html', notifyLiveReload);
});

gulp.task('default', ['styles','vendorCss', 'scriptsConcat', 'express', 'livereload', 'watch'], function() {

});
