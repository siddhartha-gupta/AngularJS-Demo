booksApp.controller('mainController', function mainController($scope, $timeout, $log, $location, bookData, localStorageService, serverData) {
	var _this = this;

	_this.books = {
		'searchQuery': '',
		'sortOrder': 'relevance',
		'maxLimit': '10',
		'localSortOrder': 'volumeInfo.title',
	};

	_this.error = {
		isVisible: false,
		className: 'slideover',
		text: 'Please type 3 or more chars'
	};
	_this.booksList = [];
	_this.searchTimer = null;
	_this.currentReq = null;

	if (serverData.data) {
		_this.books = {
			'searchQuery': localStorageService.get('searchQuery'),
			'sortOrder': localStorageService.get('sortOrder'),
			'maxLimit': localStorageService.get('maxLimit'),
			'localSortOrder': localStorageService.get('localSortOrder'),
		};
		_this.booksList = serverData.data.items;
	}

	console.log(_this.books.searchQuery);
	_this.getBooks = function() {
		console.log(_this.books.searchQuery);
		_this.books.searchQuery = _this.books.searchQuery.trim();
		$timeout.cancel(_this.searchTimer);

		if (_this.currentReq && angular.isFunction(_this.currentReq.abort)) {
			_this.currentReq.abort();
		}

		if (_this.books.searchQuery.length > 2) {
			_this.error.isVisible = false;
			_this.searchTimer = $timeout(function(search) {
				searchBooks();
			}, 500);
		} else {
			_this.error.isVisible = true;
			if (_this.books.searchQuery.length === 0) {
				_this.booksList = [];
			}
		}
		_this.updateSessionStorage(['searchQuery', 'sortOrder', 'maxLimit', 'localSortOrder']);
	};

	var searchBooks = function() {
		_this.currentReq = bookData.getAllBooks({
			'searchQuery': _this.books.searchQuery,
			'orderBy': _this.books.sortOrder,
			'maxLimit': _this.books.maxLimit
		}).then(function(response) {
			_this.currentReq = null;
			_this.booksList = response.data.items;
			$log.log('success: ', _this.booksList);
		}, function(response) {
			_this.currentReq = null;
			$log.log('error: ', response);
		});
	};

	_this.showBook = function(id) {
		$location.path('/book/' + id).replace();
	};

	_this.updateSessionStorage = function(keys) {
		angular.forEach(keys, function(key) {
			localStorageService.set(key, _this.books[key]);
		});
	};
});
