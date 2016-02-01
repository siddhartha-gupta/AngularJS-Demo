import {Component, View, OnInit} from 'angular2/core'
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router'
import { _settings } from './settings'

@Component({
	selector: 'collapse-title, [collapse-title]',
	inputs: ['imageLinks', 'volumeInfo', 'saleInfo', 'bookId'],
	directives: [ROUTER_DIRECTIVES],
	templateUrl: _settings.buildPath + '/directives/collapse-title.template.html'
})

export class CollapseTitle {
	isVisible: Boolean;

	constructor() {
		this.isVisible = true;
	}

	toggleSection = function() {
		this.isVisible = !this.isVisible;
	};
}
