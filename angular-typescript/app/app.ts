/// <reference path='_all.ts' />

module formApp {
	export class Config {
		constructor($routeProvider: ng.route.IRouteProvider) {
			$routeProvider.when("/userslist", {
				templateUrl: 'templates/usersList.html',
				controller: 'usersListCtrl',
				resolve: {
					serverData: function(apiService) {
						return apiService.getCall({
							'url': 'http://localhost:8080/getuserslist'
						});
					}
				}
			})
				.otherwise({ redirectTo: '/userslist' });
		}
	}
	Config.$inject = ['$routeProvider'];

	export var app = angular.module("formApp", ['ngRoute']);
	app.config(Config);
	app.controller('usersListCtrl', usersListController);
	app.service('apiService', APIService);
}
