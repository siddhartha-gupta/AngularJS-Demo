/// <reference path='../../../_all.ts' />

module app {
	'use strict'

	export interface ButtonsInterface {
		'showBtn': Boolean,
		'clickFunc': string,
		'text': string
	}

	export interface HeaderInterface {
		onRouteChangeStart(event: Event, params: Object)
		onRouteChangeSuccess(event: Event, params: any)
		onRouteChangeError(event, params)
		setUserListHeader()
		setAddUserHeader()
		callFunction(event: Event, clickFunc: string)
		goToAddUser()
		addUser()
		goBack()
	}
}
