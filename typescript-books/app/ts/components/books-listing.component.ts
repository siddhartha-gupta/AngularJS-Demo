import {Component, View, OnInit} from 'angular2/core'
import {Http, HTTP_PROVIDERS} from 'angular2/http'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'

import {CollapseTitle} from '../directives/collapse-title.directive'
import {api} from '../services/api.service'
import {LocalStorage} from '../services/localStorage.service'
import {_settings} from '../helpers/settings'
import {modelInterface} from '../helpers/app-interfaces'

@Component({
	selector: 'home',
	providers: [HTTP_PROVIDERS, api, LocalStorage],
	directives: [ROUTER_DIRECTIVES, CollapseTitle],
	templateUrl: _settings.buildPath + 'booksListing.template.html'
})

export class BooksListing {
	pendingRequest: any;
	model: modelInterface = {
		searchQuery: '',
		searchLimit: 10,
		sortOrder: 'relevance'
	};

	booksData: Array<Object>;
	inputError: Boolean = false;
	searchLimitVals: Array<number> = [10, 20, 30, 40];
	sortOrderVals: Array<string> = ['relevance', 'newest'];

	constructor(private api: api, private LS: LocalStorage) { }

	ngOnInit() { }

	searchBooks($event: Event) {
		this.model.searchQuery = this.model.searchQuery.trim();

		console.log('searchBooks, searchQuery: ', this.model.searchQuery, ', :searchLimit: ', this.model.searchLimit);
		if (this.pendingRequest) {
			this.pendingRequest = this.pendingRequest.unsubscribe();
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
		this.LS.setValue({
			'searchQuery': this.model.searchQuery,
			'searchLimit': this.model.searchLimit,
			'sortOrder': this.model.sortOrder
		});
	}

	sendSearchRequest() {
		this.pendingRequest = this.api.getData('https://www.googleapis.com/books/v1/volumes?q=' + this.model.searchQuery + '&maxResults=' + this.model.searchLimit + '&orderBy=' + this.model.sortOrder).
			delay(500).
			subscribe(
			data => this.booksData = data.items,
			error => console.error('Error: ' + error),
			() => console.log('Completed!: ', this.booksData)
			);
	}
}
