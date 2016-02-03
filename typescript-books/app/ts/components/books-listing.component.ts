import {Component, View, OnInit} from 'angular2/core'
import {Http, HTTP_PROVIDERS} from 'angular2/http'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'

import {modelInterface} from '../helpers/app-interfaces'
import {CollapseTitle} from '../directives/collapse-title.directive'

import {_settings} from '../helpers/settings'
import {api} from '../services/api.service'
import {LocalStorage} from '../services/localStorage.service'
import {Utils} from '../services/utils.service'

@Component({
	selector: 'home',
	providers: [HTTP_PROVIDERS, api, LocalStorage, Utils],
	directives: [ROUTER_DIRECTIVES, CollapseTitle],
	templateUrl: _settings.buildPath + 'booksListing.template.html'
})

export class BooksListing {
	pendingRequest: any;
	model: modelInterface;

	booksData: Array<Object> = [];

	showLoader: Boolean = false;
	inputError: Boolean = false;
	searchLimitVals: Array<number> = [10, 20, 30, 40];
	sortOrderVals: Array<string> = ['relevance', 'newest'];
	localSortOrderVals: Array<Object> = [{
		'text': 'By: Name',
		'sortValue': '+volumeInfo.title'
	}, {
			'text': 'By: Price Descending',
			'sortValue': '-saleInfo.listPrice.amount'
		}, {
			'text': 'By: Price Ascending',
			'sortValue': '+saleInfo.listPrice.amount'
		}]

	// <option selected value="volumeInfo.title">By: Name</option>
	// <option value="-saleInfo.listPrice.amount">By: Price Descending</option>
	// <option value="+saleInfo.listPrice.amount">By: Price Ascending</option>

	constructor(private api: api, private LS: LocalStorage, private utils: Utils) {
		this.checkLSForData();
	}

	private checkLSForData() {
		let searchQuery = this.LS.getValue('searchQuery'),
			searchLimit = this.LS.getValue('searchLimit'),
			sortOrder = this.LS.getValue('sortOrder'),
			localSortKey = this.LS.getValue('localSortKey');

		if (!this.utils.isNullUndefined(searchQuery) &&
			!this.utils.isNullUndefined(searchLimit) &&
			!this.utils.isNullUndefined(sortOrder) &&
			!this.utils.isNullUndefined(localSortKey)) {
			this.utils.log('ls value obtained: ', searchQuery);
			this.model = {
				searchQuery: searchQuery,
				searchLimit: searchLimit,
				sortOrder: sortOrder,
				localSortKey: localSortKey
			};
			this.sendSearchRequest();
		} else {
			this.utils.log('ls value not obtained');
			this.model = {
				searchQuery: '',
				searchLimit: 10,
				sortOrder: 'relevance',
				localSortKey: '+volumeInfo.title'
			};
		}
	}

	ngOnInit() { }

	searchBooks($event: Event) {
		this.model.searchQuery = this.model.searchQuery.trim();

		this.utils.log('searchBooks, searchQuery: ', this.model.searchQuery, ', :searchLimit: ', this.model.searchLimit);
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
			'sortOrder': this.model.sortOrder,
			'localSortKey': this.model.localSortKey
		});
	}

	sendSearchRequest() {
		this.showLoader = true;
		this.pendingRequest = this.api.getData('https://www.googleapis.com/books/v1/volumes?q=' + this.model.searchQuery + '&maxResults=' + this.model.searchLimit + '&orderBy=' + this.model.sortOrder).
			delay(500).
			subscribe(
			data => this.booksData = data.items,
			error => console.error('Error: ' + error),
			() => this.sortData()
			);
	}

	sortData($event?: Event) {
		this.showLoader = false;

		let sortkey = this.model.localSortKey,
			sortDirection = 1;

		if (sortkey.indexOf('-') > 0) {
			sortkey = sortkey.replace(/-/, '');
			sortDirection = -1;
		} else {
			sortkey = sortkey.replace(/\+/, '');
			sortDirection = 1;
		}
		if (!this.utils.isNullUndefined(this.booksData)) {
			this.utils.sortArrayObject(sortkey, this.booksData, sortDirection);
		}
	}
}
