import {Component, View, OnInit} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {RouteConfig, RouterLink, RouterOutlet, Route, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location, LocationStrategy, HashLocationStrategy, Router} from 'angular2/router'

import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import {api} from './api.service'

@Component({
	selector: 'test',
	providers: [HTTP_PROVIDERS, api],
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'app/templates/bookDetail.template.html'
})

export class BookDetail {
	bookData: Array<Object>;

	constructor(public api: api) { 
		console.log('BookDetail constructor');
	}

	ngOnInit() {
		console.log('ngOnInit');
		this.api.getData('https://www.googleapis.com/books/v1/volumes/-3P00MGV74wC?projection=full').subscribe(
			data => this.bookData = data,
			error => console.error('Error: ' + error),
			() => console.log('Completed!: ', this.bookData)
		);
	}
}
