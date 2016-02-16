formApp.controller('addUserController', function addUserController($scope, webService, $log, $location, sharedService, config) {
	var _this = this;

	_this.user = {
		'firstname': '',
		'lastname': '',
		'email': '',
		'phonenumber': '',
		'location': 'IN'
	};
	_this.validEmail = false;

	$scope.$on('add-user', function(event, args) {
		_this.addUser();
	});

	_this.validateEmail = function(val) {
		var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
		if (val && emailRegexp.test(val)) {
			_this.validEmail = true;
		} else {
			_this.validEmail = false;
		}
	}

	_this.addUser = function() {
		console.log('add user: ', _this.user);

		webService.postCall({
			'url': config.serverUrl + 'adduser',
			data: _this.user
		}).then(function(response) {
			$log.log('success: ', response);
			$location.path('/userslist').replace();
		}, function(response) {
			$log.log('error: ', response);
		});
	};
});
