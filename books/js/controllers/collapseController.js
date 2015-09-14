'use strict';

booksApp.controller('collapse', function($scope) {
	$scope.isvisible = true;

	$scope.toggleDetails = function() {
		$scope.isvisible = !$scope.isvisible;
	};
});
