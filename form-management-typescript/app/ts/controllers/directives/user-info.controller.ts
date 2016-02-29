/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export class UserInfoController {
		private readOnlyMode: Boolean;
		private actionHandler: Function;
		//TODO: need interface
		private userData: any;

		constructor() {
			this.readOnlyMode = true;
		}

		startEditMode($event: Event) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			if (this.readOnlyMode) {
				this.readOnlyMode = false;
			}
		}

		cancelEditMode(event?: Event) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			this.readOnlyMode = true;
		}

		actionCallback(event: Event, type: string, userId: string) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			if(type === 'save') {
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
