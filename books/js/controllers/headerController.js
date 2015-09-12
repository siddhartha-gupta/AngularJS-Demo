booksApp.controller('headerController', function headerController($scope) {
	$scope.data = {
		'imageUrl': 'img/angularjs-logo.png',
	};

	$scope.goBack = function() {
		console.log('go back clicked');
		$location.path('/books');
	};
});
