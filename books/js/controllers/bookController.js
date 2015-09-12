booksApp.controller('bookController', function bookController($scope, $routeParams, bookData, $location, serverData) {
	$scope.bookId = $routeParams.bookId || '';
	$scope.booksDetails = serverData.data;
	console.log($scope.booksDetails);

	$scope.getBooks = function() {
		bookData.getSpecificBook({
			'bookId': $scope.bookId
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
});
