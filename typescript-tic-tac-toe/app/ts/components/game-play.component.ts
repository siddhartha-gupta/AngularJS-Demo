import {Component, View, OnInit} from 'angular2/core
import {Alert} from 'ng2-bootstrap/ng2-bootstrap'

import {_settings} from '../helpers/settings'

@Component({
	selector: 'home',
	providers: [],
	directives: [],
	templateUrl: _settings.buildPath + 'booksListing.template.html'
})

export class GamePlay {
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

	constructor(private utils: Utils) {
		
	}
}
