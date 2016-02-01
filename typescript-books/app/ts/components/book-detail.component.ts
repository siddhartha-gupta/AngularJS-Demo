import {Component, View, OnInit} from 'angular2/core'
import {Http, HTTP_PROVIDERS} from 'angular2/http'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'

import {Links} from '../directives/links.directive'
import {GenericInfo} from '../directives/generic-info.directive'
import {api} from '../services/api.service'
import { _settings } from '../helpers/settings'

@Component({
	selector: 'Book',
	providers: [HTTP_PROVIDERS, api],
	directives: [ROUTER_DIRECTIVES, Links, GenericInfo],
	templateUrl: _settings.buildPath + 'bookDetail.template.html'
})

export class BookDetail {
	bookData: Array<Object>;

	constructor(private api: api, private _routeParams: RouteParams) { }

	ngOnInit() {
		console.log('ngOnInit');
		let id = this._routeParams.get('id');

		this.api.getData('https://www.googleapis.com/books/v1/volumes/' + id + '?projection=full').subscribe(
			data => this.bookData = data,
			error => console.error('Error: ' + error),
			() => console.log('Completed!: ', this.bookData)
		);
	}
}
