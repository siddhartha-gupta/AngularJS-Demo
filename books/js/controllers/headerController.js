booksApp.controller('headerController', function headerController($scope, $location) {
	$scope.data = {
		'imageUrl': 'img/angularjs-logo.png',
	};
	$scope.show = false;
	$scope.isDisabled = true;

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
				$scope.show = false;
				break;

			case 'bookController':
				$scope.isDisabled = false;
				$scope.show = true;
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

	$scope.goBack = function() {
		$location.path('/books');
	};
});
