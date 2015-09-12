booksApp.controller('mainController', function mainController($scope, $routeParams, bookData) {
	$scope.books = {
		'searchQuery': '',
		'sortOrder': 'name',
		'maxLimit': '10'
	};
	$scope.booksList = [];

	$scope.getBooks = function() {
		bookData.getAllBooks({
			'searchQuery': $scope.books.searchQuery,
			'maxLimit': $scope.books.maxLimit
		}).then(function(response) {
			$scope.booksList = response.data.items;
			console.log('success: ', $scope.booksList);
		}, function(response) {
			console.log('error: ', response);
		});
	};

	$scope.searchBooks = function(books) {
		console.log(books);
		getBooks();
	};
});
