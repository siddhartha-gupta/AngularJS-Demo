module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		/*plugins: [
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-coverage'
		],*/
		files: [
			'dist/app/lib/angular.js',
			'dist/app/lib/angular-mocks.js',
			'dist/app/all.js',
			'tests/*.js'
		],
		exclude: [],
		browsers: [
			'PhantomJS'
		],
		singleRun: false,
		colors: true,
		logLevel: config.LOG_INFO,
		browsers: ['PhantomJS'],
		reporters: ['progress', 'coverage'],
		preprocessors: {
			'dist/app/*.js': ['coverage']
		},
		coverageReporter: {
			type: 'html',
			dir: 'tests/coverage/'
		}
	});
};
