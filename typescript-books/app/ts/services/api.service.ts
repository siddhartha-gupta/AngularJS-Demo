import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class api {
	constructor(private http: Http) { }

	getData(url: string) {
		return this.http.get(url).map(response => { return response.json() });
	}
}
