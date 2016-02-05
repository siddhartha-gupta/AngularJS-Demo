'use strict';

booksApp.controller('customTabs', function($scope, localStorageService) {
	$scope.toggleActive = function(ind) {
		angular.forEach($scope.ngModel, function(value, key) {
			if (key == ind) {
				$scope.activetab = key;
				localStorageService.set('activeTab', key);
			}
		});
	};
});
