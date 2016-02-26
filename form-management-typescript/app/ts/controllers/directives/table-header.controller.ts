/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export class TableHeaderController {
		sortFunc: Function;

		constructor() { }

		manageSortOrder(event: Event, sortOrder: string) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			var newClass = 'arrow arrow-down';
			if (angular.element(event.target).find('span').hasClass('arrow-down')) {
				newClass = 'arrow arrow-up';
			}

			angular.element(event.target).find('span').removeClass().addClass(newClass);
			console.log('manageSortOrder: ', this.sortFunc);
			this.sortFunc({
				'orderBy': sortOrder
			});
		}
	}
}
controllers.controller('TableHeaderController', app.TableHeaderController);
