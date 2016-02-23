/// <reference path='../../_all.ts' />

module app {
	'use strict';

	export class UsersListController implements UsersListInterface {
		private usersList: Object;
		private appConfig: appConfigInterface;
		private editUser: EditUserInterface;
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

			this.usersList = {};
			this.editUserDefault();
			this.modalDialogueDefault();
		}

		dataAvailable() {
			if (Object.keys(this.usersList).length > 0) {
				return true;
			}
			return false
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

		/*
		* Edit user code flow
		*/
		editUserClick(event: Event, key: string) {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}
			console.log('key: ', key);

			this.editUser = {
				isVisible: true,
				title: 'Edit details',
				user: this.clone(this.usersList[key]),
				userId: key
			};
			console.log(this.editUser);
		}

		clone(obj: any) {
			if (obj == null || typeof (obj) != 'object')
				return obj;

			var temp = new obj.constructor();
			for (var key in obj)
				temp[key] = this.clone(obj[key]);

			return temp;
		}

		updateUserData(data: any, userId: string) {
			console.log('updateUserData: ', data, userId);
			this.hideEditPopup();

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

		hideEditPopup(event?: Event) {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}
			this.editUserDefault();
		}

		editUserDefault() {
			this.editUser = {
				isVisible: false,
				title: '',
				user: {},
				userId: ''
			};
		}

		/*
		* Delete user codeflow
		*/
		deleteUserClick(event: Event, key: string) {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}
			console.log('key: ', key);

			this.modalDialogue = {
				isVisible: true,
				title: 'Delete user?',
				body: 'Please confirm, you want to delete the user',
				btn1Txt: 'Ok',
				btn2Txt: 'Cancel',
				showBtn2: true,
				btn1Callback: this.deleteUserConfirm.bind(this, key),
				btn2Callback: this.hideModalDialogue.bind(this),
				closeBtnCallback: this.hideModalDialogue.bind(this),
			};
		}

		deleteUserConfirm(key: string) {
			console.log('deleteUserConfirm, key: ', key);

			this.apiService.postCall({
				'url': this.appConfig.serverUrl + 'deleteuser',
				data: {
					'key': key
				}
			}).success((response) => {
				this.$log.log('success: ', response);
				this.modalDialogueDefault();
				this.getUsers();
			}).error((response) => {
				this.$log.log('error: ', response);
			});
		}

		hideModalDialogue(event?: Event) {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}
			this.modalDialogueDefault();
		}

		modalDialogueDefault() {
			this.modalDialogue = {
				isVisible: false,
				title: '',
				body: '',
				btn1Txt: '',
				btn2Txt: '',
				showBtn2: false,
				btn1Callback: function() { },
				btn2Callback: function() { },
				closeBtnCallback: function() { },
			};
		}
	}
}
controllers.controller('UsersListController', app.UsersListController);
