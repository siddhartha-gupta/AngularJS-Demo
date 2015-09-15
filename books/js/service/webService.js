'use strict';

booksApp.factory('webService', function($http) {
	var getCall = function(params) {
			return $http.get(params.url);
		},

		postCall = function(params) {
			return $http.post(params.url, params.data);
		};

	return {
		getCall: getCall,
		postCall: postCall
	};
});
