/// <reference path='../../_all.ts' />

module app {
	'use strict';

	export class AddUserController {
		private validEmail: Boolean;
		private userdata: UserDataInterface;
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
			$scope.$on('add-user', function(event, args) {
				this.addUser();
			});

			this.appConfig = app.Constants.Default;
			this.validEmail = false;
			this.userdata = {
				'firstname': '',
				'lastname': '',
				'email': '',
				'phonenumber': '',
				'location': 'IN'
			};
		}

		validateEmail = function(val) {
			var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
			if (val && emailRegexp.test(val)) {
				this.validEmail = true;
			} else {
				this.validEmail = false;
			}
		}

		addUser = function() {
			this.$log.log('add user: ', this.userdata);

			this.apiService.postCall({
				'url': this.appConfig.serverUrl + 'adduser',
				data: this.userdata
			}).success((response) => {
				this.$log.log('success: ', response);
				this.$location.path('/userslist').replace();
			}).error((response) => {
				this.$log.log('error: ', response);
			});
		};
	}
}
controllers.controller('AddUserController', app.AddUserController);
