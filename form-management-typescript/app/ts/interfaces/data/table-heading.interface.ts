/// <reference path='../../../_all.ts' />

module app {
	'use strict'

	export interface TableHeadingInterface {
		className: string;
		sortOrder: string;
		text: string;
		customFunc?: Function;
		customHTML?: Boolean;
	}
}
