/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export class UserInfoController {
		private readOnlyMode: Boolean;
		constructor() {
			this.readOnlyMode = true;
		}

		startEditMode($event: Event, userId: string) {
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
	}
}
controllers.controller('UserInfoController', app.UserInfoController);
