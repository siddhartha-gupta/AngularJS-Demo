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
		'click': 'goBack',
		'text': 'Go back'
	}, {
		'showBtn': 'showResetBtn',
		'click': 'resetApp',
		'text': 'Reset app'
	}];

	$scope.showButton = function(btn) {
		return $scope.headerButtons[btn];
	};

	$scope.callFunction = function(event, name) {
		event.preventDefault();

		if (angular.isFunction($scope[name])) {
			$scope[name]();
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
