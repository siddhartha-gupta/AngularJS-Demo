/// <reference path='../../../_all.ts' />

module app {
	'use strict'

	export interface EditUserInterface {
		isVisible: Boolean;
		title: string;
		//TODO: need to look into this
		userData: any;
		userId: string;
	}
}
