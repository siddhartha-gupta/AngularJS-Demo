/// <reference path='../_all.ts' />

module app {
	'use strict'

	export class Constants {
		static get Default(): any {
			return {
				// serverUrl: 'http://localhost:8080/',
				serverUrl: 'https://user-management-881512.herokuapp.com/',
				templateUrl: 'templates/'
			}
		}
	}
}
