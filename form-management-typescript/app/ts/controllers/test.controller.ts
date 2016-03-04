/// <reference path='../../_all.ts' />

module app {
	'use strict';

	export class TestController {
		private validEmail: Boolean;

		public static $inject = [
			'$scope',
			'UtilsService'
		];

		constructor(
			private $scope: ng.IScope,
			private utilsService: UtilsService
		) {
			this.validEmail = false;
		}

		validateEmail(val: string) {
			this.validEmail = this.utilsService.validateEmail(val);
		}
	}
}
controllers.controller('TestController', app.TestController);
