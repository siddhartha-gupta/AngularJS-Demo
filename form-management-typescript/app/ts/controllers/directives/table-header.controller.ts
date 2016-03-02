/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export class TableHeaderController implements TableHeaderInterface {
		private sortFunc: Function;
		private defaultClass: string;
		private lastSortOrder: string;

		public static $inject = [
			'$element',
			'$sce',
			'CheckboxHandlerService'
		];

		constructor(
			private $element: ng.IRootElementService,
			private $sce: ng.ISCEService,
			private checkboxHandlerService: CheckboxHandlerService
		) {
			this.defaultClass = 'arrow arrow-down';
			this.lastSortOrder = '';
		}

		manageSortOrder(event: Event, sortOrder: string) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			let newClass = 'arrow arrow-up',
				target = <HTMLElement> event.target;

			if (this.$element.find(target).find('span').hasClass('arrow-up')) {
				newClass = 'arrow arrow-down';
			}

			if (this.lastSortOrder !== sortOrder) {
				this.$element.find('#heading_' + this.lastSortOrder).find('span').removeClass().addClass(this.defaultClass);
				this.lastSortOrder = sortOrder;
			}
			this.$element.find(target).find('span').removeClass().addClass(newClass);

			this.sortFunc({
				'orderBy': sortOrder
			});
		}
		/*toTrustedHTML(html: string) {
			return this.$sce.trustAsHtml(html);
		}*/
	}
}
controllers.controller('TableHeaderController', app.TableHeaderController);
