formApp.controller('usersListController', function usersListController($scope, $log, $location, webService, serverData, config) {
	var _this = this;

	_this.error = {
		isVisible: false,
		className: 'slideover',
		text: 'Please type 3 or more chars'
	};
	_this.currentReq = null;
	_this.usersList = {};
	_this.modalDialogue = {
		isVisible: false,
		title: '',
		user: {},
		userId: ''
	};

	_this.getUsers = function() {
		console.log('getUsers');

		_this.currentReq = webService.getCall({
			'url': config.serverUrl + 'getuserslist'
		}).then(function(response) {
			_this.currentReq = null;
			_this.processServerData(response.data);
		}, function(response) {
			_this.currentReq = null;
			$log.log('error: ', response);
		});
	}

	_this.processServerData = function(data) {
		console.log('processServerData: ', data);

		if (data && Object.keys(data).length > 0) {
			console.log('adding server data');
			_this.usersList = data;
		} else {
			_this.usersList = {};
		}
	}

	_this.addUser = function(id) {
		$location.path('/addUser').replace();
	}

	_this.deleteUser = function(event, key) {
		if (event) {
			event.stopPropagation();
			event.preventDefault();
		}
		console.log('key: ', key);

		webService.postCall({
			'url': config.serverUrl + 'deleteuser',
			data: {
				'key': key
			}
		}).then(function(response) {
			$log.log('success: ', response);
			_this.getUsers();
		}, function(response) {
			$log.log('error: ', response);
		});
	}

	_this.editUserClick = function(event, key) {
		if (event) {
			event.stopPropagation();
			event.preventDefault();
		}
		console.log('key: ', key);

		_this.modalDialogue = {
			isVisible: true,
			title: 'Edit details',
			user: _this.clone(_this.usersList[key]),
			userId: key
		};
		console.log(_this.modalDialogue);
	}

	_this.clone = function(obj) {
		if (obj == null || typeof(obj) != 'object')
			return obj;

		var temp = new obj.constructor();
		for (var key in obj)
			temp[key] = _this.clone(obj[key]);

		return temp;
	}

	_this.updateUserData = function(data, userId) {
		console.log('updateUserData: ', data, userId);
		_this.hideModal();

		webService.postCall({
			'url': config.serverUrl + 'updateuser',
			data: {
				'key': userId,
				'userData': data
			}
		}).then(function(response) {
			$log.log('updateUserData success: ', response);
			_this.getUsers();
		}, function(response) {
			$log.log('updateUserData error: ', response);
		});
	}

	_this.hideModal = function(event) {
		if (event) {
			event.stopPropagation();
			event.preventDefault();
		}
		console.log(arguments);

		_this.modalDialogue = {
			isVisible: false,
			title: '',
			user: {},
			userId: ''
		};
	}

	_this.processServerData(serverData.data);
});
