formApp.controller('headerController', function headerController($scope, $location, headerBtnHandler, $window, $log, sharedService) {
	$scope.heading = 'User management';

	$scope.headerLeftButton = {
		'showBtn': true,
		'clickFunc': function() {},
		'text': ''
	};

	$scope.headerRightButton = {
		'showBtn': true,
		'clickFunc': function() {},
		'text': ''
	};

	$scope.callFunction = function(event, clickFunc) {
		event.preventDefault();

		console.log('clickFunc: ', clickFunc);
		if (angular.isFunction($scope[clickFunc])) {
			$scope[clickFunc]();
		}
	};

	$scope.goToAddUser = function() {
		// angular.element(document.getElementById("header")).scope()
		$location.path('/addUser').replace();
		$window.location.reload();
	};

	$scope.addUser = function() {
		sharedService.broadcastEvent('add-user', {});
	};

	$scope.goBack = function() {
		event.preventDefault();
		$location.path('/userslist').replace();
	};

	var updateHeaderButtons = function(headerLeftButton, headerRightButton) {
		console.log('updateHeaderButtons: ', headerLeftButton, ' : ', headerRightButton);
		$scope.headerLeftButton = headerLeftButton;
		$scope.headerRightButton = headerRightButton;
	};

	headerBtnHandler.registerObserverCallback(updateHeaderButtons);
});
