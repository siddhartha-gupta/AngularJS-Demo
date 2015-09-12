booksApp.controller('headerController', function headerController($scope, $location) {
	$scope.data = {
		'imageUrl': 'img/angularjs-logo.png',
	};
	$scope.show = false;

	$scope.$on('routeChangeSuccessEvent', function(event, next, current) {
		console.log('routeChangeSuccessEvent captured: ', next, current);

		switch (next.$$route.controller) {
			case 'mainController':
				$scope.show = false;
				break;

			case 'bookController':
				$scope.show = true;
				break;
		}
	});

	$scope.goBack = function() {
		console.log('go back clicked');
		$location.path('/books');
	};
});
