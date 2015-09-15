'use strict';

booksApp.controller('collapseSection', function($scope) {
	$scope.isVisible = true;

	$scope.toggleSection = function() {
		$scope.isVisible = !$scope.isVisible;
	};

	$scope.showbook = function(event) {
		event.preventDefault();
		event.stopPropagation();

		var id = $scope.id;
		$scope.showbookfn(id);
	};
});
