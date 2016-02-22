/// <reference path='_all.ts' />

module app {
	export var formApp = angular.module('formApp', ['ngRoute', 'controllers', 'services', 'directives']);

	formApp.config(Config);
    formApp.run(['$rootScope', '$location', 'SharedService', RouteHandler]);
}
