'use strict';

googleBooks.controller('bookDetailsController',
	function bookDetailsController($scope, $routeParams, webServices) {

	$scope.id = $routeParams.id;
	$scope.booksDetails = [];

	webServices.getSpecificBook($scope.id).success(function(response) {
		$scope.booksDetails = response;
		// console.log($scope.booksDetails);
	});
});
