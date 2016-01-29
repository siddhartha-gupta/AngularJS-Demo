import {Component, View, OnInit} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {RouteConfig, RouterLink, RouterOutlet, Route, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location, LocationStrategy, HashLocationStrategy, Router} from 'angular2/router'

import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import {api} from './api.service'

@Component({
	selector: 'home',
	providers: [HTTP_PROVIDERS, api],
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'app/templates/booksListing.template.html'
})

export class BooksListing {
	public booksData: Array<Object>;

	constructor(public api: api) {
		console.log('BooksListing constructor');
	}

	ngOnInit() {
		this.api.getData('https://www.googleapis.com/books/v1/volumes?q=test').subscribe(
			data => this.booksData = data.items,
			error => console.error('Error: ' + error),
			() => console.log('Completed!: ', this.booksData)
		);
	}
}
