/// <reference path='../../_all.ts' />

module app {
    'use strict';

    export class SpinnerDirective implements ng.IDirective {
		public restrict = 'E';
        public scope = {
            showLoader: '='
        };
        public templateUrl = app.Constants.Default.templateUrl + 'directives/spinner.directive.html';
		public controller = 'SpinnerController';
		public controllerAs = 'customController';
		public bindToController = true;

		constructor() {}

		static factory(): ng.IDirectiveFactory {
			return (() => new SpinnerDirective());
		}
    }
} 
directives.directive('spinner', app.SpinnerDirective.factory());
