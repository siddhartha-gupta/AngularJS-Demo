'use strict'

var gulp = require('gulp'),
	del = require('del'),
	typescript = require('gulp-typescript'),
	concatSourcemap = require('gulp-concat-sourcemap'),
	eventStream = require('event-stream'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	tslint = require('gulp-tslint'),
	browserSync = require('browser-sync'),
	tscConfig = require('./tsconfig.json'),
	karma = require('gulp-karma'),
	Server = require('karma').Server,
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
		.pipe(gulp.dest('dist'));
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
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/app/'))
	);
});

gulp.task('copyJSLibs', ['clean'], function() {
	return gulp.src([
			'bower_components/jquery/dist/jquery.js',
			'bower_components/bootstrap/dist/js/bootstrap.js',
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-route/angular-route.js'
		])
		.pipe(gulp.dest('dist/app/lib/'))
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('dist/app/lib/'))
		.pipe(rename('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/app/lib/'))
});

gulp.task('copyCSSLibs', ['clean'], function() {
	return gulp.src([
			'bower_components/bootstrap/dist/css/bootstrap.css'
		])
		.pipe(gulp.dest('dist/app/styles'));
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

/*var allFiles = [
	'dist/app/lib/angular.js',
	'dist/app/lib/angular-mocks.js',
	'dist/app/all.js',
	'test/*.js'
];
*/
gulp.task('test', ['default'], function(done) {
	/*	gulp.src(allFiles)
			.pipe(karma({
				configFile: 'karma.conf.js',
				action: 'run'
			}))
			.on('error', function(err) {
				// Make sure failed tests cause gulp to exit non-zero
				throw err;
			});*/
	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('autotest', function() {
	gulp.watch(['app/**/*', 'index.html', 'tests/**/*'], ['test']);
});

gulp.task('buildAndReload', ['default'], reload);
gulp.task('default', ['compile', 'copyAssets', 'copyJSLibs', 'copyCSSLibs']);
