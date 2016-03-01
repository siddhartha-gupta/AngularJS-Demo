/// <reference path='../../../_all.ts' />

module app {
	'use strict';
	export interface UsersListInterface {
		getUsers()
		processServerData(data: any)
		addUser()
		editUserClick(key: string)
		updateUserData(data: any, userId: string)
		hideEditPopup(event?: Event)
		editUserDefault()
		deleteUserClick(key: string)
		deleteUserConfirm(key: string)
		hideModalDialogue(event?: Event)
		modalDialogueDefault()
	}
}
