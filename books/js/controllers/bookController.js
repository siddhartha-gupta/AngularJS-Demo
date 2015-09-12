booksApp.controller('bookController', function mainController($scope, $routeParams, webService, $location) {
	$scope.bookId = $routeParams.bookId || '';
	$scope.booksDetails = null;

	$scope.getBooks = function() {
		webService.getCall({
			url: 'https://www.googleapis.com/books/v1/volumes/' + $scope.bookId + '?projection=full'
		}).then(function(response) {
			$scope.booksDetails = response.data;
			console.log('success: ', $scope.booksDetails);
		}, function(response) {
			console.log('error: ', response);
		});
	};

	$scope.goBack = function() {
		console.log('go back clicked');
		$location.path('/books');
	};

	$scope.getBooks();
});
