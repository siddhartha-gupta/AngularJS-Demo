'use strict';

booksApp.controller('collapseSection', function($scope) {
	$scope.isVisible = true;

	$scope.toggleSection = function() {
		console.log('toggleSection');
		$scope.isVisible = !$scope.isVisible;
	};

	$scope.showbook = function(event) {
		console.log('show book');
		event.preventDefault();
		event.stopPropagation();

		var id = $scope.id;
		$scope.showbookfn(id);
	};
});
