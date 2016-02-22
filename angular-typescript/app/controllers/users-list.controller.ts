/// <reference path='../_all.ts' />

module app {
	'use strict';

	export class UsersListController {
		private usersList: Object;
		private appConfig: appConfigInterface;
		private modalDialogue: ModalDialogueInterface;

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

			this.modalDialogue = {
				isVisible: false,
				title: '',
				user: {},
				userId: ''
			};
		}

		getUsers() {
			this.apiService.getCall({
				'url': this.appConfig.serverUrl + 'getuserslist'
			}).success((data, status) => {
				this.processServerData(data)
			}).error((data, status) => {
				this.$log.log('err')
			});
		}

		processServerData(data: any) {
			this.$log.log('processServerData: ', data);

			if (data && Object.keys(data).length > 0) {
				this.usersList = data;
			} else {
				this.usersList = {};
			}
		}

		addUser() {
			this.$location.path('/addUser').replace();
		}

		deleteUser(event: Event, key: string) {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}
			console.log('key: ', key);

			this.apiService.postCall({
				'url': this.appConfig.serverUrl + 'deleteuser',
				data: {
					'key': key
				}
			}).success((response) => {
				this.$log.log('success: ', response);
				this.getUsers();
			}).error((response) => {
				this.$log.log('error: ', response);
			});
		}

		editUserClick(event: Event, key: string) {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}
			console.log('key: ', key);

			this.modalDialogue = {
				isVisible: true,
				title: 'Edit details',
				user: this.clone(this.usersList[key]),
				userId: key
			};
			console.log(this.modalDialogue);
		}

		clone(obj) {
			if (obj == null || typeof (obj) != 'object')
				return obj;

			var temp = new obj.constructor();
			for (var key in obj)
				temp[key] = this.clone(obj[key]);

			return temp;
		}

		updateUserData(data: any, userId: string) {
			console.log('updateUserData: ', data, userId);
			this.hideModal();

			this.apiService.postCall({
				'url': this.appConfig.serverUrl + 'updateuser',
				data: {
					'key': userId,
					'userData': data
				}
			}).success((response) => {
				this.$log.log('updateUserData success: ', response);
				this.getUsers();
			}).error((response) => {
				this.$log.log('updateUserData error: ', response);
			});
		}

		hideModal(event?: Event) {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}
			console.log(arguments);

			this.modalDialogue = {
				isVisible: false,
				title: '',
				user: {},
				userId: ''
			};
		}
	}
}
controllers.controller('UsersListController', app.UsersListController);
