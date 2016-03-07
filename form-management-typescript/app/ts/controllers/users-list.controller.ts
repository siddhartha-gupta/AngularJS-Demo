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
		private tableHeading: TableHeadingInterface[];
		private showLoader: Boolean;

		public static $inject = [
			'$scope',
			'$location',
			'APIService',
			'UtilsService',
			'SharedService',
			'CheckboxHandlerService'
		];

		constructor(
			private $scope: ng.IScope,
			private $location: ng.ILocationService,
			private apiService: APIService,
			private utilsService: UtilsService,
			private sharedService: SharedService,
			private checkboxHandlerService: CheckboxHandlerService
		) {
			this.appConfig = app.Constants.Default;
			this.sortOrder = '-id_member';
			this.usersList = [];
			this.showLoader = false;

			this.getUsers();
			this.editUserDefault();
			this.modalDialogueDefault();
			this.infoSliderDefault();
			this.createtableHeading();
		}

		getUsers() {
			this.showLoader = true;

			this.apiService.getCall({
				'url': this.appConfig.serverUrl + 'getuserslist'
			}).success((data, status) => {
				this.processServerData(data);
			}).error((data, status) => {
				this.utilsService.log('err');
				this.showLoader = false;
			});
		}

		processServerData(data: any) {
			this.utilsService.log('processServerData: ', data);

			if (data && data.length > 0) {
				this.usersList = data;
			} else {
				this.usersList.length = 0;
			}
			this.showLoader = false;
		}

		addUser() {
			this.$location.path('/addUser').replace();
		}

		/*
		* Action buttons handling
		*/
		actionHandler(type: string, userId: string, userData?: UserDataInterface) {
			switch (type) {
				case 'edit':
					this.editUserClick(userId);
					break;

				case 'delete':
					this.deleteUserClick(userId);
					break;

				case 'save':
					this.updateUserData(userData, userId);
					break;
			}
		}

		/*
		* Edit user code flow
		*/
		validateEmail(val: string) {
			this.utilsService.log('validateEmail');
		}

		editUserClick(userId: string) {
			this.utilsService.log('userId: ', userId);

			this.editUser = {
				isVisible: true,
				title: 'Edit details',
				userData: this.utilsService.clone(this.utilsService.getObjectFromArr(this.usersList, 'id_member', userId)),
				userId: userId
			};
			this.sharedService.broadcastEvent('show-edit-modal', {});
			this.utilsService.log(this.editUser);
		}

		updateUserData(data: UserDataInterface, userId: string) {
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
						phonenumber: data.phonenumber,
						timestamp: data.timestamp
					}
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success((response: any) => {
				this.utilsService.log('updateUserData success: ', response);
				this.onUserUpdateResp(response.resp);
			}).error((response) => {
				this.utilsService.log('updateUserData error: ', response);
			});
		}

		onUserUpdateResp(resp: Boolean) {
			this.hideEditPopup();

			if (resp === true) {
				this.showInfoSlider({
					title: 'User updated',
					body: 'User info has been updated successfully',
					startTimer: 500,
					endTimer: 4000
				});
				this.getUsers();
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
				this.sharedService.broadcastEvent('show-modal', {});
			}
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
			this.sharedService.broadcastEvent('show-modal', {});
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
				this.onUserDeleted(response.resp);
			}).error((response) => {
				this.utilsService.log('error: ', response);
			});
		}

		onUserDeleted(resp: Boolean) {
			if (resp === true) {
				this.hideModalDialogue();
				this.showInfoSlider({
					title: 'User deleted',
					body: 'User has been deleted successfully',
					startTimer: 500,
					endTimer: 4000
				});
				this.getUsers();
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
		}

		/*
		* Delete all users codeflow
		*/
		deleteAll($event) {
			this.modalDialogue = {
				isVisible: true,
				title: 'Delete all users?',
				body: 'Please confirm, you want to delete all users',
				btn1Txt: 'Ok',
				btn2Txt: 'Cancel',
				showBtn2: true,
				btn1Callback: this.deleteAllUsersConfirm.bind(this),
				btn2Callback: this.hideModalDialogue.bind(this),
				closeBtnCallback: this.hideModalDialogue.bind(this),
			};
			this.sharedService.broadcastEvent('show-modal', {});
		}

		deleteAllUsersConfirm(userId: string) {
			this.utilsService.log('deleteUserConfirm, userId: ', userId);

			var userIds = [];

			for (var i = 0, len = this.usersList.length; i < len; i++) {
				userIds.push(this.usersList[i].id_member);
			}
			this.apiService.postCall({
				'url': this.appConfig.serverUrl + 'deleteallusers',
				data: {
					'userIds': userIds
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success((response: any) => {
				this.utilsService.log('success: ', response);
				this.onAllUsersDeleted(response.resp);
			}).error((response) => {
				this.utilsService.log('error: ', response);
			});
		}

		onAllUsersDeleted(resp: Boolean) {
			if (resp === true) {
				this.hideModalDialogue();
				this.showInfoSlider({
					title: 'All users deleted',
					body: 'All Users are deleted successfully',
					startTimer: 500,
					endTimer: 4000
				});
				this.getUsers();
			} else {
				this.modalDialogue = {
					isVisible: true,
					title: 'Error!',
					body: 'We have encountered error while deleting users. Please try again',
					btn1Txt: 'Ok',
					btn2Txt: '',
					showBtn2: false,
					btn1Callback: this.hideModalDialogue.bind(this),
					btn2Callback: function() { },
					closeBtnCallback: this.hideModalDialogue.bind(this),
				};
			}
		}

		/*
		* Generic functions to hide pop ups
		* to show info slider etc
		*/
		hideEditPopup(event?: Event) {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}
			this.sharedService.broadcastEvent('hide-edit-modal', {});
			this.editUserDefault();
		}

		hideModalDialogue(event?: Event) {
			if (event) {
				event.stopPropagation();
				event.preventDefault();
			}

			this.sharedService.broadcastEvent('hide-modal', {});
			this.modalDialogueDefault();
		}

		manageSortOrder(orderBy: string) {
			if (orderBy === this.sortOrder) {
				this.sortOrder = '-' + orderBy;
			} else {
				this.sortOrder = orderBy;
			}
		}

		showInfoSlider(params: InfoSliderInterface) {
			this.infoSlider = {
				title: params.title,
				body: params.body
			};
			setTimeout(() => {
				this.sharedService.broadcastEvent('show-info-slider', {});
			}, params.startTimer);

			setTimeout(() => {
				this.hideInfoSlider();
			}, params.endTimer);
		}

		hideInfoSlider() {
			this.sharedService.broadcastEvent('hide-info-slider', {});
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
				}
				/*, {
					'className': 'col-xs-1 text-right',
					'sortOrder': '',
					'text': '<input type="checkbox" ng-checked="customController.checkboxHandlerService.checkboxCounter" />',
					'customFunc': this.checkboxHandlerService.checkAll.bind(this.checkboxHandlerService),
					'customHTML': true
				}*/
			];
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
