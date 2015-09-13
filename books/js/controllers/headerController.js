booksApp.controller('headerController', function headerController($scope, $location, localStorageService, $window, $log) {
	$scope.data = {
		'imageUrl': 'img/angularjs-logo.png',
	};
	$scope.showBackBtn = true;
	$scope.isDisabled = true;
	$scope.showResetBtn = true;

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
		return $scope[btn];
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

	$scope.$on('routeChangeStartEvent', function(event, next, current) {
		switch (next.$$route.controller) {
			case 'mainController':
				$scope.isDisabled = false;
				break;

			case 'bookController':
				$scope.isDisabled = true;
				break;
		}
	});

	$scope.$on('routeChangeSuccessEvent', function(event, next, current) {
		switch (next.$$route.controller) {
			case 'mainController':
				$scope.isDisabled = false;
				$scope.showBackBtn = false;
				$scope.showResetBtn = true;
				break;

			case 'bookController':
				$scope.isDisabled = false;
				$scope.showBackBtn = true;
				$scope.showResetBtn = true;
				break;
		}
	});

	$scope.$on('routeChangeErrorEvent', function(event, next, current) {
		switch (next.$$route.controller) {
			case 'mainController':
				$scope.isDisabled = false;
				break;

			case 'bookController':
				$scope.isDisabled = true;
				break;
		}
	});
});
