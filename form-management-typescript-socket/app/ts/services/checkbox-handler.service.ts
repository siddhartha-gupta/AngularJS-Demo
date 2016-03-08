/// <reference path='../../_all.ts' />

module app {
	'use strict';

	export class CheckboxHandlerService {
		public checkboxCounter: number;
		private selectedAll: Boolean;

		public static $inject = [
			'SharedService'
		];

		constructor(
			private sharedService: SharedService
		) {
			this.checkboxCounter = 0;
			this.selectedAll = false;
		}

		checkAll() {
			this.selectedAll = !this.selectedAll;
			this.sharedService.broadcastEvent('check-all', { state: this.selectedAll });
		}

		manageCheckboxCounter(isChecked: Boolean) {
			if(isChecked) {
				this.checkboxCounter++;
			} else {
				this.checkboxCounter--;
			}

			if (this.checkboxCounter < 0) {
				this.checkboxCounter = 0;
			}
		}
	}
}
services.service('CheckboxHandlerService', app.CheckboxHandlerService);
