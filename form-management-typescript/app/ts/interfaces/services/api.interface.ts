/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export interface APIServiceInterface {
		getCall(params: any): any;
		postCall(params: any): any;
	}
}
