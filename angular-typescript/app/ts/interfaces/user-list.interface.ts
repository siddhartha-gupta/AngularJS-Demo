/// <reference path='../../_all.ts' />

module app {
	'use strict';
	export interface UsersListInterface {
		dataAvailable()
		getUsers()
		processServerData(data: any)
		addUser()
		editUserClick(event: Event, key: string)
		updateUserData(data: any, userId: string)
		hideEditPopup(event?: Event)
		editUserDefault()
		deleteUserClick(event: Event, key: string)
		deleteUserConfirm(key: string)
		hideModalDialogue(event?: Event)
		modalDialogueDefault()
	}
}
