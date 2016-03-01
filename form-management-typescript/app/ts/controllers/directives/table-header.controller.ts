/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export class TableHeaderController implements TableHeaderInterface {
		private sortFunc: Function;
		private defaultClass: string;
		private lastSortOrder: string;

		public static $inject = [
			'$element'
		];

		constructor(private $element: ng.IRootElementService) {
			this.defaultClass = 'arrow arrow-down';
			this.lastSortOrder = '';
		}

		manageSortOrder(event: Event, sortOrder: string) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			var newClass = 'arrow arrow-up';
			if (angular.element(event.target).find('span').hasClass('arrow-up')) {
				newClass = 'arrow arrow-down';
			}

			if (this.lastSortOrder !== sortOrder) {
				angular.element('#heading_' + this.lastSortOrder).find('span').removeClass().addClass(this.defaultClass);
				this.lastSortOrder = sortOrder;
			}
			angular.element(event.target).find('span').removeClass().addClass(newClass);

			this.sortFunc({
				'orderBy': sortOrder
			});
		}
	}
}
controllers.controller('TableHeaderController', app.TableHeaderController);
