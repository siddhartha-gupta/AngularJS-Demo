'use strict';

booksApp.directive('links', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/directives/links.html',
		scope: {
			url: '=',
			text: '='
		}
	};
});
