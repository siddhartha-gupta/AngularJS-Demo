/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export interface AddUserInterface {
		validateEmail(val: string): void;
		validateForm(): Boolean;
		gotoUserList(): void;
		addUser(): void;
		userDataDefault(): void;
		showModalDialogue(errorType: string): void;
		hideModalDialogue(event?: Event): void;
		modalDialogueDefault(): void;
	}
}
