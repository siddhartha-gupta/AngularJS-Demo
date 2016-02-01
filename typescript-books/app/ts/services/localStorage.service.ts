import {Injectable} from 'angular2/core'
// import {_} from 'underscore'
import * as _ from 'underscore'


@Injectable()
export class LocalStorage {
	constructor() { }

	getValue(key: string) {
		console.log('getValue');
	}

	setValue(data: any, value?: string) {
		if(_.isObject(data)) {
			console.log('data is array');
			for(let i in data) {
				if(data.hasOwnProperty(i)) {
					localStorage.setItem(i, data[i]);
				}
			}
		} else if(_.isString(data)) {
			console.log('data is string');
			localStorage.setItem(data, value);
		}
	}
}
