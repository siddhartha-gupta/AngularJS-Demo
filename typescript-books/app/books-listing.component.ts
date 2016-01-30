import {Component, View, OnInit} from 'angular2/core'
import {Http, HTTP_PROVIDERS} from 'angular2/http'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'

import {api} from './api.service'
import { _settings } from './settings'

interface modelInterface {
	searchQuery: string;
}

@Component({
	selector: 'home',
	providers: [HTTP_PROVIDERS, api],
	directives: [ROUTER_DIRECTIVES],
	templateUrl: _settings.buildPath + 'booksListing.template.html'
})

export class BooksListing {
	model: modelInterface = {
		searchQuery: 'test'
	};
	booksData: Array<Object>;

	constructor(public api: api) {
		// this.model ;
		console.log('BooksListing constructor');
	}

	ngOnInit() {
		// this.api.getData('https://www.googleapis.com/books/v1/volumes?q=test').subscribe(
		// 	data => this.booksData = data.items,
		// 	error => console.error('Error: ' + error),
		// 	() => console.log('Completed!: ', this.booksData)
		// );
	}

	searchBooks() {

	}
}
