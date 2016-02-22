/// <reference path='../../_all.ts' />

module app {
	'use strict';

	export class AddUserInterface {

		validateEmail(val: string) { }

		addUser() { }
	}
}
controllers.controller('AddUserController', app.AddUserController);
