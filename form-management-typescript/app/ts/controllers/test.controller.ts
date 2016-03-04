/// <reference path='../../_all.ts' />

module app {
	'use strict';

	export class TestController {
		private validEmail: Boolean;

		constructor() {
			this.validEmail = false;
		}

		validateEmail(val: string) {
			this.validEmail = true;
		}
	}
}
controllers.controller('TestController', app.TestController);
