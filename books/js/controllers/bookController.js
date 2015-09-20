booksApp.controller('bookController', function bookController($routeParams, bookData, $location, $log, serverData) {
	var _this = this;
	_this.bookId = $routeParams.bookId || '';
	_this.booksDetails = serverData.data;

	$log.log(_this.booksDetails);

	_this.getBooks = function() {
		bookData.getSpecificBook({
			'bookId': _this.bookId
		}).then(function(response) {
			_this.booksDetails = response.data;
			$log.log('success: ', _this.booksDetails);
		}, function(response) {
			$log.log('error: ', response);
		});
	};
});
