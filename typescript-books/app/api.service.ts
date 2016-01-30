import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class api {
	constructor(public http: Http) { }

	getData(url: string) {
		console.log('getData: ', url);
		return this.http.get(url).map(response => { return response.json() });
	}
}
