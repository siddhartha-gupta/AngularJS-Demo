/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export class UserFormController {
		formSubmit: Function;
		userData: UserDataInterface;
		userDataId: string;

		constructor() { }

		onFormSubmit(event: Event) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			this.formSubmit({ data: this.userData, userDataId: this.userDataId });
		}
	}
}
controllers.controller('UserFormController', app.UserFormController);
