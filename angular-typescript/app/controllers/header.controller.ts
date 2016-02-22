/// <reference path='../_all.ts' />

module app {
	'use strict'

	export class HeaderController {
		heading: string = 'User management';

		headerLeftBtn: Object = {
			'showBtn': false,
			'clickFunc': function() { },
			'text': ''
		};

		headerRightBtn: Object = {
			'showBtn': false,
			'clickFunc': function() { },
			'text': ''
		};

		public static $inject = [
			'$scope',
			'$location',
			'$window',
			'$log',
			'SharedService'
		];

		constructor(
			private $scope: ng.IScope,
			private $location: ng.ILocationService,
			private $window: ng.IWindowService,
			private $log: ng.ILogService,
			private sharedService: SharedService
		) {
			console.log(this);
			$scope.$on("routeChangeStart", this.onRouteChangeStart.bind(this));
			$scope.$on("routeChangeSuccess", this.onRouteChangeSuccess.bind(this));
			$scope.$on("routeChangeError", this.onRouteChangeError.bind(this));
		}

		onRouteChangeStart(event: Event, params: Object) {
			this.$log.log('onRouteChangeStart: ', params);
		}

		onRouteChangeSuccess(event: Event, params: Object) {
			this.$log.log('onRouteChangeSuccess: ', params);

			if (params.next && params.next.$$route && params.next.$$route.controller) {
				switch (params.next.$$route.controller) {
					case 'usersListController':
						this.headerLeftBtn = {
							'showBtn': false,
							'clickFunc': function() { },
							'text': ''
						};

						this.headerRightBtn = {
							'showBtn': true,
							'clickFunc': 'goToAddUser',
							'text': 'New user'
						};
						break;

					case 'addUserController':
						this.headerLeftBtn = {
							'showBtn': true,
							'clickFunc': 'goBack',
							'text': 'Back'
						};

						this.headerRightBtn = {
							'showBtn': false,
							'clickFunc': 'addUser',
							'text': 'Add user'
						};
						break;
				}
			} else {
				this.headerLeftBtn = {
					'showBtn': false,
					'clickFunc': function() { },
					'text': ''
				};

				this.headerRightBtn = {
					'showBtn': true,
					'clickFunc': 'addUser',
					'text': 'Add user'
				};
			}
		}

		onRouteChangeError(event, params) {
			this.$log.log('onRouteChangeError: ', params);
		}

		callFunction(event: Event, clickFunc: string) {
			event.preventDefault();

			if (angular.isFunction(this[clickFunc])) {
				this[clickFunc]();
			}
		}

		goToAddUser = function() {
			// angular.element(document.getElementById("header")).scope()
			this.$location.path('/addUser').replace();
			this.$window.location.reload();
		}

		addUser() {
			// this.sharedService.broadcastEvent('add-user', {});
		}

		goBack() {
			event.preventDefault();
			this.$location.path('/userslist').replace();
		}
	}
}
controllers.controller('HeaderController', app.HeaderController);
