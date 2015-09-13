booksApp.controller('headerController', function headerController($scope, $location, localStorageService, $window) {
	$scope.data = {
		'imageUrl': 'img/angularjs-logo.png',
	};
	$scope.showBackBtn = false;
	$scope.isDisabled = true;
	$scope.showResetBtn = true;

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

	$scope.resetApp = function(event) {
		event.preventDefault();
		// angular.element(document.getElementById("header")).scope()
		localStorageService.clearAll();
		$location.path('/books');
		$window.location.reload();
	};

	$scope.goBack = function(event) {
		event.preventDefault();
		$location.path('/books');
	};
});
