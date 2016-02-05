'use strict';

booksApp.controller('customTabs', function($scope) {
	$scope.activeTab = 'All';

	$scope.toggleActive = function(ind) {
		angular.forEach($scope.ngModel, function(value, key) {
			if (key == ind) {
				$scope.activeTab = key;
			}
		});
	}
});
