'use strict';

booksApp.directive('customTabs', function() {
	return {
		restrict: 'E',
		require: '?ngModel',
		scope: {
			ngModel: '=',
			showbook: '=',
			localsortorder: '=',
			activetab: '='
		},
		templateUrl: 'templates/directives/customTabs.html',
		controller: 'customTabs'
	};
});
