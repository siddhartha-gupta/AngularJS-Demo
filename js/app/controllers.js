angular.module('googleBooks.controllers', []).
controller('allBooksController', function($scope, webServices) {
	$scope.booksList = [];

	webServices.getBooks().success(function(response) {
		$scope.booksList = response.items;
	});
});
