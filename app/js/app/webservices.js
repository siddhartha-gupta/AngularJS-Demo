angular.module('googleBooks.webServices', []).
factory('webServices', function($http) {

	var webServicesAPI = {};

	webServicesAPI.getBooks = function() {
		return $http({
			method: 'GET',
			url: 'https://www.googleapis.com/books/v1/volumes?q=mobile'
		});
	};

	webServicesAPI.getSpecificBook = function(id) {
		return $http({
			method: 'GET',
			url: 'https://www.googleapis.com/books/v1/volumes/' + id
		});
	};

	return webServicesAPI;
});
