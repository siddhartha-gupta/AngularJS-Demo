/// <reference path='../../_all.ts' />

module app {
    'use strict';

    export class InfoSliderDirective implements ng.IDirective {
		public restrict = 'E';
        public scope = {
			title: '=',
			body: '=',
			timer: '='
        };
        public templateUrl = app.Constants.Default.templateUrl + 'directives/info-slider.directive.html';
		public controller = 'InfoSliderController';
		public controllerAs = 'customController';
		public bindToController = true;

		constructor() { }

		link(scope:ng.IScope) {
			scope.$on('show-info-slider', function(event, params: any) {
				angular.element(document.getElementById(params.id)).modal('show');
			});

			scope.$on('show-info-slider', function(event, params: any) {
				angular.element(document.getElementById(params.id)).modal('hide');
			});
		}

		static factory(): ng.IDirectiveFactory {
			return (() => new InfoSliderDirective());
		}
    }
}
directives.directive('infoSlider', app.InfoSliderDirective.factory());
