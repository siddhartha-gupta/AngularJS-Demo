booksApp.controller('headerController', function headerController($scope, $location, localStorageService, routeHandler, $window, $log) {
	$scope.data = {
		'imageUrl': 'img/angularjs-logo.png',
	};
	$scope.headerButtons = {
		'showBackBtn': false,
		'showResetBtn': false,
		'isDisabled': true,
	};

	$scope.headerItems = [{
		'showBtn': 'showBackBtn',
		'clickFunc': 'goBack',
		'text': 'Go back'
	}, {
		'showBtn': 'showResetBtn',
		'clickFunc': 'resetApp',
		'text': 'Reset app'
	}];

	$scope.showButton = function(showBtn) {
		return $scope.headerButtons[showBtn];
	};

	$scope.callFunction = function(event, clickFunc) {
		event.preventDefault();

		if (angular.isFunction($scope[clickFunc])) {
			$scope[clickFunc]();
		}
	};

	$scope.resetApp = function() {
		// angular.element(document.getElementById("header")).scope()
		localStorageService.clearAll();
		$location.path('/books').replace();
		$window.location.reload();
	};

	$scope.goBack = function() {
		event.preventDefault();
		$location.path('/books').replace();
	};

	var updateHeaderButtons = function(buttonState) {
		$scope.headerButtons = buttonState;
	};

	routeHandler.registerObserverCallback(updateHeaderButtons);
});
