'use strict';

booksApp.factory('bookData', function(webService) {
	var getAllBooks = function(params) {
			return webService.getCall({
				'url': 'https://www.googleapis.com/books/v1/volumes?q=' + params.searchQuery + '&maxResults=' + params.maxLimit
			});
		},

		getSpecificBook = function(params) {
			return webService.getCall({
				url: 'https://www.googleapis.com/books/v1/volumes/' + params.bookId + '?projection=full'
			});
		};

	return {
		getAllBooks: getAllBooks,
		getSpecificBook: getSpecificBook
	};
});
