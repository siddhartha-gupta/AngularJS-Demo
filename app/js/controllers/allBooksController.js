'use strict';

googleBooks.controller('allBooksController',
	function allBooksController($scope, webServices) {

	$scope.booksList = [];

	webServices.getBooks().success(function (response) {
		$scope.booksList = response.items;
		// console.log($scope.booksList);
	});
});
