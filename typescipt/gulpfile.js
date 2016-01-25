// add this line after the initial gulp require statement
var gulp = require('gulp'),
	ts = require('gulp-typescript');


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

// replace the Gulp task for ts with this:

gulp.task('assets', function() {
	gulp.src(['./src/**/*.json',
			'./src/**/*.html',
			'./src/**/*.css'
		])
		.pipe(gulp.dest('./web'));
});

var tsProject = ts.createProject({
	declaration: true,
	noExternalResolve: true
});

gulp.task('watch', ['watch.assets', 'watch.ts', 'watch.web']);

gulp.task('watch.assets', ['assets'], function() {
	return gulp.watch(['./src/**/*.json',
		'./src/**/*.html',
		'./src/**/*.css'
	], ['assets']);
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

gulp.task('default', ['express', 'livereload', 'watch']);
