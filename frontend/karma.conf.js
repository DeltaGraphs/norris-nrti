"use strict";

// Karma 
module.exports = function(config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],


		// list of files / patterns to load in the browser
		files: [
			//'app/bower_components/jquery/jquery.js',
			'app/bower_components/angular/angular.js',
			'app/bower_components/angular-mocks/angular-*.js',
			'app/bower_components/angular-route/angular-route.js',
			'app/bower_components/angular-resource/angular-resource.js',
			'app/bower_components/angular-socket.io-mock.js'
			/*'app/bower_components/angular-sanitize/angular-sanitize.js',
			'app/bower_components/angular-cookies/angular-cookies.js',*/
			//'app/bower_components/underscore/underscore.js',
			'app/app.js',
			'app/Model/*.js',
			'app/Model/GraphsModel/*.js',
			'app/Model/FlowsModel/*.js',
			'app/Model/PagesModel/*.js',
			'app/View/*.js',
			'app/Controller/*.js',
			'test/unit/Model/*.js',
			'test/unit/Controller/*.js',
			'test/unit/View/*.js'
		],


		// list of files to exclude
		exclude: [
			
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			// source files, that you wanna generate coverage for
			// do not include tests or libraries
			// (these files will be instrumented by Istanbul)
			'app/app.js': ['coverage'],
			'app/Model/*.js': ['coverage'],
			'app/Model/GraphsModel/*.js': ['coverage'],
			'app/Model/FlowsModel/*.js': ['coverage'],
			'app/Model/PagesModel/*.js': ['coverage'],
			'app/View/*.js': ['coverage'],
			'app/Controllers/*.js': ['coverage']
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'junit', 'coverage'],

		junitReporter: {
			outputFile: '../gh-pages/reports-frontend/test-result.xml'
		},

		// configure the reporter
		coverageReporter: {
			dir: '../gh-pages/reports-frontend/coverage/',
			reporters:[
		        { 
		        	type: 'text', 
		        	subdir: '.', 
		        	file: 'text.txt' 
		        },
		        { 
		        	type: 'text-summary', 
		        	subdir: '.', 
		        	file: 'text-summary.txt' 
		        },
				{
					type: 'lcov',
					subdir: '.',
					suite: 'frontend'
				}
			],
		},

		// web server port
		port: 15077,

		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_DEBUG,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	});
};