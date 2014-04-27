angular.module('googleBooks', [
	'googleBooks.controllers',
	'googleBooks.webServices',
	'ngRoute'
]).
config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when("/allbooks", {
			templateUrl: "templates/allbooks.html",
			controller: "allBooksController"
		}).
		when("/details/:id", {
			templateUrl: "templates/details.html",
			controller: "bookDetailsController"
		}).
		otherwise({
			redirectTo: '/allbooks'
		});
	}
]);