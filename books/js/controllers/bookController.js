booksApp.controller('bookController', function bookController($routeParams, webService, $location, $log, serverData) {
	var _this = this;
	_this.bookId = $routeParams.bookId || '';
	_this.booksDetails = serverData.data;

	$log.log(_this.booksDetails);

	_this.getBooks = function() {
		webService.getCall({
			url: 'https://www.googleapis.com/books/v1/volumes/' + _this.bookId + '?projection=full'
		}).then(function(response) {
			_this.booksDetails = response.data;
			$log.log('success: ', _this.booksDetails);
		}, function(response) {
			$log.log('error: ', response);
		});
	};
});
