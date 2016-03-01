/// <reference path='../../_all.ts' />

module app {
	'use strict'

	export class HeaderController implements HeaderInterface {
		heading: string;
		headerLeftBtn: HeaderButtonsInterface;
		headerRightBtn: HeaderButtonsInterface;

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
			$scope.$on("routeChangeStart", this.onRouteChangeStart.bind(this));
			$scope.$on("routeChangeSuccess", this.onRouteChangeSuccess.bind(this));
			$scope.$on("routeChangeError", this.onRouteChangeError.bind(this));

			this.heading = 'User management';
			this.headerLeftBtn = {
				'showBtn': false,
				'clickFunc': '',
				'text': ''
			};
			this.headerRightBtn = {
				'showBtn': false,
				'clickFunc': '',
				'text': ''
			};
		}

		onRouteChangeStart(event: Event, params: Object) {
			// this.$log.log('onRouteChangeStart: ', params);
		}

		onRouteChangeSuccess(event: Event, params: any) {
			// this.$log.log('onRouteChangeSuccess: ', params);

			if (params.next && params.next.$$route && params.next.$$route.controller) {
				switch (params.next.$$route.controller) {
					case 'UsersListController':
						this.setUserListHeader();
						break;

					case 'AddUserController':
						this.setAddUserHeader();
						break;
				}
			} else {
				this.setUserListHeader();
			}
		}

		onRouteChangeError(event, params) {
			// this.$log.log('onRouteChangeError: ', params);
		}

		setUserListHeader() {
			this.headerLeftBtn = {
				'showBtn': false,
				'clickFunc': '',
				'text': ''
			};

			this.headerRightBtn = {
				'showBtn': true,
				'clickFunc': 'goToAddUser',
				'text': 'Add user'
			};
		}

		setAddUserHeader() {
			this.headerLeftBtn = {
				'showBtn': true,
				'clickFunc': 'goBack',
				'text': 'Back'
			};

			this.headerRightBtn = {
				'showBtn': false,
				'clickFunc': '',
				'text': ''
			};
		}

		callFunction(event: Event, clickFunc: string) {
			event.preventDefault();

			if (angular.isFunction(this[clickFunc])) {
				this[clickFunc]();
			}
		}

		goToAddUser() {
			this.$location.path('/addUser').replace();
		}

		addUser() {
			this.sharedService.broadcastEvent('add-user', {});
		}

		goBack() {
			event.preventDefault();
			this.$location.path('/userslist').replace();
		}
	}
}
controllers.controller('HeaderController', app.HeaderController);
