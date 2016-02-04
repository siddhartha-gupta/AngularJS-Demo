booksApp.config(function($routeProvider, $locationProvider, localStorageServiceProvider) {
	$routeProvider.when('/books/:query?/:maxlimit?', {
		controller: 'mainController',
		controllerAs: 'customController',
		templateUrl: 'templates/main.html',
		resolve: {
			serverData: function($route, webService, localStorageService) {
				var searchQuery = localStorageService.get('searchQuery'),
					sortOrder = localStorageService.get('sortOrder'),
					maxLimit = localStorageService.get('maxLimit');

				if (searchQuery && maxLimit) {
					return webService.getCall({
						'url': 'https://www.googleapis.com/books/v1/volumes?q=' + searchQuery + '&maxResults=' + maxLimit + '&orderBy=' + sortOrder
					});
				} else {
					return [];
				}
			}
		}
	}).when('/book/:bookId', {
		controller: 'bookController',
		controllerAs: 'customController',
		templateUrl: 'templates/book.html',
		resolve: {
			serverData: function($route, webService) {
				return webService.getCall({
					url: 'https://www.googleapis.com/books/v1/volumes/' + $route.current.params.bookId + '?projection=full'
				});
			}
		}
	}).otherwise({
		redirectTo: '/books'
	});

	localStorageServiceProvider.setStorageType('sessionStorage');
}).run(function($rootScope, $location, routeHandler) {
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		// $rootScope.$broadcast will notify all $rootScope.$on as well as $scope.$on listeners
		routeHandler.onRouteChangeStart(next, current);
	});

	$rootScope.$on("$routeChangeSuccess", function(event, next, current) {
		routeHandler.onRouteChangeSuccess(next, current);
	});

	$rootScope.$on("$routeChangeError", function(event, next, current) {
		routeHandler.onRouteChangeError(next, current);
	});
});
