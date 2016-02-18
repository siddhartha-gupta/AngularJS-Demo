/// <reference path='_all.ts' />

module app {
	export var formApp = angular.module('formApp', ['ngRoute']);

	formApp.config(Config);
	formApp.run(['$rootScope', '$location', RouteHandler]);
	formApp.controller('usersListCtrl', usersListController);
	formApp.controller('headerController', headerController);
	formApp.service('apiService', APIService);
}
