booksApp.controller('mainController', function mainController($scope, $timeout, $log, $location, webService, localStorageService, serverData) {
	var _this = this,

		searchBooks = function() {
			_this.currentReq = webService.getCall({
				'url': 'https://www.googleapis.com/books/v1/volumes?q=' + _this.books.searchQuery + '&maxResults=' + _this.books.maxLimit + '&orderBy=' + _this.books.sortOrder
			}).then(function(response) {
				_this.currentReq = null;
				processServerData(response.data);
				$log.log('success: ', _this.booksList);
			}, function(response) {
				_this.currentReq = null;
				$log.log('error: ', response);
			});
		},

		processServerData = function(data) {
			_this.categorisedData = {
				'All': []
			};

			if (data.items && data.items.length > 0) {
				for (var i = 0, len = data.items.length; i < len; i++) {
					var categoryName = 'All';

					// push in all key by default
					_this.categorisedData[categoryName].push(data.items[i]);

					if (data.items[i].volumeInfo.categories && data.items[i].volumeInfo.categories.length > 0) {
						for (var j = 0, catLen = data.items[i].volumeInfo.categories.length; j < catLen; j++) {
							categoryName = data.items[i].volumeInfo.categories[j];

							if (!_this.categorisedData.hasOwnProperty(categoryName)) {
								_this.categorisedData[categoryName] = [];
							}
							_this.categorisedData[categoryName].push(data.items[i]);
						}
					}
				}
			}

			console.log(_this.categorisedData);
			_this.booksList = data.items;
		};

	_this.books = {
		'searchQuery': '',
		'sortOrder': 'relevance',
		'maxLimit': '10',
		'localSortOrder': 'volumeInfo.title',
		'activeTab': 'All'
	};

	_this.error = {
		isVisible: false,
		className: 'slideover',
		text: 'Please type 3 or more chars'
	};
	_this.booksList = [];
	_this.searchTimer = null;
	_this.currentReq = null;
	_this.categorisedData = {};

	if (serverData.data) {
		_this.books = {
			'searchQuery': localStorageService.get('searchQuery'),
			'sortOrder': localStorageService.get('sortOrder'),
			'maxLimit': localStorageService.get('maxLimit'),
			'localSortOrder': localStorageService.get('localSortOrder'),
		};
		processServerData(serverData.data);
	}

	_this.getBooks = function() {
		_this.books.searchQuery = _this.books.searchQuery.trim();

		console.log('getBooks: ', _this.books.searchQuery);
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
		_this.books.activeTab = 'All';
		_this.updateSessionStorage(['searchQuery', 'sortOrder', 'maxLimit', 'localSortOrder']);
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
