'use strict';

googleBooks.controller('headerController', function headerController($scope, $location) {
	$scope.routeIs = function (routeName) {
		console.log('routeName: '  + routeName);
		return $location.path() === routeName;
	};
	
	$scope.$on('currentRoute', function(event, args) {
		console.log('route');
	});
});
