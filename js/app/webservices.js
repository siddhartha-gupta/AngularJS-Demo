angular.module('googleBooks.services', []).
factory('webServices', function($http) {

	var webServicesAPI = {};

	webServicesAPI.getBooks = function() {
		return $http({
			method: 'JSON',
			url: 'https://www.googleapis.com/books/v1/volumes?q=mobile'
		});
	};

	return webServicesAPI;
});
