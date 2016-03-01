/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export class UserInfoController implements UserInfoInterface {
		private readOnlyMode: Boolean;
		private actionHandler: Function;
		private userData: UserDataInterface;

		public static $inject = [
			'$scope',
			'DocEventService'
		];

		constructor(
			private $scope: ng.IScope,
			private docEventService: DocEventService
		) {
			this.readOnlyMode = true;
		}

		startEditMode($event: Event) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			if (this.readOnlyMode) {
				this.readOnlyMode = false;
				this.docEventService.bindKeyboardEvent(this.cancelEditMode.bind(this));
				this.docEventService.bindMouseEvent(this.cancelEditMode.bind(this));
			}
		}

		cancelEditMode(event?: Event) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			this.docEventService.unbindKeyboardEvent();
			this.docEventService.unbindMouseEvent();
			this.readOnlyMode = true;
			this.$scope.$apply();
		}

		actionCallback(event: Event, type: string, userId: string) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			console.log('actionCallback: ', type, ' : ', userId);
			if (type === 'save') {
				var userData = {
					id_member: this.userData.id_member,
					firstname: angular.element('#firstname').val(),
					lastname: angular.element('#lastname').val(),
					email: this.userData.email,
					phonenumber: this.userData.phonenumber,
					location: angular.element('#location').val()
				};
				this.cancelEditMode();
			}

			this.actionHandler({ type: type, userId: userId, userData: userData });
		}
	}
}
controllers.controller('UserInfoController', app.UserInfoController);
