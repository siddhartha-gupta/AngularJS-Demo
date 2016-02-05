'use strict';

booksApp.directive('customTabs', function() {
	return {
		restrict: 'E',
		require: '?ngModel',
		scope: {
			ngModel: '=',
			showbook: '=',
			localsortorder: '='
		},
		templateUrl: 'templates/directives/customTabs.html',
		controller: 'customTabs'
	};
});
