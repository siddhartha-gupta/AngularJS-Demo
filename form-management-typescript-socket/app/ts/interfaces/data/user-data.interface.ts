/// <reference path='../../../_all.ts' />

module app {
	'use strict'

	export interface UserDataInterface {
		id_member?: string;
		firstname: string;
		lastname: string;
		email: string;
		phonenumber: string;
		location: string;
		timestamp?: number;
	}

	export interface userEditDataInterface {
		firstname: string;
		lastname: string;
		location: string;
	}
}
