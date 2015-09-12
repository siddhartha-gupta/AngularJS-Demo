booksApp.config(function($routeProvider, $locationProvider, localStorageServiceProvider) {
	$routeProvider.when('/books/:query?/:maxlimit?', {
		controller: 'mainController',
		templateUrl: 'templates/main.html',
		resolve: {
			serverData: function($route, bookData, localStorageService) {
				var searchQuery = localStorageService.get('searchQuery'),
					sortOrder = localStorageService.get('sortOrder'),
					maxLimit = localStorageService.get('maxLimit');

				if (searchQuery && maxLimit) {
					return bookData.getAllBooks({
						'searchQuery': searchQuery,
						'maxLimit': maxLimit
					});
				} else {
					return [];
				}
			}
		}
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

	localStorageServiceProvider.setStorageType('sessionStorage');
}).run(function($rootScope, $location) {
	$rootScope.$on("$routeChangeSuccess", function(event, next, current) {
		console.log('routeChangeSuccess: ', next, current);
		// $rootScope.$broadcast will notify all $rootScope.$on as well as $scope.$on listeners
		$rootScope.$broadcast('routeChangeSuccessEvent', next, current);
	});
});
