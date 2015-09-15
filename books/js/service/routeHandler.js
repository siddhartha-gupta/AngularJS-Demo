'use strict';

booksApp.factory('routeHandler', function() {
	var headerButtons = {
			'isDisabled': true,
			'showBackBtn': false,
			'showResetBtn': false
		},
		observerCallbacks = [],

		notifyObservers = function() {
			angular.forEach(observerCallbacks, function(callback) {
				callback(headerButtons);
			});
		},

		registerObserverCallback = function(callback) {
			observerCallbacks.push(callback);
		},

		onRouteChangeStart = function(next, current) {
			switch (next.$$route.controller) {
				case 'mainController':
					headerButtons.isDisabled = false;
					break;

				case 'bookController':
					headerButtons.isDisabled = true;
					break;
			}
			notifyObservers();
		},

		onRouteChangeSuccess = function(next, current) {
			switch (next.$$route.controller) {
				case 'mainController':
					headerButtons.isDisabled = false;
					headerButtons.showBackBtn = false;
					headerButtons.showResetBtn = true;
					break;

				case 'bookController':
					headerButtons.isDisabled = false;
					headerButtons.showBackBtn = true;
					headerButtons.showResetBtn = true;
					break;
			}
			notifyObservers();
		},

		onRouteChangeError = function(next, current) {
			switch (next.$$route.controller) {
				case 'mainController':
					headerButtons.isDisabled = false;
					break;

				case 'bookController':
					headerButtons.isDisabled = true;
					break;
			}
			notifyObservers();
		};

	return {
		registerObserverCallback: registerObserverCallback,
		onRouteChangeStart: onRouteChangeStart,
		onRouteChangeSuccess: onRouteChangeSuccess,
		onRouteChangeError: onRouteChangeError
	};
});
