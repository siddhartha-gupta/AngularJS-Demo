'use strict';

booksApp.directive('customError', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/directives/customError.html',
		scope: {
			text: '@',
			elemclass: '@'
		}
	};
});
