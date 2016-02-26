/// <reference path='../../_all.ts' />

module app {
    'use strict';

    export class TableHeaderDirective implements ng.IDirective {
		public restrict = 'E';
        public scope = {
            tableHeading: '=',
			sortFunc: '&'
        };
        public templateUrl = app.Constants.Default.templateUrl + 'directives/table-header.directive.html';
		public controller = 'TableHeaderController';
		public controllerAs = 'customController';
		public bindToController = true;

		static factory(): ng.IDirectiveFactory {
			return (() => new TableHeaderDirective());
		}
    }
} 
directives.directive('tableHeader', app.TableHeaderDirective.factory());
