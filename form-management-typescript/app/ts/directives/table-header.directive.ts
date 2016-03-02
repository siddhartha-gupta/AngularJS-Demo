/// <reference path='../../_all.ts' />

module app {
    'use strict';

    export class TableHeaderDirective implements ng.IDirective {
		public restrict = 'E';
        public scope = {
            tableHeading: '=',
			sortFunc: '&',
			checkAll: '&'
        };
        public templateUrl = app.Constants.Default.templateUrl + 'directives/table-header.directive.html';
		public controller = 'TableHeaderController';
		public controllerAs = 'customController';
		public bindToController = true;

		constructor(private $compile: ng.ICompileService, private $parse: ng.IParseService) { }

		static factory(): ng.IDirectiveFactory {
			var directive = ($compile: ng.ICompileService, $parse: ng.IParseService) => new TableHeaderDirective($compile, $parse);
			directive.$inject = ['$compile', '$parse'];
			return directive;
		}
    }
}
directives.directive('tableHeader', app.TableHeaderDirective.factory());
