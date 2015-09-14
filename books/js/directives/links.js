'use strict';

booksApp.directive('links', function() {
	return {
		restrict: 'E',
		// replace: true,
		templateUrl: 'templates/directives/links.html',
		scope: {
			url: '=',
			text: '='
		}
	};
});
