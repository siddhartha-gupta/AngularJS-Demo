/// <reference path='_all.ts' />

module app {
	'use strict'

	export class Config {
		public static $inject = [
            '$routeProvider'
        ];

		constructor($routeProvider: ng.route.IRouteProvider) {
			$routeProvider.when("/userslist", {
				templateUrl: app.Constants.Default.templateUrl + '/usersList.html',
				controller: 'usersListCtrl',
				controllerAs: 'customController'
			})
				.otherwise({ redirectTo: '/userslist' });
		}
	}
}
