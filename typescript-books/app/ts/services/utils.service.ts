import {Injectable} from 'angular2/core'

@Injectable()
export class Utils {
	constructor() { }

	private getType(obj: any) {
		return ({}).toString.call(obj).toLowerCase();
	}

	isNullUndefined(val: any, validateZeroNaN?: Boolean) {
		let isNull: Boolean = false,
			type = this.getType(val);

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
}
