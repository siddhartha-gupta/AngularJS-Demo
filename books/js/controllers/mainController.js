booksApp.controller('mainController', function mainController($scope, $routeParams, webService) {
	console.log('mainController');

	console.log($routeParams.query);
	$scope.searchQuery = $routeParams.query || 'mobile';
	$scope.maxLimit = $routeParams.maxlimit || 10;
	$scope.booksList = [];

	$scope.getBooks = function() {
		webService.getCall({
			'url': 'https://www.googleapis.com/books/v1/volumes?q=' + $scope.searchQuery + '&maxResults=' + $scope.maxLimit
		}).then(function(response) {
			console.log('success');
			$scope.booksList = response.data.items;
			console.log($scope.booksList);
		}, function(response) {
			console.log('error');
			console.log(response);
		});
	};

	$scope.getBooks();
});
