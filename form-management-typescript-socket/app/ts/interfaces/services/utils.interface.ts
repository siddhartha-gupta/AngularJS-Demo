/// <reference path='../../../_all.ts' />

module app {
	'use strict';

	export interface UtilsServiceInterface {
		getDataType(obj: Object): string;
		isNullUndefined(val: any, validateZeroNaN?: Boolean): Boolean;
		clone(obj: any): any;
		validateEmail(email: string): Boolean;
		getObjectFromArr(arr: Array<any>, propName: string, propValue: any): any;
		log(...msg: any[]): void;
	}
}
