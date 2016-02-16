formApp.controller('usersListController', function usersListController($scope, $log, $location, webService, serverData) {
	var _this = this,

		getUsers = function() {
			_this.currentReq = webService.getCall({
				'url': 'http://localhost:8080'
			}).then(function(response) {
				_this.currentReq = null;
				_this.usersList = response.data;
			}, function(response) {
				_this.currentReq = null;
				$log.log('error: ', response);
			});
		};

	if (serverData.data) {
		_this.usersList = serverData.data;
	}

	_this.error = {
		isVisible: false,
		className: 'slideover',
		text: 'Please type 3 or more chars'
	};
	_this.currentReq = null;
	_this.usersList = [];

	_this.addUser = function(id) {
		$location.path('/addUser').replace();
	};
});
