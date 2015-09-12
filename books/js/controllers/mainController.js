booksApp.controller('mainController', function mainController($scope, $routeParams, bookData, serverData) {
	$scope.searchQuery = $routeParams.query || 'mobile';
	$scope.maxLimit = $routeParams.maxlimit || 10;
	$scope.booksList = serverData.data.items;

	$scope.getBooks = function() {
		bookData.getAllBooks({
			'searchQuery': $scope.searchQuery,
			'maxLimit': $scope.maxLimit
		}).then(function(response) {
			$scope.booksList = response.data.items;
			console.log('success: ', $scope.booksList);
		}, function(response) {
			console.log('error: ', response);
		});
	};
});
