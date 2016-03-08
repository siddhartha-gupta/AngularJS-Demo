/// <reference path='../_all.ts' />

module app {
	'use strict'

	export class Constants {
		static get Default(): any {
			return {
				serverUrl: 'http://localhost:5000',
				// serverUrl: 'https://user-management-881512.herokuapp.com/',
				templateUrl: 'templates/',
				locationOption: {
					'IN': 'India',
					'US': 'United States',
					'UK': 'United Kingdom'
				}
			}
		}
	}
}
