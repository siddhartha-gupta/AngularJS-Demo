formApp.constant('config', {
	'serverUrl': 'http://localhost:8080/',
	'templateUrl': 'templates/'
}).config(function($routeProvider, $locationProvider, localStorageServiceProvider, config) {
	$routeProvider.when('/userslist', {
		controller: 'usersListController',
		controllerAs: 'customController',
		templateUrl: config.templateUrl + 'usersList.html',
		resolve: {
			serverData: function($route, webService, localStorageService, config) {
				return webService.getCall({
					'url': config.serverUrl + 'getuserslist'
				});
			}
		}
	}).when('/addUser', {
		controller: 'addUserController',
		controllerAs: 'customController',
		templateUrl: config.templateUrl + 'addUser.html'
	}).otherwise({
		redirectTo: '/userslist'
	});

	localStorageServiceProvider.setStorageType('sessionStorage');
}).run(function($rootScope, $location, headerBtnHandler) {
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		headerBtnHandler.onRouteChangeStart(next, current);
	});

	$rootScope.$on("$routeChangeSuccess", function(event, next, current) {
		headerBtnHandler.onRouteChangeSuccess(next, current);
	});

	$rootScope.$on("$routeChangeError", function(event, next, current) {
		headerBtnHandler.onRouteChangeError(next, current);
	});
});
