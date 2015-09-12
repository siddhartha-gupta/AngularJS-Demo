booksApp.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/books/:query?/:maxlimit?', {
		controller: 'mainController',
		templateUrl: 'templates/main.html'
	}).when('/book/:bookId', {
		controller: 'bookController',
		templateUrl: 'templates/book.html'
	}).otherwise({
		redirectTo: '/books'
	});
});
