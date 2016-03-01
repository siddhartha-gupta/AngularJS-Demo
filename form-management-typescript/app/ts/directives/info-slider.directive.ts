/// <reference path='../../_all.ts' />

module app {
    'use strict';

    export class InfoSliderDirective implements ng.IDirective {
		// private timer: number;

		public restrict = 'E';
        public scope = {
			title: '=',
			body: '='
        };
        public templateUrl = app.Constants.Default.templateUrl + 'directives/info-slider.directive.html';
		public controller = 'InfoSliderController';
		public controllerAs = 'customController';
		public bindToController = true;

		constructor() { }

		link(scope: ng.IScope, element: ng.IRootElementService) {
			scope.$on('show-info-slider', function(event, params: any) {
				element.find(document.getElementById(params.id)).modal('show');
			});

			scope.$on('hide-info-slider', function(event, params: any) {
				element.find(document.getElementById(params.id)).modal('hide');
			});
		}

		static factory(): ng.IDirectiveFactory {
			return (() => new InfoSliderDirective());
		}
    }
}
directives.directive('infoSlider', app.InfoSliderDirective.factory());
