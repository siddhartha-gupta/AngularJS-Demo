/// <reference path='../../../_all.ts' />

module app {
	'use strict'

	export interface HeaderInterface {
		onRouteChangeStart(event: Event, params: Object): void;
		onRouteChangeSuccess(event: Event, params: any): void;
		onRouteChangeError(event, params): void;
		setUserListHeader(): void;
		setAddUserHeader(): void;
		callFunction(event: Event, clickFunc: string): void;
		goToAddUser(): void;
		addUser(): void;
		goBack(): void;
	}
}
