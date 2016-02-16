'use strict';

formApp.factory('headerBtnHandler', function() {
	var headerLeftBtn = {
			'showBtn': false,
			'clickFunc': function() {},
			'text': ''
		},
		headerRightBtn = {
			'showBtn': false,
			'clickFunc': function() {},
			'text': ''
		},
		observerCallbacks = [],

		notifyObservers = function() {
			angular.forEach(observerCallbacks, function(callback) {
				callback(headerLeftBtn, headerRightBtn);
			});
		},

		registerObserverCallback = function(callback) {
			observerCallbacks.push(callback);
		},

		onRouteChangeStart = function(next, current) {
			headerLeftBtn = {
				'showBtn': false,
				'clickFunc': function() {},
				'text': ''
			};
			headerRightBtn = {
				'showBtn': false,
				'clickFunc': function() {},
				'text': ''
			};
			notifyObservers(headerLeftBtn, headerRightBtn);
		},

		onRouteChangeSuccess = function(next, current) {
			if (next && next.$$route && next.$$route.controller) {
				switch (next.$$route.controller) {
					case 'usersListController':
						headerLeftBtn = {
							'showBtn': false,
							'clickFunc': function() {},
							'text': ''
						};
						headerRightBtn = {
							'showBtn': true,
							'clickFunc': 'goToAddUser',
							'text': 'New user'
						};
						break;

					case 'addUserController':
						headerLeftBtn = {
							'showBtn': true,
							'clickFunc': 'goBack',
							'text': 'Back'
						};
						headerRightBtn = {
							'showBtn': true,
							'clickFunc': 'addUser',
							'text': 'Add user'
						};
						break;
				}
			} else {
				headerLeftBtn = {
					'showBtn': false,
					'clickFunc': function() {},
					'text': ''
				};
				headerRightBtn = {
					'showBtn': true,
					'clickFunc': 'addUser',
					'text': 'Add user'
				};
			}
			notifyObservers();
		},

		onRouteChangeError = function(next, current) {
			switch (next.$$route.controller) {
				case 'usersListController':
					break;

				case 'addUserController':
					break;
			}
			notifyObservers();
		};
	return {
		registerObserverCallback: registerObserverCallback,
		onRouteChangeStart: onRouteChangeStart,
		onRouteChangeSuccess: onRouteChangeSuccess,
		onRouteChangeError: onRouteChangeError
	};
});
