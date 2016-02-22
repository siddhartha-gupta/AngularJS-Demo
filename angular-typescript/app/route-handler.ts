/// <reference path='_all.ts' />

module app {
	'use strict'

	export class RouteHandler {
		static inject = ['$rootScope', '$location', 'sharedService'];

		constructor(
            $rootScope: any, //ng.IRootScopeService,
			$location: ng.ILocationService,
			sharedService: SharedService
		) {
			$rootScope.$on("$routeChangeStart", function(event, next, current) {
				sharedService.broadcastEvent('routeChangeStart', {
					next: next,
					current: current
				});
			});

			$rootScope.$on("$routeChangeSuccess", function(event, next, current) {
				sharedService.broadcastEvent('routeChangeSuccess', {
					next: next,
					current: current
				});
			});

			$rootScope.$on("$routeChangeError", function(event, next, current) {
				sharedService.broadcastEvent('routeChangeError', {
					next: next,
					current: current
				});
			});
		}
	}
}
