/// <reference path='_all.ts' />

module app {
	'use strict'

	export class RouteHandler {
		static $inject = [
            '$rootScope',
            '$location'
            // 'sharedService'
        ];

		constructor(
			public $rootScope: ng.IRootScopeService, //any
			private $location: ng.ILocationService
			// private sharedService: SharedService
		) {
			/*this.$rootScope.Utils = {
				keys: Object.keys
			};*/

			this.$rootScope.$on("$routeChangeStart", function(event, next, current) {
				// this.sharedService.broadcastEvent('routeChangeStart', {
				// 	next: next,
				// 	current: current
				// });
			});

			this.$rootScope.$on("$routeChangeSuccess", function(event, next, current) {
				// this.sharedService.broadcastEvent('routeChangeSuccess', {
				// 	next: next,
				// 	current: current
				// });
			});

			this.$rootScope.$on("$routeChangeError", function(event, next, current) {
				// this.sharedService.broadcastEvent('routeChangeError', {
				// 	next: next,
				// 	current: current
				// });
			});
		}
	}
}
