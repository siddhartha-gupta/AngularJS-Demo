'use strict';

var gulp = require('gulp'),
	typescript = require('gulp-typescript'),
	tscConfig = require('./tsconfig.json'),
	$ = require('gulp-load-plugins')(),
	del = require('del'),
	runSequence = require('run-sequence'),
	eventStream = require('event-stream'),
	mainBowerFiles = require('main-bower-files');

gulp.task('styles', function() {
	return gulp.src('app/styles/app.css')
		.pipe(gulp.dest('dist/styles'))
});

// To compile TS to JS
gulp.task('scripts:app', function() {
	var tsResult = gulp.src(tscConfig.paths.inPath)
		.pipe($.sourcemaps.init())
		.pipe($.typescript(tscConfig.compilerOptions, undefined));

	return eventStream.merge(
		tsResult.dts.pipe(gulp.dest(tscConfig.paths.outDefPath)),
		tsResult.js
		.pipe($.concatSourcemap(tscConfig.paths.outJsFile))
		.pipe($.sourcemaps.write()) // sourcemaps are added to the .js file
		.pipe(gulp.dest(tscConfig.paths.outJsPath))
	);
});

gulp.task('html', ['styles', 'scripts:app'], function() {
	return gulp.src('app/*.html')
		.pipe($.useref.assets())
		.pipe($.if('**/*.js', $.uglify()))
		.pipe($.if('**/*.css', $.csso()))
		.pipe($.useref.restore())
		.pipe($.useref())
		.pipe(gulp.dest('dist'))
		.pipe($.size());
});

gulp.task('images', function() {
	return gulp.src('app/images/**/*')
		.pipe($.cache($.imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest('dist/images'))
		.pipe($.size());
});

gulp.task('fonts', function() {
	return gulp.src(mainBowerFiles())
		.pipe($.filter('**/*.{eot,svg,ttf,woff}'))
		.pipe($.flatten())
		.pipe(gulp.dest('dist/fonts'))
		.pipe($.size());
});

gulp.task('extras', function() {
	return gulp.src(
			['app/*.*', '!app/*.html', '!app/*.ts', '!app/*.config', '!app/*.csproj*'], {
				dot: true
			})
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb) {
	del(['dist'], cb);
});

gulp.task('build', ['html', 'images', 'fonts', 'extras']);

gulp.task('default', ['clean'], function() {});

gulp.task('connect', function() {
	$.connect.server({
		root: ['app', __dirname],
		port: 9000,
		livereload: true
	});
});

gulp.task('serve', ['scripts:app'], function() {
	runSequence('connect', function() {
		require('opn')('http://localhost:9000');
	});
});

// inject bower components
gulp.task('wiredep', function() {
	var wiredep = require('wiredep').stream;

	gulp.src('app/*.html')
		.pipe(wiredep({
			directory: 'bower_components'
		}))
		.pipe(gulp.dest('app'));
});

gulp.task('watch', ['serve'], function() {
	$.watch([
		'app/*.html',
		'app/**/*.ts',
		'app/styles/**/*.css',
		'app/images/**/*'
	]).pipe($.connect.reload());

	gulp.watch('bower.json', ['wiredep']);
});
