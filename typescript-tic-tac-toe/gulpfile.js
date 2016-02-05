var gulp = require('gulp'),
	del = require('del'),
	typescript = require('gulp-typescript'),
	tscConfig = require('./tsconfig.json'),
	sourcemaps = require('gulp-sourcemaps'),
	tslint = require('gulp-tslint'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	tsconfig = require('tsconfig-glob');

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

// copy dependencies
gulp.task('copyLibs', ['clean'], function() {
	return gulp.src([
			'node_modules/es6-shim/es6-shim.min.js',
			'node_modules/systemjs/dist/system-polyfills.js',
			'node_modules/angular2/bundles/angular2-polyfills.js',
			'node_modules/systemjs/dist/system.src.js',
			'node_modules/rxjs/bundles/Rx.js',
			'node_modules/angular2/bundles/angular2.dev.js',
			'node_modules/angular2/bundles/router.dev.js',
			'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.min.js'
		])
		.pipe(gulp.dest('dist/lib'))
});

// linting
gulp.task('tslint', function() {
	return gulp.src('app/**/*.ts')
		.pipe(tslint())
		.pipe(tslint.report('verbose'));
});


// TypeScript compile
gulp.task('compile', ['clean'], function() {
	return gulp
		.src(tscConfig.files)
		.pipe(sourcemaps.init())
		.pipe(typescript(tscConfig.compilerOptions))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
});

// update the tsconfig files based on the glob pattern
gulp.task('tsconfig-glob', function() {
	return tsconfig({
		configPath: '.',
		indent: 2
	});
});

// Run browsersync for development
gulp.task('serve', ['build'], function() {
	browserSync({
		server: {
			baseDir: 'dist'
		}
	});

	gulp.watch(['app/**/*', 'index.html'], ['buildAndReload']);
});

gulp.task('build', ['compile', 'copyLibs', 'copyAssets']);
gulp.task('buildAndReload', ['build'], reload);
gulp.task('default', ['build']);
