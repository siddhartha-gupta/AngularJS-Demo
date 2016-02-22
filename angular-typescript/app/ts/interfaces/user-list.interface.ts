/// <reference path='../../_all.ts' />

module app {
	'use strict';
	export class UsersListInterface {

		getUsers() { }
		processServerData(data: any) { }
		addUser() { }
		deleteUser(event: Event, key: string) { }
		editUserClick(event: Event, key: string) { }
		clone(obj: any) { }
		updateUserData(data: any, userId: string) { }
		hideModal(event?: Event) { }
		dataAvailable() { }
	}
}
