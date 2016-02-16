'use strict';

formApp.factory('webService', function($http) {
	var getCall = function(params) {
			return $http.get(params.url);
		},

		postCall = function(params) {
			console.log(JSON.stringify(params.data));
			return $http.post(params.url, params.data);
		};

	return {
		getCall: getCall,
		postCall: postCall
	};
});
