'use strict';

booksApp.factory('routeHandler', function(webService) {
	var onRouteChangeStart = function() {

		},

		onRouteChangeSuccess = function() {

		},

		onRouteChangeError = function() {

		};

	return {
		onRouteChangeStart: onRouteChangeStart,
		onRouteChangeSuccess: onRouteChangeSuccess,
		onRouteChangeError: onRouteChangeError
	};
});
