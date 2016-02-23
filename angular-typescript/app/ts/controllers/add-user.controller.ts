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
			this.userDataDefault();
			this.modalDialogueDefault();
		}

		validateEmail(val: string) {
			var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
			if (val && emailRegexp.test(val)) {
				this.validEmail = true;
			} else {
				this.validEmail = false;
			}
		}

		validateForm() {
			// make null undefined checks here
			return true;
		}

		addUser() {
			this.$log.log('add user: ', this.userdata);

			if (this.validateForm()) {
				this.apiService.postCall({
					'url': this.appConfig.serverUrl + 'adduser',
					data: this.userdata
				}).success((response: any) => {
					this.$log.log('success: ', response);

					if (response && response.resp && response.resp === 'Email already in use') {
						this.showModalDialogue('emailInUse');
					} else {
						this.$location.path('/userslist').replace();
					}
				}).error((response: any) => {
					this.$log.log('error: ', response);
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

			console.log('showModalDialogue: ', errorType);
			switch (errorType) {
				case 'emailInUse':
					title = 'Email already in use';
					body = 'Email ID is already in use, please enter a unique Email address';
					break;

				case 'inValidForm':
					title = 'Incomplete form';
					body = 'Please fill the missing data in the form';
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
