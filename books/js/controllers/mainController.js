booksApp.controller('mainController', function mainController($scope, $routeParams, serverData, $timeout, bookData, localStorageService) {
	if (serverData.data) {
		$scope.books = {
			'searchQuery': localStorageService.get('searchQuery'),
			'sortOrder': localStorageService.get('sortOrder'),
			'maxLimit': localStorageService.get('maxLimit')
		};
		$scope.booksList = serverData.data.items;
	} else {
		$scope.books = {
			'searchQuery': '',
			'sortOrder': 'volumeInfo.title',
			'maxLimit': '10'
		};
		$scope.booksList = [];
	}
	$scope.searchTimer = null;
	$scope.currentReq = null;

	console.log(serverData);
	console.log($scope.booksList);

	$scope.getBooks = function() {
		$scope.books.searchQuery = $scope.books.searchQuery.trim();
		$timeout.cancel($scope.searchTimer);

		if ($scope.currentReq) {
			$scope.currentReq.abort();
		}

		if ($scope.books.searchQuery.length > 2) {
			$scope.searchTimer = $timeout(function(search) {
				localStorageService.set('searchQuery', $scope.books.searchQuery);
				localStorageService.set('sortOrder', $scope.books.sortOrder);
				localStorageService.set('maxLimit', $scope.books.maxLimit);

				$scope.currentReq = bookData.getAllBooks({
					'searchQuery': $scope.books.searchQuery,
					'maxLimit': $scope.books.maxLimit
				}).then(function(response) {
					$scope.currentReq = null;
					$scope.booksList = response.data.items;
					console.log('success: ', $scope.booksList);
				}, function(response) {
					$scope.currentReq = null;
					console.log('error: ', response);
				});
			}, 500);
		}
	};
});
