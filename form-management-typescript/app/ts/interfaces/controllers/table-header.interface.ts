/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export interface TableHeaderInterface {
		manageSortOrder(event: Event, sortOrder: string): void;
	}
}
