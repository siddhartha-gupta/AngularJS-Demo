booksApp.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/books/:query?/:maxlimit?', {
		templateUrl: 'templates/main.html',
		controller: 'mainController',
	}).when('/book/:bookId', {
		templateUrl: 'book.html',
		controller: 'bookController'
	}).otherwise({
		redirectTo: '/books'
	});
});
