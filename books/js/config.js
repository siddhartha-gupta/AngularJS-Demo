booksApp.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/books/:query?/:maxlimit?', {
		controller: 'mainController',
		templateUrl: 'templates/main.html',
	}).when('/book/:bookId', {
		controller: 'bookController',
		templateUrl: 'templates/book.html',
		resolve: {
			serverData: function($route, bookData) {
				return bookData.getSpecificBook({
					'bookId': $route.current.params.bookId
				});
			}
		}
	}).otherwise({
		redirectTo: '/books'
	});
}).run(function($rootScope, $location) {
	$rootScope.$on("$routeChangeSuccess", function(event, next, current) {
		console.log('routeChangeSuccess: ', next, current);
		// $rootScope.$broadcast will notify all $rootScope.$on as well as $scope.$on listeners
		$rootScope.$broadcast('routeChangeSuccessEvent', next, current);
	});
});
