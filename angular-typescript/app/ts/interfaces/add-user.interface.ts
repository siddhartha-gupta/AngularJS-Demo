/// <reference path='../../_all.ts' />

module app {
	'use strict';

	export interface AddUserInterface {
		validateEmail(val: string)
		validateForm()
		addUser()
		userDataDefault()
		showModalDialogue(errorType: string)
		hideModalDialogue(event?:Event)
		modalDialogueDefault()
	}
}
controllers.controller('AddUserController', app.AddUserController);
