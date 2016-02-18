'use strict'

var gulp = require('gulp'),
	del = require('del'),
	typescript = require('gulp-typescript'),
	concatSourcemap = require('gulp-concat-sourcemap'),
	eventStream = require('event-stream'),
	tscConfig = require('./tsconfig.json'),
	sourcemaps = require('gulp-sourcemaps'),
	tslint = require('gulp-tslint'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

// clean the contents of the distribution directory
gulp.task('clean', function() {
	return del('dist/**/*');
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copyAssets', ['clean'], function() {
	return gulp.src(['app/**/*', 'index.html', '!app/**/*.ts'], {
			base: './'
		})
		.pipe(gulp.dest('dist'))
});

// linting
gulp.task('tslint', function() {
	return gulp.src('app/**/*.ts')
		.pipe(tslint())
		.pipe(tslint.report('verbose'));
});


// TypeScript compile
gulp.task('compile', ['clean'], function() {
	var tsResult = gulp.src(tscConfig.paths.inPath)
		.pipe(sourcemaps.init())
		.pipe(typescript(tscConfig.compilerOptions, undefined));

	return eventStream.merge(
		tsResult.dts.pipe(gulp.dest(tscConfig.paths.outDefPath)),
		tsResult.js
		.pipe(concatSourcemap(tscConfig.paths.outJsFile))
		.pipe(sourcemaps.write()) // sourcemaps are added to the .js file
		.pipe(gulp.dest(tscConfig.paths.outJsPath))
	);
});

gulp.task('copyJSLibs', ['clean'], function() {
	return gulp.src([
			'bower_components/jquery/dist/jquery.js',
			'bower_components/bootstrap/dist/js/bootstrap.js',
			'bower_components/angular/angular.js',
			'bower_components/angular-route/angular-route.js'
		])
		.pipe(gulp.dest('dist/app/lib'))
});

gulp.task('copyCSSLibs', ['clean'], function() {
	return gulp.src([
			'bower_components/bootstrap/dist/css/bootstrap.css'
		])
		.pipe(gulp.dest('dist/app/styles'))
});

// Run browsersync for development
gulp.task('serve', ['default'], function() {
	browserSync({
		ghostMode: false,
		server: {
			baseDir: 'dist/app'
		}
	});

	gulp.watch(['app/**/*', 'index.html'], ['buildAndReload']);
});

gulp.task('buildAndReload', ['default'], reload);
gulp.task('default', ['compile', 'copyAssets', 'copyJSLibs', 'copyCSSLibs']);
