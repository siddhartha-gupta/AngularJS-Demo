/// <reference path='../_all.ts' />

module app {
	'use strict';

	export class UsersListController {
		private usersList: Object;
		private appConfig: appConfigInterface;

		public static $inject = [
			'$scope',
			'$location',
			'$log',
			'APIService'
		];

		constructor(
			private $scope: ng.IScope,
			private $location: ng.ILocationService,
			private $log: ng.ILogService,
			private apiService: APIService
		) {
			this.appConfig = app.Constants.Default;
			this.getUsers();
		}

		getUsers() {
			this.apiService.getCall({
				'url': this.appConfig.serverUrl + 'getuserslist'
			})
				.success((data, status) => this.processServerData(data))
				.error((data, status) => this.$log.log('err'));
		}

		processServerData(data: any) {
			this.$log.log('processServerData: ', data);

			if (data && Object.keys(data).length > 0) {
				this.usersList = data;
			} else {
				this.usersList = {};
			}
		}
	}
} 
controllers.controller('UsersListController', app.UsersListController);
