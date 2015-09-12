booksApp.controller('mainController', function mainController($scope, $routeParams, webService) {
	$scope.searchQuery = $routeParams.query || 'mobile';
	$scope.maxLimit = $routeParams.maxlimit || 10;
	$scope.booksList = [];

	$scope.getBooks = function() {
		webService.getCall({
			'url': 'https://www.googleapis.com/books/v1/volumes?q=' + $scope.searchQuery + '&maxResults=' + $scope.maxLimit
		}).then(function(response) {
			$scope.booksList = response.data.items;
			console.log('success: ', $scope.booksList);
		}, function(response) {
			console.log('error: ', response);
		});
	};

	$scope.getBooks();
});
