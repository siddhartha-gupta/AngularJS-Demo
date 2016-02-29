/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export class UserInfoController {
		private readOnlyMode: Boolean;
		private actionHandler: Function;

		constructor() {
			this.readOnlyMode = true;
		}

		startEditMode($event: Event) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			console.log('startEditMode');
			if (this.readOnlyMode) {
				this.readOnlyMode = false;
			}
		}

		cancelEditMode(event?: Event) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			console.log('cancelEditMode');

			this.readOnlyMode = true;
		}

		actionCallback(event: Event, type: string, userId: string) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			if(type === 'save') {
				var userData = {
					id_member: angular.element('#id_member').val(),
					firstname: angular.element('#firstname').val(),
					lastname: angular.element('#lastname').val(),
					email: angular.element('#email').val(),
					phonenumber: angular.element('#phonenumber').val(),
					location: angular.element('#location').val()
				};
				this.cancelEditMode();
			}

			this.actionHandler({ type: type, userId: userId, userData: userData });
		}
	}
}
controllers.controller('UserInfoController', app.UserInfoController);
