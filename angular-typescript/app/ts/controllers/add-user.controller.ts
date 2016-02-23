/// <reference path='../../_all.ts' />

module app {
	'use strict';

	export class AddUserController implements AddUserInterface {
		private validEmail: Boolean;
		private userdata: UserDataInterface;
		private appConfig: appConfigInterface;
		private modalDialogue: ModalDialogueInterface;

		public static $inject = [
			'$scope',
			'$location',
			'APIService',
			'UtilsService'
		];

		constructor(
			private $scope: ng.IScope,
			private $location: ng.ILocationService,
			private apiService: APIService,
			private utilsService: UtilsService
		) {
			$scope.$on('add-user', function(event, args) {
				this.addUser();
			});

			this.appConfig = app.Constants.Default;
			this.validEmail = false;
			this.userDataDefault();
			this.modalDialogueDefault();
		}

		validateEmail(val: string) {
			this.validEmail = this.utilsService.validateEmail(val);
		}

		validateForm() {
			// make null undefined checks here
			if (this.utilsService.isNullUndefined(this.userdata.firstname) || this.utilsService.isNullUndefined(this.userdata.lastname)) {
				this.showModalDialogue('inValidForm-name');
				return false;
			} else if (this.utilsService.isNullUndefined(this.userdata.email)) {
				this.showModalDialogue('inValidForm-email');
				return false;
			} else if (this.utilsService.isNullUndefined(this.userdata.phonenumber)) {
				this.showModalDialogue('inValidForm-phonenumber');
				return false;
			} else if (this.utilsService.isNullUndefined(this.userdata.location)) {
				this.showModalDialogue('inValidForm-location');
				return false;
			}
			return true;
		}

		addUser() {
			this.utilsService.log('add user: ', this.userdata);

			if (this.validateForm()) {
				this.apiService.postCall({
					'url': this.appConfig.serverUrl + 'adduser',
					data: this.userdata
				}).success((response: any) => {
					this.utilsService.log('success: ', response);

					if (response && response.resp && response.resp === 'Email already in use') {
						this.showModalDialogue('emailInUse');
					} else {
						this.$location.path('/userslist').replace();
					}
				}).error((response: any) => {
					this.utilsService.log('error: ', response);
				});
			}
		}

		userDataDefault() {
			this.userdata = {
				'firstname': '',
				'lastname': '',
				'email': '',
				'phonenumber': '',
				'location': 'IN'
			};
		}
		
		showModalDialogue(errorType: string) {
			let title: string = '',
				body: string = '';

			switch (errorType) {
				case 'emailInUse':
					title = 'Email already in use';
					body = 'Email ID is already in use, please enter a unique Email address';
					break;

				case 'inValidForm-name':
					title = 'Incomplete form';
					body = 'Please fill First name/Last name';
					break;

				case 'inValidForm-email':
					title = 'Incomplete form';
					body = 'Please fill the email address';
					break;

				case 'inValidForm-phonenumber':
					title = 'Incomplete form';
					body = 'Please fill phone number';
					break;

				case 'inValidForm-location':
					title = 'Incomplete form';
					body = 'Please select location';
					break;
			}

			this.modalDialogue = {
				isVisible: true,
				title: title,
				body: body,
				btn1Txt: 'Ok',
				btn2Txt: '',
				showBtn2: false,
				btn1Callback: this.hideModalDialogue.bind(this),
				btn2Callback: function() { },
				closeBtnCallback: this.hideModalDialogue.bind(this),
			};
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
controllers.controller('AddUserController', app.AddUserController);
