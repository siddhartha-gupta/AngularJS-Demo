import {Component, View, OnInit} from 'angular2/core';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';

import {headerInterface} from '../helpers/app-interfaces'
import {_settings} from '../helpers/settings'

@Component({
	selector: 'app-header',
	templateUrl: _settings.buildPath + 'header.template.html'
})

export class AppHeader {
	headerItems: headerInterface[] = [];

	constructor() {
		this.headerItems = [{
			'name': 'backBtn',
			'clickFunc': 'goBack',
			'text': 'Go back',
			'showBtn': false
		},
			{
				'name': 'resetBtn',
				'clickFunc': 'resetApp',
				'text': 'Reset app',
				'showBtn': true
			}];
	}
}
