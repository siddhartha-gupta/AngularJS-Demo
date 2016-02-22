/// <reference path='../_all.ts' />

module app {
	'use strict';

	export class AddUserController {
		private user: Object;
		private validEmail: Boolean;
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
			this.user = {
				'firstname': '',
				'lastname': '',
				'email': '',
				'phonenumber': '',
				'location': 'IN'
			};
			console.log($log);
			console.log(this);
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
			console.log('add user: ', this.user);

			this.apiService.postCall({
				'url': this.appConfig.serverUrl + 'adduser',
				data: this.user
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
