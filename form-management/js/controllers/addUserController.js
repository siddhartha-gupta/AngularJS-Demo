formApp.controller('addUserController', function addUserController($scope, webService, $log, sharedService, config) {
	var _this = this;

	_this.user = {
		'firstname': '',
		'lastname': '',
		'email': '',
		'phonenumber': '',
		'location': ''
	};

	$scope.$on('add-user', function(event, args) {
		_this.addUser();
	});

	_this.addUser = function() {
		console.log('add user: ', _this.user);
		webService.postCall({
			'url': config.serverUrl + 'adduser',
			data: _this.user
		}).then(function(response) {
			$log.log('success: ', response);
		}, function(response) {
			$log.log('error: ', response);
		});
		/*webService.getCall({
			url: 'https://www.googleapis.com/books/v1/volumes/' + _this.bookId + '?projection=full&country=IN'
		}).then(function(response) {
			_this.booksDetails = response.data;
			$log.log('success: ', _this.booksDetails);
		}, function(response) {
			$log.log('error: ', response);
		});*/
	};
});
