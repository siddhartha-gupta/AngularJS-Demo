booksApp.controller('mainController', function mainController($scope, $routeParams, serverData, $timeout, $log, $location, bookData, localStorageService) {
	$scope.books = {
		'searchQuery': '',
		'sortOrder': 'relevance',
		'maxLimit': '10',
		'localSortOrder': 'volumeInfo.title',
	};

	$scope.error = {
		isVisible: false,
		className: 'slideover',
		text: 'Please type 3 or more chars'
	};
	$scope.booksList = [];
	$scope.searchTimer = null;
	$scope.currentReq = null;

	if (serverData.data) {
		$scope.books = {
			'searchQuery': localStorageService.get('searchQuery'),
			'sortOrder': localStorageService.get('sortOrder'),
			'maxLimit': localStorageService.get('maxLimit'),
			'localSortOrder': localStorageService.get('localSortOrder'),
		};
		$scope.booksList = serverData.data.items;
	}

	console.log($scope.books.searchQuery);
	$scope.getBooks = function() {
		console.log($scope.books.searchQuery);
		$scope.books.searchQuery = $scope.books.searchQuery.trim();
		$timeout.cancel($scope.searchTimer);

		if ($scope.currentReq && angular.isFunction($scope.currentReq.abort)) {
			$scope.currentReq.abort();
		}

		if ($scope.books.searchQuery.length > 2) {
			$scope.error.isVisible = false;
			$scope.searchTimer = $timeout(function(search) {
				$scope.currentReq = bookData.getAllBooks({
					'searchQuery': $scope.books.searchQuery,
					'orderBy': $scope.books.sortOrder,
					'maxLimit': $scope.books.maxLimit
				}).then(function(response) {
					$scope.currentReq = null;
					$scope.booksList = response.data.items;
					$log.log('success: ', $scope.booksList);
				}, function(response) {
					$scope.currentReq = null;
					$log.log('error: ', response);
				});
			}, 500);
		} else {
			$scope.error.isVisible = true;
			if ($scope.books.searchQuery.length === 0) {
				$scope.booksList = [];
			}
		}
		$scope.updateSessionStorage(['searchQuery', 'sortOrder', 'maxLimit', 'localSortOrder']);
	};

	$scope.showBook = function(id) {
		$location.path('/book/' + id).replace();
	};

	$scope.updateSessionStorage = function(keys) {
		angular.forEach(keys, function(key) {
			localStorageService.set(key, $scope.books[key]);
		});
	};
});
