/// <reference path='_all.ts' />

module formApp {
	export class Config {
		constructor($routeProvider: ng.route.IRouteProvider) {
			$routeProvider.when("/userslist", {
				templateUrl: 'templates/usersList.html',
				controller: 'usersListCtrl'
			})
				.otherwise({ redirectTo: '/userslist' });
		}
	}
	Config.$inject = ['$routeProvider'];

	export class Constants {
		static get Default(): any {
			return {
				serverUrl: 'http://localhost:8080/',
				templateUrl: 'templates/'
			}
		}
	}

	export var app = angular.module('formApp', ['ngRoute']);

	app.config(Config);
	app.constant('appConstant', Constants.Default);
	app.controller('usersListCtrl', usersListController);
	app.service('apiService', APIService);
}
