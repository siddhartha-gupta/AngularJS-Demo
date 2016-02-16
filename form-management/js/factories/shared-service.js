formApp.factory('sharedService', function($rootScope) {
	var sharedService = {};

	sharedService.broadcastEvent = function(eventName, data) {
		$rootScope.$broadcast(eventName, data);
	};
	return sharedService;
});
