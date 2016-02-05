'use strict';

booksApp.controller('customTabs', function($scope, localStorageService) {
	$scope.activeTab = 'All';

	$scope.toggleActive = function(ind) {
		angular.forEach($scope.ngModel, function(value, key) {
			if (key == ind) {
				$scope.activeTab = key;
				localStorageService.set('activeTab', key);
			}
		});
	};
});
