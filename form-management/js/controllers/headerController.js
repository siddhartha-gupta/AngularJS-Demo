formApp.controller('headerController', function headerController($scope, $location, $window, $log, sharedService) {
	var _this = this,

		onRouteChangeStart = function(event, params) {
			$log.log('onRouteChangeStart: ', params);
		},

		onRouteChangeSuccess = function(event, params) {
			$log.log('onRouteChangeSuccess: ', params);

			if (params.next && params.next.$$route && params.next.$$route.controller) {
				switch (params.next.$$route.controller) {
					case 'usersListController':
						_this.headerLeftBtn = {
							'showBtn': false,
							'clickFunc': function() {},
							'text': ''
						};
						_this.headerRightBtn = {
							'showBtn': true,
							'clickFunc': 'goToAddUser',
							'text': 'New user'
						};
						break;

					case 'addUserController':
						_this.headerLeftBtn = {
							'showBtn': true,
							'clickFunc': 'goBack',
							'text': 'Back'
						};
						_this.headerRightBtn = {
							'showBtn': false,
							'clickFunc': 'addUser',
							'text': 'Add user'
						};
						break;
				}
			} else {
				_this.headerLeftBtn = {
					'showBtn': false,
					'clickFunc': function() {},
					'text': ''
				};
				_this.headerRightBtn = {
					'showBtn': true,
					'clickFunc': 'addUser',
					'text': 'Add user'
				};
			}
		},

		onRouteChangeError = function(event, params) {
			$log.log('onRouteChangeError: ', params);
		};

	_this.heading = 'User management';

	_this.headerLeftBtn = {
		'showBtn': false,
		'clickFunc': function() {},
		'text': ''
	};

	_this.headerRightBtn = {
		'showBtn': false,
		'clickFunc': function() {},
		'text': ''
	};

	_this.callFunction = function(event, clickFunc) {
		event.preventDefault();

		if (angular.isFunction(_this[clickFunc])) {
			_this[clickFunc]();
		}
	};

	_this.goToAddUser = function() {
		// angular.element(document.getElementById("header")).scope()
		$location.path('/addUser').replace();
		$window.location.reload();
	};

	_this.addUser = function() {
		sharedService.broadcastEvent('add-user', {});
	};

	_this.goBack = function() {
		event.preventDefault();
		$location.path('/userslist').replace();
	};

	$scope.$on("routeChangeStart", onRouteChangeStart);
	$scope.$on("routeChangeSuccess", onRouteChangeSuccess);
	$scope.$on("routeChangeError", onRouteChangeError);
});
