var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject({
	declaration: true,
	noExternalResolve: true
});

gulp.task('setup', function(done) {
	gulp.src([
		'node_modules/angular2/bundles/js',
		'node_modules/angular2/bundles/angular2.*.js*',
		'node_modules/angular2/bundles/http.*.js*',
		'node_modules/angular2/bundles/router.*.js*',
		'node_modules/es6-shim/es6-shim.js*',
		'node_modules/systemjs/dist/*.*',
		'node_modules/jquery/dist/jquery.*js',
		'node_modules/bootstrap/dist/js/bootstrap*.js',
		'node_modules/@reactivex/rxjs/dist/global/Rx.js'
	]).pipe(gulp.dest('web/lib'));

	gulp.src([
		'node_modules/bootstrap/dist/css/bootstrap.css'
	]).pipe(gulp.dest('web/css'));
});

// called when we change our non-TypeScript assets
gulp.task('assets', function() {
	gulp.src([
			'./src/**/*.json',
			'./src/**/*.html',
			'./src/**/*.css'
		])
		.pipe(gulp.dest('./web'));
});

gulp.task('watch', [
	'watch.assets',
	'watch.ts',
	'watch.web'
]);

// copies non-typescript assets by calling
// the assets task when any source files change
gulp.task('watch.assets', ['assets'], function() {
	return gulp.watch([
		'./src/**/*.json',
		'./src/**/*.html',
		'./src/**/*.css'
	], ['assets']);
});

// calls the typescript compiler whenever
// any typescript files change
gulp.task('watch.ts', ['ts'], function() {
	return gulp.watch('src/**/*.ts', ['ts']);
});

gulp.task('ts', function(done) {
	var tsResult = gulp.src([
			"node_modules/angular2/bundles/typings/angular2/angular2.d.ts",
			"node_modules/angular2/bundles/typings/angular2/http.d.ts",
			"node_modules/angular2/bundles/typings/angular2/router.d.ts",
			"node_modules/@reactivex/rxjs/dist/es6/Rx.d.ts",
			"src/**/*.ts"
		])
		.pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
	return tsResult.js.pipe(gulp.dest('web/js'));
});

// stubbed out function (to implement later)
function notifyLiveReload(event) {
	var fileName = require('path').relative(__dirname + '/web', event.path);

	tinylr.changed({
		body: {
			files: [fileName]
		}
	});
}

// if we change any files in the web directory
// reload the page - this is for when we
// update any of our assets with the
// setup command or drop a file in the content
// area of web like a css file...
gulp.task('watch.web', function() {
	gulp.watch('web/**', notifyLiveReload);
});

gulp.task('default', [
	'express',
	'livereload',
	'watch'
]);

gulp.task('express', function() {
	var express = require('express');
	var app = express();
	app.use(require('connect-livereload')({
		port: 35729
	}));
	app.use(express.static(__dirname + '/web'));
	app.listen(4000, '0.0.0.0');
});

gulp.task('livereload', function() {
	tinylr = require('tiny-lr')();
	tinylr.listen(35729);
});
