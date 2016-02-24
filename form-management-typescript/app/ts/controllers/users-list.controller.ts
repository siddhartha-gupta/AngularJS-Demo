/// <reference path='../../_all.ts' />

module app {
	'use strict';

	export class UsersListController implements UsersListInterface {
		private usersList: Array<any>;
		private appConfig: appConfigInterface;
		private editUser: EditUserInterface;
		private modalDialogue: ModalDialogueInterface;

		public static $inject = [
			'$scope',
			'$location',
			'APIService',
			'UtilsService',
			'SharedService'
		];

		constructor(
			private $scope: ng.IScope,
			private $location: ng.ILocationService,
			private apiService: APIService,
			private utilsService: UtilsService,
			private sharedService: SharedService
		) {
			this.appConfig = app.Constants.Default;
			this.getUsers();

			this.usersList = [];
			this.editUserDefault();
			this.modalDialogueDefault();
		}

		dataAvailable() {
			if (this.usersList.length > 0) {
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
				this.utilsService.log('err')
			});
		}

		processServerData(data: any) {
			this.utilsService.log('processServerData: ', data);

			if (data && data.length > 0) {
				this.usersList = data;
			} else {
				this.usersList.length = 0;
			}
		}

		addUser() {
			this.$location.path('/addUser').replace();
		}

		/*
		* Edit user code flow
		*/
		editUserClick(event: Event, userId: string) {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}
			this.utilsService.log('userId: ', userId);

			let data = this.utilsService.clone(this.utilsService.getObjectFromArr(this.usersList, 'id_member', userId));
			data.phonenumber = parseInt(data.phonenumber, 10);

			this.editUser = {
				isVisible: true,
				title: 'Edit details',
				user: data,
				userId: userId
			};
			this.sharedService.broadcastEvent('show-edit-modal', { id: 'editUserModal' });
			this.utilsService.log(this.editUser);
		}

		updateUserData(data: any, userId: string) {
			this.utilsService.log('updateUserData: ', data, userId);
			this.hideEditPopup();

			this.apiService.postCall({
				'url': this.appConfig.serverUrl + 'updateuser',
				data: {
					'userId': userId,
					'userData': data
				}
			}).success((response) => {
				this.utilsService.log('updateUserData success: ', response);
				this.getUsers();
			}).error((response) => {
				this.utilsService.log('updateUserData error: ', response);
			});
		}

		hideEditPopup(event?: Event) {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}
			this.sharedService.broadcastEvent('hide-edit-modal', { id: 'editUserModal' });
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
		deleteUserClick(event: Event, userId: string) {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}
			this.utilsService.log('userId: ', userId);

			this.modalDialogue = {
				isVisible: true,
				title: 'Delete user?',
				body: 'Please confirm, you want to delete the user',
				btn1Txt: 'Ok',
				btn2Txt: 'Cancel',
				showBtn2: true,
				btn1Callback: this.deleteUserConfirm.bind(this, userId),
				btn2Callback: this.hideModalDialogue.bind(this),
				closeBtnCallback: this.hideModalDialogue.bind(this),
			};
			this.sharedService.broadcastEvent('show-modal', { id: 'modalDialogue' });
		}

		deleteUserConfirm(userId: string) {
			this.utilsService.log('deleteUserConfirm, userId: ', userId);

			this.apiService.postCall({
				'url': this.appConfig.serverUrl + 'deleteuser',
				data: {
					'userId': userId
				}
			}).success((response) => {
				this.utilsService.log('success: ', response);
				this.modalDialogueDefault();
				this.getUsers();
			}).error((response) => {
				this.utilsService.log('error: ', response);
			});
		}

		hideModalDialogue(event?: Event) {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}
			this.sharedService.broadcastEvent('hide-modal', { id: 'modalDialogue' });
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
