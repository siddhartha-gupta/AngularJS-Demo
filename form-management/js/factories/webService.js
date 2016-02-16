'use strict';

formApp.factory('webService', function($http) {
	var getCall = function(params) {
			var config = params.config || {};
			return $http.get(params.url, config);
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
