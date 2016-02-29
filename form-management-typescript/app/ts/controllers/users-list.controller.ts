/// <reference path='../../_all.ts' />

module app {
	'use strict';

	export class UsersListController implements UsersListInterface {
		private usersList: Array<any>;
		private appConfig: appConfigInterface;
		private editUser: EditUserInterface;
		private modalDialogue: ModalDialogueInterface;
		private infoSlider: InfoSliderInterface;
		private sortOrder: string;
		//TODO: create interface
		private tableHeading: Array<any>;

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
			this.sortOrder = 'firstname';
			this.getUsers();

			this.usersList = [];
			this.editUserDefault();
			this.modalDialogueDefault();
			this.infoSliderDefault();
			this.createtableHeading();
		}

		actionHandler(type: string, userId: string, userData?: any) {
			console.log('actionHandler: ', type, ' : ', userId);
			console.log(userData);

			switch (type) {
				case 'edit':
					this.editUserClick(userId);
					break;

				case 'delete':
					this.deleteUserClick(userId);
					break;

				case 'save':
					this.saveUserClick(userId, userData);
					break;
			}
		}

		saveUserClick(userId: string, userData: any) {
			this.updateUserData(userData, userId);
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
		validateEmail(val: string) {
			console.log('validateEmail');
		}

		editUserClick(userId: string) {
			this.utilsService.log('userId: ', userId);

			this.editUser = {
				isVisible: true,
				title: 'Edit details',
				userData: this.utilsService.clone(this.utilsService.getObjectFromArr(this.usersList, 'id_member', userId)),
				userId: userId
			};
			this.sharedService.broadcastEvent('show-edit-modal', { id: 'editUserModal' });
			this.utilsService.log(this.editUser);
		}

		updateUserData(data: any, userId: string) {
			this.utilsService.log('updateUserData: ', data);
			this.utilsService.log('userId: ', userId);

			this.apiService.postCall({
				'url': this.appConfig.serverUrl + 'updateuser',
				'data': {
					'userId': userId,
					'userData': {
						email: data.email,
						firstname: data.firstname,
						id_member: data.id_member,
						lastname: data.lastname,
						location: data.location,
						phonenumber: data.phonenumber
					}
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success((response: any) => {
				this.utilsService.log('updateUserData success: ', response);
				this.hideEditPopup();

				if (response.resp === true) {
					this.onUserUpdated();
				} else {
					this.modalDialogue = {
						isVisible: true,
						title: 'Error!',
						body: 'We have encountered error while updating user information. Please try again',
						btn1Txt: 'Ok',
						btn2Txt: '',
						showBtn2: false,
						btn1Callback: this.hideModalDialogue.bind(this),
						btn2Callback: function() { },
						closeBtnCallback: this.hideModalDialogue.bind(this),
					};
					this.sharedService.broadcastEvent('show-modal', { id: 'modalDialogue' });
				}
			}).error((response) => {
				this.utilsService.log('updateUserData error: ', response);
			});
		}

		onUserUpdated() {
			this.showInfoSlider({
				title: 'User updated',
				body: 'User info has been updated successfully',
				startTimer: 500,
				endTimer: 4000
			});
			this.getUsers();
		}

		hideEditPopup(event?: Event) {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}
			this.sharedService.broadcastEvent('hide-edit-modal', { id: 'editUserModal' });
			this.editUserDefault();
		}

		/*
		* Delete user codeflow
		*/
		deleteUserClick(userId: string) {
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
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success((response: any) => {
				this.utilsService.log('success: ', response);
				if (response.resp === true) {
					this.onUserDeleted();
				} else {
					this.modalDialogue = {
						isVisible: true,
						title: 'Error!',
						body: 'We have encountered error while deleting user. Please try again',
						btn1Txt: 'Ok',
						btn2Txt: '',
						showBtn2: false,
						btn1Callback: this.hideModalDialogue.bind(this),
						btn2Callback: function() { },
						closeBtnCallback: this.hideModalDialogue.bind(this),
					};
				}
			}).error((response) => {
				this.utilsService.log('error: ', response);
			});
		}

		onUserDeleted() {
			this.hideModalDialogue();
			this.showInfoSlider({
				title: 'User deleted',
				body: 'User has been deleted successfully',
				startTimer: 500,
				endTimer: 4000
			});
			this.getUsers();
		}

		hideModalDialogue(event?: Event) {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}

			this.sharedService.broadcastEvent('hide-modal', { id: 'modalDialogue' });
			this.modalDialogueDefault();
		}

		manageSortOrder(orderBy: any) {
			if (orderBy === this.sortOrder) {
				this.sortOrder = '-' + orderBy;
			} else {
				this.sortOrder = orderBy;
			}
		}

		showInfoSlider(params: any) {
			this.infoSlider = {
				title: params.title,
				body: params.body
			};
			setTimeout(() => {
				this.sharedService.broadcastEvent('show-info-slider', { id: 'infoSlider' });
			}, params.startTimer);

			setTimeout(() => {
				this.hideInfoSlider();
			}, params.endTimer);
		}

		hideInfoSlider() {
			this.sharedService.broadcastEvent('hide-info-slider', { id: 'infoSlider' });
			this.infoSliderDefault();
		}

		/*
		* Functions to set deafult values for different configs
		*/
		createtableHeading() {
			this.tableHeading = [{
				'className': 'col-xs-1',
				'sortOrder': 'id_member',
				'text': 'S.No'
			}, {
					'className': 'col-xs-2',
					'sortOrder': 'firstname',
					'text': 'First name'
				}, {
					'className': 'col-xs-2',
					'sortOrder': 'lastname',
					'text': 'Last name'
				}, {
					'className': 'col-xs-3',
					'sortOrder': 'email',
					'text': 'Email'
				}, {
					'className': 'col-xs-2',
					'sortOrder': 'phonenumber',
					'text': 'Phone Number'
				}, {
					'className': 'col-xs-1',
					'sortOrder': 'location',
					'text': 'Location'
				}];
		}

		editUserDefault() {
			this.editUser = {
				isVisible: false,
				title: '',
				userData: {},
				userId: ''
			};
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

		infoSliderDefault() {
			this.infoSlider = {
				title: '',
				body: ''
			}
		}
	}
}
controllers.controller('UsersListController', app.UsersListController);
