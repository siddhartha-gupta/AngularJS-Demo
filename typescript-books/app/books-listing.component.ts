import {Component, View, OnInit} from 'angular2/core'
import {Http, HTTP_PROVIDERS} from 'angular2/http'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'

import {api} from './api.service'
import { _settings } from './settings'

interface modelInterface {
	searchQuery: string;
	searchLimit: number;
}

@Component({
	selector: 'home',
	providers: [HTTP_PROVIDERS, api],
	directives: [ROUTER_DIRECTIVES],
	templateUrl: _settings.buildPath + 'booksListing.template.html'
})

export class BooksListing {
	model: modelInterface = {
		searchQuery: '',
		searchLimit: 10
	};
	booksData: Array<Object>;
	pendingRequest: any;
	inputError: Boolean = false;
	searchLimitVals = [10, 20, 30 ,40];

	constructor(public api: api) {
		// this.model ;
		console.log('BooksListing constructor');
	}

	ngOnInit() { }

	searchBooks($event: Event) {
		this.model.searchQuery = this.model.searchQuery.trim();

		console.log('searchBooks, searchQuery: ', this.model.searchQuery);
		console.log('searchBooks, searchLimit: ', this.model.searchLimit);
		if (this.pendingRequest) {
			this.pendingRequest = this.pendingRequest.unsubscribe();
			console.log('cancelled observable');
		}


		if (this.model.searchQuery.length > 2) {
			this.sendSearchRequest();
			this.inputError = false;
		} else {
			this.inputError = true;
			if (this.model.searchQuery.length === 0) {
				this.booksData = [];
			}
		}
		// this.updateSessionStorage(['searchQuery', 'sortOrder', 'maxLimit', 'localSortOrder']);
	}

	sendSearchRequest() {
		// &maxResults=' + params.maxLimit + '&orderBy=' + params.orderBy
		this.pendingRequest = this.api.getData('https://www.googleapis.com/books/v1/volumes?q=' + this.model.searchQuery + '&maxResults=' + this.model.searchLimit).
			delay(500).
			subscribe(
			data => this.booksData = data.items,
			inputError => console.inputError('inputError: ' + inputError),
			() => console.log('Completed!: ', this.booksData)
			);
	}
}
