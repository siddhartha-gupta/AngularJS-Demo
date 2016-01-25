// add this line after the initial gulp require statement
var gulp = require('gulp'),
	ts = require('gulp-typescript');

// replace the Gulp task for ts with this:

var tsProject = ts.createProject({
	declaration: true,
	noExternalResolve: true
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

gulp.task('watch', ['ts'], function() {
	gulp.watch([
		"node_modules/angular2/bundles/typings/angular2/angular2.d.ts",
		"node_modules/angular2/bundles/typings/angular2/http.d.ts",
		"node_modules/angular2/bundles/typings/angular2/router.d.ts",
		"node_modules/@reactivex/rxjs/dist/es6/Rx.d.ts",
		"src/**/*.ts"
	], ['ts']);
});
