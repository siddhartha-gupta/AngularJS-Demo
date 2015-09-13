booksApp.controller('mainController', function mainController($scope, $routeParams, serverData, $timeout, bookData, localStorageService) {
	if (serverData.data) {
		$scope.books = {
			'searchQuery': localStorageService.get('searchQuery'),
			'sortOrder': localStorageService.get('sortOrder'),
			'maxLimit': localStorageService.get('maxLimit'),
			'localSortOrder': localStorageService.get('localSortOrder'),
		};
		$scope.booksList = serverData.data.items;
	} else {
		$scope.books = {
			'searchQuery': '',
			'sortOrder': 'relevance',
			'maxLimit': '10',
			'localSortOrder': 'volumeInfo.title',
		};
		$scope.booksList = [];
	}
	$scope.searchTimer = null;
	$scope.currentReq = null;

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
				localStorageService.set('localSortOrder', $scope.books.localSortOrder);

				$scope.currentReq = bookData.getAllBooks({
					'searchQuery': $scope.books.searchQuery,
					'orderBy': $scope.books.sortOrder,
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

	$scope.updateSessionStorage = function(key) {
		localStorageService.set(key, $scope.books[key]);
	};
});
