angular.module('googleBooks.controllers', []).
controller('allBooksController', function($scope, webServices) {
	$scope.nameFilter = null;
	$scope.booksList = [];

	webServices.getBooks().success(function(response) {
		debugger;
		$scope.booksList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
	});
});
