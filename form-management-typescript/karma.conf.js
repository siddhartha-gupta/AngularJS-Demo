module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		plugins: [
			'karma-junit-reporter',
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-coverage',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
		],
		files: [
			'dist/app/lib/angular.js',
			'dist/app/lib/angular-mocks.js',
			'dist/app/all.js',
			'tests/*.js'
		],
		exclude: [],
		singleRun: false,
		autoWatch: true,
		port: 9876,
		colors: true,
		// logLevel: config.LOG_DEBUG,
		logLevel: config.LOG_INFO,
		browsers: [
			'Chrome',
			// 'PhantomJS',
			// 'Firefox'
		],
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
