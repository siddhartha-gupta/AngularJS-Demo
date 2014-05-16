'use strict';

var googleBooks = angular.module('googleBooks', ['googleBooks.webServices', 'ngRoute']);

googleBooks.config(
	function ($routeProvider) {
	$routeProvider.
	when("/allbooks", {
		templateUrl : "templates/allbooks.html",
		controller : "allBooksController"
	}).
	when("/details/:id", {
		templateUrl : "templates/details.html",
		controller : "bookDetailsController"
	}).
	otherwise({
		redirectTo : '/allbooks'
	});
});
