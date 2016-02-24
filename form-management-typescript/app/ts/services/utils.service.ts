/// <reference path='../../_all.ts' />

module app {
    'use strict';

    export class UtilsService {
        constructor() { }

        getDataType(obj: any) {
			return ({}).toString.call(obj).toLowerCase();
		}

		isNullUndefined(val: any, validateZeroNaN?: Boolean) {
			let isNull: Boolean = false,
				type = this.getDataType(val);

			switch (type) {
				case '[object array]':
					if (val.length === 0) {
						isNull = true;
					}
					break;

				case '[object object]':
					if (Object.keys(val).length === 0) {
						isNull = true;
					}
					break;

				default:
					if (typeof (val) === "undefined" || val === null || val === "" || val === "null" || val === "undefined") {
						isNull = true;
					} else if (validateZeroNaN && (val === 0 || isNaN(val))) {
						isNull = true;
					}
			}
			return isNull;
		}

		clone(obj: any) {
			if (obj == null || typeof (obj) != 'object')
				return obj;

			var temp = new obj.constructor();
			for (var key in obj)
				temp[key] = this.clone(obj[key]);

			return temp;
		}

		validateEmail(email: string): Boolean {
			var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

			if (email && emailRegexp.test(email)) {
				return true;
			} else {
				return false;
			}
		}

		getObjectFromArr(arr: Array<any>, propName: string, propValue: any) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i][propName] == propValue) return arr[i];
			}
		}

		log(...msg: any[]) {
			console.log.apply(console, arguments);
		}
    }
}
services.service('UtilsService', app.UtilsService);
