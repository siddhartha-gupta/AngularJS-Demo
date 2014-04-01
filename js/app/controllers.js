angular.module('googleBooks.controllers', []).
controller('allBooksController', function($scope, webServices) {
	$scope.booksList = [];

	webServices.getBooks().success(function(response) {
		$scope.booksList = response.items;
		// console.log($scope.booksList);
	});
}).
controller('bookDetailsController', function($scope, $routeParams, webServices) {
	$scope.id = $routeParams.id;
	$scope.booksDetails = [];

	webServices.getSpecificBook($scope.id).success(function(response) {
		$scope.booksDetails = response;
		// console.log($scope.booksDetails);
	});
});
