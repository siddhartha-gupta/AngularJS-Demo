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
			scope.$on('show-info-slider', function(event) {
				(<any>element.find('#infoSlider')).modal('show');
			});

			scope.$on('hide-info-slider', function(event) {
				(<any>element.find('#infoSlider')).modal('hide');
			});
		}

		static factory(): ng.IDirectiveFactory {
			return (() => new InfoSliderDirective());
		}
    }
}
directives.directive('infoSlider', app.InfoSliderDirective.factory());
