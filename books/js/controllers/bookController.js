booksApp.controller('bookController', function bookController($scope, $routeParams, bookData, $location, $log, serverData) {
	$scope.bookId = $routeParams.bookId || '';
	$scope.booksDetails = serverData.data;

	console.log(serverData.data);

	$scope.getBooks = function() {
		bookData.getSpecificBook({
			'bookId': $scope.bookId
		}).then(function(response) {
			$scope.booksDetails = response.data;
			$log.log('success: ', $scope.booksDetails);
		}, function(response) {
			$log.log('error: ', response);
		});
	};
});
